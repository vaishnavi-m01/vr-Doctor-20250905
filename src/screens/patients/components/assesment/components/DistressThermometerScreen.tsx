import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Pressable,
  Alert,
} from "react-native";
import Checkbox from "../../../../../components/Checkbox";
import FormCard from "../../../../../components/FormCard";
import Thermometer from "../../../../../components/Thermometer";
import { useRoute, RouteProp } from "@react-navigation/native";
import BottomBar from "@components/BottomBar";
import { Btn } from "@components/Button";
import { RootStackParamList } from "../../../../../Navigation/types";
import { apiService } from "src/services";
import Toast from "react-native-toast-message";
import { Picker } from "@react-native-picker/picker";

// Define expected API types
type Question = {
  id: string;
  label: string;
};

type Category = {
  categoryName: string;
  questions: Question[];
};

export default function DistressThermometerScreen() {
  const [v, setV] = useState(0);
  const [notes, setNotes] = useState<string>("");
  const [categories, setCategories] = useState<Category[]>([]);
  console.log("categories", categories)
  const [
    selectedProblems, setSelectedProblems] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedWeek, setSelectedWeek] = useState("week1");



  const route =
    useRoute<RouteProp<RootStackParamList, "DistressThermometerScreen">>();
  const { patientId, age } = route.params as {
    patientId: number;
    age: number;
  };
  const [enteredPatientId, setEnteredPatientId] = useState<string>(patientId.toString());


  // Toggle a problem selection
  const toggleProblem = (questionId: string) => {
    setSelectedProblems((prev) => ({
      ...prev,
      [questionId]: !prev[questionId],
    }));
  };


  const getData = async (weekNo = 1) => {
    try {
      setLoading(true);
      setError(null);

      const res = await apiService.post<{ ResponseData: any[] }>(
        "/GetParticipantDistressThermometerWeeklyQA",
        {
          WeekNo: weekNo,
          ParticipantId: `${patientId}`,
        }
      );

      console.log("raw API response:", res.data?.ResponseData);

      const responseData = res.data?.ResponseData;

      if (Array.isArray(responseData) && responseData.length > 0) {
        //  Group questions by category
        const grouped: Category[] = Object.values(
          responseData.reduce((acc: Record<string, Category>, item) => {
            const catName = item.CategoryName;
            if (!acc[catName]) {
              acc[catName] = { categoryName: catName, questions: [] };
            }
            acc[catName].questions.push({
              id: item.DistressQuestionId,
              label: item.Question,
            });
            return acc;
          }, {})
        );

        setCategories(grouped);
      } else {
        setCategories([]);
      }
    } catch (err) {
      console.error("API error:", err);
      setError("Failed to fetch data. Please try again.");
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    getData();
  }, []);



  const handleSave = async () => {
    try {
      setLoading(true);

      const factGData = categories.flatMap((cat) =>
        cat.questions.map((q) => ({
          CategoryId: cat.categoryName,
          CategoryName: cat.categoryName,
          DistressQuestionId: q.id,
          Question: q.label,
          ParticipantId: `${patientId}`,
          StudyId: "CS-0001",
          WeekNo: 1,
          CreatedBy: "UH-1000",
          IsAnswered: selectedProblems[q.id] ? "Yes" : "No",
        }))
      );

      const reqObj = {
        ParticipantId: `${patientId}`,
        DistressThermometer: v,
        WeekNo: 1,
        FactGData: factGData,
      };

      console.log(" Saving payloadddd:", reqObj);

      const res = await apiService.post(
        "/AddUpdateParticipantDistressThermometerWeeklyQA",
        reqObj
      );

      console.log(" Save success:", res.data);

      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Distress Thermometer saved successfully!",
        position: "top",
        topOffset: 50,
      });

    } catch (err) {
      console.error(" Save error:", err);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to save distress thermometer.",
        position: "top",
        topOffset: 50,
      });
    } finally {
      setLoading(false);
    }
  };



    return (
    <>
      {/* Header Card */}
      <View className="px-4 pt-2">
        <View className="bg-white border-b border-gray-200 rounded-xl p-4 flex-row justify-between items-center shadow-sm">
          <View className="flex-1">
            <Text className="text-lg font-bold text-green-600">
              Participant ID: {patientId}
            </Text>

            <Text className="text-base font-semibold text-green-600">
              Study ID: {patientId || 'N/A'}
            </Text>

            <Text className="text-base font-semibold text-gray-700">
              Age: {age || "Not specified"}
            </Text>
          </View>

          {/* Week Dropdown - Right side */}
          <View className="bg-white border border-gray-300 rounded-lg shadow-sm">
            <Picker
              selectedValue={selectedWeek}
              onValueChange={(itemValue) => setSelectedWeek(itemValue)}
              style={{
                width: 120,
                color: "black",
                fontSize: 14,
                paddingVertical: 6,
              }}
              dropdownIconColor="gray"
              mode="dropdown" // important for iOS/iPad
            >
              <Picker.Item label="Week 1" value="week1" />
              <Picker.Item label="Week 2" value="week2" />
              <Picker.Item label="Week 3" value="week3" />
              <Picker.Item label="Week 4" value="week4" />
            </Picker>
          </View>
        </View>
      </View>       

      <ScrollView className="flex-1 bg-gray-100 p-4 pb-[300px]">
        {/* Distress Thermometer Card */}
        <View className="bg-white rounded-lg p-4 shadow-md mb-4">
          <View className="flex-row items-center mb-4">
            <View className="w-10 h-10 rounded-full bg-[#E8F5E9] flex items-center justify-center mr-2">
              <Text className="font-bold text-xl text-[#2E7D32]">DT</Text>
            </View>
            <View>
              <Text className="font-bold text-lg text-[#333]">
                Distress Thermometer
              </Text>
              <Text className="text-xs text-[#6b7a77]">
                "Considering the past week, including today."
              </Text>
            </View>
          </View>

                     <View className="flex-row justify-between mb-2">
             <View className="flex-1 mr-2">
               <Text className="text-xs text-[#6b7a77] mb-2">Participant ID</Text>
                               <TextInput
                  className="bg-gray-100 border border-gray-200 rounded-xl px-4 py-3 text-base text-gray-700"
                  value={enteredPatientId}   // show patientId as default
                  onChangeText={setEnteredPatientId} // allow typing new value
                  placeholder="Enter Patient ID" // fallback placeholder
                  style={{
                    backgroundColor: '#f8f9fa',
                    borderColor: '#e5e7eb',
                    borderRadius: 16,
                  }}
                />
             </View>
            {/* <View className="flex-1 mr-2">
              <Text className="text-xs text-[#6b7a77]">Assessed On</Text>
              <TextInput
                className="border-b border-[#D1D5DB] p-2 text-sm text-[#333]"
                placeholder="mm/dd/yyyy"
              />
            </View> */}
            {/* <View className="flex-1">
              <Text className="text-xs text-[#6b7a77]">Assessed By</Text>
              <TextInput
                className="border-b border-[#D1D5DB] p-2 text-sm text-[#333]"
                placeholder="Name & role"
              />
            </View> */}
          </View>
        </View>

        {/* Rate Distress */}
        <View className="bg-white rounded-lg p-4 shadow-md mb-4">
          <Text className="font-bold text-lg text-[#333] mb-4">
            Rate Your Distress (0-10)
          </Text>
          <FormCard icon="DT" title="Distress Thermometer">
            <Thermometer value={v} onChange={setV} />
          </FormCard>
        </View>

        {/* Dynamic Problem List */}
        <View className="bg-white rounded-lg p-4 shadow-md mb-4">
          <Text className="font-bold text-lg text-[#333] mb-4">Problem List</Text>

          {loading && <Text className="text-gray-500">Loading...</Text>}
          {error && <Text className="text-red-500">{error}</Text>}

          {categories.map((cat, index) => (
            <View key={index} className="mb-4">
              <Text className="font-bold mb-2 text-sm text-[#333]">
                {cat.categoryName}
              </Text>
              <View className="flex-row flex-wrap">
                {cat.questions?.map((q) => (
                  <Checkbox
                    key={q.id}
                    label={q.label}
                    isChecked={!!selectedProblems[q.id]}
                    onToggle={() => toggleProblem(q.id)}
                  />
                ))}
              </View>
            </View>
          ))}

                     <View className="flex-1 mr-1">
             <Text className="text-xs text-[#6b7a77] mb-2">Other Problems</Text>
                           <TextInput
                className="bg-gray-100 border border-gray-200 rounded-xl px-4 py-3 text-base text-gray-700"
                placeholder="Enter other problems..."
                style={{
                  backgroundColor: '#f8f9fa',
                  borderColor: '#e5e7eb',
                  borderRadius: 16,
                }}
              />
           </View>
        </View>

        {/* Notes Section */}
        {/* <View className="bg-white rounded-lg p-4 shadow-md">
          <Text className="font-bold text-lg text-[#333] mb-4">Notes & Plan</Text>

          <View className="flex-row justify-between mb-4">
            <View className="flex-1 mr-2">
              <Text className="text-xs text-[#6b7a77]">Referral / Action</Text>
              <Pressable className="border-b border-[#D1D5DB] p-2 flex-row justify-between">
                <Text className="text-sm text-[#333]">Select</Text>
                <Text>▼</Text>
              </Pressable>
            </View>

            <View className="flex-1">
              <Text className="text-xs text-[#6b7a77]">Follow-up Date</Text>
              <TextInput
                className="border-b border-[#D1D5DB] p-2 text-sm text-[#333]"
                placeholder="mm/dd/yyyy"
              />
            </View>
          </View>

          <Text className="text-xs text-[#6b7a77] mt-1 mb-1">Additional Notes</Text>
          <TextInput
            className="border border-[#D1D5DB] rounded-lg p-2 h-24 text-sm text-[#333]"
            placeholder="Any context from the session, triggers, support provided..."
            multiline
            value={notes}
            onChangeText={setNotes}
          />
        </View> */}
      </ScrollView>


      <BottomBar>
        <Btn variant="light" onPress={() => { }}>
          Validate
        </Btn>
        <Btn onPress={handleSave} disabled={loading}>
          {loading ? "Saving..." : "Save Distress Thermometer"}
        </Btn>
      </BottomBar>

    </>
  );
}

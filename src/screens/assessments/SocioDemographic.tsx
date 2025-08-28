import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Pressable, Image, Alert } from 'react-native';
import FormCard from '@components/FormCard';
import Segmented from '@components/Segmented';
import { Field } from '@components/Field';
import BottomBar from '@components/BottomBar';
import { Btn } from '@components/Button';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../Navigation/types';
import Header from '@components/Header';
import axios from "axios";
import { apiService } from 'src/services';
import Toast from 'react-native-toast-message';



interface ParticipantDetails {
  Age?: number;
  Gender?: string;
  MaritalStatus?: string;
  NumberOfChildren?: number;
  FaithContributeToWellBeing?: string;
  PracticeAnyReligion?: string;
  ReligionSpecify?: string;
  EducationLevel?: string;
  EmploymentStatus?: string;
  KnowledgeIn?: string;

  CancerDiagnosis?: string;
  StageOfCancer?: string;
  ScoreOfECOG?: string;
  TypeOfTreatment?: string;
  TreatmentStartDate?: string;
  DurationOfTreatmentMonths?: number;
  OtherMedicalConditions?: string;
  CurrentMedications?: string;
  StartDateOfTreatment?: string;

  SmokingHistory?: string;
  AlcoholConsumption?: string;
  PhysicalActivityLevel?: string;
  StressLevels?: string;
  TechnologyExperience?: string;
}



export default function SocioDemographic() {
  // Personal Information fields
  const [ages, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [genderOther, setGenderOther] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [numberOfChildren, setNumberOfChildren] = useState("");
  const [faithWellbeing, setFaithWellbeing] = useState("");
  const [practiceReligion, setPracticeReligion] = useState("");
  const [religionSpecify, setReligionSpecify] = useState("");
  const [educationLevel, setEducationLevel] = useState("");
  const [employmentStatus, setEmploymentStatus] = useState("");
  const [english, setEnglish] = useState(false);
  const [hindi, setHindi] = useState(false);
  const [khasi, setKhasi] = useState(false);
  const [KnowledgeIn, setKnowledgeIn] = useState<string>("");
  console.log("KnowledgeIn", KnowledgeIn)

  // Medical History fields
  const [cancerDiagnosis, setCancerDiagnosis] = useState("");
  const [cancerStage, setCancerStage] = useState("");
  const [ecogScore, setEcogScore] = useState("");
  const [treatmentType, setTreatmentType] = useState("");
  const [treatmentStartDate, setTreatmentStartDate] = useState("");
  const [treatmentDuration, setTreatmentDuration] = useState("");
  const [otherMedicalConditions, setOtherMedicalConditions] = useState("");
  const [currentMedications, setCurrentMedications] = useState("");

  // Lifestyle and Psychological Factors fields
  const [smokingHistory, setSmokingHistory] = useState("");
  const [alcoholConsumption, setAlcoholConsumption] = useState("");
  const [physicalActivityLevel, setPhysicalActivityLevel] = useState("");
  const [stressLevels, setStressLevels] = useState("");
  const [technologyExperience, setTechnologyExperience] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});


  const route = useRoute<RouteProp<RootStackParamList, 'SocioDemographic'>>();
  const { patientId, age } = route.params as { patientId: number, age: number };
  const isEditMode = !!patientId;
  const navigation = useNavigation<any>();



  useEffect(() => {
    if (isEditMode) {
      (async () => {
        try {
          const res = await apiService.post<{ ResponseData: ParticipantDetails }>(
            "/GetParticipantDetails",
            { ParticipantId: patientId }
          );

          const data = res.data?.ResponseData;

          if (data) {
            // Personal
            setAge(String(data.Age ?? ""));
            setGender(data.Gender ?? "");
            setMaritalStatus(data.MaritalStatus ?? "");
            setNumberOfChildren(String(data.NumberOfChildren ?? ""));
            setFaithWellbeing(data.FaithContributeToWellBeing ?? "");
            setPracticeReligion(data.PracticeAnyReligion ?? "");
            setReligionSpecify(data.ReligionSpecify ?? "");
            setEducationLevel(data.EducationLevel ?? "");
            setEmploymentStatus(data.EmploymentStatus ?? "");
            setKnowledgeIn(data.KnowledgeIn ?? "");

            // Medical
            setCancerDiagnosis(data.CancerDiagnosis ?? "");
            setCancerStage(data.StageOfCancer ?? "");
            setEcogScore(data.ScoreOfECOG ?? "");
            setTreatmentType(data.TypeOfTreatment ?? "");
            setTreatmentStartDate(data.StartDateOfTreatment ?? "");
            setTreatmentDuration(String(data.DurationOfTreatmentMonths ?? ""));
            setOtherMedicalConditions(data.OtherMedicalConditions ?? "");
            setCurrentMedications(data.CurrentMedications ?? "");

            // Lifestyle
            setSmokingHistory(data.SmokingHistory ?? "");
            setAlcoholConsumption(data.AlcoholConsumption ?? "");
            setPhysicalActivityLevel(data.PhysicalActivityLevel ?? "");
            setStressLevels(data.StressLevels ?? "");
            setTechnologyExperience(data.TechnologyExperience ?? "");
          }
        } catch (err) {
          Toast.show({
            type: "error",
            text1: "Error",
            text2: "Failed to load participant details",
            position: "top",
            topOffset: 50,
          });
        }
      })();
    }
  }, [isEditMode, patientId]);






  const handleSave = async () => {
    let newErrors: { [key: string]: string } = {};

    if (!ages) newErrors.age = "Age is required";
    if (!gender) newErrors.gender = "Gender is required";
    if (!maritalStatus) newErrors.maritalStatus = "Marital status is required";
    if (!cancerDiagnosis) newErrors.cancerDiagnosis = "Cancer diagnosis is required";
    if (!cancerStage) newErrors.cancerStage = "Cancer stage is required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      Toast.show({
        type: "error",
        text1: "Validation Error",
        text2: "Please fill all required fields",
        position: "top",
        topOffset: 50,
      });
      return;
    }

    try {
      // const knowledgeIn = english ? "English" : hindi ? "Hindi" : khasi ? "Khasi" : "";

      const payload = {
        ParticipantId: patientId,
        StudyId: "CS-0001",
        Age: Number(ages),
        Gender: gender,
        MaritalStatus: maritalStatus,
        NumberOfChildren: numberOfChildren,
        KnowledgeIn: KnowledgeIn,
        FaithContributeToWellBeing: faithWellbeing,
        PracticeAnyReligion: practiceReligion,
        EducationLevel: educationLevel,
        EmploymentStatus: employmentStatus,

        CancerDiagnosis: cancerDiagnosis,
        StageOfCancer: cancerStage,
        ScoreOfECOG: ecogScore,
        TypeOfTreatment: treatmentType,
        StartDateOfTreatment: treatmentStartDate,
        DurationOfTreatmentMonths: Number(treatmentDuration),
        OtherMedicalConditions: otherMedicalConditions,
        CurrentMedications: currentMedications,

        SmokingHistory: smokingHistory,
        AlcoholConsumption: alcoholConsumption,
        PhysicalActivityLevel: physicalActivityLevel,
        StressLevels: stressLevels,
        TechnologyExperience: technologyExperience
      };

      let response;
      if (isEditMode) {
        // response = await apiService.put("/AddUpdateParticipant", payload);
        response = await apiService.post("/AddUpdateParticipant", payload);

      } else {
        response = await apiService.post("/AddUpdateParticipant", payload);
      }

      if (response.status === 200) {
        Toast.show({
          type: "success",
          text1: isEditMode ? "Updated" : "Success",
          text2: isEditMode
            ? "Participant updated successfully!"
            : "Participant added successfully!",
          position: "top",
          topOffset: 50,
          visibilityTime: 2000,
          onHide: () => navigation.goBack(),
        });
      } else {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Something went wrong. Please try again.",
          position: "top",
          topOffset: 50,
        });
      }
    } catch (error: any) {
      console.error("Error saving participant:", error.message);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to save participant.",
        position: "top",
        topOffset: 50,
      });
    }
  };





  return (
    <>
      {isEditMode && (
        <View className="px-4 pt-4">
          <View className="bg-white border-b border-gray-200 rounded-xl p-4 flex-row justify-between items-center shadow-sm">
            <Text className="text-lg font-bold text-green-600">
              Participant ID: {patientId}
            </Text>

            <Text className="text-base font-semibold text-gray-700">
              Age: {age || "Not specified"}
            </Text>
          </View>
        </View>
      )}


      <ScrollView className="flex-1 p-4 bg-bg pb-[60px]">

        <FormCard icon="👤" title="Section 1: Personal Information">
          <View className="mt-3">
            <Field
              label="1. Age"
              placeholder="_______ years"
              value={ages}
              onChangeText={(val) => {
                setAge(val);
                setErrors((prev) => ({ ...prev, age: "" }));
              }}
              keyboardType="numeric"
            // className={errors.age ? "border border-red-500 rounded-md" : ""}
            />
            {errors.ages && <Text className="text-red-500 text-xs mt-1">{errors.ages}</Text>}

          </View>



          <View className="mt-3">
            <Text className="text-xs text-[#4b5f5a] mb-2">2. Gender</Text>
            <View className="flex-row gap-2">
              {/* Male Button */}
              <Pressable
                onPress={() => {
                  setGender("Male");
                  setErrors((prev) => ({ ...prev, gender: "" }));
                }}
                className={`flex-1 flex-row items-center justify-center rounded-full py-3 px-2 ${gender === 'Male'
                  ? 'bg-[#4FC264]'
                  : 'bg-[#EBF6D6]'
                  }`}
              >
                <Text className={`text-lg mr-1 ${gender === 'Male' ? 'text-white' : 'text-[#2c4a43]'
                  }`}>
                  <Image
                    source={require("../../../assets/Man.png")}
                  />
                </Text>
                <Text className={`font-medium text-xs pl-2 ${gender === 'Male' ? 'text-white' : 'text-[#2c4a43]'
                  }`}>
                  Male
                </Text>
              </Pressable>

              {/* Female Button */}
              <Pressable
                onPress={() => setGender('Female')}
                className={`flex-1 flex-row items-center justify-center rounded-full py-3 px-2 ${gender === 'Female'
                  ? 'bg-[#4FC264]'
                  : 'bg-[#EBF6D6]'
                  }`}
              >
                <Text className={`text-lg mr-1 ${gender === 'Female' ? 'text-white' : 'text-[#2c4a43]'
                  }`}>
                  <Image
                    source={require("../../../assets/Women.png")}
                  />
                </Text>
                <Text className={`font-medium text-xs pl-2 ${gender === 'Female' ? 'text-white' : 'text-[#2c4a43]'
                  }`}>
                  Female
                </Text>
              </Pressable>

              {/* Other Button */}
              <Pressable
                onPress={() => setGender('Other')}
                className={`flex-1 flex-row items-center justify-center rounded-full py-3 px-2 ${gender === 'Other'
                  ? 'bg-[#4FC264]'
                  : 'bg-[#EBF6D6]'
                  }`}
              >
                <Text className={`text-lg mr-1 ${gender === 'Other' ? 'text-white' : 'text-[#2c4a43]'
                  }`}>
                  ⚧
                  {/* <Image
                    source={require("../../../assets/other.png")}
                    style={{ width: 20, height: 30, tintColor: gender === 'Other' ? '#fff' : '#9B59B6' }}
                  /> */}
                </Text>
                <Text className={`font-medium text-xs ${gender === 'Other' ? 'text-white' : 'text-[#2c4a43]'
                  }`}>
                  Other
                </Text>
              </Pressable>
            </View>
            {errors.gender && <Text className="text-red-500 text-xs mt-1">{errors.gender}</Text>}


            {/* Conditional Specify Field */}
            {gender === 'Other' && (
              <View className="mt-3">
                <Field
                  label="Specify"
                  placeholder="____________"
                  value={genderOther}
                  onChangeText={setGenderOther}
                />
              </View>
            )}
          </View>

          <View className="mt-3">
            <Text className="text-xs text-[#4b5f5a] mb-2">3. Marital Status</Text>

            {/* Button Group */}
            <View
              className={`flex-row gap-2`}
            >
              {/* Single Button */}
              <Pressable
                onPress={() => {
                  setMaritalStatus("Single");
                  setErrors((prev) => ({ ...prev, maritalStatus: "" })); // clear error
                }}
                className={`flex-1 flex-row items-center justify-center rounded-full py-3 px-2 ${maritalStatus === "Single" ? "bg-[#4FC264]" : "bg-[#EBF6D6]"
                  }`}
              >
                <Text
                  className={`text-lg mr-1 ${maritalStatus === "Single" ? "text-white" : "text-[#2c4a43]"
                    }`}
                >
                  👤
                </Text>
                <Text
                  className={`font-medium text-xs ${maritalStatus === "Single" ? "text-white" : "text-[#2c4a43]"
                    }`}
                >
                  Single
                </Text>
              </Pressable>

              {/* Married Button */}
              <Pressable
                onPress={() => {
                  setMaritalStatus("Married");
                  setErrors((prev) => ({ ...prev, maritalStatus: "" }));
                }}
                className={`flex-1 flex-row items-center justify-center rounded-full py-3 px-2 ${maritalStatus === "Married" ? "bg-[#4FC264]" : "bg-[#EBF6D6]"
                  }`}
              >
                <Text
                  className={`text-lg mr-1 ${maritalStatus === "Married" ? "text-white" : "text-[#2c4a43]"
                    }`}
                >
                  💑
                </Text>
                <Text
                  className={`font-medium text-xs ${maritalStatus === "Married" ? "text-white" : "text-[#2c4a43]"
                    }`}
                >
                  Married
                </Text>
              </Pressable>

              {/* Divorced Button */}
              <Pressable
                onPress={() => {
                  setMaritalStatus("Divorced");
                  setErrors((prev) => ({ ...prev, maritalStatus: "" }));
                }}
                className={`flex-1 flex-row items-center justify-center rounded-full py-3 px-2 ${maritalStatus === "Divorced" ? "bg-[#4FC264]" : "bg-[#EBF6D6]"
                  }`}
              >
                <Text
                  className={`text-lg mr-1 ${maritalStatus === "Divorced" ? "text-white" : "text-[#2c4a43]"
                    }`}
                >
                  💔
                </Text>
                <Text
                  className={`font-medium text-xs ${maritalStatus === "Divorced" ? "text-white" : "text-[#2c4a43]"
                    }`}
                >
                  Divorced
                </Text>
              </Pressable>

              {/* Widowed Button */}
              <Pressable
                onPress={() => {
                  setMaritalStatus("Widowed");
                  setErrors((prev) => ({ ...prev, maritalStatus: "" }));
                }}
                className={`flex-1 flex-row items-center justify-center rounded-full py-3 px-2 ${maritalStatus === "Widowed" ? "bg-[#4FC264]" : "bg-[#EBF6D6]"
                  }`}
              >
                <Text
                  className={`text-lg mr-1 ${maritalStatus === "Widowed" ? "text-white" : "text-[#2c4a43]"
                    }`}
                >
                  🕊️
                </Text>
                <Text
                  className={`font-medium text-xs ${maritalStatus === "Widowed" ? "text-white" : "text-[#2c4a43]"
                    }`}
                >
                  Widowed
                </Text>
              </Pressable>
            </View>

            {/* Error Message */}
            {errors.maritalStatus && (
              <Text className="text-red-500 text-xs mt-1">{errors.maritalStatus}</Text>
            )}

            {/* Conditional Number of Children Field */}
            {maritalStatus === "Married" && (
              <View className="mt-3">
                <Field
                  label="If married, number of children"
                  placeholder="Number of children"
                  value={numberOfChildren}
                  onChangeText={setNumberOfChildren}
                  keyboardType="numeric"
                />
              </View>
            )}
          </View>


          {/* <View className="mt-3">
            <Text className="text-xs text-[#4b5f5a] mb-1">4. Knowledge in</Text>
            <View className="mt-2">
              <Field
                label="English"
                placeholder="English knowledge level"
                value={englishKnowledge}
                onChangeText={setEnglishKnowledge}
              />
            </View>
            <View className="mt-2">
              <Field
                label="Hindi"
                placeholder="Hindi knowledge level"
                value={hindiKnowledge}
                onChangeText={setHindiKnowledge}
              />
            </View>
            <View className="mt-2">
              <Field
                label="Khasi"
                placeholder="Khasi knowledge level"
                value={khasiKnowledge}
                onChangeText={setKhasiKnowledge}
              />
            </View>
          </View> */}


          <View className="mt-3">
            <Text className="text-xs text-[#4b5f5a] mb-1">4. Knowledge in</Text>

            <View className="flex-row mt-2 space-x-4">
              {/* English */}
              <TouchableOpacity
                onPress={() => setKnowledgeIn("English")}
                className="flex-row items-center"
              >
                <View className={`w-5 h-5 border-2 border-gray-500 mr-2 items-center justify-center rounded-sm ${KnowledgeIn === 'English' ? 'bg-green-500' : 'bg-white'}`}>
                  {KnowledgeIn === 'English' && <Text className="text-white font-bold text-xs">✓</Text>}
                </View>
                <Text>English</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setKnowledgeIn("Hindi")}
                className="flex-row items-center"
              >
                <View className={`w-5 h-5 border-2 border-gray-500 mr-2 items-center justify-center rounded-sm ${KnowledgeIn === 'Hindi' ? 'bg-green-500' : 'bg-white'}`}>
                  {KnowledgeIn === 'Hindi' && <Text className="text-white font-bold text-xs">✓</Text>}
                </View>
                <Text>Hindi</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setKnowledgeIn("Khasi")}
                className="flex-row items-center"
              >
                <View className={`w-5 h-5 border-2 border-gray-500 mr-2 items-center justify-center rounded-sm ${KnowledgeIn === 'Khasi' ? 'bg-green-500' : 'bg-white'}`}>
                  {KnowledgeIn === 'Khasi' && <Text className="text-white font-bold text-xs">✓</Text>}
                </View>
                <Text>Khasi</Text>
              </TouchableOpacity>

            </View>
          </View>


          <View className="mt-3">
            <Text className="text-xs text-[#4b5f5a] mb-2">5. Does faith contribute to well-being?</Text>
            <View className="flex-row gap-2">
              {/* Yes Button */}
              <Pressable
                onPress={() => setFaithWellbeing('Yes')}
                className={`flex-1 flex-row items-center justify-center rounded-full py-3 px-2 ${faithWellbeing === 'Yes'
                  ? 'bg-[#4FC264]'
                  : 'bg-[#EBF6D6]'
                  }`}
              >
                <Text className={`text-lg mr-1 ${faithWellbeing === 'Yes' ? 'text-white' : 'text-[#2c4a43]'
                  }`}>
                  ✅
                </Text>
                <Text className={`font-medium text-xs ${faithWellbeing === 'Yes' ? 'text-white' : 'text-[#2c4a43]'
                  }`}>
                  Yes
                </Text>
              </Pressable>

              {/* No Button */}
              <Pressable
                onPress={() => setFaithWellbeing('No')}
                className={`flex-1 flex-row items-center justify-center rounded-full py-3 px-2 ${faithWellbeing === 'No'
                  ? 'bg-[#4FC264]'
                  : 'bg-[#EBF6D6]'
                  }`}
              >
                <Text className={`text-lg mr-1 ${faithWellbeing === 'No' ? 'text-white' : 'text-[#2c4a43]'
                  }`}>
                  ❌
                </Text>
                <Text className={`font-medium text-xs ${faithWellbeing === 'No' ? 'text-white' : 'text-[#2c4a43]'
                  }`}>
                  No
                </Text>
              </Pressable>
            </View>
          </View>

          <View className="mt-3">
            <Text className="text-xs text-[#4b5f5a] mb-2">6. Do you practice any religion?</Text>
            <View className="flex-row gap-2">

              <Pressable
                onPress={() => setPracticeReligion('Yes')}
                className={`flex-1 flex-row items-center justify-center rounded-full py-3 px-2 ${practiceReligion === 'Yes'
                  ? 'bg-[#4FC264]'
                  : 'bg-[#EBF6D6]'
                  }`}
              >
                <Text className={`text-lg mr-1 ${practiceReligion === 'Yes' ? 'text-white' : 'text-[#2c4a43]'
                  }`}>
                  ✅
                </Text>
                <Text className={`font-medium text-xs ${practiceReligion === 'Yes' ? 'text-white' : 'text-[#2c4a43]'
                  }`}>
                  Yes
                </Text>
              </Pressable>

              {/* No Button */}
              <Pressable
                onPress={() => setPracticeReligion('No')}
                className={`flex-1 flex-row items-center justify-center rounded-full py-3 px-2 ${practiceReligion === 'No'
                  ? 'bg-[#4FC264]'
                  : 'bg-[#EBF6D6]'
                  }`}
              >
                <Text className={`text-lg mr-1 ${practiceReligion === 'No' ? 'text-white' : 'text-[#2c4a43]'
                  }`}>
                  ❌
                </Text>
                <Text className={`font-medium text-xs ${practiceReligion === 'No' ? 'text-white' : 'text-[#2c4a43]'
                  }`}>
                  No
                </Text>
              </Pressable>
            </View>

            {/* Conditional Religion Specify Field */}
            {practiceReligion === 'Yes' && (
              <View className="mt-3">
                <Field
                  label="Please specify (Optional)"
                  placeholder="__________________"
                  value={religionSpecify}
                  onChangeText={setReligionSpecify}
                />
              </View>
            )}
          </View>

          <View className="mt-3">
            <Text className="text-xs text-[#4b5f5a] mb-1">7. Education Level (Optional)</Text>
            <Segmented
              options={[
                { label: 'No formal education', value: 'No formal education' },
                { label: 'Primary school', value: 'Primary school' },
                { label: 'Secondary school', value: 'Secondary school' },
                { label: 'College/University', value: 'College/University' },
                { label: 'Postgraduate', value: 'Postgraduate' }
              ]}
              value={educationLevel}
              onChange={setEducationLevel}
            />
          </View>

          <View className="mt-3">
            <Text className="text-xs text-[#4b5f5a] mb-1">8. Employment Status (Optional)</Text>
            <Segmented
              options={[
                { label: 'Employed', value: 'Employed' },
                { label: 'Self-employed', value: 'Self-employed' },
                { label: 'Unemployed', value: 'Unemployed' },
                { label: 'Retired', value: 'Retired' },
                { label: 'Student', value: 'Student' }
              ]}
              value={employmentStatus}
              onChange={setEmploymentStatus}
            />
          </View>
        </FormCard>

        {/* Section 2: Medical History */}
        <FormCard icon="🏥" title="Section 2: Medical History">
          <View className="mt-3">
            <Field
              label="1. Cancer Diagnosis"
              placeholder="__________________________________________"
              value={cancerDiagnosis}
              onChangeText={setCancerDiagnosis}
            />
            {errors.cancerDiagnosis && (
              <Text className="text-red-500 text-xs mt-1">{errors.cancerDiagnosis}</Text>
            )}
          </View>


          <View className="mt-3">
            <Text className="text-xs text-[#4b5f5a] mb-1">2. Stage of Cancer</Text>
            <Segmented
              options={[
                { label: 'I', value: 'I' },
                { label: 'II', value: 'II' },
                { label: 'III', value: 'III' },
                { label: 'IV', value: 'IV' }
              ]}
              value={cancerStage}
              onChange={setCancerStage}
            />
            {errors.cancerStage && (
              <Text className="text-red-500 text-xs mt-1">{errors.cancerStage}</Text>
            )}
          </View>


          <View className="mt-3">
            <Field
              label="3. Grade (ECOG score)"
              placeholder="________"
              value={ecogScore}
              onChangeText={setEcogScore}
              keyboardType="numeric"
            />
            <Text className="text-xs text-gray-500 mt-1">
              0: Fully active, 1: Restricted but ambulatory, 2: Ambulatory with self-care, 3: Limited self-care, 4: Completely disabled, 5: Death
            </Text>
          </View>

          <View className="mt-3">
            <Text className="text-xs text-[#4b5f5a] mb-1">4. Type of Treatment</Text>
            <Segmented
              options={[
                { label: 'Chemotherapy', value: 'Chemotherapy' },
                { label: 'Radiation', value: 'Radiation' },
                { label: 'Both', value: 'Both' }
              ]}
              value={treatmentType}
              onChange={setTreatmentType}
            />
          </View>

          <View className="flex-row gap-3 mt-3">
            <View className="flex-1">
              <Field
                label="5. Start Date of Treatment"
                placeholder="____________"
                value={treatmentStartDate}
                onChangeText={setTreatmentStartDate}
              />
            </View>
            <View className="flex-1">
              <Field
                label="6. Duration of Treatment"
                placeholder="______________ months"
                value={treatmentDuration}
                onChangeText={setTreatmentDuration}
                keyboardType="numeric"
              />
            </View>
          </View>

          <View className="mt-3">
            <Field
              label="7. Other Medical Conditions (if any)"
              placeholder="_________________________"
              value={otherMedicalConditions}
              onChangeText={setOtherMedicalConditions}
              multiline
            />
          </View>

          <View className="mt-3">
            <Field
              label="8. Current Medications"
              placeholder="_____________________________________"
              value={currentMedications}
              onChangeText={setCurrentMedications}
              multiline
            />
          </View>
        </FormCard>

        {/* Section 3: Lifestyle and Psychological Factors */}
        <FormCard icon="🧠" title="Section 3: Lifestyle and Psychological Factors">
          <View className="mt-3">
            <Text className="text-xs text-[#4b5f5a] mb-2">1. Smoking History</Text>
            <View className="flex-row gap-2">
              {/* Never Button */}
              <Pressable
                onPress={() => setSmokingHistory('Never')}
                className={`flex-1 flex-row items-center justify-center rounded-full py-3 px-2 ${smokingHistory === 'Never'
                  ? 'bg-[#4FC264]'
                  : 'bg-[#EBF6D6]'
                  }`}
              >
                <Text className={`text-lg mr-1 ${smokingHistory === 'Never' ? 'text-white' : 'text-[#2c4a43]'
                  }`}>
                  🚭
                </Text>
                <Text className={`font-medium text-xs ${smokingHistory === 'Never' ? 'text-white' : 'text-[#2c4a43]'
                  }`}>
                  Never
                </Text>
              </Pressable>

              {/* Former Smoker Button */}
              <Pressable
                onPress={() => setSmokingHistory('Former Smoker')}
                className={`flex-1 flex-row items-center justify-center rounded-full py-3 px-2 ${smokingHistory === 'Former Smoker'
                  ? 'bg-[#4FC264]'
                  : 'bg-[#EBF6D6]'
                  }`}
              >
                <Text className={`text-lg mr-1 ${smokingHistory === 'Former Smoker' ? 'text-white' : 'text-[#2c4a43]'
                  }`}>
                  🚬
                </Text>
                <Text className={`font-medium text-xs ${smokingHistory === 'Former Smoker' ? 'text-white' : 'text-[#2c4a43]'
                  }`}>
                  Former
                </Text>
              </Pressable>

              {/* Current Smoker Button */}
              <Pressable
                onPress={() => setSmokingHistory('Current Smoker')}
                className={`flex-1 flex-row items-center justify-center rounded-full py-3 px-2 ${smokingHistory === 'Current Smoker'
                  ? 'bg-[#4FC264]'
                  : 'bg-[#EBF6D6]'
                  }`}
              >
                <Text className={`text-lg mr-1 ${smokingHistory === 'Current Smoker' ? 'text-white' : 'text-[#2c4a43]'
                  }`}>
                  💨
                </Text>
                <Text className={`font-medium text-xs ${smokingHistory === 'Current Smoker' ? 'text-white' : 'text-[#2c4a43]'
                  }`}>
                  Current
                </Text>
              </Pressable>
            </View>
          </View>

          <View className="mt-3">
            <Text className="text-xs text-[#4b5f5a] mb-2">2. Alcohol Consumption</Text>
            <View className="flex-row gap-2">
              {/* Never Button */}
              <Pressable
                onPress={() => setAlcoholConsumption('Never')}
                className={`flex-1 flex-row items-center justify-center rounded-full py-3 px-2 ${alcoholConsumption === 'Never'
                  ? 'bg-[#4FC264]'
                  : 'bg-[#EBF6D6]'
                  }`}
              >
                <Text className={`text-lg mr-1 ${alcoholConsumption === 'Never' ? 'text-white' : 'text-[#2c4a43]'
                  }`}>
                  🚫
                </Text>
                <Text className={`font-medium text-xs ${alcoholConsumption === 'Never' ? 'text-white' : 'text-[#2c4a43]'
                  }`}>
                  Never
                </Text>
              </Pressable>

              {/* Occasionally Button */}
              <Pressable
                onPress={() => setAlcoholConsumption('Occasionally')}
                className={`flex-1 flex-row items-center justify-center rounded-full py-3 px-2 ${alcoholConsumption === 'Occasionally'
                  ? 'bg-[#4FC264]'
                  : 'bg-[#EBF6D6]'
                  }`}
              >
                <Text className={`text-lg mr-1 ${alcoholConsumption === 'Occasionally' ? 'text-white' : 'text-[#2c4a43]'
                  }`}>
                  🍷
                </Text>
                <Text className={`font-medium text-xs ${alcoholConsumption === 'Occasionally' ? 'text-white' : 'text-[#2c4a43]'
                  }`}>
                  Occasionally
                </Text>
              </Pressable>

              {/* Frequently Button */}
              <Pressable
                onPress={() => setAlcoholConsumption('Frequently')}
                className={`flex-1 flex-row items-center justify-center rounded-full py-3 px-2 ${alcoholConsumption === 'Frequently'
                  ? 'bg-[#4FC264]'
                  : 'bg-[#EBF6D6]'
                  }`}
              >
                <Text className={`text-lg mr-1 ${alcoholConsumption === 'Frequently' ? 'text-white' : 'text-[#2c4a43]'
                  }`}>
                  🍺
                </Text>
                <Text className={`font-medium text-xs ${alcoholConsumption === 'Frequently' ? 'text-white' : 'text-[#2c4a43]'
                  }`}>
                  Frequently
                </Text>
              </Pressable>
            </View>
          </View>

          <View className="mt-3">
            <Text className="text-xs text-[#4b5f5a] mb-2">3. Physical Activity Level</Text>
            <View className="flex-row gap-2">
              {/* Sedentary Button */}
              <Pressable
                onPress={() => setPhysicalActivityLevel('Sedentary')}
                className={`flex-1 flex-row items-center justify-center rounded-full py-3 px-2 ${physicalActivityLevel === 'Sedentary'
                  ? 'bg-[#4FC264]'
                  : 'bg-[#EBF6D6]'
                  }`}
              >
                <Text className={`text-lg mr-1 ${physicalActivityLevel === 'Sedentary' ? 'text-white' : 'text-[#2c4a43]'
                  }`}>
                  🛋️
                </Text>
                <Text className={`font-medium text-xs ${physicalActivityLevel === 'Sedentary' ? 'text-white' : 'text-[#2c4a43]'
                  }`}>
                  Sedentary
                </Text>
              </Pressable>

              {/* Moderate Button */}
              <Pressable
                onPress={() => setPhysicalActivityLevel('Moderate')}
                className={`flex-1 flex-row items-center justify-center rounded-full py-3 px-2 ${physicalActivityLevel === 'Moderate'
                  ? 'bg-[#4FC264]'
                  : 'bg-[#EBF6D6]'
                  }`}
              >
                <Text className={`text-lg mr-1 ${physicalActivityLevel === 'Moderate' ? 'text-white' : 'text-[#2c4a43]'
                  }`}>
                  🚶
                </Text>
                <Text className={`font-medium text-xs ${physicalActivityLevel === 'Moderate' ? 'text-white' : 'text-[#2c4a43]'
                  }`}>
                  Moderate
                </Text>
              </Pressable>

              {/* Active Button */}
              <Pressable
                onPress={() => setPhysicalActivityLevel('Active')}
                className={`flex-1 flex-row items-center justify-center rounded-full py-3 px-2 ${physicalActivityLevel === 'Active'
                  ? 'bg-[#4FC264]'
                  : 'bg-[#EBF6D6]'
                  }`}
              >
                <Text className={`text-lg mr-1 ${physicalActivityLevel === 'Active' ? 'text-white' : 'text-[#2c4a43]'
                  }`}>
                  🏃
                </Text>
                <Text className={`font-medium text-xs ${physicalActivityLevel === 'Active' ? 'text-white' : 'text-[#2c4a43]'
                  }`}>
                  Active
                </Text>
              </Pressable>
            </View>
            <Text className="text-xs text-gray-500 mt-1">
              Sedentary: Little to no exercise, Moderate: Exercise 1-3 times per week, Active: Exercise 4+ times per week
            </Text>
          </View>

          <View className="mt-3">
            <Text className="text-xs text-[#4b5f5a] mb-2">4. Stress Levels</Text>
            <View className="flex-row gap-2">
              {/* Low Button */}
              <Pressable
                onPress={() => setStressLevels('Low')}
                className={`flex-1 flex-row items-center justify-center rounded-full py-3 px-2 ${stressLevels === 'Low'
                  ? 'bg-[#4FC264]'
                  : 'bg-[#EBF6D6]'
                  }`}
              >
                <Text className={`text-lg mr-1 ${stressLevels === 'Low' ? 'text-white' : 'text-[#2c4a43]'
                  }`}>
                  😌
                </Text>
                <Text className={`font-medium text-xs ${stressLevels === 'Low' ? 'text-white' : 'text-[#2c4a43]'
                  }`}>
                  Low
                </Text>
              </Pressable>

              {/* Moderate Button */}
              <Pressable
                onPress={() => setStressLevels('Moderate')}
                className={`flex-1 flex-row items-center justify-center rounded-full py-3 px-2 ${stressLevels === 'Moderate'
                  ? 'bg-[#4FC264]'
                  : 'bg-[#EBF6D6]'
                  }`}
              >
                <Text className={`text-lg mr-1 ${stressLevels === 'Moderate' ? 'text-white' : 'text-[#2c4a43]'
                  }`}>
                  😐
                </Text>
                <Text className={`font-medium text-xs ${stressLevels === 'Moderate' ? 'text-white' : 'text-[#2c4a43]'
                  }`}>
                  Moderate
                </Text>
              </Pressable>

              {/* High Button */}
              <Pressable
                onPress={() => setStressLevels('High')}
                className={`flex-1 flex-row items-center justify-center rounded-full py-3 px-2 ${stressLevels === 'High'
                  ? 'bg-[#4FC264]'
                  : 'bg-[#EBF6D6]'
                  }`}
              >
                <Text className={`text-lg mr-1 ${stressLevels === 'High' ? 'text-white' : 'text-[#2c4a43]'
                  }`}>
                  😰
                </Text>
                <Text className={`font-medium text-xs ${stressLevels === 'High' ? 'text-white' : 'text-[#2c4a43]'
                  }`}>
                  High
                </Text>
              </Pressable>
            </View>
          </View>

          <View className="mt-3">
            <Text className="text-xs text-[#4b5f5a] mb-2">5. Experience with Technology (VR, Smartphones, etc.)</Text>
            <View className="flex-row gap-2">
              {/* No Experience Button */}
              <Pressable
                onPress={() => setTechnologyExperience('No experience')}
                className={`flex-1 flex-row items-center justify-center rounded-full py-3 px-2 ${technologyExperience === 'No experience'
                  ? 'bg-[#4FC264]'
                  : 'bg-[#EBF6D6]'
                  }`}
              >
                <Text className={`text-lg mr-1 ${technologyExperience === 'No experience' ? 'text-white' : 'text-[#2c4a43]'
                  }`}>
                  📱
                </Text>
                <Text className={`font-medium text-xs ${technologyExperience === 'No experience' ? 'text-white' : 'text-[#2c4a43]'
                  }`}>
                  No Experience
                </Text>
              </Pressable>

              {/* Some Experience Button */}
              <Pressable
                onPress={() => setTechnologyExperience('Some experience')}
                className={`flex-1 flex-row items-center justify-center rounded-full py-3 px-2 ${technologyExperience === 'Some experience'
                  ? 'bg-[#4FC264]'
                  : 'bg-[#EBF6D6]'
                  }`}
              >
                <Text className={`text-lg mr-1 ${technologyExperience === 'Some experience' ? 'text-white' : 'text-[#2c4a43]'
                  }`}>
                  💻
                </Text>
                <Text className={`font-medium text-xs ${technologyExperience === 'Some experience' ? 'text-white' : 'text-[#2c4a43]'
                  }`}>
                  Some Experience
                </Text>
              </Pressable>

              {/* Proficient Button */}
              <Pressable
                onPress={() => setTechnologyExperience('Proficient')}
                className={`flex-1 flex-row items-center justify-center rounded-full py-3 px-2 ${technologyExperience === 'Proficient'
                  ? 'bg-[#4FC264]'
                  : 'bg-[#EBF6D6]'
                  }`}
              >
                <Text className={`text-lg mr-1 ${technologyExperience === 'Proficient' ? 'text-white' : 'text-[#2c4a43]'
                  }`}>
                  🚀
                </Text>
                <Text className={`font-medium text-xs ${technologyExperience === 'Proficient' ? 'text-white' : 'text-[#2c4a43]'
                  }`}>
                  Proficient
                </Text>
              </Pressable>
            </View>
          </View>
        </FormCard>
      </ScrollView>

      <BottomBar>
        {/* <Btn variant="light" onPress={() => { }}>Validate</Btn> */}
        <Btn onPress={handleSave}>Save Information</Btn>
      </BottomBar>
    </>
  );
}


import React, { useState, useMemo, useEffect } from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import FormCard from "../../../../../components/FormCard";
import BottomBar from "../../../../../components/BottomBar";
import { Btn } from "../../../../../components/Button";
import { Field } from "../../../../../components/Field";
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../../../../Navigation/types";
import { apiService } from "src/services";
import Toast from 'react-native-toast-message';

interface FactGQuestion {
  FactGCategoryId: string;
  FactGCategoryName: string;
  FactGQuestionId: string;
  FactGQuestion: string;
  ScaleValue?: string; 
}

interface FactGResponse {
  ResponseData: FactGQuestion[];
}

interface Subscale {
  key: string;
  label: string;
  items: { code: string; text: string; value?: string }[];
}

interface ScoreResults {
  PWB: number;
  SWB: number;
  EWB: number;
  FWB: number;
  TOTAL: number;
}

// helper to sum a subscale
const calculateSubscaleScore = (
  answers: Record<string, number | null>,
  itemCodes: string[]
) => {
  return itemCodes.reduce((sum, code) => {
    const value = answers[code];
    return sum + (value !== null && value !== undefined ? value : 0);
  }, 0);
};

// compute all scores
const computeScores = (answers: Record<string, number | null>): ScoreResults => {
  const PWB_ITEMS = ["GP1", "GP2", "GP3", "GP4", "GP5", "GP6", "GP7"];
  const SWB_ITEMS = ["GS1", "GS2", "GS3", "GS4", "GS5", "GS6"];
  const EWB_ITEMS = ["GE1", "GE2", "GE3", "GE4", "GE5", "GE6"];
  const FWB_ITEMS = ["GF1", "GF2", "GF3", "GF4", "GF5", "GF6", "GF7"];

  const PWB = calculateSubscaleScore(answers, PWB_ITEMS);
  const SWB = calculateSubscaleScore(answers, SWB_ITEMS);
  const EWB = calculateSubscaleScore(answers, EWB_ITEMS);
  const FWB = calculateSubscaleScore(answers, FWB_ITEMS);
  const TOTAL = PWB + SWB + EWB + FWB;

  return { PWB, SWB, EWB, FWB, TOTAL };
};

export default function EdmontonFactGScreen() {
  const [answers, setAnswers] = useState<Record<string, number | null>>({});
  const [subscales, setSubscales] = useState<Subscale[]>([]);
  const [assessedOn, setAssessedOn] = useState("");
  const [assessedBy, setAssessedBy] = useState("");
  const [sessionNo, setSessionNo] = useState("1");

  const score: ScoreResults = useMemo(() => computeScores(answers), [answers]);

  const route = useRoute<RouteProp<RootStackParamList, "EdmontonFactGScreen">>();
  const navigation = useNavigation();
  const { patientId, age } = route.params as { patientId: number; age: number };

  function setAnswer(code: string, value: number) {
    setAnswers((prev) => ({ ...prev, [code]: value }));
  }

  function handleClear() {
    setAnswers({});
  }

  const fetchFactG = async () => {
    try {
      const response = await apiService.post<FactGResponse>(
        "/getParticipantFactGQuestionBaseline"
      );

      const { ResponseData } = response.data;

      const grouped: Record<string, Subscale> = {};

      ResponseData.forEach((q) => {
        if (!grouped[q.FactGCategoryId]) {
          grouped[q.FactGCategoryId] = {
            key: q.FactGCategoryId,
            label: q.FactGCategoryName,
            items: [],
          };
        }
        grouped[q.FactGCategoryId].items.push({
          code: q.FactGQuestionId,
          text: q.FactGQuestion,
          value: q.ScaleValue,
        });
      });

      setSubscales(Object.values(grouped));
    } catch (error) {
      console.error("Error fetching FactG:", error);
    }
  };

  useEffect(() => {
    fetchFactG();
  }, []);

  const handleSave = async () => {
    try {
      // Build payload with all question responses
      const payload = {
        ParticipantId: patientId,
        StudyId: patientId,
        AssessedOn: assessedOn,
        AssessedBy: assessedBy,
        SessionNo: sessionNo,
        Responses: Object.keys(answers).map((code) => ({
          FactGQuestionId: code,
          ScaleValue: answers[code],
        })),
      };

      const response = await apiService.post("/AddUpdateParticipant", payload);

      if (response.status === 200) {
        Toast.show({
          type: "success",
          text1: "Success",
          text2: "FACT-G responses saved successfully!",
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
      console.error("Error saving FACT-G:", error.message);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to save FACT-G responses.",
        position: "top",
        topOffset: 50,
      });
    }
  };

  return (
    <>
      <View className="px-4 pt-4">
        <View className="bg-white border-b border-gray-200 rounded-xl p-4 flex-row justify-between items-center shadow-sm">
          <Text className="text-lg font-bold text-green-600">
            Participant ID: {patientId}
          </Text>
          <Text className="text-base font-semibold text-gray-700">Age: {age}</Text>
        </View>
      </View>

      <ScrollView className="flex-1 p-4 bg-bg pb-[90px]">
        <FormCard
          icon="FG"
          title="FACT-G (Version 4)"
          desc="Considering the past 7 days, choose one number per line. 0=Not at all ... 4=Very much."
        >
          <View className="flex-row gap-3">
            <View className="flex-1">
              <Field label="Participant ID" placeholder={`${patientId}`} editable={false} />
            </View>
            <View className="flex-1">
              <Field
                label="Assessed On"
                placeholder="YYYY-MM-DD"
                value={assessedOn}
                onChangeText={setAssessedOn}
              />
            </View>
            <View className="flex-1">
              <Field
                label="Assessed By"
                placeholder="Name & role"
                value={assessedBy}
                onChangeText={setAssessedBy}
              />
            </View>
          </View>
        </FormCard>

        {subscales.map((scale) => (
          <FormCard key={scale.key} icon={scale.key[0]} title={scale.label}>
            {scale.items.map((item) => (
              <View
                key={item.code}
                className="flex-row items-center gap-3 mb-2"
              >
                <Text className="w-16 text-ink font-bold">{item.code}</Text>
                <Text className="flex-1 text-sm">{item.text}</Text>
                <View className="bg-white border border-[#e6eeeb] rounded-xl shadow-sm overflow-hidden">
                  <View className="flex-row">
                    {[0, 1, 2, 3, 4].map((value, index) => (
                      <React.Fragment key={value}>
                        <Pressable
                          onPress={() => setAnswer(item.code, value)}
                          className={`w-12 py-2 items-center justify-center ${
                            answers[item.code] === value
                              ? "bg-[#7ED321]"
                              : "bg-white"
                          }`}
                        >
                          <Text
                            className={`font-medium text-sm ${
                              answers[item.code] === value
                                ? "text-white"
                                : "text-[#4b5f5a]"
                            }`}
                          >
                            {value}
                          </Text>
                        </Pressable>
                        {index < 4 && <View className="w-px bg-[#e6eeeb]" />}
                      </React.Fragment>
                    ))}
                  </View>
                </View>
              </View>
            ))}
          </FormCard>
        ))}
      </ScrollView>

      <BottomBar>
        <Text className="px-3 py-2 rounded-xl bg-[#0b362c] text-white font-bold">
          PWB {score.PWB}
        </Text>
        <Text className="px-3 py-2 rounded-xl bg-[#0b362c] text-white font-bold">
          SWB {score.SWB}
        </Text>
        <Text className="px-3 py-2 rounded-xl bg-[#0b362c] text-white font-bold">
          EWB {score.EWB}
        </Text>
        <Text className="px-3 py-2 rounded-xl bg-[#0b362c] text-white font-bold">
          FWB {score.FWB}
        </Text>
        <Text className="px-3 py-2 rounded-xl bg-[#134b3b] text-white font-extrabold">
          TOTAL {score.TOTAL}
        </Text>
        <Btn variant="light" onPress={handleClear}>
          Clear
        </Btn>
        <Btn onPress={handleSave}>Save</Btn>
      </BottomBar>
    </>
  );
}

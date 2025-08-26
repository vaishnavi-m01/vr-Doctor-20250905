import React, { useState, useMemo } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import FormCard from '../../../../../components/FormCard';
import PillGroup from '../../../../../components/PillGroup';
import BottomBar from '../../../../../components/BottomBar';
import { Btn } from '../../../../../components/Button';
import { subscales } from '../../../../../data/factg';
import { Field } from '../../../../../components/Field';
import { useRoute } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../../../../Navigation/types';

interface ScoreResults {
  PWB: number;
  SWB: number;
  EWB: number;
  FWB: number;
  TOTAL: number;
}

// Helper function to calculate subscale scores
const calculateSubscaleScore = (answers: Record<string, number | null>, itemCodes: string[]) => {
  return itemCodes.reduce((sum, code) => {
    const value = answers[code];
    return sum + (value !== null ? value : 0);
  }, 0);
};

// Main score computation function
const computeScores = (answers: Record<string, number | null>): ScoreResults => {
  // Define which items belong to each subscale
  const PWB_ITEMS = ['GP1', 'GP2', 'GP3', 'GP4', 'GP5', 'GP6', 'GP7'];
  const SWB_ITEMS = ['GS1', 'GS2', 'GS3', 'GS4', 'GS5', 'GS6'];
  const EWB_ITEMS = ['GE1', 'GE2', 'GE3', 'GE4', 'GE5', 'GE6'];
  const FWB_ITEMS = ['GF1', 'GF2', 'GF3', 'GF4', 'GF5', 'GF6', 'GF7'];

  const PWB = calculateSubscaleScore(answers, PWB_ITEMS);
  const SWB = calculateSubscaleScore(answers, SWB_ITEMS);
  const EWB = calculateSubscaleScore(answers, EWB_ITEMS);
  const FWB = calculateSubscaleScore(answers, FWB_ITEMS);
  const TOTAL = PWB + SWB + EWB + FWB;

  return { PWB, SWB, EWB, FWB, TOTAL };
};

export default function EdmontonFactGScreen() {
  const [answers, setAnswers] = useState<Record<string, number | null>>({});
  const score: ScoreResults = useMemo(() => computeScores(answers), [answers]);

  const route = useRoute<RouteProp<RootStackParamList, 'EdmontonFactGScreen'>>();
  const { patientId } = route.params as { patientId: number };

  function setAnswer(code: string, value: number) {
    setAnswers(prev => ({ ...prev, [code]: value }));
  }

  function handleClear() {
    setAnswers({});
  }

  function handleSave() {
    // Implement save functionality here
    console.log('Saving answers:', answers);
    console.log('Calculated scores:', score);
  }

  return (
    <>

      <View className="px-4 pt-4">
        <View className="bg-white border-b border-gray-200 rounded-xl p-4 flex-row justify-between items-center shadow-sm">
          <Text className="text-lg font-bold text-green-600">
            Participant ID: 0012-5389-5824
          </Text>

          <Text className="text-base font-semibold text-gray-700">
            Age: 54
          </Text>
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
              <Field label="Participant ID" placeholder={`${patientId}`} />
            </View>
            <View className="flex-1">
              <Field label="Assessed On" placeholder="YYYY-MM-DD" />
            </View>
            <View className="flex-1">
              <Field label="Assessed By" placeholder="Name & role" />
            </View>
          </View>
        </FormCard>

        {subscales.map(scale => (
          <FormCard key={scale.key} icon={scale.key[0]} title={scale.label}>
            {scale.items.map(item => (
              <View key={item.code} className="flex-row items-center gap-3 mb-2">
                <Text className="w-16 text-ink font-bold">{item.code}</Text>
                <Text className="flex-1 text-sm">{item.text}</Text>
                <View className="bg-white border border-[#e6eeeb] rounded-xl shadow-sm overflow-hidden">
                  <View className="flex-row">
                    {[0, 1, 2, 3, 4].map((value, index) => (
                      <React.Fragment key={value}>
                        <Pressable
                          onPress={() => setAnswer(item.code, value)}
                          className={`w-12 py-2 items-center justify-center ${
                            answers[item.code] === value ? 'bg-[#7ED321]' : 'bg-white'
                          }`}
                        >
                          <Text className={`font-medium text-sm ${
                            answers[item.code] === value ? 'text-white' : 'text-[#4b5f5a]'
                          }`}>
                            {value}
                          </Text>
                        </Pressable>
                        {index < 4 && (
                          <View className="w-px bg-[#e6eeeb]" />
                        )}
                      </React.Fragment>
                    ))}
                  </View>
                </View>
                {item.optional && (
                  <Text className="text-xs text-muted ml-2">Optional</Text>
                )}
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
        <Btn onPress={handleSave}>
          Save
        </Btn>
      </BottomBar>
    </>
  );
}
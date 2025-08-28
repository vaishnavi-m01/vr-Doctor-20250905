import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, Pressable } from 'react-native';
import Checkbox from '../../../../../components/Checkbox';
import FormCard from '../../../../../components/FormCard';
import Thermometer from '../../../../../components/Thermometer';
import { useRoute, RouteProp } from '@react-navigation/native';
import BottomBar from '@components/BottomBar';
import { Btn } from '@components/Button';
import { RootStackParamList } from '../../../../../Navigation/types';

// Define the type for the problems state
type ProblemKeys =
  | 'finances'
  | 'work'
  | 'transportation'
  | 'housing'
  | 'child'
  | 'insurance'
  | 'partner'
  | 'children'
  | 'familyHealth'
  | 'communication'
  | 'lackOfSupport'
  | 'worry'
  | 'fear'
  | 'sadness'
  | 'depression'
  | 'nervousness'
  | 'lossOfInterest'
  | 'spiritualConcerns'
  | 'meaningPurpose'
  | 'fatigue'
  | 'sleep'
  | 'pain'
  | 'nausea'
  | 'appetite'
  | 'breathing'
  | 'skin'
  | 'tingling'
  | 'swelling'
  | 'other';

type Problems = Record<ProblemKeys, boolean>;

export default function DistressThermometerScreen() {
  const [v, setV] = useState(3);
  const [distressLevel, setDistressLevel] = useState<number>(0);
  const [problems, setProblems] = useState<Partial<Problems>>({});
  const [notes, setNotes] = useState<string>('');

  const route = useRoute<RouteProp<RootStackParamList, 'DistressThermometerScreen'>>();
  const { patientId, age } = route.params as { patientId: number, age: number };

  const toggleProblem = (key: ProblemKeys) => {
    setProblems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <>

      <View className="px-4 pt-4">
        <View className="bg-white border-b border-gray-200 rounded-xl p-4 flex-row justify-between items-center shadow-sm">
          <Text className="text-lg font-bold text-green-600">
            Participant ID: {patientId}
          </Text>

          <Text className="text-base font-semibold text-gray-700">
            Age: {age}
          </Text>
        </View>
      </View>
      <ScrollView className="flex-1 bg-gray-100 p-4 pb-20">
        {/* Header Section */}
        <View className="bg-white rounded-lg p-4 shadow-md mb-4">
          <View className="flex-row items-center mb-4">
            <View className="w-10 h-10 rounded-full bg-[#E8F5E9] flex items-center justify-center mr-2">
              <Text className="font-bold text-xl text-[#2E7D32]">DT</Text>
            </View>
            <View>
              <Text className="font-bold text-lg text-[#333]">Distress Thermometer</Text>
              <Text className="text-xs text-[#6b7a77]">"Considering the past week, including today."</Text>
            </View>
          </View>
          <View className="flex-row justify-between mb-2">
            <View className="flex-1 mr-2">
              <Text className="text-xs text-[#6b7a77]">Participant ID</Text>
              <TextInput
                className="border-b border-[#D1D5DB] p-2 text-sm text-[#333]"
                placeholder={`${patientId}`}
              />
            </View>
            <View className="flex-1 mr-2">
              <Text className="text-xs text-[#6b7a77]">Assessed On</Text>
              <TextInput
                className="border-b border-[#D1D5DB] p-2 text-sm text-[#333]"
                placeholder="mm/dd/yyyy"
              />
            </View>
            <View className="flex-1">
              <Text className="text-xs text-[#6b7a77]">Assessed By</Text>
              <TextInput
                className="border-b border-[#D1D5DB] p-2 text-sm text-[#333]"
                placeholder="Name & role"
              />
            </View>
          </View>
        </View>

        {/* Rate Your Distress Section */}
        <View className="bg-white rounded-lg p-4 shadow-md mb-4">
          <Text className="font-bold text-lg text-[#333] mb-4">Rate Your Distress (0-10)</Text>
          <FormCard icon="DT" title="Distress Thermometer">
            <Thermometer value={v} onChange={setV} />
          </FormCard>

        </View>

        {/* Problem List Section */}
        <View className="bg-white rounded-lg p-4 shadow-md mb-4">
          <Text className="font-bold text-lg text-[#333] mb-4">Problem List</Text>

          <Text className="font-bold mb-1 text-sm text-[#333]">Practical</Text>
          <View className="flex-row flex-wrap mb-4">
            <Checkbox label="Finances" isChecked={!!problems.finances} onToggle={() => toggleProblem('finances')} />
            <Checkbox label="Work / School" isChecked={!!problems.work} onToggle={() => toggleProblem('work')} />
            <Checkbox label="Transportation" isChecked={!!problems.transportation} onToggle={() => toggleProblem('transportation')} />
            <Checkbox label="Housing" isChecked={!!problems.housing} onToggle={() => toggleProblem('housing')} />
            <Checkbox label="Child / Elder care" isChecked={!!problems.child} onToggle={() => toggleProblem('child')} />
            <Checkbox label="Insurance" isChecked={!!problems.insurance} onToggle={() => toggleProblem('insurance')} />
          </View>

          <Text className="font-bold mb-1 text-sm text-[#333]">Family / Social</Text>
          <View className="flex-row flex-wrap mb-4">
            <Checkbox label="Partner" isChecked={!!problems.partner} onToggle={() => toggleProblem('partner')} />
            <Checkbox label="Children" isChecked={!!problems.children} onToggle={() => toggleProblem('children')} />
            <Checkbox label="Family health" isChecked={!!problems.familyHealth} onToggle={() => toggleProblem('familyHealth')} />
            <Checkbox label="Communication" isChecked={!!problems.communication} onToggle={() => toggleProblem('communication')} />
            <Checkbox label="Lack of support" isChecked={!!problems.lackOfSupport} onToggle={() => toggleProblem('lackOfSupport')} />
          </View>

          <Text className="font-bold mb-1 text-sm text-[#333]">Emotional</Text>
          <View className="flex-row flex-wrap mb-4">
            <Checkbox label="Worry" isChecked={!!problems.worry} onToggle={() => toggleProblem('worry')} />
            <Checkbox label="Fear" isChecked={!!problems.fear} onToggle={() => toggleProblem('fear')} />
            <Checkbox label="Sadness" isChecked={!!problems.sadness} onToggle={() => toggleProblem('sadness')} />
            <Checkbox label="Depression" isChecked={!!problems.depression} onToggle={() => toggleProblem('depression')} />
            <Checkbox label="Nervousness" isChecked={!!problems.nervousness} onToggle={() => toggleProblem('nervousness')} />
            <Checkbox label="Loss of interest" isChecked={!!problems.lossOfInterest} onToggle={() => toggleProblem('lossOfInterest')} />
          </View>

          <Text className="font-bold mb-1 text-sm text-[#333]">Spiritual / Religious</Text>
          <View className="flex-row flex-wrap mb-4">
            <Checkbox label="Spiritual concerns" isChecked={!!problems.spiritualConcerns} onToggle={() => toggleProblem('spiritualConcerns')} />
            <Checkbox label="Meaning / Purpose" isChecked={!!problems.meaningPurpose} onToggle={() => toggleProblem('meaningPurpose')} />
          </View>

          <Text className="font-bold mb-1 text-sm text-[#333]">Physical</Text>
          <View className="flex-row flex-wrap">
            <Checkbox label="Fatigue" isChecked={!!problems.fatigue} onToggle={() => toggleProblem('fatigue')} />
            <Checkbox label="Sleep" isChecked={!!problems.sleep} onToggle={() => toggleProblem('sleep')} />
            <Checkbox label="Pain" isChecked={!!problems.pain} onToggle={() => toggleProblem('pain')} />
            <Checkbox label="Nausea" isChecked={!!problems.nausea} onToggle={() => toggleProblem('nausea')} />
            <Checkbox label="Appetite" isChecked={!!problems.appetite} onToggle={() => toggleProblem('appetite')} />
            <Checkbox label="Breathing" isChecked={!!problems.breathing} onToggle={() => toggleProblem('breathing')} />
            <Checkbox label="Skin" isChecked={!!problems.skin} onToggle={() => toggleProblem('skin')} />
            <Checkbox label="Tingling" isChecked={!!problems.tingling} onToggle={() => toggleProblem('tingling')} />
            <Checkbox label="Swelling" isChecked={!!problems.swelling} onToggle={() => toggleProblem('swelling')} />
            <Checkbox label="Other" isChecked={!!problems.other} onToggle={() => toggleProblem('other')} />
          </View>
        </View>

        {/* Notes & Plan Section */}
        <View className="bg-white rounded-lg p-4 shadow-md">
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
        </View>
      </ScrollView>

      <BottomBar>
        <Btn variant="light" onPress={() => { }}>Validate</Btn>
        <Btn onPress={() => { }}>Save Distress Thermometer</Btn>
      </BottomBar>
    </>
  );
}
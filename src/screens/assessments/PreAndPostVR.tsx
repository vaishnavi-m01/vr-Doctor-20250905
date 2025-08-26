import React, { useState, useMemo } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import FormCard from '@components/FormCard';
import { Field } from '@components/Field';
import Segmented from '@components/Segmented';
import BottomBar from '@components/BottomBar';
import { Btn } from '@components/Button';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../Navigation/types';

export default function PreAndPostVR() {
  const [preHead, setPreHead] = useState('');
  const [preDiz, setPreDiz] = useState('');
  const [preBlur, setPreBlur] = useState('');
  const [preVert, setPreVert] = useState('');
  const [preGood, setPreGood] = useState('');

  const [postGood, setPostGood] = useState('');
  const [postDisc, setPostDisc] = useState('');
  const [postHelp, setPostHelp] = useState('');
  const [postLike, setPostLike] = useState('');

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'PreAndPostVR'>>();
  const { patientId } = route.params as { patientId: number };

  const delta = useMemo(() => (postGood === 'Yes' ? 1 : 0) - (preGood === 'Yes' ? 1 : 0), [preGood, postGood]);
  const flag = (preHead === 'Yes') || (preDiz === 'Yes') || (preBlur === 'Yes') || (preVert === 'Yes') || (postDisc === 'Yes');

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

      <ScrollView className="px-4 pt-4 bg-bg pb-[70px]">
        <FormCard icon="I" title="Pre & Post VR">
          <View className="flex-row gap-3">
            <View className="flex-1"><Field label="Participant ID" placeholder={`Participant ID: ${patientId}`} /></View>
            <View className="flex-1"><Field label="Date" placeholder="YYYY-MM-DD" /></View>
          </View>
        </FormCard>

        <FormCard icon="A" title="Pre Virtual Reality Questions">
          {[
            ['Headache & Aura', preHead, setPreHead],
            ['Dizziness', preDiz, setPreDiz],
            ['Blurred Vision', preBlur, setPreBlur],
            ['Vertigo', preVert, setPreVert],
            ['Do you feel good?', preGood, setPreGood],
          ].map(([label, val, setter]: [string, string, (value: string) => void]) => (
            <View key={String(label)} className="mb-3">
              <Text className="text-xs text-[#4b5f5a] mb-2">{label}</Text>
              <View className="flex-row gap-2">
                {/* Yes Button */}
                <Pressable 
                  onPress={() => setter('Yes')}
                  className={`flex-1 flex-row items-center justify-center rounded-full py-3 px-2 ${
                    val === 'Yes' 
                      ? 'bg-[#4FC264]' 
                      : 'bg-[#EBF6D6]'
                  }`}
                >
                  <Text className={`text-lg mr-1 ${
                    val === 'Yes' ? 'text-white' : 'text-[#2c4a43]'
                  }`}>
                    ✅
                  </Text>
                  <Text className={`font-medium text-xs ${
                    val === 'Yes' ? 'text-white' : 'text-[#2c4a43]'
                  }`}>
                    Yes
                  </Text>
                </Pressable>

                {/* No Button */}
                <Pressable 
                  onPress={() => setter('No')}
                  className={`flex-1 flex-row items-center justify-center rounded-full py-3 px-2 ${
                    val === 'No' 
                      ? 'bg-[#4FC264]' 
                      : 'bg-[#EBF6D6]'
                  }`}
                >
                  <Text className={`text-lg mr-1 ${
                    val === 'No' ? 'text-white' : 'text-[#2c4a43]'
                  }`}>
                    ❌
                  </Text>
                  <Text className={`font-medium text-xs ${
                    val === 'No' ? 'text-white' : 'text-[#2c4a43]'
                  }`}>
                    No
                  </Text>
                </Pressable>
              </View>
              {val === 'Yes' && label !== 'Do you feel good?' && (
                <View className="mt-3">
                  <Field label="Notes (optional)" placeholder="Add details…" />
                </View>
              )}
            </View>
          ))}
        </FormCard>

        <FormCard icon="B" title="Post Virtual Reality Questions">
          {[
            ['Do you feel good?', postGood, setPostGood],
            ['Any discomfort?', postDisc, setPostDisc],
            ['Helped you relax / feel good?', postHelp, setPostHelp],
            ['Like audio & visual content?', postLike, setPostLike],
          ].map(([label, val, setter]: [string, string, (value: string) => void]) => (
            <View key={String(label)} className="mb-3">
              <Text className="text-xs text-[#4b5f5a] mb-2">{label}</Text>
              <View className="flex-row gap-2">
                {/* Yes Button */}
                <Pressable 
                  onPress={() => setter('Yes')}
                  className={`flex-1 flex-row items-center justify-center rounded-full py-3 px-2 ${
                    val === 'Yes' 
                      ? 'bg-[#4FC264]' 
                      : 'bg-[#EBF6D6]'
                  }`}
                >
                  <Text className={`text-lg mr-1 ${
                    val === 'Yes' ? 'text-white' : 'text-[#2c4a43]'
                  }`}>
                    ✅
                  </Text>
                  <Text className={`font-medium text-xs ${
                    val === 'Yes' ? 'text-white' : 'text-[#2c4a43]'
                  }`}>
                    Yes
                  </Text>
                </Pressable>

                {/* No Button */}
                <Pressable 
                  onPress={() => setter('No')}
                  className={`flex-1 flex-row items-center justify-center rounded-full py-3 px-2 ${
                    val === 'No' 
                      ? 'bg-[#4FC264]' 
                      : 'bg-[#EBF6D6]'
                  }`}
                >
                  <Text className={`text-lg mr-1 ${
                    val === 'No' ? 'text-white' : 'text-[#2c4a43]'
                  }`}>
                    ❌
                  </Text>
                  <Text className={`font-medium text-xs ${
                    val === 'No' ? 'text-white' : 'text-[#2c4a43]'
                  }`}>
                    No
                  </Text>
                </Pressable>
              </View>
              {val === 'No' && label !== 'Any discomfort?' && (
                <View className="mt-3">
                  <Field label="Please specify" placeholder="e.g., audio low, visuals blurry…" />
                </View>
              )}
              {label === 'Any discomfort?' && val === 'Yes' && (
                <View className="mt-3">
                  <Field label="Please describe" placeholder="Dizziness, nausea, etc." />
                </View>
              )}
            </View>
          ))}
        </FormCard>
      </ScrollView>

      <BottomBar>
        <Text className="px-3 py-2 rounded-xl bg-[#0b362c] text-white font-bold">Mood Δ: {delta > 0 ? '+1' : delta < 0 ? '-1' : '0'}</Text>
        {flag && <Text className="px-3 py-2 rounded-xl bg-[#0b362c] text-white font-bold">⚠︎ Review symptoms</Text>}
        <Btn variant="light" onPress={() => { }}>Validate</Btn>
        <Btn onPress={() => { navigation.goBack() }}>Save</Btn>
      </BottomBar>

    </>
  );
}




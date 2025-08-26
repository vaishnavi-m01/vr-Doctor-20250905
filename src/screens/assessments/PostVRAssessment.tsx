import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import FormCard from '@components/FormCard';
import { Field } from '@components/Field';
import Segmented from '@components/Segmented';
import PillGroup from '@components/PillGroup';
import BottomBar from '@components/BottomBar';
import { Btn } from '@components/Button';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../Navigation/types';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function PostVRAssessment() {
  const [adjust, setAdjust] = useState('');
  const [av, setAv] = useState('');
  const [techIssue, setTechIssue] = useState('');
  const [discomfort, setDiscomfort] = useState('');
  const [complete, setComplete] = useState('');
  const [duration, setDuration] = useState('');
  const [relaxation, setRelaxation] = useState<string>('');
  const [audioVisual, setAudioVisual] = useState<string>('');
  const [uxTechIssue, setUxTechIssue] = useState('');
  const [recommend, setRecommend] = useState('');
  const [usedApp, setUsedApp] = useState('');
  const [uxDuration, setUxDuration] = useState('');

  // New state variables for previously hardcoded values
  const [participantId, setParticipantId] = useState('');
  const [age, setAge] = useState('');
  const [date, setDate] = useState('');
  const [easeOfUse, setEaseOfUse] = useState<number | undefined>();
  const [deviceComfort, setDeviceComfort] = useState<number | undefined>();
  const [adjustDescription, setAdjustDescription] = useState('');
  const [avIssues, setAvIssues] = useState('');
  const [techIssueDescription, setTechIssueDescription] = useState('');
  const [deviceSuggestions, setDeviceSuggestions] = useState('');
  const [additionalComments, setAdditionalComments] = useState('');
  const [discomfortDescription, setDiscomfortDescription] = useState('');
  const [durationPreference, setDurationPreference] = useState('');
  const [favoriteAspects, setFavoriteAspects] = useState('');
  const [uxTechDescription, setUxTechDescription] = useState('');
  const [appExperience, setAppExperience] = useState('');
  const [additionalSuggestions, setAdditionalSuggestions] = useState('');

  const route = useRoute<RouteProp<RootStackParamList, 'PostVRAssessment'>>();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { patientId } = route.params;
  console.log("participantId", patientId)

  const handleSave = async () => {
    const today = new Date().toISOString().split('T')[0];
    await AsyncStorage.setItem(`postvr-${patientId}-${today}`, 'done');
    navigation.goBack();
  };

  return (
    <>
      <View className="px-4 pt-4">
        <View className="bg-white border-b border-gray-200 rounded-xl p-4 flex-row justify-between items-center shadow-sm">
          <Text className="text-lg font-bold text-green-600">
            Participant ID: {participantId || patientId}
          </Text>

          <Text className="text-base font-semibold text-gray-700">
            Age: {age || 'Not specified'}
          </Text>
        </View>
      </View>
      <ScrollView className="flex-1 p-4 bg-bg pb-[50px]">
        <FormCard icon="J" title="Post‑VR Assessment & Questionnaires">
          <View className="flex-row gap-3">
            <View className="flex-1">
              <Field 
                label="Participant ID" 
                placeholder="e.g., PT-0234"
                value={participantId}
                onChangeText={setParticipantId}
              />
            </View>
            <View className="flex-1">
              <Field 
                label="Date" 
                placeholder="YYYY-MM-DD"
                value={date}
                onChangeText={setDate}
              />
            </View>
          </View>
        </FormCard>

        <FormCard icon="A" title="Device & Content Feedback">
          <View className="flex-row gap-3">
            <View className="flex-1">
              <Text className="text-xs text-[#4b5f5a] mb-2">Ease-of-Use (1–5)</Text>
              <View className="bg-white border border-[#e6eeeb] rounded-xl shadow-sm overflow-hidden">
                <View className="flex-row">
                  {[1, 2, 3, 4, 5].map((value, index) => (
                    <React.Fragment key={value}>
                      <Pressable
                        onPress={() => setEaseOfUse(value)}
                        className={`flex-1 py-3 items-center justify-center ${
                          easeOfUse === value ? 'bg-[#4FC264]' : 'bg-white'
                        }`}
                      >
                        <Text className={`font-medium text-sm ${
                          easeOfUse === value ? 'text-white' : 'text-[#4b5f5a]'
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
            </View>
            <View className="flex-1">
              <Text className="text-xs text-[#4b5f5a] mb-2">Device Comfort (1–5)</Text>
              <View className="bg-white border border-[#e6eeeb] rounded-xl shadow-sm overflow-hidden">
                <View className="flex-row">
                  {[1, 2, 3, 4, 5].map((value, index) => (
                    <React.Fragment key={value}>
                      <Pressable
                        onPress={() => setDeviceComfort(value)}
                        className={`flex-1 py-3 items-center justify-center ${
                          deviceComfort === value ? 'bg-[#4FC264]' : 'bg-white'
                        }`}
                      >
                        <Text className={`font-medium text-sm ${
                          deviceComfort === value ? 'text-white' : 'text-[#4b5f5a]'
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
            </View>
          </View>

          <View className="mt-3">
            <Text className="text-xs text-[#4b5f5a] mb-2">Physical adjustments needed mid‑session?</Text>
            <View className="flex-row gap-2">
              {/* Yes Button */}
              <Pressable 
                onPress={() => setAdjust('Yes')}
                className={`flex-1 flex-row items-center justify-center rounded-full py-3 px-2 ${
                  adjust === 'Yes' 
                    ? 'bg-[#4FC264]' 
                    : 'bg-[#EBF6D6]'
                }`}
              >
                <Text className={`text-lg mr-1 ${
                  adjust === 'Yes' ? 'text-white' : 'text-[#2c4a43]'
                }`}>
                  ✅
                </Text>
                <Text className={`font-medium text-xs ${
                  adjust === 'Yes' ? 'text-white' : 'text-[#2c4a43]'
                }`}>
                  Yes
                </Text>
              </Pressable>

              {/* No Button */}
              <Pressable 
                onPress={() => setAdjust('No')}
                className={`flex-1 flex-row items-center justify-center rounded-full py-3 px-2 ${
                  adjust === 'No' 
                    ? 'bg-[#4FC264]' 
                    : 'bg-[#EBF6D6]'
                }`}
              >
                <Text className={`text-lg mr-1 ${
                  adjust === 'No' ? 'text-white' : 'text-[#2c4a43]'
                }`}>
                  ❌
                </Text>
                <Text className={`font-medium text-xs ${
                  adjust === 'No' ? 'text-white' : 'text-[#2c4a43]'
                }`}>
                  No
                </Text>
              </Pressable>
            </View>
            {adjust === 'Yes' && (
              <View className="mt-3">
                <Field 
                  label="Please describe" 
                  placeholder="Describe adjustments…"
                  value={adjustDescription}
                  onChangeText={setAdjustDescription}
                />
              </View>
            )}
          </View>

          <View className="mt-3">
            <Text className="text-xs text-[#4b5f5a] mb-2">Audio/Visual quality satisfactory?</Text>
            <View className="flex-row gap-2">
              {/* Yes Button */}
              <Pressable 
                onPress={() => setAv('Yes')}
                className={`flex-1 flex-row items-center justify-center rounded-full py-3 px-2 ${
                  av === 'Yes' 
                    ? 'bg-[#4FC264]' 
                    : 'bg-[#EBF6D6]'
                }`}
              >
                <Text className={`text-lg mr-1 ${
                  av === 'Yes' ? 'text-white' : 'text-[#2c4a43]'
                }`}>
                  ✅
                </Text>
                <Text className={`font-medium text-xs ${
                  av === 'Yes' ? 'text-white' : 'text-[#2c4a43]'
                }`}>
                  Yes
                </Text>
              </Pressable>

              {/* No Button */}
              <Pressable 
                onPress={() => setAv('No')}
                className={`flex-1 flex-row items-center justify-center rounded-full py-3 px-2 ${
                  av === 'No' 
                    ? 'bg-[#4FC264]' 
                    : 'bg-[#EBF6D6]'
                }`}
              >
                <Text className={`text-lg mr-1 ${
                  av === 'No' ? 'text-white' : 'text-[#2c4a43]'
                }`}>
                  ❌
                </Text>
                <Text className={`font-medium text-xs ${
                  av === 'No' ? 'text-white' : 'text-[#2c4a43]'
                }`}>
                  No
                </Text>
              </Pressable>
            </View>
            {av === 'No' && (
              <View className="mt-3">
                <Field 
                  label="Specify issues" 
                  placeholder="Audio lag, low volume, blur, etc."
                  value={avIssues}
                  onChangeText={setAvIssues}
                />
              </View>
            )}
          </View>

          <View className="mt-3">
            <Text className="text-xs text-[#4b5f5a] mb-2">Technical issues or physical discomfort experienced?</Text>
            <View className="flex-row gap-2">
              {/* Yes Button */}
              <Pressable 
                onPress={() => setTechIssue('Yes')}
                className={`flex-1 flex-row items-center justify-center rounded-full py-3 px-2 ${
                  techIssue === 'Yes' 
                    ? 'bg-[#4FC264]' 
                    : 'bg-[#EBF6D6]'
                }`}
              >
                <Text className={`text-lg mr-1 ${
                  techIssue === 'Yes' ? 'text-white' : 'text-[#2c4a43]'
                }`}>
                  ✅
                </Text>
                <Text className={`text-medium text-xs ${
                  techIssue === 'Yes' ? 'text-white' : 'text-[#2c4a43]'
                }`}>
                  Yes
                </Text>
              </Pressable>

              {/* No Button */}
              <Pressable 
                onPress={() => setTechIssue('No')}
                className={`flex-1 flex-row items-center justify-center rounded-full py-3 px-2 ${
                  techIssue === 'No' 
                    ? 'bg-[#4FC264]' 
                    : 'bg-[#EBF6D6]'
                }`}
              >
                <Text className={`text-lg mr-1 ${
                  techIssue === 'No' ? 'text-white' : 'text-[#2c4a43]'
                }`}>
                  ❌
                </Text>
                <Text className={`text-medium text-xs ${
                  techIssue === 'No' ? 'text-white' : 'text-[#2c4a43]'
                }`}>
                  No
                </Text>
              </Pressable>
            </View>
            {techIssue === 'Yes' && (
              <View className="mt-3">
                <Field 
                  label="Detail the issue" 
                  placeholder="Connectivity, app crash, etc."
                  value={techIssueDescription}
                  onChangeText={setTechIssueDescription}
                />
              </View>
            )}
          </View>

          <View className="mt-3">
            <Field 
              label="Suggestions to enhance device or content" 
              placeholder="Your suggestions…"
              value={deviceSuggestions}
              onChangeText={setDeviceSuggestions}
            />
          </View>
          <View className="mt-3">
            <Field 
              label="Additional Comments / Observations" 
              placeholder="Any other notes…"
              value={additionalComments}
              onChangeText={setAdditionalComments}
              multiline
            />
          </View>
        </FormCard>

        <FormCard icon="B" title="VR Experience">
          {/* Question 1 */}
          <View className="mt-1">
            <Text className="text-xs text-[#4b5f5a] mb-2">Do you feel good?</Text>
            <View className="bg-white border border-[#e6eeeb] rounded-xl shadow-sm overflow-hidden">
              <View className="flex-row">
                {['Very Comfortable', 'Somewhat Comfortable', 'Neutral', 'Uncomfortable', 'Very Uncomfortable'].map((value, index) => (
                  <React.Fragment key={value}>
                    <Pressable
                      onPress={() => setRelaxation(value)}
                      className={`flex-1 py-3 items-center justify-center ${
                        relaxation === value ? 'bg-[#4FC264]' : 'bg-white'
                      }`}
                    >
                      <Text className={`font-medium text-xs text-center ${
                        relaxation === value ? 'text-white' : 'text-[#4b5f5a]'
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
          </View>

          {/* Question 2 */}
          <View className="mt-3">
            <Text className="text-xs text-[#4b5f5a] mb-2">Do you experience any discomfort?</Text>
            <View className="flex-row gap-2">
              {/* Yes Button */}
              <Pressable 
                onPress={() => setDiscomfort('Yes')}
                className={`flex-1 flex-row items-center justify-center rounded-full py-3 px-2 ${
                  discomfort === 'Yes' 
                    ? 'bg-[#4FC264]' 
                    : 'bg-[#EBF6D6]'
                }`}
              >
                <Text className={`text-lg mr-1 ${
                  discomfort === 'Yes' ? 'text-white' : 'text-[#2c4a43]'
                }`}>
                  ✅
                </Text>
                <Text className={`font-medium text-xs ${
                  discomfort === 'Yes' ? 'text-white' : 'text-[#2c4a43]'
                }`}>
                  Yes
                </Text>
              </Pressable>

              {/* No Button */}
              <Pressable 
                onPress={() => setDiscomfort('No')}
                className={`flex-1 flex-row items-center justify-center rounded-full py-3 px-2 ${
                  discomfort === 'No' 
                    ? 'bg-[#4FC264]' 
                    : 'bg-[#EBF6D6]'
                }`}
              >
                <Text className={`text-lg mr-1 ${
                  discomfort === 'No' ? 'text-white' : 'text-[#2c4a43]'
                }`}>
                  ❌
                </Text>
                <Text className={`font-medium text-xs ${
                  discomfort === 'No' ? 'text-white' : 'text-[#2c4a43]'
                }`}>
                  No
                </Text>
              </Pressable>
            </View>
            {discomfort === 'Yes' && (
              <View className="mt-3">
                <Field 
                  label="Describe discomfort" 
                  placeholder="Describe discomfort…"
                  value={discomfortDescription}
                  onChangeText={setDiscomfortDescription}
                />
              </View>
            )}
          </View>

          {/* Question 3 */}
          <View className="mt-3">
            <Text className="text-xs text-[#4b5f5a] mb-2">Did the VR experience help you to relax/feel good?</Text>
            <View className="bg-white border border-[#e6eeeb] rounded-xl shadow-sm overflow-hidden">
              <View className="flex-row">
                {['Very Much', 'Somewhat', 'Neutral', 'Not Much', 'Not At All'].map((value, index) => (
                  <React.Fragment key={value}>
                    <Pressable
                      onPress={() => setRelaxation(value)}
                      className={`flex-1 py-3 items-center justify-center ${
                        relaxation === value ? 'bg-[#4FC264]' : 'bg-white'
                      }`}
                    >
                      <Text className={`font-medium text-xs text-center ${
                        relaxation === value ? 'text-white' : 'text-[#4b5f5a]'
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
          </View>

          {/* Question 4 */}
          <View className="mt-3">
            <Text className="text-xs text-[#4b5f5a] mb-2">Do you like the VR experience's audio and visual content?</Text>
            <View className="bg-white border border-[#e6eeeb] rounded-xl shadow-sm overflow-hidden">
              <View className="flex-row">
                {['Excellent', 'Good', 'Average', 'Poor'].map((value, index) => (
                  <React.Fragment key={value}>
                    <Pressable
                      onPress={() => setAudioVisual(value)}
                      className={`flex-1 py-3 items-center justify-center ${
                        audioVisual === value ? 'bg-[#4FC264]' : 'bg-white'
                      }`}
                    >
                      <Text className={`font-medium text-xs text-center ${
                        audioVisual === value ? 'text-white' : 'text-[#4b5f5a]'
                      }`}>
                        {value}
                      </Text>
                    </Pressable>
                    {index < 3 && (
                      <View className="w-px bg-[#e6eeeb]" />
                    )}
                  </React.Fragment>
                ))}
              </View>
            </View>
          </View>

          {/* Existing questions */}
          <View className="flex-row gap-3 mt-3">
            <View className="flex-1">
              <Text className="text-xs text-[#4b5f5a] mb-2">Completed full VR session as prescribed?</Text>
              <View className="flex-row gap-2">
                {/* Yes Button */}
                <Pressable 
                  onPress={() => setComplete('Yes')}
                  className={`flex-1 flex-row items-center justify-center rounded-full py-3 px-2 ${
                    complete === 'Yes' 
                      ? 'bg-[#4FC264]' 
                      : 'bg-[#EBF6D6]'
                  }`}
                >
                  <Text className={`text-lg mr-1 ${
                    complete === 'Yes' ? 'text-white' : 'text-[#2c4a43]'
                  }`}>
                    ✅
                  </Text>
                  <Text className={`font-medium text-xs ${
                    complete === 'Yes' ? 'text-white' : 'text-[#2c4a43]'
                  }`}>
                    Yes
                  </Text>
                </Pressable>

                {/* No Button */}
                <Pressable 
                  onPress={() => setComplete('No')}
                  className={`flex-1 flex-row items-center justify-center rounded-full py-3 px-2 ${
                    complete === 'No' 
                      ? 'bg-[#4FC264]' 
                      : 'bg-[#EBF6D6]'
                  }`}
                >
                  <Text className={`text-lg mr-1 ${
                    complete === 'No' ? 'text-white' : 'text-[#2c4a43]'
                  }`}>
                    ❌
                  </Text>
                  <Text className={`font-medium text-xs ${
                    complete === 'No' ? 'text-white' : 'text-[#2c4a43]'
                  }`}>
                    No
                  </Text>
                </Pressable>
              </View>
            </View>
            {complete === 'No' && (
              <View className="flex-1">
                <Field 
                  label="Reason" 
                  placeholder="Reason for not completing…"
                  value={additionalComments}
                  onChangeText={setAdditionalComments}
                />
              </View>
            )}
          </View>

          <View className="mt-3">
            <Text className="text-xs text-[#4b5f5a] mb-2">Session duration</Text>
            <View className="bg-white border border-[#e6eeeb] rounded-xl shadow-sm overflow-hidden">
              <View className="flex-row">
                {['Too Long', 'Just Right', 'Too Short'].map((value, index) => (
                  <React.Fragment key={value}>
                    <Pressable
                      onPress={() => setDuration(value)}
                      className={`flex-1 py-3 items-center justify-center ${
                        duration === value ? 'bg-[#4FC264]' : 'bg-white'
                      }`}
                    >
                      <Text className={`font-medium text-xs text-center ${
                        duration === value ? 'text-white' : 'text-[#4b5f5a]'
                      }`}>
                        {value}
                      </Text>
                    </Pressable>
                    {index < 2 && (
                      <View className="w-px bg-[#e6eeeb]" />
                    )}
                  </React.Fragment>
                ))}
              </View>
            </View>
            {duration !== 'Just Right' && (
              <View className="mt-3">
                <Field 
                  label="Preferred duration (minutes)" 
                  placeholder="e.g., 15" 
                  keyboardType="number-pad"
                  value={durationPreference}
                  onChangeText={setDurationPreference}
                />
              </View>
            )}
          </View>
        </FormCard>

        <FormCard icon="C" title="User Experience & Suggestions">
          <View className="mt-1">
            <Text className="text-xs text-[#4b5f5a] mb-2">Was session duration appropriate?</Text>
            <View className="bg-white border border-[#e6eeeb] rounded-xl shadow-sm overflow-hidden">
              <View className="flex-row">
                {['Too Long', 'Just Right', 'Too Short'].map((value, index) => (
                  <React.Fragment key={value}>
                    <Pressable
                      onPress={() => setUxDuration(value)}
                      className={`flex-1 py-3 items-center justify-center ${
                        uxDuration === value ? 'bg-[#4FC264]' : 'bg-white'
                      }`}
                    >
                      <Text className={`font-medium text-xs text-center ${
                        uxDuration === value ? 'text-white' : 'text-[#4b5f5a]'
                      }`}>
                        {value}
                      </Text>
                    </Pressable>
                    {index < 2 && (
                      <View className="w-px bg-[#e6eeeb]" />
                    )}
                  </React.Fragment>
                ))}
              </View>
            </View>
            {uxDuration !== 'Just Right' && (
              <View className="mt-3">
                <Field 
                  label="Preferred duration (minutes)" 
                  placeholder="e.g., 15" 
                  keyboardType="number-pad"
                  value={durationPreference}
                  onChangeText={setDurationPreference}
                />
              </View>
            )}
          </View>

          <View className="mt-3">
            <Field 
              label="What did you like the most?" 
              placeholder="Your favorite aspects…" 
              multiline 
              numberOfLines={4}
              value={favoriteAspects}
              onChangeText={setFavoriteAspects}
            />
          </View>

          <View className="mt-3">
            <Text className="text-xs text-[#4b5f5a] mb-2">Technical issues with VR device or app?</Text>
            <View className="flex-row gap-2">
              {/* Yes Button */}
              <Pressable 
                onPress={() => setUxTechIssue('Yes')}
                className={`flex-1 flex-row items-center justify-center rounded-full py-3 px-2 ${
                  uxTechIssue === 'Yes' 
                    ? 'bg-[#4FC264]' 
                    : 'bg-[#EBF6D6]'
                }`}
              >
                <Text className={`text-lg mr-1 ${
                  uxTechIssue === 'Yes' ? 'text-white' : 'text-[#2c4a43]'
                }`}>
                  ✅
                </Text>
                <Text className={`font-medium text-xs ${
                  uxTechIssue === 'Yes' ? 'text-white' : 'text-[#2c4a43]'
                }`}>
                  Yes
                </Text>
              </Pressable>

              {/* No Button */}
              <Pressable 
                onPress={() => setUxTechIssue('No')}
                className={`flex-1 flex-row items-center justify-center rounded-full py-3 px-2 ${
                  uxTechIssue === 'No' 
                    ? 'bg-[#4FC264]' 
                    : 'bg-[#EBF6D6]'
                }`}
              >
                <Text className={`text-lg mr-1 ${
                  uxTechIssue === 'No' ? 'text-white' : 'text-[#2c4a43]'
                }`}>
                  ❌
                </Text>
                <Text className={`font-medium text-xs ${
                  uxTechIssue === 'No' ? 'text-white' : 'text-[#2c4a43]'
                }`}>
                  No
                </Text>
              </Pressable>
            </View>
            {uxTechIssue === 'Yes' && (
              <View className="mt-3">
                <Field 
                  label="If yes, please describe" 
                  placeholder="Connectivity, app crash, etc." 
                  multiline 
                  maxLength={4}
                  value={uxTechDescription}
                  onChangeText={setUxTechDescription}
                />
              </View>
            )}
          </View>

          <View className="mt-3">
            <Text className="text-xs text-[#4b5f5a] mb-2">Would you recommend VR-guided imagery to other Participants?</Text>
            <View className="flex-row gap-2">
              {/* Yes Button */}
              <Pressable 
                onPress={() => setRecommend('Yes')}
                className={`flex-1 flex-row items-center justify-center rounded-full py-3 px-2 ${
                  recommend === 'Yes' 
                    ? 'bg-[#4FC264]' 
                    : 'bg-[#EBF6D6]'
                }`}
              >
                <Text className={`text-lg mr-1 ${
                  recommend === 'Yes' ? 'text-white' : 'text-[#2c4a43]'
                }`}>
                  ✅
                </Text>
                <Text className={`font-medium text-xs ${
                  recommend === 'Yes' ? 'text-white' : 'text-[#2c4a43]'
                }`}>
                  Yes
                </Text>
              </Pressable>

              {/* No Button */}
              <Pressable 
                onPress={() => setRecommend('No')}
                className={`flex-1 flex-row items-center justify-center rounded-full py-3 px-2 ${
                  recommend === 'No' 
                    ? 'bg-[#4FC264]' 
                    : 'bg-[#EBF6D6]'
                }`}
              >
                <Text className={`text-lg mr-1 ${
                  recommend === 'No' ? 'text-white' : 'text-[#2c4a43]'
                }`}>
                  ❌
                </Text>
                <Text className={`font-medium text-xs ${
                  recommend === 'No' ? 'text-white' : 'text-[#2c4a43]'
                }`}>
                  No
                </Text>
              </Pressable>
            </View>
          </View>

          <View className="mt-3">
            <Text className="text-xs text-[#4b5f5a] mb-2">Used phone app for guided imagery at home?</Text>
            <View className="flex-row gap-2">
              {/* Yes Button */}
              <Pressable 
                onPress={() => setUsedApp('Yes')}
                className={`flex-1 flex-row items-center justify-center rounded-full py-3 px-2 ${
                  usedApp === 'Yes' 
                    ? 'bg-[#4FC264]' 
                    : 'bg-[#EBF6D6]'
                }`}
              >
                <Text className={`text-lg mr-1 ${
                  usedApp === 'Yes' ? 'text-white' : 'text-[#2c4a43]'
                }`}>
                  ✅
                </Text>
                <Text className={`font-medium text-xs ${
                  usedApp === 'Yes' ? 'text-white' : 'text-[#2c4a43]'
                }`}>
                  Yes
                </Text>
              </Pressable>

              {/* No Button */}
              <Pressable 
                onPress={() => setUsedApp('No')}
                className={`flex-1 flex-row items-center justify-center rounded-full py-3 px-2 ${
                  usedApp === 'No' 
                    ? 'bg-[#4FC264]' 
                    : 'bg-[#EBF6D6]'
                }`}
              >
                <Text className={`text-lg mr-1 ${
                  usedApp === 'No' ? 'text-white' : 'text-[#2c4a43]'
                }`}>
                  ❌
                </Text>
                <Text className={`font-medium text-xs ${
                  usedApp === 'No' ? 'text-white' : 'text-[#2c4a43]'
                }`}>
                  No
                </Text>
              </Pressable>
            </View>
            {usedApp === 'Yes' && (
              <View className="mt-3">
                <Field 
                  label="Describe overall experience" 
                  placeholder="App ease of use, content, reminders…"
                  value={appExperience}
                  onChangeText={setAppExperience}
                />
              </View>
            )}
          </View>

          <View className="mt-3">
            <Field
              label="Any additional comments or suggestions?"
              placeholder="Anything else to improve your VR experience…"
              multiline
              numberOfLines={4}
              value={additionalSuggestions}
              onChangeText={setAdditionalSuggestions}
            />
          </View>
        </FormCard>
      </ScrollView>

      <BottomBar>
        <Btn variant="light" onPress={() => { }}>Validate</Btn>
        <Btn onPress={handleSave}>Save Assessment</Btn>
      </BottomBar>
    </>
  );
}

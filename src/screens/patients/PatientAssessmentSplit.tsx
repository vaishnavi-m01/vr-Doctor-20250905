import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, ScrollView, Pressable, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import ListItem, { Patient } from '../../components/ListItem';
import TabPills from '../../components/TabPills';
import ParticipantInfo from './components/participant_info';
import AssessmentTab from './components/assesment/AssessmentTab';
import VRTab from './components/VRTab';
import OrientationTab from './components/OrientationTab'; 
import Dashboard from './components/Dashboard';
import { RootStackParamList } from '../../Navigation/types';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function ParticipantAssessmentSplit() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [participants, setParticipants] = useState<Patient[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selId, setSelId] = useState<number | null>(null);
  const [tab, setTab] = useState('assessment');

  useEffect(() => {
    fetchParticipants();
  }, []);

  const fetchParticipants = async () => {
    try {
      const response = await fetch('http://18.60.122.213:8060/api/GetParticipantsPaginationFilterSearch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          PageNumber: 1,
          RecordsPerPage: 10,
          Search: '',
          Filters: [],
        }),
      });

      const json = await response.json();

      if (json.ResponseData) {
        const parsed: Patient[] = json.ResponseData.map((item: any, index: number) => ({
          id: index + 1, // You can replace this with a unique identifier if needed
          name: item.ParticipantId,
          age: item.Age,
          status: item.CriteriaStatus?.toLowerCase() || 'pending',
          gender: item.Gender === 'Male' || item.Gender === 'Female' ? item.Gender : 'Unknown',
          cancerType: item.CancerDiagnosis || 'N/A',
          stage: item.StageOfCancer || 'N/A',
          // weightKg: 60, // Placeholder
        }));

        setParticipants(parsed);
        setSelId(parsed[0]?.id ?? null);
      }
    } catch (error) {
      console.error('Failed to fetch participants:', error);
    } finally {
      setLoading(false);
    }
  };

  const sel = participants.find(p => p.id === selId);

  const renderTabContent = () => {
    switch (tab) {
      case 'dash':
        return <Dashboard patientId={sel?.id || 0} />;
      case 'info':
        return <ParticipantInfo patientId={sel?.id || 0} />;
      case 'orie':
        return <OrientationTab patientId={sel?.id || 0} />;
      case 'assessment':
        return <AssessmentTab patientId={sel?.id || 0} />;
      case ' VR':
        return <VRTab patientId={sel?.id || 0} />;
      case 'notification':
        return null;
      default:
        return <AssessmentTab patientId={sel?.id || 0} />;
    }
  };

  return (
    <View className="flex-1 bg-white">
      <View className="flex-row flex-1">
        {/* Left Pane - Participant List */}
        <View className="w-80 border-r border-[#e6eeeb] bg-white">
          <View className="px-4 pt-4 pb-2">
            <View className="flex-row items-center justify-between mb-2">
              <View className="flex-row items-center gap-2">
                <Text className="font-extrabold">Participant List</Text>
                <Text className="text-[#21c57e]">●</Text>
              </View>
              <Text className="text-xs text-[#6b7a77]">
                List of Participants ({participants.length})
              </Text>
            </View>

            <View className="flex-row items-center space-x-2">
              {/* Search Bar */}
              <View className="flex-row items-center bg-white border border-[#e6eeeb] rounded-2xl px-3 py-2 flex-1">
                <TextInput
                  placeholder="Search Participant"
                  className="flex-1"
                  placeholderTextColor="#999"
                  style={{ fontSize: 12 }}
                />
                <EvilIcons name="search" size={24} color="#21c57e" />
              </View>

              {/* Filter Icon */}
              <TouchableOpacity>
                <MaterialCommunityIcons name="tune" size={24} color="black" />
              </TouchableOpacity>
            </View>

            {/* Add Participant Button */}
            <Pressable
              onPress={() => navigation.navigate('SocioDemographic', { patientId: Date.now() })}
              className="mt-3 bg-[#0ea06c] rounded-xl py-3 px-4 items-center"
            >
              <Text className="text-white font-semibold text-base">➕ Add Participant</Text>
            </Pressable>
          </View>

          <ScrollView className="flex-1 p-3">
            {loading ? (
              <ActivityIndicator color="#0ea06c" />
            ) : (
              participants.map(p => (
                <ListItem key={p.id} item={p} selected={p.id === selId} onPress={() => setSelId(p.id)} />
              ))
            )}
          </ScrollView>
        </View>

        {/* Right Pane - Participant Details */}
        <View className="flex-1">
          <View className="px-6 pt-4 pb-2 flex-row items-center justify-between">
            <View>
              <Text className="font-extrabold">{sel?.name ?? 'Client'}</Text>
              <Text className="text-xs text-[#6b7a77]">Participant setup</Text>
            </View>
            <View className="w-10 h-10 rounded-xl bg-white border border-[#e6eeeb] items-center justify-center">
              <Text>⋯</Text>
            </View>
          </View>

          <View className="px-6">
            <TabPills
              tabs={[
                { key: 'dash', label: 'Dashboard' },
                { key: 'info', label: 'Participant Register' },
                { key: 'orie', label: 'Orientation' },
                { key: 'assessment', label: 'Assessment' },
                { key: ' VR', label: ' VR Session' },
                { key: 'notification', label: 'Notification' },
              ]}
              active={tab}
              onChange={setTab}
            />
          </View>

          {renderTabContent()}
        </View>
      </View>   
    </View>
  );
}
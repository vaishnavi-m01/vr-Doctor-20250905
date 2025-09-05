import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Pressable, Alert, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import type { RootStackParamList } from '../../Navigation/types';
import Header from '../../components/Header';
import PatientCard from '../../components/PatientCard';
import { participantService, Participant } from '../../services/participantService';

type StudyGroupAssignmentRouteProp = RouteProp<RootStackParamList, 'StudyGroupAssignment'>;

export default function StudyGroupAssignment() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<StudyGroupAssignmentRouteProp>();
  const { patientId, age, studyId } = route.params;

  const [participants, setParticipants] = useState<Participant[]>([]);
  const [selectedParticipants, setSelectedParticipants] = useState<string[]>([]);
  const [targetGroup, setTargetGroup] = useState<'Control' | 'Study' | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch participants from API
  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('Fetching participants for studyId:', studyId?.toString() || 'CS-0001');
        
        // Add timeout to prevent infinite loading
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Request timeout')), 10000)
        );
        
        const apiPromise = participantService.getParticipantsPagination({
          page: 1,
          pageSize: 100, // Get all participants for this view
          filters: {
            studyId: studyId?.toString() || 'CS-0001'
          }
        });

        const response = await Promise.race([apiPromise, timeoutPromise]);

        console.log('API Response:', response);

        if (response.success && response.data) {
          console.log('Setting participants:', response.data.participants.length);
          setParticipants(response.data.participants);
        } else {
          console.log('API failed:', response);
          // Fallback to mock data for testing
          const mockParticipants: Participant[] = [
            {
              ParticipantId: 'PID-1',
              Age: 35,
              Gender: 'Female',
              CancerDiagnosis: 'Breast Cancer',
              StageOfCancer: 'Stage 2',
              GroupType: null,
              MRNumber: 'H-0001',
              PhoneNumber: '+912345234568',
              CriteriaStatus: 'Excluded',
              StudyId: 'CS-0001',
              Status: 1,
              CreatedDate: '2025-09-04T10:00:00.000Z',
              ModifiedDate: '2025-09-04T10:00:00.000Z',
              SortKey: 0
            },
            {
              ParticipantId: 'PID-2',
              Age: 42,
              Gender: 'Male',
              CancerDiagnosis: 'Lung Cancer',
              StageOfCancer: 'Stage 3',
              GroupType: 'Control',
              MRNumber: 'H-0002',
              PhoneNumber: '+912345234569',
              CriteriaStatus: 'Excluded',
              StudyId: 'CS-0001',
              Status: 1,
              CreatedDate: '2025-09-04T10:00:00.000Z',
              ModifiedDate: '2025-09-04T10:00:00.000Z',
              SortKey: 0
            },
            {
              ParticipantId: 'PID-3',
              Age: 28,
              Gender: 'Female',
              CancerDiagnosis: 'Ovarian Cancer',
              StageOfCancer: 'Stage 1',
              GroupType: 'Study',
              MRNumber: 'H-0003',
              PhoneNumber: '+912345234570',
              CriteriaStatus: 'Excluded',
              StudyId: 'CS-0001',
              Status: 1,
              CreatedDate: '2025-09-04T10:00:00.000Z',
              ModifiedDate: '2025-09-04T10:00:00.000Z',
              SortKey: 0
            }
          ];
          console.log('Using mock data:', mockParticipants.length);
          setParticipants(mockParticipants);
        }
      } catch (err) {
        console.error('Error fetching participants:', err);
        setError('Error loading participants: ' + (err instanceof Error ? err.message : 'Unknown error'));
      } finally {
        setLoading(false);
      }
    };

    fetchParticipants();
  }, [studyId]);

  const unassignedParticipants = participants.filter(p => !p.GroupType);
  const controlGroupParticipants = participants.filter(p => p.GroupType === 'Control');
  const studyGroupParticipants = participants.filter(p => p.GroupType === 'Study');

  const handleParticipantSelect = (participantId: string) => {
    setSelectedParticipants(prev => 
      prev.includes(participantId) 
        ? prev.filter(id => id !== participantId)
        : [...prev, participantId]
    );
  };

  const handleAssignGroup = async () => {
    if (selectedParticipants.length === 0) {
      Alert.alert('No Selection', 'Please select participants to assign to a group.');
      return;
    }
    if (!targetGroup) {
      Alert.alert('No Group Selected', 'Please select a target group (Control or Study).');
      return;
    }

    Alert.alert(
      'Confirm Assignment',
      `Assign ${selectedParticipants.length} participant(s) to ${targetGroup} Group?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Assign',
          onPress: async () => {
            try {
              setLoading(true);
              
              // Update each selected participant
              const updatePromises = selectedParticipants.map(participantId =>
                participantService.updateParticipant(participantId, {
                  GroupType: targetGroup
                })
              );

              await Promise.all(updatePromises);
              
              // Update local state
              setParticipants(prev => 
                prev.map(p => 
                  selectedParticipants.includes(p.ParticipantId)
                    ? { ...p, GroupType: targetGroup }
                    : p
                )
              );
              
              setSelectedParticipants([]);
              setTargetGroup(null);
              Alert.alert('Success', `Participants assigned to ${targetGroup} Group successfully!`);
            } catch (error) {
              console.error('Error updating participants:', error);
              Alert.alert('Error', 'Failed to assign participants. Please try again.');
            } finally {
              setLoading(false);
            }
          }
        }
      ]
    );
  };

  const renderParticipantList = (participantList: Participant[], title: string, groupColor: string) => (
    <View className="mb-6">
      <View className="flex-row items-center justify-between mb-3">
        <Text className="text-lg font-bold text-gray-800">{title}</Text>
        <Text className="text-sm text-gray-600">({participantList.length})</Text>
      </View>
      
      {participantList.length === 0 ? (
        <View className="bg-gray-50 rounded-xl p-6 items-center">
          <Text className="text-gray-500 text-center">No participants in this group</Text>
        </View>
      ) : (
        <View className="space-y-3">
          {participantList.map((participant) => (
            <Pressable
              key={participant.ParticipantId}
              onPress={() => handleParticipantSelect(participant.ParticipantId)}
              className={`bg-white border-2 rounded-xl p-4 ${
                selectedParticipants.includes(participant.ParticipantId)
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200'
              }`}
            >
              <View className="flex-row items-center justify-between">
                <View className="flex-1">
                  <Text className="font-semibold text-gray-800">
                    {participant.ParticipantId}
                  </Text>
                  <Text className="text-sm text-gray-600">
                    {participant.Age || 'N/A'} years • {participant.Gender || 'N/A'} • {participant.CancerDiagnosis || 'N/A'}
                  </Text>
                  <Text className="text-xs text-gray-500">
                    Stage: {participant.StageOfCancer || 'N/A'} • MR: {participant.MRNumber || 'N/A'}
                  </Text>
                </View>
                {selectedParticipants.includes(participant.ParticipantId) && (
                  <View className="w-6 h-6 rounded-full bg-blue-500 items-center justify-center">
                    <Text className="text-white text-xs">✓</Text>
                  </View>
                )}
              </View>
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );

  if (loading) {
    return (
      <View className="flex-1 bg-gray-50 justify-center items-center">
        <ActivityIndicator size="large" color="#0ea06c" />
        <Text className="text-gray-600 mt-4">Loading participants...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 bg-gray-50 justify-center items-center px-6">
        <Text className="text-red-500 text-center mb-4">{error}</Text>
        <Pressable
          onPress={() => {
            setError(null);
            setLoading(true);
            // Re-fetch participants
            participantService.getParticipantsPagination({
              page: 1,
              pageSize: 100,
              filters: { studyId: studyId?.toString() || 'CS-0001' }
            }).then(response => {
              if (response.success && response.data) {
                setParticipants(response.data.participants);
              }
            }).catch(() => {
              setError('Failed to load participants');
            }).finally(() => {
              setLoading(false);
            });
          }}
          className="bg-blue-500 px-6 py-3 rounded-xl"
        >
          <Text className="text-white font-semibold">Retry</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-50">
      <Header 
        title="Study Group Assignment" 
        onBack={() => navigation.goBack()}
      />
      
      <ScrollView className="flex-1 px-6 pb-6">
        {/* Assignment Controls */}
        <View className="bg-white rounded-xl p-4 mb-6 shadow-sm">
          <Text className="text-lg font-bold text-gray-800 mb-3">Assignment Controls</Text>
          
          <View className="flex-row space-x-3 mb-4">
            <Pressable
              onPress={() => setTargetGroup('Control')}
              className={`flex-1 py-3 px-4 rounded-xl border-2 ${
                targetGroup === 'Control'
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-300 bg-white'
              }`}
            >
              <Text className={`text-center font-semibold ${
                targetGroup === 'Control' ? 'text-blue-600' : 'text-gray-600'
              }`}>
                Control Group
              </Text>
            </Pressable>
            
            <Pressable
              onPress={() => setTargetGroup('Study')}
              className={`flex-1 py-3 px-4 rounded-xl border-2 ${
                targetGroup === 'Study'
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-300 bg-white'
              }`}
            >
              <Text className={`text-center font-semibold ${
                targetGroup === 'Study' ? 'text-green-600' : 'text-gray-600'
              }`}>
                Study Group
              </Text>
            </Pressable>
          </View>

          <Pressable
            onPress={handleAssignGroup}
            disabled={selectedParticipants.length === 0 || !targetGroup}
            className={`py-3 px-6 rounded-xl ${
              selectedParticipants.length > 0 && targetGroup
                ? 'bg-blue-500'
                : 'bg-gray-300'
            }`}
          >
            <Text className="text-white text-center font-bold">
              Assign to {targetGroup || 'Group'} ({selectedParticipants.length} selected)
            </Text>
          </Pressable>
        </View>

        {/* Participant Lists */}
        {renderParticipantList(unassignedParticipants, 'Unassigned Participants', 'gray')}
        {renderParticipantList(controlGroupParticipants, 'Control Group', 'blue')}
        {renderParticipantList(studyGroupParticipants, 'Study Group', 'green')}
      </ScrollView>
    </View>
  );
}

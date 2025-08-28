import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { RootStackParamList } from 'src/Navigation/types';

// Define the type for route params
type DistressThermometerListRouteParams = {
  patientId: number;
  age: number;
};

// Main DistressThermometerList Component
export default function DistressThermometerList() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute();
  const { patientId, age } = route.params as DistressThermometerListRouteParams;

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="px-4 py-2">
        {/* Header */}
        <View className="flex-row justify-between items-start mb-4">
          <View className="flex-1">
            <Text className="text-lg font-bold text-black">Participant002</Text>
            <Text className="text-sm text-gray-500">
              25 y · 65 kg · Male · Lung Cancer - Stage IIB
            </Text>
            <Text className="text-pink-600 mt-1">
              🌡️ Distress Thermometer History
            </Text>
          </View>
          <TouchableOpacity
            className="bg-teal-400 px-4 py-2 rounded-full"
            onPress={() => navigation.navigate('DistressThermometerScreen', { patientId, age })}
          >
            <Text className="text-white font-semibold">+ New Assessment</Text>
          </TouchableOpacity>
        </View>

        {/* Stats Cards */}
        <View className="flex-row flex-wrap gap-2 mb-4">
          <StatCard
            title="CURRENT SCORE"
            value="5"
            subtitle="Last visit"
            color="blue"
          />
          <StatCard
            title="AVERAGE SCORE"
            value="4.1"
            subtitle="Over 7 visits"
            color="yellow"
          />
          <StatCard
            title="TREND"
            value="-1"
            subtitle="↓ Since last month"
            color="green"
          />
          <StatCard
            title="PROBLEM AREAS"
            value="2"
            subtitle="↓ From 4 areas"
            color="green"
          />
        </View>

        {/* Tabs */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mb-4"
        >
          <Tab title="All Visits" active />
          <Tab title="Last 30 Days" />
          <Tab title="High Distress" />
          <Tab title="Improving" />
          <Tab title="Concerning" />
        </ScrollView>

        {/* Visit Card */}
        <View className="bg-white shadow p-4 rounded-xl mb-20 border border-gray-100">
          <View className="flex-row items-center mb-2">
            <Text className="text-orange-500 text-xl font-bold mr-2">5</Text>
            <Text className="text-sm font-semibold text-gray-800">
              Moderate Distress
            </Text>
            <Text className="ml-auto text-xs text-gray-500">15 min</Text>
          </View>

          <Text className="text-sm text-gray-600 mb-2">
            Problem Areas (2):
          </Text>
          <View className="flex-row mb-2">
            <Text className="bg-blue-200 text-blue-800 px-2 py-1 rounded-full text-xs mr-2">
              Physical
            </Text>
            <Text className="bg-purple-200 text-purple-800 px-2 py-1 rounded-full text-xs">
              Emotional
            </Text>
          </View>

          <Text className="italic text-gray-700">
            "Moderate distress levels improving. Patient responding well to new
            treatment protocol. Physical symptoms manageable."
          </Text>
          <Text className="text-right text-xs text-gray-500 mt-2">
            Assessed by Dr. Raghavender
          </Text>
        </View>
      </ScrollView> 
    </SafeAreaView>
  );
}

// Reusable Stat Card
const StatCard = ({ title, value, subtitle, color }: {
  title: string;
  value: string;
  subtitle: string;
  color: string;
}) => {
  const bg = {
    blue: 'bg-blue-100',
    yellow: 'bg-yellow-100',
    green: 'bg-green-100',
  }[color];

  return (
    <View className={`w-[47%] p-3 rounded-lg ${bg}`}>
      <Text className="text-lg font-bold text-black">{value}</Text>
      <Text className="text-xs text-gray-600">{title}</Text>
      <Text className="text-xs text-gray-500">{subtitle}</Text>
    </View>
  );
};

// Reusable Tab
const Tab = ({ title, active }: { title: string; active?: boolean }) => (
  <View
    className={`px-4 py-1 rounded-full mr-2 ${
      active ? 'bg-teal-400' : 'bg-gray-200'
    }`}
  >
    <Text className={`${active ? 'text-white' : 'text-gray-600'}`}>
      {title}
    </Text>
  </View>
);
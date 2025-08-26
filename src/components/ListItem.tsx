import React from 'react';
import { View, Text, Pressable, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export type Patient = {
  id: number;
  name: string;
  age: number;
  weightKg: number;
  status?: 'ok' | 'pending' | 'alert';
  cancerType?: string;
  stage?: string;
  gender: 'Male' | 'Female' | 'Other';
};

export default function PatientCard({
  item,
  selected,
  onPress,
}: {
  item: Patient;
  selected?: boolean;
  onPress?: () => void;
}) {
  const chipBg = selected ? 'bg-[#19B888]' : 'bg-[#EBF6D6]';

  const iconColor =
    item.status === 'alert'
      ? '#f97316'
      : item.status === 'pending'
        ? '#2b88d8'
        : '#00b894';

  const dotColor = '#f43f5e';

  return (
    <Pressable
      onPress={onPress}
      className={`flex-row items-center justify-between rounded-xl px-3 py-3 mb-2 ${chipBg}`}
    >
      <View className="flex-row items-center gap-3">
        {/* <FontAwesome name="user-md" size={20} color={iconColor} /> */}
        <Image
          source={require("../../assets/patient.png")}
          style={{ width: 20, height: 20, tintColor: iconColor }} 
        />

        <View>
          <Text className={`font-bold ${selected ? 'text-white' : 'text-[#0b1f1c]'}`}>
            {item.name}
          </Text>
          <Text className={`text-xs ${selected ? 'text-white/90' : 'text-[#6b7a77]'}`}>
            {item.age} y • {item.weightKg} kg • {item.gender}
          </Text>

          {item.cancerType && (
            <Text className={`text-xs mt-1 ${selected ? 'text-white/90' : 'text-gray-500'}`}>
              {item.cancerType}{item.stage ? ` • Stage: ${item.stage}` : ''}
            </Text>
          )}
        </View>
      </View>

      <View className="flex-row items-center gap-2">
        {(item.status === 'alert' || item.status === 'pending') && (
          <View className="w-2 h-2 rounded-full bg-[#f43f5e]" />
        )}
        <Text className={`text-lg font-bold ${selected ? 'text-white' : 'text-[#6b7a77]'}`}>
          &gt;
        </Text>
      </View>
    </Pressable>
  );
}

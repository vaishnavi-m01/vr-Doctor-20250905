import React from 'react';
import { View, Text, Pressable } from 'react-native';

type Props = {
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
};

export default function Thermometer({ value, onChange, min = 0, max = 10 }: Props) {
  const pct = Math.max(0, Math.min(1, (value - min) / (max - min)));
  const heightPercentage = `${Math.round(pct * 100)}%`;

  return (
    <View className="flex-row items-center gap-4">
      <View className="p-2.5 bg-gray-300 rounded-lg">
        <View className="relative w-16 h-80 flex items-end">

          {/* Stick background */}
          <View
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4 bg-gray-300 rounded-full overflow-hidden"
            style={{ height: '80%' }}
          >
            {/* Dashed background lines */}
            {[1, 2, 3, 4].map((i) => (
              <View
                key={'bgline' + i}
                className="absolute right-0 h-[1px] border-t border-dashed border-gray-400"
                style={{
                  top: `${(i * 100) / 5}%`,
                  width: 14,
                  opacity: 0.5,
                }}
              />
            ))}

            {/* Fill: only stick part grows */}
            <View
              className="absolute bottom-0 left-0 w-full bg-red-500 rounded-t-full"
              style={{ height: heightPercentage }}
            />
          </View>

          {/* Bulb: always fully filled */}
          <View className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-20 bg-red-500 rounded-full" />
        </View>
      </View>

      <View className="items-start">
        <Text className="text-xs text-gray-500 mb-2">
          Considering the past week, including today.
        </Text>
        <View className="flex-row gap-2 items-center">
          <Pressable
            onPress={() => onChange(Math.max(min, value - 1))}
            className="px-3 py-2 rounded-lg bg-white border border-gray-200"
          >
            <Text className="font-medium">-</Text>
          </Pressable>
          <Text className="px-4 py-2 rounded-lg bg-[#0e4336] text-white font-bold text-lg">
            {value}
          </Text>
          <Pressable
            onPress={() => onChange(Math.min(max, value + 1))}
            className="px-3 py-2 rounded-lg bg-white border border-gray-200"
          >
            <Text className="font-medium">+</Text>
          </Pressable>
        </View>
        <Text className="text-xs text-gray-500 mt-2">
          {min} to {max}
        </Text>
      </View>
    </View>
  );
}

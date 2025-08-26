import React from 'react';
import { View, Text, Pressable } from 'react-native';

type Props = {
  value: number;
  onChange: (v:number)=>void;
  min?: number;
  max?: number;
}

export default function Thermometer({ value, onChange, min=0, max=10 }: Props){
  const pct = Math.max(0, Math.min(1, (value - min) / (max - min)));
  const heightPercentage = `${Math.round(pct * 100)}%`;
  
  return (
    <View className="flex-row items-center gap-4">
      <View className="w-24 h-80 bg-white border border-[#dfeae6] rounded-full p-2 justify-end">
        <View className="w-14 rounded-full" style={{height: heightPercentage}}>
          <View className="flex-1 rounded-full bg-[#2a9d8f]"/>
        </View>
      </View>
      <View className="items-start">
        <Text className="text-xs text-muted mb-2">Considering the past week, including today.</Text>
        <View className="flex-row gap-2 items-center">
          <Pressable onPress={()=>onChange(Math.max(min, value-1))} className="px-3 py-2 rounded-xl bg-white border border-border"><Text>-</Text></Pressable>
          <Text className="px-3 py-2 rounded-xl bg-[#0e4336] text-white font-bold">{value}</Text>
          <Pressable onPress={()=>onChange(Math.min(max, value+1))} className="px-3 py-2 rounded-xl bg-white border border-border"><Text>+</Text></Pressable>
        </View>
        <Text className="text-xs text-muted mt-2">{min} to {max}</Text>
      </View>
    </View>
  );
}

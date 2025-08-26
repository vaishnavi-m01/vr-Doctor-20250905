import React from 'react';
import { View, Text, TouchableOpacity, Image, ImageSourcePropType } from 'react-native';
import Card from './Card';

type AssessItemProps = {
  icon?: string | ImageSourcePropType;
  title: string;
  subtitle?: string;
  onPress?: () => void;
  className?: string;
};

export default function AssessItem({
  icon,
  title,
  subtitle,
  onPress,
  className,
}: AssessItemProps) {
  const isString = typeof icon === "string";

  return (
    <TouchableOpacity onPress={onPress}>
      <Card className={`${className || ''} p-5 mb-3`}>
        <View className="flex-row items-center gap-3">
          <View className="w-12 h-12 rounded-xl bg-[#F6F7F7] items-center justify-center">
            {icon ? (
              isString ? (
                <Text className="text-[#0b6b52] text-xl">{icon}</Text>
              ) : (
                <Image
                  source={icon as ImageSourcePropType}
                  className="w-8 h-8"
                  resizeMode="contain"
                />
              )
            ) : (
              <Text className="text-[#0b6b52] text-lg">📄</Text> // fallback
            )}
          </View>
          <View className="flex-1">
            <Text className="font-extrabold text-base">{title}</Text>
            <Text className="text-sm text-[#6b7a77]">{subtitle}</Text>
          </View>
          <Text className="text-[#7a988f]">›</Text>
        </View>
      </Card>
    </TouchableOpacity>
  );
}

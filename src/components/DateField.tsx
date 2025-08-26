import React, { useState } from "react";
import { View, Pressable } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Field } from "@components/Field";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  label: string;
  value: string;                 
  onChange: (val: string) => void;
  mode?: "date" | "time" | "datetime";
  placeholder?: string;
};

export default function DateField({
  label,
  value,
  onChange,
  mode = "date",
  placeholder = mode === "time" ? "HH:mm" : "mm-dd-yyyy",
}: Props) {
  const [open, setOpen] = useState(false);

  const fmt = (d: Date) => {
    if (mode === "time") {
      const hh = String(d.getHours()).padStart(2, "0");
      const mm = String(d.getMinutes()).padStart(2, "0");
      return `${hh}:${mm}`;
    }
    // default: date or datetime -> YYYY-MM-DD
    return d.toISOString().split("T")[0];
  };

  return (
    <View className="flex-1">
      <Pressable onPress={() => setOpen(true)} className="relative">
        <Field
          label={label}
          value={value}
          placeholder={placeholder}
          editable={false}
        />
        {/* right icon */}
        <Ionicons
          name={mode === "time" ? "time-outline" : "calendar-outline"}
          size={20}
          color="#4b5f5a"
          className="absolute right-3 top-[26px]"
        />
      </Pressable>

      <DateTimePickerModal
        isVisible={open}
        mode={mode}
        onConfirm={(date) => {
          onChange(fmt(date));
          setOpen(false);
        }}
        onCancel={() => setOpen(false)}
      />
    </View>
  );
}

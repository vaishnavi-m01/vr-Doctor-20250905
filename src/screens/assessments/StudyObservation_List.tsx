import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { View, Text, Pressable, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootStackParamList } from "src/Navigation/types";




export default function StudyObservation_List() {

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
      const route = useRoute();
      const { patientId, age } = route.params as {patientId:number,age:number};

    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            {/* Container mimic */}
            <View className="mx-auto w-full max-w-[1024px] flex-1 border border-gray-300 rounded-lg  bg-gray-50">

                {/* Patient Header */}
                <View className="bg-white p-6 border-b border-gray-100">
                    <View className="flex-row items-center gap-5 mb-4">
                        <View className="w-16 h-16 rounded-full bg-green-400 items-center justify-center">
                            <Text className="text-3xl text-white">👤</Text>
                        </View>


                        <View className="flex-1">
                            <Text className="text-2xl font-semibold text-gray-900">Participant002</Text>
                            <Text className="text-sm text-gray-700 mb-1">25 y • 65 kg • Male • Lung Cancer - Stage IIB</Text>
                            <View className="flex-row items-center gap-3">
                                <Text className="text-lg font-medium text-gray-700">📋</Text>
                                <Text className="text-lg font-medium text-gray-700">Study Observation Forms</Text>
                            </View>
                        </View>
                        <TouchableOpacity
                            className="bg-teal-400 px-4 py-2 rounded-full"
                           onPress={() => navigation.navigate('StudyObservation', { patientId, age })}
                        >
                            <Text className="text-white font-semibold">+ New Assessment</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Patient Stats */}
                <View className="bg-white px-6 py-5 border-b border-gray-100">
                    <View className="flex-row justify-between">
                        <View className="flex-1 items-center p-4 rounded-xl bg-blue-50 border border-blue-200 mx-1">
                            <Text className="text-xl font-extrabold text-gray-900">12</Text>
                            <Text className="text-[11px] uppercase tracking-wide text-gray-500">Total Forms</Text>
                            <Text className="text-xs text-gray-500">Since enrollment</Text>
                        </View>

                        <View className="flex-1 items-center p-4 rounded-xl bg-yellow-50 border border-yellow-100 mx-1">
                            <Text className="text-xl font-extrabold text-gray-900">Week 12</Text>
                            <Text className="text-[11px] uppercase tracking-wide text-gray-500">Current Week</Text>
                            <Text className="text-xs text-gray-500">Study progress</Text>
                        </View>

                        <View className="flex-1 items-center p-4 rounded-xl bg-red-50 border border-red-200 mx-1">
                            <Text className="text-xl font-extrabold text-gray-900">2</Text>
                            <Text className="text-[11px] uppercase tracking-wide text-gray-500">Active Alerts</Text>
                            <Text className="text-xs text-gray-500">Requires attention</Text>
                        </View>

                        <View className="flex-1 items-center p-4 rounded-xl bg-green-50 border border-green-200 mx-1">
                            <Text className="text-xl font-extrabold text-gray-900">92%</Text>
                            <Text className="text-[11px] uppercase tracking-wide text-gray-500">Compliance</Text>
                            <Text className="text-xs text-gray-500">Form completion</Text>
                        </View>
                    </View>
                </View>






            </View>
        </SafeAreaView>
    );
}

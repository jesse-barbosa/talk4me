import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <View className="flex-1 bg-black items-center justify-center">
      <Text className="text-white text-5xl mb-10">SignVoice</Text>
      
      <TouchableOpacity
        onPress={() => navigation.navigate("Camera" as never)}
        className="bg-blue-600 px-8 py-4 rounded-xl"
      >
        <Text className="text-white text-xl">Iniciar Comunicação</Text>
      </TouchableOpacity>
    </View>
  );
}
import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { Camera, useCameraDevices } from "react-native-vision-camera";
import useHandGesture from "../hooks/useHandGesture";

export default function CameraScreen() {
  const devices = useCameraDevices();
  const device = devices.front;

  const handModel = useHandGesture();
  const [permission, setPermission] = useState(false);

  useEffect(() => {
    Camera.requestCameraPermission().then((res) => {
      setPermission(res === "granted");
    });
  }, []);

  if (!device) {
    return (
      <View className="flex-1 items-center justify-center bg-black">
        <Text className="text-white">Carregando câmera…</Text>
      </View>
    );
  }

  if (!permission) {
    return (
      <View className="flex-1 items-center justify-center bg-black">
        <Text className="text-white">Permissão da câmera negada.</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-black">
      <Camera
        style={{ flex: 1 }}
        device={device}
        isActive={true}
        onFrame={(frame) => {
          handModel.current?.send({ image: frame });
        }}
      />
    </View>
  );
}
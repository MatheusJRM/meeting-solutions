import { Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";

export const handleUploadImage = async (): Promise<string | null> => {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (status !== "granted") {
    Alert.alert(
      "Permissão necessária",
      "Precisamos acessar sua galeria para escolher uma imagem."
    );
    return null;
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ["images"],
    quality: 1,
  });

  if (result.canceled) {
    return null;
  }
  return result.assets[0].uri;
};

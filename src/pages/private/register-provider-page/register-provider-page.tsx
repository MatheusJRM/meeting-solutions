import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  StyleSheet,
  Alert,
  Image,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { RegisterProviderPageProps } from "types/pages-types";
import { DefaultButton } from "components/default-button/default-button";

export const RegisterProviderPage = ({
  navigation,
}: RegisterProviderPageProps) => {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [products, setProducts] = useState("");
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const handleRemoveImage = useCallback((): void => {
    setProfileImage(null);
  }, []);

  const handleImageUpload = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permissão necessária",
        "Precisamos acessar sua galeria para escolher uma imagem."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const handleRegister = () => {
    if (!name || !city || !phone || !products) {
      Alert.alert(
        "Erro",
        "Todos os campos, exceto a imagem, são obrigatórios."
      );
      return;
    }

    const providerData = {
      name: name.trim(),
      city: city.trim(),
      phone: phone.trim(),
      products: products.trim(),
      profileImage,
    };

    console.info("Fornecedor cadastrado: ", providerData);
    Alert.alert("Sucesso", "Fornecedor cadastrado com sucesso!");
    // navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>
        Nome do fornecedor <Text style={styles.icon}>*</Text>
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o nome do fornecedor"
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>
        Cidade sede <Text style={styles.icon}>*</Text>
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Digite a cidade sede"
        value={city}
        onChangeText={setCity}
      />

      <Text style={styles.label}>
        Telefone <Text style={styles.icon}>*</Text>
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o telefone"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />

      <Text style={styles.label}>
        Tipos de produtos vendidos <Text style={styles.icon}>*</Text>
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Digite os tipos de produtos"
        value={products}
        onChangeText={setProducts}
      />

      <Text style={styles.label}>Imagem de perfil</Text>
      <Button title="Escolher imagem" onPress={handleImageUpload} />
      {profileImage && (
        <>
          <TouchableOpacity onPress={handleRemoveImage}>
            <FontAwesome
              name="remove"
              size={24}
              color="black"
              style={{ alignSelf: "flex-end", right: "25%", top: "2%" }}
            />
          </TouchableOpacity>
          <Image source={{ uri: profileImage }} style={styles.image} />
        </>
      )}

      <View style={styles.buttonContainer}>
        <DefaultButton
          onPress={handleRegister}
          color="#6c7ff0"
          colorPressed="#e4d8d8"
        >
          <Text style={styles.buttonText}>Cadastrar</Text>
        </DefaultButton>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
  icon: {
    color: "red",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginTop: 5,
    marginBottom: 15,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginTop: 10,
    alignSelf: "center",
    resizeMode: "stretch",
  },
  buttonContainer: {
    marginTop: "auto",
    marginBottom: "5%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
});

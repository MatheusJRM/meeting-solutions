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
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { UpdateProviderPageProps } from "types/pages-types";
import { DefaultButton } from "components/default-button/default-button";
import { handleUploadImage } from "utils/image-upload";
import { useAsyncStorageContext } from "hooks/useAsyncStorageContext";
import { ProviderDataProps } from "types/async-storage-context-types";

export const UpdateProviderPage = ({
  navigation,
  route,
}: UpdateProviderPageProps) => {
  const { providerData } = route.params;
  const { handleUpdateProvider } = useAsyncStorageContext();
  const [name, setName] = useState(providerData.nome);
  const [city, setCity] = useState(providerData.cidade);
  const [phone, setPhone] = useState(providerData.telefone);
  const [products, setProducts] = useState(
    providerData?.tiposProduto.join(", ")
  );
  const [profileImage, setProfileImage] = useState<string | null>(
    providerData.imgPerfil || null
  );

  const handleAddImage = useCallback(async (): Promise<void> => {
    const image = await handleUploadImage();
    setProfileImage(image);
  }, []);

  const handleRemoveImage = useCallback((): void => {
    setProfileImage(null);
  }, []);

  const handleUpdate = useCallback(() => {
    if (!name || !city || !phone || !products) {
      Alert.alert(
        "Erro",
        "Todos os campos, exceto a imagem, são obrigatórios."
      );
      return;
    }

    const formattedProducts = products
      .split(",")
      .map((product) => product.trim())
      .filter((product) => product.length > 0);

    const providerDataToSend: ProviderDataProps = {
      id: providerData.id,
      nome: name.trim(),
      cidade: city.trim(),
      telefone: phone.trim(),
      tiposProduto: formattedProducts,
      imgPerfil: profileImage,
    };

    handleUpdateProvider(providerDataToSend).then(() => {
      Alert.alert("Sucesso", "Fornecedor atualizado com sucesso!");
      console.info("Fornecedor atualizado: ", providerDataToSend);
      navigation.navigate("home");
    });
  }, [name, city, phone, products, profileImage]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>
        Nome do fornecedor <Text style={styles.icon}>*</Text>
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Ex.: Coca-Cola"
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>
        Cidade sede <Text style={styles.icon}>*</Text>
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Ex.: Atlanta"
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
      <Text
        style={{
          fontSize: 14,
        }}
      >
        (Separados por vírgula)
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Ex.: Eletrônicos, Limpeza, etc..."
        value={products}
        onChangeText={setProducts}
      />

      <Text style={styles.label}>Imagem de perfil</Text>
      <View style={styles.imageButton}>
        <Button title="Escolher imagem" onPress={handleAddImage} />
      </View>
      {profileImage && (
        <>
          <TouchableOpacity onPress={handleRemoveImage}>
            <FontAwesome
              name="remove"
              size={24}
              color="black"
              style={{
                alignSelf: "flex-end",
                paddingRight: "25%",
                paddingTop: "2%",
              }}
            />
          </TouchableOpacity>
          <Image source={{ uri: profileImage }} style={styles.image} />
        </>
      )}

      <View style={styles.buttonContainer}>
        <DefaultButton
          onPress={handleUpdate}
          color="#6c7ff0"
          colorPressed="#e4d8d8"
        >
          <Text style={styles.buttonText}>Atualizar</Text>
        </DefaultButton>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
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
  imageButton: {
    marginTop: 5,
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

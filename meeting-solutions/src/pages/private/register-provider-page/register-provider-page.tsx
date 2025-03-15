import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  Alert,
  Image,
  TouchableOpacity,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { RegisterProviderPageProps } from "types/pages-types";
import { DefaultButton } from "components/default-button/default-button";
import { handleUploadImage } from "utils/image-upload";
import { useAsyncStorageContext } from "hooks/useAsyncStorageContext";
import { ProviderDataProps } from "types/async-storage-context-types";
import { formatPhone, isPhoneComplete } from "utils/phone-format-functions";
import { isDisable } from "utils/form-provider-disable-check";
import { styles } from "utils/register-and-update-style";

export const RegisterProviderPage = ({
  navigation,
}: RegisterProviderPageProps) => {
  const { handleAddProvidersData } = useAsyncStorageContext();
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [products, setProducts] = useState("");
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const handleAddImage = useCallback(async (): Promise<void> => {
    const image = await handleUploadImage();
    setProfileImage(image);
  }, []);

  const handleRemoveImage = useCallback((): void => {
    setProfileImage(null);
  }, []);

  const handleRegister = useCallback(() => {
    const formattedProducts = products
      .split(",")
      .map((product) => product.trim())
      .filter((product) => product.length > 0);

    const providerData: ProviderDataProps = {
      id: String(Math.random()),
      nome: name.trim(),
      cidade: city.trim(),
      telefone: phone.trim(),
      tiposProduto: formattedProducts,
      imgPerfil: profileImage,
    };

    handleAddProvidersData(providerData).then(() => {
      Alert.alert("Sucesso", "Fornecedor cadastrado com sucesso!");
      console.info("Fornecedor cadastrado: ", providerData);
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
        Telefone Celular <Text style={styles.icon}>*</Text>
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Ex.: (XX) XXXXX-XXXX"
        value={phone}
        onChangeText={(text) => setPhone(formatPhone(text))}
        keyboardType="phone-pad"
        maxLength={15}
      />
      {!!phone && !isPhoneComplete(phone) && (
        <Text style={{ color: isPhoneComplete(phone) ? "green" : "red" }}>
          Número incompleto
        </Text>
      )}

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
              style={styles.removeIcon}
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
          disabled={isDisable(name, city, phone, products)}
        >
          <Text style={styles.buttonText}>Cadastrar</Text>
        </DefaultButton>
      </View>
    </ScrollView>
  );
};

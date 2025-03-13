import React, { useCallback } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useAsyncStorageContext } from "hooks/useAsyncStorageContext";
import { ProviderCardProps } from "types/provider-card-types/provider-card-type";
import { handleUploadImage } from "utils/image-upload";

export const ProviderCard = ({
  providerData,
  handleNavigate,
}: ProviderCardProps) => {
  const { handleAddProfileImage } = useAsyncStorageContext();
  const { id, nome, cidade, telefone, tiposProduto, imgPerfil } = providerData;

  const handleUpdateProfileImage = async () => {
    const image = await handleUploadImage();
    if (image) {
      handleAddProfileImage(id, image);
    }
  };

  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={handleUpdateProfileImage}>
        {imgPerfil ? (
          <Image source={{ uri: imgPerfil }} style={styles.image} />
        ) : (
          <View style={{ width: 60, alignItems: "center" }}>
            <Entypo name="image" size={24} color="black" style={styles.icon} />
            <Text
              style={{ flexWrap: "wrap", fontSize: 10, textAlign: "center" }}
            >
              Clique para inserir uma imagem
            </Text>
          </View>
        )}
      </TouchableOpacity>

      <View style={styles.infoContainer}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={styles.name}>{nome}</Text>
          <TouchableOpacity onPress={() => handleNavigate(providerData)}>
            <FontAwesome name="pencil-square-o" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <Text style={styles.text}>Cidade: {cidade}</Text>
        <Text style={styles.text}>Telefone: {telefone}</Text>
        <Text style={styles.text}>Produtos: {tiposProduto.join(", ")}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    gap: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 60,
    marginRight: 15,
  },
  icon: {
    padding: 10,
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    width: "90%",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  text: {
    fontSize: 14,
    color: "#555",
    marginBottom: 3,
  },
});

import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { ProviderCardProps } from "types/provider-card-types/provider-card-type";

export const ProviderCard = ({ providerData }: ProviderCardProps) => {
  const { nome, cidade, telefone, tiposProduto, imgPerfil } = providerData;

  return (
    <View style={styles.card}>
      {imgPerfil && <Image source={{ uri: imgPerfil }} style={styles.image} />}

      <View style={styles.infoContainer}>
        <Text style={styles.name}>{nome}</Text>
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
    marginVertical: 10,
    marginHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 60,
    marginRight: 15,
  },
  infoContainer: {
    flex: 1,
  },
  name: {
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

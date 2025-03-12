import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import Logo from "assets/images/logo.png";
import { useAsyncStorageContext } from "hooks/useAsyncStorageContext";
import { DefaultButton } from "components/default-button/default-button";

export const LandingPage = () => {
  const { handleLogin } = useAsyncStorageContext();
  return (
    <View style={styles.container}>
      <Image source={Logo} style={styles.logo} />
      <Text style={styles.welcomeText}>Olá Fornecedor, seja bem-vindo!</Text>
      <DefaultButton
        onPress={handleLogin}
        color="#6c7ff0"
        colorPressed="#e4d8d8"
      >
        <Text style={styles.buttonText}>ENTRAR</Text>
      </DefaultButton>
      <Text style={styles.footerText}>
        <Text style={styles.italicText}>Delivered by MatheusJRM</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  logo: {
    tintColor: "#2f4cf0",
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  footerText: {
    position: "absolute",
    bottom: 20,
    fontSize: 14,
    color: "#888",
  },
  italicText: {
    fontStyle: "italic",
  },
});

import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import Logo from "@assets/images/logo.png";
import { useNavigation } from "@react-navigation/native";

export const LandingPage = () => {
  const { navigate } = useNavigation();
  return (
    <View style={styles.container}>
      <Image source={Logo} style={styles.logo} />
      <Text style={styles.welcomeText}>Olá Fornecedor, seja bem-vindo!</Text>
      <Pressable
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
        ]}
        onPress={() => navigate("home" as never)}
      >
        <Text style={styles.buttonText}>ENTRAR</Text>
      </Pressable>
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
  button: {
    backgroundColor: "#6c7ff0",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    marginTop: 40,
  },
  buttonPressed: {
    backgroundColor: "#e4d8d8",
    opacity: 0.7,
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

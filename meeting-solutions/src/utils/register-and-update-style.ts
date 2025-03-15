import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
  removeIcon: {
    alignSelf: "flex-end",
    paddingRight: "25%",
    paddingTop: "2%",
  },
});

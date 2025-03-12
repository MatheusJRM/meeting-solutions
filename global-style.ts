import { Platform, StatusBar, StyleSheet } from "react-native";

export const globalStyle = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonPressed: {
    backgroundColor: "#e4d8d8",
    opacity: 0.7,
  },
});

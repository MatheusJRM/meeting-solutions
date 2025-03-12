import React from "react";
import { SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { AsyncStorageProvider } from "contexts/async-storage-context";
import { StackRoutes } from "routes/stack.routes";
import { globalStyle } from "./global-style";
import "./gesture-handler.native";

export default function App() {
  return (
    <SafeAreaView style={globalStyle.container}>
      <NavigationContainer>
        <AsyncStorageProvider>
          <StackRoutes />
          <StatusBar style="auto" />
        </AsyncStorageProvider>
      </NavigationContainer>
    </SafeAreaView>
  );
}

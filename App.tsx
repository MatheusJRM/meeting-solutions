import React from "react";
import { SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { AsyncStorageProvider } from "contexts/async-storage-context";
import { LandingPage } from "@pages/landing-page/landing-page";
import { globalStyle } from "./global-style";
import "./gesture-handler.native";
import { StackRoutes } from "routes/stack.routes";
import { NavigationContainer } from "@react-navigation/native";
import { WarningModal } from "components/modals/warning-modal";
import { useWarningModal } from "hooks/useWarningModal";

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

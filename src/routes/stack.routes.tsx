import { useMemo } from "react";
import { Pressable } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Ionicons from "@expo/vector-icons/Ionicons";
import { WarningModal } from "components/modals/warning-modal";
import { useAsyncStorageContext } from "hooks/useAsyncStorageContext";
import { useWarningModal } from "hooks/useWarningModal";
import { HomePage } from "pages/home-page/home-page";
import { LandingPage } from "pages/landing-page/landing-page";
import { globalStyle } from "../../global-style";

const Stack = createStackNavigator();

export const StackRoutes = () => {
  const { isAuthenticated, handleLogout } = useAsyncStorageContext();
  const { warningModalIsVisible, handleCloseModal, handleShowModal } =
    useWarningModal();

  const handleConfirmFunction = () => {
    handleLogout();
    handleCloseModal();
  };

  const publicRoutes = useMemo(
    () => (
      <Stack.Screen
        name="landing"
        component={LandingPage}
        options={{ headerShown: false }}
      />
    ),
    []
  );

  const privateRoutes = useMemo(
    () => (
      <Stack.Screen
        name="home"
        component={HomePage}
        options={{
          headerTitle: "Home",
          headerLeft: () => (
            <Pressable
              style={({ pressed }) => [
                globalStyle.button,
                pressed && globalStyle.buttonPressed,
              ]}
              onPress={handleShowModal}
            >
              <Ionicons name="arrow-back" size={20} color="black" />
            </Pressable>
          ),
          gestureEnabled: false,
        }}
      />
    ),
    [warningModalIsVisible]
  );

  return (
    <>
      <Stack.Navigator>
        {isAuthenticated ? privateRoutes : publicRoutes}
      </Stack.Navigator>
      <WarningModal
        visible={warningModalIsVisible}
        onClose={handleCloseModal}
        title="Deseja mesmo sair?"
        content="Ao sair todos cadastros serão perdidos. Se quiser manter os dados apenas feche o app, sem sair."
        buttonTextCancel="Cancelar"
        buttonTextConfirm="Confirmar"
        handleActionCancel={handleCloseModal}
        handleActionConfirm={handleConfirmFunction}
      />
    </>
  );
};

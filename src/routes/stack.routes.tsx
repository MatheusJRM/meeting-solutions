import React, { useCallback, useMemo } from "react";
import { Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Ionicons from "@expo/vector-icons/Ionicons";
import { WarningModal } from "components/modals/warning-modal";
import { useAsyncStorageContext } from "hooks/useAsyncStorageContext";
import { useWarningModal } from "hooks/useWarningModal";
import { HomePage } from "pages/private/home-page/home-page";
import { LandingPage } from "pages/public/landing-page/landing-page";
import { UpdateProviderPage } from "pages/private/update-provider-page/update-provider-page";
import { RegisterProviderPage } from "pages/private/register-provider-page/register-provider-page";
import { RootStackParamList } from "types/navigation-types";
import { globalStyle } from "../../global-style";

const Stack = createStackNavigator<RootStackParamList>();

export const StackRoutes = () => {
  const { goBack } = useNavigation();
  const { isAuthenticated, handleLogout } = useAsyncStorageContext();
  const { warningModalIsVisible, handleCloseModal, handleShowModal } =
    useWarningModal();

  const handleConfirmFunction = useCallback(() => {
    handleLogout();
    handleCloseModal();
  }, []);

  const handleHeaderLeftRender = useCallback(
    (onPress: () => void) => (
      <Pressable
        style={({ pressed }) => [
          globalStyle.button,
          pressed && globalStyle.buttonPressed,
        ]}
        onPress={onPress}
      >
        <Ionicons name="arrow-back" size={20} color="black" />
      </Pressable>
    ),
    []
  );

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
      <React.Fragment>
        <Stack.Screen
          name="home"
          component={HomePage}
          options={{
            headerTitle: "Home",
            headerLeft: () => handleHeaderLeftRender(handleShowModal),
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="registerProvider"
          component={RegisterProviderPage}
          options={{
            headerTitle: "Cadastro de Fornecedores",
            headerLeft: () => handleHeaderLeftRender(goBack),
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="updateProvider"
          component={UpdateProviderPage}
          options={{
            headerTitle: "Atualização de Fornecedor",
            headerLeft: () => handleHeaderLeftRender(goBack),
            gestureEnabled: false,
          }}
        />
      </React.Fragment>
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

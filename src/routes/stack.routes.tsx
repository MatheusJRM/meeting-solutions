import { createStackNavigator } from "@react-navigation/stack";
import { WarningModal } from "components/modals/warning-modal";
import { globalStyle } from "../../global-style";
import { useAsyncStorageContext } from "hooks/useAsyncStorageContext";
import { useWarningModal } from "hooks/useWarningModal";
import { HomePage } from "pages/home-page/home-page";
import { LandingPage } from "pages/landing-page/landing-page";
import { Button, Pressable, Text } from "react-native";

const Stack = createStackNavigator();

export const StackRoutes = () => {
  const { handleLogout } = useAsyncStorageContext();
  const { warningModalIsVisible, handleCloseModal, handleShowModal } =
    useWarningModal();

  const handleConfirmFunction = () => {
    handleLogout();
    handleCloseModal();
  };

  return (
    <>
      <Stack.Navigator>
        <Stack.Screen
          name="landing"
          component={LandingPage}
          options={{ headerShown: false }}
        />
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
                <Text>{"<-"}</Text>
              </Pressable>
            ),
            gestureEnabled: false,
          }}
        />
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

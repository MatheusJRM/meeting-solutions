import { Button, View } from "react-native";
import { HomePageProps } from "types/pages-types";

export const HomePage = ({ navigation }: HomePageProps) => {
  return (
    <Button
      title="Cadastro de fornecedores"
      onPress={() => navigation.navigate("registerProvider")}
    />
  );
};

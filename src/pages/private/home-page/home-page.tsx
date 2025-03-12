import { Text, TouchableOpacity, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { ProviderCard } from "components/provider-card/provider-card";
import { useAsyncStorageContext } from "hooks/useAsyncStorageContext";
import { HomePageProps } from "types/pages-types";

export const HomePage = ({ navigation }: HomePageProps) => {
  const { providers } = useAsyncStorageContext();
  return (
    <View style={{ padding: 15, gap: 30 }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
        <Text style={{ fontSize: 14, fontStyle: "italic", fontWeight: "600" }}>
          Cadastro de fornecedores
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("registerProvider")}
        >
          <AntDesign name="pluscircleo" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {providers.length > 0 &&
        providers.map((provider) => (
          <ProviderCard key={provider.id} providerData={provider} />
        ))}
    </View>
  );
};

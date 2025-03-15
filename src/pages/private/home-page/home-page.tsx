import { useCallback, useState } from "react";
import {
  FlatList,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TextInput,
  TextInputChangeEventData,
  TouchableOpacity,
  View,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { ProviderCard } from "components/provider-card/provider-card";
import { useAsyncStorageContext } from "hooks/useAsyncStorageContext";
import { HomePageProps } from "types/pages-types";
import { ProviderDataProps } from "types/async-storage-context-types";
import { handleSeachProvider } from "utils/provider-search";
import { useFocusEffect } from "@react-navigation/native";

export const HomePage = ({ navigation }: HomePageProps) => {
  const { providers } = useAsyncStorageContext();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProviders = providers.filter((provider) =>
    handleSeachProvider(provider, searchTerm)
  );

  const handleChangeSearchTerm = useCallback(
    (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
      setSearchTerm(e.nativeEvent.text);
    },
    [searchTerm]
  );

  const handleNavigateRegisterProviderPage = useCallback(
    () => navigation.navigate("registerProvider"),
    []
  );

  const handleNavigateUpdateProviderPage = useCallback(
    (providerData: ProviderDataProps) =>
      navigation.navigate("updateProvider", { providerData: providerData }),
    []
  );

  useFocusEffect(useCallback(() => setSearchTerm(""), []));

  return (
    <View style={styles.container}>
      <View style={styles.topContent}>
        <View style={styles.registerProviderContainer}>
          <Text style={styles.topContentText}>Cadastro de fornecedores</Text>
          <TouchableOpacity
            style={{ paddingRight: 15 }}
            onPress={handleNavigateRegisterProviderPage}
          >
            <AntDesign name="pluscircleo" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.searchContainer}>
          <AntDesign name="search1" size={24} color="black" />
          <TextInput
            autoCapitalize="none"
            style={styles.searchInput}
            placeholder="Pesquisar"
            placeholderTextColor="#999"
            onChange={handleChangeSearchTerm}
            value={searchTerm}
          />
        </View>
      </View>

      {filteredProviders.length > 0 && (
        <FlatList
          data={filteredProviders}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.flatListContainer}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <ProviderCard
              key={item.id}
              providerData={item}
              handleNavigate={handleNavigateUpdateProviderPage}
            />
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    gap: 15,
  },
  topContent: {
    gap: 15,
  },
  registerProviderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  topContentText: {
    fontSize: 18,
    fontWeight: "600",
    fontStyle: "italic",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: "#333",
  },
  flatListContainer: {
    flexGrow: 1,
    gap: 20,
  },
});

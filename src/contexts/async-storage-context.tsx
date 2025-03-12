import { createContext, useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  AsyncStorageProps,
  AsyncStorageProviderProps,
  ProviderDataProps,
} from "types/async-storage-context-types";

const AsyncStorageContext = createContext<AsyncStorageProps | undefined>(
  undefined
);

const AsyncStorageProvider = ({ children }: AsyncStorageProviderProps) => {
  const [providers, setProviders] = useState<ProviderDataProps[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const handleLogin = async (): Promise<void> => {
    setIsAuthenticated(true);
    await AsyncStorage.setItem("@isAuthenticated", "true");
  };

  const handleSaveProviders = async (
    providersToSave: ProviderDataProps[]
  ): Promise<void> => {
    try {
      await AsyncStorage.setItem(
        "@provider-data",
        JSON.stringify(providersToSave)
      );
      console.info("Providers salvos com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar providers:", error);
    }
  };

  const handleFetchData = useCallback(async (): Promise<void> => {
    const isAuthenticatedData = await AsyncStorage.getItem("@isAuthenticated");
    const data = await AsyncStorage.getItem("@provider-data");
    if (isAuthenticatedData) {
      setIsAuthenticated(JSON.parse(isAuthenticatedData));
      if (data) {
        setProviders(JSON.parse(data));
      } else {
        setProviders([]);
      }
    }
  }, [providers, AsyncStorage]);

  const handleAddProvidersData = useCallback(
    async (data: ProviderDataProps): Promise<void> => {
      try {
        await AsyncStorage.setItem("@provider-data", JSON.stringify(data));
        setProviders([...providers, data]);
      } catch (error) {
        console.error("Erro ao salvar provider:", error);
      }
    },
    [providers]
  );

  const handleAddProfileImage = (id: string, image: string) => {
    setProviders((prev) => {
      const updatedProviders = prev.map((provider) =>
        provider.id === id ? { ...provider, imgPerfil: image } : provider
      );

      handleSaveProviders(updatedProviders);

      return updatedProviders;
    });
  };

  const handleLogout = (): void => {
    AsyncStorage.clear().then(() => {
      setIsAuthenticated(false);
      setProviders([]);
    });
  };

  useEffect(() => {
    handleFetchData();
  }, []);

  return (
    <AsyncStorageContext.Provider
      value={{
        isAuthenticated,
        providers,
        handleLogin,
        handleAddProvidersData,
        handleAddProfileImage,
        handleLogout,
      }}
    >
      {children}
    </AsyncStorageContext.Provider>
  );
};

export { AsyncStorageContext, AsyncStorageProvider };

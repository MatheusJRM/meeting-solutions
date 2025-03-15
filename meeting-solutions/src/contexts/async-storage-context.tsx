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

  const handleLogin = useCallback(async (): Promise<void> => {
    setIsAuthenticated(true);
    await AsyncStorage.setItem("@isAuthenticated", "true");
  }, []);

  const handleUpdateAllProviders = useCallback(
    async (providersToSave: ProviderDataProps[]): Promise<void> => {
      try {
        await AsyncStorage.setItem(
          "@provider-data",
          JSON.stringify(providersToSave)
        );
        console.info("Providers atualizados com sucesso!");
      } catch (error) {
        console.error("Erro ao atualizar providers:", error);
      }
    },
    []
  );

  const handleUpdateProvider = useCallback(
    async (providerToSave: ProviderDataProps): Promise<void> => {
      try {
        setProviders((prev) => {
          const updatedProviders = prev.map((provider) => {
            if (provider.id === providerToSave.id) return providerToSave;
            return provider;
          });
          handleUpdateAllProviders(updatedProviders);

          return updatedProviders;
        });
        console.info("Providers atualizados com sucesso!");
      } catch (error) {
        console.error("Erro ao atualizar providers:", error);
      }
    },
    []
  );

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
  }, [providers, isAuthenticated]);

  const handleAddProvidersData = useCallback(
    async (data: ProviderDataProps): Promise<void> => {
      try {
        setProviders([...providers, data]);
        handleUpdateAllProviders([...providers, data]);
      } catch (error) {
        console.error("Erro ao salvar provider:", error);
      }
    },
    [providers]
  );

  const handleAddProfileImage = useCallback((id: string, image: string) => {
    setProviders((prev) => {
      const updatedProviders = prev.map((provider) =>
        provider.id === id ? { ...provider, imgPerfil: image } : provider
      );

      handleUpdateAllProviders(updatedProviders);

      return updatedProviders;
    });
  }, []);

  const handleLogout = useCallback((): void => {
    AsyncStorage.clear().then(() => {
      setIsAuthenticated(false);
      setProviders([]);
    });
  }, []);

  useEffect(() => {
    handleFetchData();
  }, []);

  return (
    <AsyncStorageContext.Provider
      value={{
        isAuthenticated,
        providers,
        handleFetchData,
        handleLogin,
        handleAddProvidersData,
        handleUpdateProvider,
        handleAddProfileImage,
        handleLogout,
      }}
    >
      {children}
    </AsyncStorageContext.Provider>
  );
};

export { AsyncStorageContext, AsyncStorageProvider };

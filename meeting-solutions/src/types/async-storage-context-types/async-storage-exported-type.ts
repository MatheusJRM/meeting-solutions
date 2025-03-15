import { ProviderDataProps } from "./providers-data-type";

export type AsyncStorageProps = {
  isAuthenticated: boolean;
  providers: ProviderDataProps[];
  handleFetchData: () => void;
  handleLogin: () => void;
  handleAddProvidersData: (data: ProviderDataProps) => Promise<void>;
  handleUpdateProvider: (providerToSave: ProviderDataProps) => Promise<void>;
  handleAddProfileImage: (id: string, image: string) => void;
  handleLogout: () => void;
};

import { ProviderDataProps } from "./providers-data-type";

export type AsyncStorageProps = {
  isAuthenticated: boolean;
  providers: ProviderDataProps[];
  handleLogin: () => void;
  handleAddProvidersData: (data: ProviderDataProps) => void;
  handleAddProfileImage: (id: string, image: string) => void;
  handleLogout: () => void;
};

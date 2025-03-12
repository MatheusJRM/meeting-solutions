import { ProviderDataProps } from "./providers-data-type";

export type AsyncStorageProps = {
  providers: ProviderDataProps[];
  handleAddProvidersData: (data: ProviderDataProps) => void;
  handleAddProfileImage: (id: string, image: string) => void;
  handleLogout: () => void;
};

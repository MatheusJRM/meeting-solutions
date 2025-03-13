import { ProviderDataProps } from "types/async-storage-context-types";

export type ProviderCardProps = {
  providerData: ProviderDataProps;
  handleNavigate: (providerData: ProviderDataProps) => void;
};

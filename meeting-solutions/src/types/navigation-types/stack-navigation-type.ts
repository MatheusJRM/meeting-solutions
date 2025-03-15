import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { ProviderDataProps } from "types/async-storage-context-types";

export type RootStackParamList = {
  landing: undefined;
  home: undefined;
  registerProvider: undefined;
  updateProvider: {
    providerData: ProviderDataProps;
  };
};

export type StackNavigation<T extends keyof RootStackParamList> =
  StackNavigationProp<RootStackParamList, T>;

export type StackRoute<T extends keyof RootStackParamList> = RouteProp<
  RootStackParamList,
  T
>;

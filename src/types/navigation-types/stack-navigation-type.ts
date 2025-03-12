import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RegisterProviderPage } from 'pages/private/register-provider-page/register-provider-page';

export type RootStackParamList = {
  landing: undefined;
  home: undefined;
  registerProvider: undefined;
};

export type StackNavigation<T extends keyof RootStackParamList> =
  StackNavigationProp<RootStackParamList, T>;

export type StackRoute<T extends keyof RootStackParamList> = RouteProp<
  RootStackParamList,
  T
>;

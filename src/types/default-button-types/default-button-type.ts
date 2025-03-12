import React from "react";
import { PressableProps } from "react-native";

export interface DefaultButtonProps extends PressableProps {
  onPress: () => void;
  color: string;
  colorPressed: string;
  children: React.ReactNode;
}

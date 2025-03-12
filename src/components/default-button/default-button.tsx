import { Pressable, StyleSheet } from "react-native";
import { DefaultButtonProps } from "types/default-button-types";

export const DefaultButton = ({
  onPress,
  color,
  colorPressed,
  children,
  ...props
}: DefaultButtonProps) => {
  return (
    <Pressable
      {...props}
      style={({ pressed }) => [
        styles.button,
        { backgroundColor: color },
        pressed && styles.buttonPressed && { backgroundColor: colorPressed },
      ]}
      onPress={onPress}
    >
      {children}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    marginTop: 40,
  },
  buttonPressed: {
    opacity: 0.7,
  },
});

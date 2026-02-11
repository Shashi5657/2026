import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
} from "react-native";
import React from "react";

interface InputFieldProps extends TextInputProps {
  label: string;
}

const InputField = ({
  label,
  autoCapitalize = "none",
  ...props
}: InputFieldProps) => {
  return (
    <View>
      <Text>{label}</Text>
      <TextInput
        style={styles.textinput}
        autoCapitalize={autoCapitalize}
        {...props}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  textinput: {
    borderWidth: 2,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
    marginBottom: 3,
  },
});

export default InputField;

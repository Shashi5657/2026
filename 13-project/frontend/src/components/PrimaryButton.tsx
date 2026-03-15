import { TouchableOpacity, Text } from "react-native";

type Props = {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary";
};

export default function PrimaryButton({ title, onPress, variant }: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: "#2563EB",
        paddingVertical: 16,
        borderRadius: 12,
      }}
    >
      <Text
        style={{
          color: "#FFF",
          textAlign: "center",
          fontWeight: "600",
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

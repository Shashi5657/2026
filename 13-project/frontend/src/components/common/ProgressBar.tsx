import { View } from "react-native";

type Props = {
  progress: number;
};

export default function ProgressBar({ progress }: Props) {
  return (
    <View
      style={{
        height: 10,
        backgroundColor: "#E5E7EB",
        borderRadius: 20,
        overflow: "hidden",
      }}
    >
      <View
        style={{
          width: `${progress}%`,
          height: "100%",
          backgroundColor: "#2563EB",
        }}
      />
    </View>
  );
}

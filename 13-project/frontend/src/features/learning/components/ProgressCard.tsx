import ProgressBar from "@/components/common/ProgressBar";
import { View, Text } from "react-native";

type Props = {
  completed: number;
  total: number;
};

export default function ProgressCard({ completed, total }: Props) {
  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <View
      style={
        {
          // backgroundColor: "#FFF",
          // padding: 16,
          // borderRadius: 12,
          // marginBottom: 16,
        }
      }
    >
      <ProgressBar progress={percentage} />

      <Text
        style={{
          marginTop: 10,
        }}
      >
        {completed}/{total} Lessons
      </Text>
    </View>
  );
}

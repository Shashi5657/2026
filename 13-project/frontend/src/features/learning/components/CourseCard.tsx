import { Pressable, Text, View } from "react-native";

import { router } from "expo-router";

type Props = {
  id: string;
  title: string;
  lessonCount: number;
};

export default function CourseCard({ id, title, lessonCount }: Props) {
  return (
    <Pressable
      onPress={() =>
        router.push({
          pathname: "/learning/[courseId]",
          params: {
            courseId: id,
          },
        })
      }
    >
      <View
        style={{
          backgroundColor: "#FFF",
          padding: 16,
          borderRadius: 12,
          marginBottom: 12,
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: "700",
          }}
        >
          📚 {title}
        </Text>

        <Text
          style={{
            marginTop: 8,
            color: "#64748B",
          }}
        >
          {lessonCount} lessons
        </Text>
      </View>
    </Pressable>
  );
}

import { Pressable, Text, View } from "react-native";
import { router } from "expo-router";

import { useAppSelector } from "@/store/hook";
import { courses } from "../data/courses";

export default function ContinueLearningCard() {
  const { currentCourseId, currentLessonId } = useAppSelector(
    (state) => state.learning,
  );

  if (!currentCourseId) return null;

  const course = courses.find((c) => c.id === currentCourseId);

  if (!course) return null;
  if (!course?.lessons?.length) return null;

  const lesson =
    course.lessons?.find((lesson) => lesson.id === currentLessonId) ??
    course?.lessons[0];

  return (
    <Pressable onPress={() => router.push(`/learning/${course.id}`)}>
      <View
        style={{
          backgroundColor: "#2563EB",
          padding: 18,
          borderRadius: 16,
          marginVertical: 20,
        }}
      >
        <Text
          style={{
            color: "#FFF",
            fontSize: 18,
            fontWeight: "700",
          }}
        >
          Continue Learning
        </Text>

        <Text
          style={{
            color: "#FFF",
            marginTop: 12,
            fontSize: 16,
          }}
        >
          📚 {course.title}
        </Text>

        <Text
          style={{
            color: "#FFF",
            marginTop: 6,
          }}
        >
          ▶ {lesson.title}
        </Text>

        <Text
          style={{
            color: "#FFF",
            marginTop: 16,
            fontWeight: "700",
          }}
        >
          Resume →
        </Text>
      </View>
    </Pressable>
  );
}

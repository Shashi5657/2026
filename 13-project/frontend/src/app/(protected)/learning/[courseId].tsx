import { View, Text, FlatList } from "react-native";

import { useLocalSearchParams } from "expo-router";

import { courses } from "@/features/learning/data/courses";

import LessonItem from "@/features/learning/components/LessonItem";
import { useAppSelector } from "@/store/hook";
import ProgressCard from "@/features/learning/components/ProgressCard";
import ScreenContainer from "@/components/common/ScreenContainer";

export default function CourseDetailsScreen() {
  const { courseId } = useLocalSearchParams<{ courseId: string }>();

  const course = courses.find((c) => c.id === courseId);

  const completedLessons = useAppSelector(
    (state) => state.learning.completedLessons,
  );

  const completedCount =
    (course?.lessons ?? []).filter((lesson) =>
      completedLessons.includes(lesson.id),
    ).length ?? 0;

  if (!course) {
    return null;
  }

  return (
    <ScreenContainer>
      <Text
        style={{
          fontSize: 24,
          fontWeight: "700",
          marginBottom: 16,
        }}
      >
        {course.title}
      </Text>

      <ProgressCard
        completed={completedCount}
        total={course?.lessons?.length ?? 0}
      />
      <FlatList
        data={course.lessons}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <LessonItem lesson={item} />}
      />
    </ScreenContainer>
  );
}

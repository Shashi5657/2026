import { View, Text, FlatList, Pressable } from "react-native";

import { useLocalSearchParams } from "expo-router";

import { courses } from "@/features/learning/data/courses";

import LessonItem from "@/features/learning/components/LessonItem";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import ProgressCard from "@/features/learning/components/ProgressCard";
import ScreenContainer from "@/components/common/ScreenContainer";
import {
  setCurrentCourse,
  updateRecentCourses,
} from "@/features/learning/store/learningSlice";
import { useEffect } from "react";

export default function CourseDetailsScreen() {
  const { courseId } = useLocalSearchParams<{ courseId: string }>();
  const dispatch = useAppDispatch();

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

  useEffect(() => {
    if (!course) return;
    dispatch(setCurrentCourse(course.id));
    dispatch(updateRecentCourses(course.id));
  }, [course, dispatch]);

  return (
    <ScreenContainer>
      <Pressable onPress={() => setCurrentCourse(course.id)}>
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
      </Pressable>
    </ScreenContainer>
  );
}

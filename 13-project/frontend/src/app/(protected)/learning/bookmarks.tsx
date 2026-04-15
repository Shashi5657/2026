import { FlatList, Text } from "react-native";

import ScreenContainer from "@/components/common/ScreenContainer";
import { useAppSelector } from "@/store/hook";
import { courses } from "@/features/learning/data/courses";
import LessonItem from "@/features/learning/components/LessonItem";

export default function BookmarksScreen() {
  const bookmarks = useAppSelector((state) => state.learning.bookmarks);

  const lessons = courses.flatMap((course) =>
    course?.lessons.filter((lesson) => bookmarks.includes(lesson.id)),
  );

  return (
    <ScreenContainer>
      <Text
        style={{
          fontSize: 26,
          fontWeight: "700",
          marginBottom: 20,
        }}
      >
        🔖 Bookmarked Lessons
      </Text>

      <FlatList
        data={lessons}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text>No bookmarked lessons yet.</Text>}
        renderItem={({ item }) => <LessonItem lesson={item} />}
      />
    </ScreenContainer>
  );
}

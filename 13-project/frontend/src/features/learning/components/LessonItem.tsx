import { Pressable, Text, View } from "react-native";

import { completeLesson } from "../store/learningSlice";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { toggleBookmark } from "../store/learningSlice";

type Props = {
  lesson: {
    id: string;
    title: string;
  };
};

export default function LessonItem({ lesson }: Props) {
  const dispatch = useAppDispatch();

  const completedLessons = useAppSelector(
    (state) => state.learning.completedLessons,
  );
  const isCompleted = completedLessons.includes(lesson.id);

  const bookmarks = useAppSelector((state) => state.learning.bookmarks);

  const isBookmarked = bookmarks.includes(lesson.id);

  return (
    <Pressable onPress={() => dispatch(completeLesson(lesson.id))}>
      <View
        style={{
          padding: 16,
          backgroundColor: "#FFF",
          marginBottom: 10,
          borderRadius: 12,
        }}
      >
        <Text
          style={{
            fontSize: 16,
          }}
        >
          {isCompleted ? "✅" : "⬜"} {lesson.title}
        </Text>
        <Pressable onPress={() => dispatch(toggleBookmark(lesson.id))}>
          <Text>{isBookmarked ? "🔖" : "📑"}</Text>
        </Pressable>
      </View>
    </Pressable>
  );
}

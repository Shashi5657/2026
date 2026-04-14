import { FlatList, View } from "react-native";

import CourseCard from "@/features/learning/components/CourseCard";
import { courses } from "@/features/learning/data/courses";
import ScreenContainer from "@/components/common/ScreenContainer";

export default function LearningScreen() {
  return (
    <ScreenContainer>
      <FlatList
        data={courses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CourseCard
            id={item.id}
            title={item.title}
            lessonCount={item.lessons?.length || 0}
          />
        )}
      />
    </ScreenContainer>
  );
}

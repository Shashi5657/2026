import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LearningState {
  currentCourseId: string | null;

  currentLessonId: string | null;

  bookmarks: string[];

  completedLessons: string[];

  recentCourses: string[];
}

const initialState: LearningState = {
  currentCourseId: null,
  currentLessonId: null,
  bookmarks: [],
  completedLessons: [],
  recentCourses: [],
};

const learningSlice = createSlice({
  name: "learning",
  initialState,
  reducers: {
    setCurrentCourse(state, action: PayloadAction<string>) {
      state.currentCourseId = action.payload;
    },
    setCurrentLesson(state, action: PayloadAction<string>) {
      state.currentLessonId = action.payload;
    },
    toggleBookmark(state, action: PayloadAction<string>) {
      const exists = state.bookmarks.includes(action.payload);

      if (exists) {
        state.bookmarks = state.bookmarks.filter((id) => id !== action.payload);
      } else {
        state.bookmarks.push(action.payload);
      }
    },
    completeLesson(state, action: PayloadAction<string>) {
      if (!state.completedLessons.includes(action.payload)) {
        state.completedLessons.push(action.payload);
      }
    },
    updateRecentCourses(state, action: PayloadAction<string>) {
      state.recentCourses = state.recentCourses.filter(
        (id) => id !== action.payload,
      );
      state.recentCourses.unshift(action.payload);

      state.recentCourses = state.recentCourses.slice(0, 5);
    },
  },
});

export const {
  setCurrentCourse,
  setCurrentLesson,
  toggleBookmark,
  completeLesson,
  updateRecentCourses,
} = learningSlice.actions;

export default learningSlice.reducer;

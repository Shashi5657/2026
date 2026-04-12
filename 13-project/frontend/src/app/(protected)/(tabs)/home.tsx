import { View, Text } from "react-native";
import React from "react";
import { useAuth } from "@/context/AuthContext";
import ScreenContainer from "@/components/common/ScreenContainer";
import GreetingCard from "@/components/dashboard/GreetingCard";
import StatCard from "@/components/dashboard/StatCard";
import SectionHeader from "@/components/dashboard/SectionHeader";
import QuickActionCards from "@/components/dashboard/QuickActionCard";
import { commonStyles, spacing } from "@/theme";
import { useTasks } from "@/features/tasks/hooks/useTasks";
import { useTaskAnalytics } from "@/features/tasks/hooks/useTaskAnalytics";
import TaskAnalyticsCard from "@/features/tasks/components/TaskAnalyticsCard";
import { Task } from "@/features/tasks/types/task.types";

export default function HomeScreen() {
  const { user } = useAuth();
  const { data } = useTasks();
  const tasks = data?.data || [];
  const {
    totalTasks,
    completedTasks,
    highPriorityTasks,
    dueTodayTasks,
    overdueTasks,
  } = useTaskAnalytics(tasks);
  const todaysFocus = tasks.filter(
    (task: Task) => !task.completed && task.priority === "HIGH",
  );

  return (
    <ScreenContainer>
      <GreetingCard name={user?.name} />
      <View
        style={{
          flexDirection: "row",

          gap: 12,

          marginTop: 16,
        }}
      >
        <TaskAnalyticsCard title="Tasks" value={totalTasks} emoji="📋" />

        <TaskAnalyticsCard
          title="Completed"
          value={completedTasks}
          emoji="✅"
        />

        <TaskAnalyticsCard title="Overdue" value={overdueTasks} emoji="⚠️" />
      </View>

      <View
        style={{
          flexDirection: "row",

          gap: 12,

          marginTop: 12,
        }}
      >
        <TaskAnalyticsCard
          title="High Priority"
          value={highPriorityTasks}
          emoji="🔥"
        />

        <TaskAnalyticsCard title="Due Today" value={dueTodayTasks} emoji="⏳" />
      </View>
      <View style={{ marginTop: spacing.xl }}>
        <SectionHeader title="Quick Action" />
        {todaysFocus.slice(0, 3).map((task: Task) => (
          <Text
            key={task.id}
            style={{
              marginTop: 8,
            }}
          >
            🔥 {task.title}
          </Text>
        ))}
      </View>

      <View
        style={[commonStyles.row, { gap: spacing.md, marginTop: spacing.md }]}
      >
        <QuickActionCards title="Learn" emoji="📚" />

        <QuickActionCards title="Tasks" emoji="✅" />
      </View>
    </ScreenContainer>
  );
}

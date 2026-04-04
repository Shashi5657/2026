import React, { useState } from "react";

import { FlatList, View, Text, RefreshControl, Pressable } from "react-native";

import TaskItem from "@/features/tasks/components/TaskItem";

import EmptyTasks from "@/features/tasks/components/EmptyTasks";

import { useTasks } from "@/features/tasks/hooks/useTasks";

import { spacing } from "@/theme/spacing";
import { useDeletetasks } from "@/features/tasks/hooks/useDeleteTasks";
import { useToggleTasks } from "@/features/tasks/hooks/useToggleTasks";
import PrimaryButton from "@/components/PrimaryButton";
import CreateTaskModal from "@/features/tasks/components/createTaskModel";
import ScreenContainer from "@/components/common/ScreenContainer";
import TaskSkeleton from "@/components/tasks/TaskSkeleton";
import { colors } from "@/theme";
import { Task } from "@/features/tasks/types/task.types";

export default function TasksScreen() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState<"all" | "pending" | "completed">("all");
  const [selectedTask, setSelectedTask] = useState<any>(null);

  const { data, isLoading, refetch, isRefetching } = useTasks();

  const deleteMutation = useDeletetasks();

  const toggleMutation = useToggleTasks();

  const tasks = data?.data ?? [];

  const filteredTasks = tasks.filter((task: Task) => {
    if (filter === "pending") {
      return !task.completed;
    }
    if (filter === "completed") {
      return task.completed;
    }

    return true;
  });

  if (isLoading) {
    return (
      <View style={{ padding: 32 }}>
        <TaskSkeleton />
      </View>
    );
  }

  return (
    <ScreenContainer>
      <View
        style={{
          flex: 1,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            gap: 8,
            marginVertical: 16,
          }}
        >
          {["all", "pending", "completed"].map((item) => (
            <Pressable
              key={item}
              onPress={() => setFilter(item as any)}
              style={{
                paddingHorizontal: 16,
                paddingVertical: 8,

                borderRadius: 20,

                backgroundColor:
                  filter === item ? colors.primary : colors.surface,
              }}
            >
              <Text
                style={{
                  color: filter === item ? colors.white : colors.textPrimary,
                }}
              >
                {item}
              </Text>
            </Pressable>
          ))}
        </View>
        <FlatList
          data={filteredTasks}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={
            <PrimaryButton
              title="+ Add Task"
              onPress={() => {
                setSelectedTask(null);

                setIsModalOpen(true);
              }}
            />
          }
          ListEmptyComponent={!isLoading ? EmptyTasks : null}
          renderItem={({ item }) => (
            <TaskItem
              task={item}
              onToggle={() => toggleMutation.mutate(item.id)}
              onDelete={() => deleteMutation.mutate(item.id)}
              onEdit={() => {
                setSelectedTask(item);
                setIsModalOpen(true);
              }}
            />
          )}
          refreshControl={
            <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
          }
        />

        <CreateTaskModal
          visible={isModalOpen}
          task={selectedTask}
          onClose={() => {
            setSelectedTask(null);
            setIsModalOpen(false);
          }}
        />
      </View>
    </ScreenContainer>
  );
}

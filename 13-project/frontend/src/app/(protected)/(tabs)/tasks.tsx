import React, { useState } from "react";

import { FlatList, View, Text } from "react-native";

import TaskItem from "@/features/tasks/components/TaskItem";

import EmptyTasks from "@/features/tasks/components/EmptyTasks";

import { useTasks } from "@/features/tasks/hooks/useTasks";

import { spacing } from "@/theme/spacing";
import { useDeletetasks } from "@/features/tasks/hooks/useDeleteTasks";
import { useToggleTasks } from "@/features/tasks/hooks/useToggleTasks";
import PrimaryButton from "@/components/PrimaryButton";
import CreateTaskModal from "@/features/tasks/components/createTaskModel";
import ScreenContainer from "@/components/common/ScreenContainer";

export default function TasksScreen() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading } = useTasks();

  const deleteMutation = useDeletetasks();

  const toggleMutation = useToggleTasks();

  const tasks = data?.data ?? [];

  return (
    <ScreenContainer>
      <View
        style={{
          flex: 1,

          padding: spacing.lg,
        }}
      >
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={
            <PrimaryButton
              title="+ Add Task"
              onPress={() => setIsModalOpen(true)}
            />
          }
          ListEmptyComponent={!isLoading ? EmptyTasks : null}
          renderItem={({ item }) => (
            <TaskItem
              task={item}
              onToggle={() => toggleMutation.mutate(item.id)}
              onDelete={() => deleteMutation.mutate(item.id)}
            />
          )}
        />

        <CreateTaskModal
          visible={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </View>
    </ScreenContainer>
  );
}

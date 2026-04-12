import React, { useMemo, useState } from "react";

export const isOverdue = (dueDate?: string) => {
  if (!dueDate) return false;

  return new Date(dueDate) < new Date();
};

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
import TaskStats from "@/features/tasks/components/TaskStats";
import TaskSearch from "@/features/tasks/components/TaskSearch";
import TaskSort from "@/features/tasks/components/TaskSort";
import CategoryFilter from "@/features/tasks/components/CategoryFilter";
import PriorityFilter from "@/features/tasks/components/PriorityFilter";

export default function TasksScreen() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState<"all" | "pending" | "completed">("all");
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<
    "oldest" | "newest" | "dueDate" | "completed"
  >("newest");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPriority, setSelectedPriority] = useState("ALL");

  const { data, isLoading, refetch, isRefetching } = useTasks();

  const deleteMutation = useDeletetasks();

  const toggleMutation = useToggleTasks();

  const tasks = data?.data ?? [];
  const { totalTasks, completedTasks, pendingTasks } = useMemo(() => {
    return {
      totalTasks: tasks.length,

      completedTasks: tasks.filter((task: Task) => task.completed).length,

      pendingTasks: tasks.filter((task: Task) => !task.completed).length,
    };
  }, [tasks]);

  const filteredTasks = useMemo(() => {
    return tasks.filter((task: Task) => {
      const matchesFilter =
        filter === "all"
          ? true
          : filter === "completed"
            ? task.completed
            : !task.completed;

      const matchesSearch = task.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" ? true : task.category === selectedCategory;

      const matchesPriority =
        selectedPriority === "ALL" ? true : task.priority === selectedPriority;

      return (
        matchesFilter && matchesSearch && matchesCategory && matchesPriority
      );
    });
  }, [tasks, filter, search, selectedCategory, selectedPriority]);

  const sortedTasks = useMemo(() => {
    const result = [...filteredTasks];

    switch (sortBy) {
      case "oldest":
        return result.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
        );

      case "dueDate":
        return result.sort(
          (a, b) =>
            new Date(a.dueDate || "9999").getTime() -
            new Date(b.dueDate || "9999").getTime(),
        );

      case "completed":
        return result.sort((a, b) => Number(b.completed) - Number(a.completed));

      default:
        return result.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );
    }
  }, [filteredTasks, sortBy]);

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
        <TaskStats
          completed={completedTasks}
          total={totalTasks}
          pending={pendingTasks}
        />
        <CategoryFilter
          value={selectedCategory}
          onChange={setSelectedCategory}
        />

        <PriorityFilter
          value={selectedPriority}
          onChange={setSelectedPriority}
        />
        <TaskSearch value={search} onChangeText={setSearch} />

        <TaskSort value={sortBy} onChange={setSortBy} />
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
          data={sortedTasks}
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
          ListEmptyComponent={
            !isLoading ? (
              <EmptyTasks
                onCreateTask={() => {
                  setSelectedTask(null);
                  setIsModalOpen(true);
                }}
              />
            ) : null
          }
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

import { Controller, useForm } from "react-hook-form";
import { useCreateTasks } from "../hooks/useCreateTasks";
import { zodResolver } from "@hookform/resolvers/zod";
import { TaskFormData, taskSchema } from "../schema/taskSchema";
import { Modal, StyleSheet, Text, View } from "react-native";
import AppInput from "@/components/common/AppInput";
import PrimaryButton from "@/components/PrimaryButton";
import { colors, radius, spacing } from "@/theme";
import { useUpdateTasks } from "../hooks/useUpdateTask";
import { useEffect } from "react";

type Props = {
  visible: boolean;
  onClose: () => void;
  task?: {
    id: string;
    title: string;
    description?: string;
  };
};

export default function CreateTaskModal({ visible, onClose, task }: Props) {
  const createTaskMutation = useCreateTasks();
  const updateTaskMutation = useUpdateTasks();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: task?.title || "",
      description: task?.description || "",
    },
  });

  const onSubmit = (data: TaskFormData) => {
    if (task) {
      updateTaskMutation.mutate(
        { taskId: task.id, payload: data },
        {
          onSuccess: () => {
            reset();
            onClose();
          },
        },
      );
      return;
    }
    createTaskMutation.mutate(data, {
      onSuccess: () => {
        reset();
        onClose();
      },
    });
  };

  useEffect(() => {
    if (task) {
      reset({
        title: task?.title,
        description: task?.description || "",
      });
    }
  }, [task, reset]);

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>{task ? "Edit " : "Create "} Task</Text>

          <Controller
            control={control}
            name="title"
            render={({ field }) => (
              <AppInput
                label="Title"
                placeholder="Enter Task Title"
                value={field.value}
                onChangeText={field.onChange}
                error={errors?.title?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="description"
            render={({ field }) => (
              <AppInput
                label="Description"
                placeholder="Optional"
                value={field.value}
                onChangeText={field.onChange}
              />
            )}
          />

          <PrimaryButton
            title={task ? "Edit Task" : "Create Task"}
            loading={createTaskMutation.isPending}
            onPress={handleSubmit(onSubmit)}
          />

          <View
            style={{
              marginTop: 12,
            }}
          >
            <PrimaryButton
              title="Cancel"
              variant="secondary"
              onPress={onClose}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,

    justifyContent: "center",

    backgroundColor: "rgba(0,0,0,0.4)",

    padding: spacing.lg,
  },

  container: {
    backgroundColor: colors.white,

    borderRadius: radius.lg,

    padding: spacing.lg,
  },

  title: {
    fontSize: 24,

    fontWeight: "700",

    marginBottom: 20,
  },
});

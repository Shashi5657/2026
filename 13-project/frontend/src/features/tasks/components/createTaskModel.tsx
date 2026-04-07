import { Controller, useForm } from "react-hook-form";
import { useCreateTasks } from "../hooks/useCreateTasks";
import { zodResolver } from "@hookform/resolvers/zod";
import { TaskFormData, taskSchema } from "../schema/taskSchema";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import AppInput from "@/components/common/AppInput";
import PrimaryButton from "@/components/PrimaryButton";
import { colors, radius, spacing } from "@/theme";
import { useUpdateTasks } from "../hooks/useUpdateTask";
import { useEffect, useState } from "react";

type Props = {
  visible: boolean;
  onClose: () => void;
  task?: {
    id: string;
    title: string;
    description?: string;
    dueDate?: string;
  };
};

export default function CreateTaskModal({ visible, onClose, task }: Props) {
  const [showDatePicker, setShowDatePicker] = useState(false);
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
      dueDate: task?.dueDate || "",
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

          <Controller
            control={control}
            name="dueDate"
            render={({ field }) => (
              <>
                <Text style={{ marginBottom: 8, fontWeight: "600" }}>
                  Due Date
                </Text>
                <Pressable
                  onPress={() => setShowDatePicker(true)}
                  style={{ borderWidth: 1, padding: 14, borderRadius: 12 }}
                >
                  <Text>
                    {field.value
                      ? new Date(field.value).toDateString()
                      : "Select due date"}
                  </Text>

                  {showDatePicker && (
                    <DateTimePicker
                      value={field.value ? new Date(field.value) : new Date()}
                      mode="date"
                      onChange={(event, selectedDate) => {
                        setShowDatePicker(false);

                        if (selectedDate) {
                          field.onChange(selectedDate.toISOString());
                        }
                      }}
                    />
                  )}
                </Pressable>
              </>
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

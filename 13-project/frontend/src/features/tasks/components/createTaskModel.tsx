import { Controller, useForm } from "react-hook-form";
import { useCreateTasks } from "../hooks/useCreateTasks";
import { zodResolver } from "@hookform/resolvers/zod";
import { TaskFormData, taskSchema } from "../schema/taskSchema";
import { Modal, StyleSheet, Text, View } from "react-native";
import AppInput from "@/components/common/AppInput";
import PrimaryButton from "@/components/PrimaryButton";
import { colors, radius, spacing } from "@/theme";

type Props = {
  visible: boolean;
  onClose: () => void;
};

export default function CreateTaskModal({ visible, onClose }: Props) {
  const createTaskMutation = useCreateTasks();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const onSubmit = (data: TaskFormData) => {
    createTaskMutation.mutate(data, {
      onSuccess: () => {
        reset();
        onClose();
      },
    });
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Create Task</Text>

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
            title="Create Task"
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

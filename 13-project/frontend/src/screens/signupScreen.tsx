import { Text } from "react-native";

import { Controller, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { loginSchema, LoginFormData } from "@/schemas/loginSchema";

import { AppInput } from "@/components/common/AppInput";
import PrimaryButton from "@/components/PrimaryButton";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSignup } from "@/hooks/useSignup";
import { SignupFormData, signupSchema } from "@/schemas/signupSchema";

export default function SignupScreen() {
  const signupMutation = useSignup();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = (data: SignupFormData) => {
    signupMutation.mutate(data, {
      onSuccess: (response) => {
        console.log(response);
      },

      onError: (error) => {
        console.log(error);
      },
    });
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        padding: 24,
      }}
    >
      <Text
        style={{
          fontSize: 32,
          fontWeight: "700",
          marginBottom: 30,
        }}
      >
        Welcome Back
      </Text>

      <Controller
        control={control}
        name="name"
        render={({ field }) => (
          <AppInput
            label="Full name"
            value={field.value || ""}
            onChangeText={field.onChange}
            error={errors.name?.message}
            placeholder="Full Name"
          />
        )}
      />

      <Controller
        control={control}
        name="email"
        render={({ field }) => (
          <AppInput
            label="Email"
            value={field.value || ""}
            onChangeText={field.onChange}
            error={errors.email?.message}
            placeholder="Email"
          />
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({ field }) => (
          <AppInput
            label="Password"
            value={field.value || ""}
            onChangeText={field.onChange}
            secureTextEntry
            error={errors.password?.message}
            placeholder="Password"
          />
        )}
      />

      <PrimaryButton
        title={signupMutation.isPending ? "Please wait..." : "Create Account"}
        onPress={handleSubmit(onSubmit)}
      />
    </SafeAreaView>
  );
}

import { Text } from "react-native";

import { Controller, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { loginSchema, LoginFormData } from "@/schemas/loginSchema";

import { useLogin } from "@/hooks/useLogin";
import { AppInput } from "@/components/common/AppInput";
import PrimaryButton from "@/components/PrimaryButton";
import { SafeAreaView } from "react-native-safe-area-context";
import { saveAccessToken } from "@/services/authStorage";
import { router } from "expo-router";

export default function LoginScreen() {
  const loginMutation = useLogin();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormData) => {
    loginMutation.mutate(data, {
      onSuccess: async (response) => {
        const token = response.data.accessToken;

        await saveAccessToken(token);

        router.replace("/dashboard");
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
        title="Login"
        variant="secondary"
        loading={loginMutation.isPending}
        onPress={handleSubmit(onSubmit)}
      />
    </SafeAreaView>
  );
}

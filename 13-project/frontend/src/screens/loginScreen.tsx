import React, { useRef } from "react";

import { Text, TouchableOpacity, TextInput } from "react-native";

import { router } from "expo-router";

import { Controller, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import Toast from "react-native-toast-message";

import ScreenContainer from "@/components/common/ScreenContainer";
import AppInput from "@/components/common/AppInput";

import AuthHeader from "@/components/auth/AuthHeader";

import { loginSchema, LoginFormData } from "@/schemas/loginSchema";

import { useLogin } from "@/hooks/useLogin";

import { saveAccessToken } from "@/services/authStorage";

import { colors } from "@/theme/colors";
import PrimaryButton from "@/components/PrimaryButton";

export default function LoginScreen() {
  const passwordRef = useRef<TextInput>(null);

  const loginMutation = useLogin();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormData) => {
    console.log("FORM DATA", data);
    loginMutation.mutate(data, {
      onSuccess: async (response) => {
        console.log("entered");
        await saveAccessToken(response.data.accessToken);

        Toast.show({
          type: "success",
          text1: "Login Successful",
        });

        router.replace("/dashboard");
      },

      onError: (error: any) => {
        console.log(
          "LOGIN ERROR",
          JSON.stringify(error?.response?.data, null, 2),
        );
        console.log(error);
        Toast.show({
          type: "error",
          text1: error?.response?.data?.message || "Something went wrong",
        });
      },
    });
  };

  return (
    <ScreenContainer>
      <AuthHeader
        title="Welcome Back 👋"
        subtitle="Login to continue your journey."
      />

      <Controller
        control={control}
        name="email"
        render={({ field }) => (
          <AppInput
            label="Email"
            placeholder="Enter email"
            value={field.value}
            onChangeText={field.onChange}
            keyboardType="email-address"
            autoCapitalize="none"
            leftIcon="mail-outline"
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current?.focus()}
            error={errors.email?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({ field }) => (
          <AppInput
            ref={passwordRef}
            label="Password"
            placeholder="Enter password"
            value={field.value}
            onChangeText={field.onChange}
            secureTextEntry
            leftIcon="lock-closed-outline"
            returnKeyType="done"
            error={errors.password?.message}
          />
        )}
      />

      <PrimaryButton
        title="Login"
        loading={loginMutation.isPending}
        onPress={handleSubmit(onSubmit)}
      />

      <TouchableOpacity
        style={{
          marginTop: 20,
          alignSelf: "center",
        }}
        onPress={() => router.push("/signup")}
      >
        <Text>
          Don't have an account?{" "}
          <Text
            style={{
              color: colors.primary,
              fontWeight: "600",
            }}
          >
            Sign Up
          </Text>
        </Text>
      </TouchableOpacity>
    </ScreenContainer>
  );
}

import { Text, TextInput } from "react-native";

import { Controller, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import PrimaryButton from "@/components/PrimaryButton";
import { useSignup } from "@/hooks/useSignup";
import { SignupFormData, signupSchema } from "@/schemas/signupSchema";
import AppInput from "@/components/common/AppInput";
import { useRef } from "react";
import Toast from "react-native-toast-message";
import { router } from "expo-router";
import ScreenContainer from "@/components/common/ScreenContainer";

export default function SignupScreen() {
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const confirmPasswordRef = useRef<TextInput>(null);
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
        Toast.show({
          type: "success",
          text1: "Account created successfully",
        });
        router.replace("/login");
        console.log(response);
      },

      onError: (error) => {
        console.log(error);
      },
    });
  };

  return (
    <ScreenContainer>
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
            leftIcon="person-circle-outline"
            onSubmitEditing={() => emailRef.current?.focus()}
            returnKeyType="next"
          />
        )}
      />

      <Controller
        control={control}
        name="email"
        render={({ field }) => (
          <AppInput
            ref={emailRef}
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
            placeholder="Enter Password"
            value={field.value || ""}
            onChangeText={field.onChange}
            secureTextEntry
            leftIcon="lock-closed-outline"
            returnKeyType="next"
            onSubmitEditing={() => confirmPasswordRef.current?.focus()}
            error={errors.password?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="confirmPassword"
        render={({ field }) => (
          <AppInput
            ref={confirmPasswordRef}
            label="Confirm Password"
            value={field.value || ""}
            onChangeText={field.onChange}
            secureTextEntry
            leftIcon="mail-outline"
            returnKeyType="done"
            error={errors.confirmPassword?.message}
            placeholder="Confirm Password"
          />
        )}
      />

      <PrimaryButton
        title={signupMutation.isPending ? "Please wait..." : "Create Account"}
        onPress={handleSubmit(onSubmit)}
      />
    </ScreenContainer>
  );
}

import { Stack } from "expo-router";
import Toast from "react-native-toast-message";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthProvider from "@/context/AuthProvider";

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Stack screenOptions={{ headerShown: false }} />
        <Toast />
      </AuthProvider>
    </QueryClientProvider>
  );
}

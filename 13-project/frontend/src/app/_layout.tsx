import { Stack } from "expo-router";
import Toast from "react-native-toast-message";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthProvider from "@/context/AuthProvider";
import { Provider } from "react-redux";
import { store } from "@/store/store";

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Stack screenOptions={{ headerShown: false }} />
          <Toast />
        </AuthProvider>
      </QueryClientProvider>
    </Provider>
  );
}

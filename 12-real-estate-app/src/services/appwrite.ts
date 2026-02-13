import { Account, Avatars, Client, OAuthProvider } from "react-native-appwrite";
import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession();

export const appwriteConfig = {
  platform: "com.shashi.realestate",
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
};

export const client = new Client();
client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId)
  .setPlatform(appwriteConfig.platform);

export const avatar = new Avatars(client);

export const account = new Account(client);

export async function login() {
  try {
    const redirectURL = Linking.createURL("/");
    const response = await account.createOAuth2Token(
      OAuthProvider.Google,
      redirectURL,
    );

    if (!response) throw new Error("Failed to login");

    const browserResult = await WebBrowser.openAuthSessionAsync(
      response.toString(),
      redirectURL,
    );

    if (browserResult.type !== "success") {
      throw new Error("Failed to login");
    }

    const url = new URL(browserResult.url);
    const secret = url.searchParams.get("secret")?.toString();
    const userId = url.searchParams.get("userId")?.toString();

    if (!secret || !userId) throw new Error("No secret or userID");

    const session = await account.createSession(userId, secret);
    if (!session) throw new Error("Failed to create a sesion");

    return true;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      return false;
    } else {
      console.error(error);
      return false;
    }
  }
}

export async function logout() {
  try {
    await account.deleteSession("current");
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function getUser() {
  try {
    const respsonse = await account.get();

    if (respsonse.$id) {
      const userAvatar = avatar.getInitials(respsonse.name);
      return {
        ...respsonse,
        avatar: userAvatar.toString(),
      };
    }
  } catch (error) {
    console.error(error);
  }
}

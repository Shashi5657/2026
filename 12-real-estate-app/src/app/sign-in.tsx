import InputField from "@/components/InputField";
import { login } from "@/services/appwrite";
import { commonStyles } from "@/styles/commonStyles";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import {
  Alert,
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type FormFields = "fullName" | "email" | "mobileNumber" | "password";

const Signin = () => {
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    fullName: "",
    email: "",
    mobileNumber: "",
    password: "",
  });

  const handleTextChange = (text: string, field: FormFields) => {
    setValues((prev) => ({ ...prev, [field]: text }));
  };

  const handleSaveValues = () => {
    console.log(values, ":values");
  };

  const handleLogin = async () => {
    setLoading(true);

    try {
      const result = await login();
      if (result) {
        console.log("login success");
      } else {
        Alert.alert("Error", "Failed to login");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        {/* Hero Section */}
        <ImageBackground
          source={require("../../assets/images/new-york-city.jpg")}
          style={styles.heroImage}
        >
          <LinearGradient
            colors={["transparent", "rgba(255,255,255,0.95)", "#FFFFFF"]}
            style={styles.gradient}
          />

          <View style={styles.logoWrapper}>
            <Image
              source={require("../../assets/app-icon/real-estate-app-icon.png")}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
        </ImageBackground>

        {/* Content Card */}
        <View style={styles.contentCard}>
          <Text style={styles.heading}>Welcome to Restate</Text>

          <Text style={styles.subHeading}>
            Discover premium homes, apartments, and investment opportunities.
          </Text>

          {/* Google Button */}
          <Pressable
            onPress={handleLogin}
            style={({ pressed }) => [
              styles.googleButton,
              pressed && { opacity: 0.85 },
            ]}
          >
            <Ionicons name="logo-google" size={22} color="#DB4437" />

            <Text style={styles.googleButtonText}>
              {loading ? "Signing In..." : "Continue with Google"}
            </Text>
          </Pressable>

          {/* Divider */}
          <View style={styles.dividerRow}>
            <View style={styles.divider} />
            <Text style={styles.dividerText}>Trusted Platform</Text>
            <View style={styles.divider} />
          </View>

          {/* Trust Features */}
          <View style={styles.featuresContainer}>
            <View style={styles.featureRow}>
              <Ionicons name="shield-checkmark" size={18} color="#22C55E" />
              <Text style={styles.featureText}>Verified Listings</Text>
            </View>

            <View style={styles.featureRow}>
              <Ionicons name="people" size={18} color="#22C55E" />
              <Text style={styles.featureText}>Trusted Agents</Text>
            </View>

            <View style={styles.featureRow}>
              <Ionicons name="lock-closed" size={18} color="#22C55E" />
              <Text style={styles.featureText}>Secure Transactions</Text>
            </View>
          </View>

          <Text style={styles.footerText}>
            By continuing, you agree to our Terms of Service and Privacy Policy.
          </Text>

          <Text style={{ fontSize: 24, fontWeight: "bold", margin: 10 }}>
            SignUp Guide
          </Text>

          <View>
            <InputField
              label="Full Name"
              autoCapitalize="words"
              placeholder="Enter Your Full Name"
              value={values.fullName}
              onChangeText={(text) => handleTextChange(text, "fullName")}
            />

            <InputField
              label="Email Address"
              placeholder="Enter Your Email Address"
              keyboardType="email-address"
              autoCapitalize="none"
              value={values.email}
              onChangeText={(text) => handleTextChange(text, "email")}
            />

            <InputField
              label="Mobile Number"
              value={values.mobileNumber}
              onChangeText={(text) => handleTextChange(text, "mobileNumber")}
              placeholder="Enter Your Mobile Number"
              keyboardType="phone-pad"
              maxLength={10}
            />

            <Text>Password</Text>
            <TextInput
              secureTextEntry
              style={styles.textinput}
              placeholder="Enter Your Password"
              keyboardType="default"
            />
            {/* <Text>Role: React Native Developer</Text>
        <Text>Location: Hyderabad</Text> */}
          </View>

          <Pressable
            onPress={() => handleSaveValues()}
            onLongPress={() => console.log("Long pressed")}
            style={({ pressed }) => [styles.button, pressed && styles.pressed]}
          >
            <Text style={{ color: "black", fontWeight: "bold" }}>Sign up</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Signin;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFF",
  },

  heroImage: {
    width: "100%",
    height: 360,
    justifyContent: "flex-start",
    alignItems: "center",
  },

  gradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 180,
  },

  logoWrapper: {
    marginTop: 60,
    backgroundColor: "rgba(255,255,255,0.95)",
    padding: 12,
    borderRadius: 24,
  },

  logo: {
    width: 90,
    height: 90,
  },

  contentCard: {
    backgroundColor: "#FFF",
    marginTop: -40,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 24,
    paddingTop: 28,
    paddingBottom: 32,
  },

  heading: {
    fontSize: 30,
    fontWeight: "700",
    textAlign: "center",
    color: "#111827",
  },

  subHeading: {
    fontSize: 16,
    textAlign: "center",
    color: "#6B7280",
    marginTop: 12,
    lineHeight: 24,
    paddingHorizontal: 10,
  },

  googleButton: {
    marginTop: 32,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 18,
    paddingVertical: 16,
  },

  googleButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },

  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 32,
    gap: 12,
  },

  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "#E5E7EB",
  },

  dividerText: {
    color: "#9CA3AF",
    fontSize: 12,
  },

  featuresContainer: {
    marginTop: 24,
    gap: 16,
  },

  featureRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  featureText: {
    fontSize: 15,
    color: "#374151",
    fontWeight: "500",
  },

  footerText: {
    marginTop: 28,
    textAlign: "center",
    fontSize: 12,
    color: "#9CA3AF",
    lineHeight: 18,
  },
  textinput: {
    borderWidth: 2,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
    marginBottom: 3,
  },
  button: {
    padding: 10,
    borderWidth: 2,
    borderRadius: 10,
    margin: 10,
    backgroundColor: "#fcfc31",
  },
  pressed: {
    opacity: 0.7,
  },
});

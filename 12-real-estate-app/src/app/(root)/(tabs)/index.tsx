import InputField from "@/components/InputField";
import { Link } from "expo-router";
import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Image,
  ImageBackground,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type FormFields = "fullName" | "email" | "mobileNumber" | "password";

const Home = () => {
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

  return (
    <SafeAreaView>
      <View
        style={{
          padding: 30,
          borderRadius: 3,
          borderWidth: 2,
          borderColor: "#000000",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ImageBackground
          blurRadius={10}
          source={require("../../../../assets/images/background-image.jpg")}
          style={{
            width: "100%",
            height: 200,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={require("../../../../assets/app-icon/real-estate-app-icon.png")}
            style={{
              width: 150,
              height: 150,
            }}
            resizeMode="contain"
          />
        </ImageBackground>

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

        {/* <Link href="/sign-in">Sign in</Link> */}
        <Link href="/Explore">Explore</Link>
        <Link href="/Profile">Profile</Link>
        <Link href="./properties/1">Property</Link>
        <Link href="/sign-in">signin</Link>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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

export default Home;

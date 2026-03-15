import { colors, spacing, typography } from "@/theme";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
const { width } = Dimensions.get("window");

const OnboardingItem = ({ item }: any) => {
  return (
    <View style={styles.container}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.title}> {item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );
};

export default OnboardingItem;

const styles = StyleSheet.create({
  container: {
    width,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  image: {
    width: 280,
    height: 280,
    resizeMode: "contain",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginTop: 20,
  },

  description: {
    textAlign: "center",
    marginTop: spacing.md,
    fontSize: typography.body.fontSize,
    color: colors.textPrimary,
  },
});

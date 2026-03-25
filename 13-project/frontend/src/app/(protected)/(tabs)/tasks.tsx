import { View, Text } from "react-native";

import { commonStyles } from "@/theme/commonStyles";

export default function TasksScreen() {
  return (
    <View style={[commonStyles.flex1, commonStyles.center]}>
      <Text>✅ No Tasks Yet</Text>

      <Text>Task Module Coming Soon</Text>
    </View>
  );
}

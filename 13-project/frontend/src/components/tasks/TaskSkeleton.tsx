import { View } from "react-native";

export default function TaskSkeleton() {
  return (
    <>
      {[1, 2, 3, 4].map((item) => {
        return (
          <View
            key={item}
            style={{
              height: 70,
              backgroundColor: "#E2E8F0",
              borderRadius: 12,
              marginBottom: 12,
            }}
          />
        );
      })}
    </>
  );
}

import { View } from "react-native";

const PaginationDots = ({ currentIndex, total }: any) => {
  return (
    <View
      style={{
        flexDirection: "row",
        gap: 8,
      }}
    >
      {Array.from({ length: total }).map((_, index) => (
        <View
          key={index}
          style={{
            width: currentIndex === index ? 24 : 8,
            height: 8,
            borderRadius: 20,
            backgroundColor: currentIndex === index ? "#2563EB" : "#CBD5E1",
          }}
        ></View>
      ))}
    </View>
  );
};

export default PaginationDots;

import { Link } from "expo-router";
import { useContext, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  FlatList,
  SectionList,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth, UserContext } from "./_layout";

const properties = [
  {
    id: "1",
    title: "Luxury Villa",
    location: "Banjara Hills, Hyderabad",
    price: "₹2.5 Cr",
    bedrooms: 4,
    bathrooms: 5,
    area: "4200 sqft",
    rating: 4.8,
    featured: true,
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994",
  },
  {
    id: "2",
    title: "Modern Apartment",
    location: "Gachibowli, Hyderabad",
    price: "₹85 Lakh",
    bedrooms: 3,
    bathrooms: 2,
    area: "1800 sqft",
    rating: 4.5,
    featured: false,
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be",
  },
  {
    id: "3",
    title: "Farm House",
    location: "Shamshabad",
    price: "₹1.8 Cr",
    bedrooms: 5,
    bathrooms: 4,
    area: "5000 sqft",
    rating: 4.9,
    featured: true,
    image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233",
  },
];

const propertySections = [
  {
    title: "Featured Properties",
    data: [
      {
        id: "1",
        title: "Luxury Villa",
        price: "₹2.5 Cr",
      },
      {
        id: "2",
        title: "Farm House",
        price: "₹1.8 Cr",
      },
    ],
  },

  {
    title: "Apartments",
    data: [
      {
        id: "3",
        title: "Modern Apartment",
        price: "₹85 Lakh",
      },
      {
        id: "4",
        title: "Studio Apartment",
        price: "₹45 Lakh",
      },
    ],
  },

  {
    title: "Commercial",
    data: [
      {
        id: "5",
        title: "Office Space",
        price: "₹1.2 Cr",
      },
      {
        id: "6",
        title: "Retail Shop",
        price: "₹90 Lakh",
      },
    ],
  },
];

const renderProperty = ({ item }: any) => (
  <View style={styles.card}>
    <Image source={{ uri: item.image }} style={styles.propertyImage} />

    <View style={styles.cardContent}>
      <Text style={styles.propertyTitle}>{item.title}</Text>

      <Text>{item.location}</Text>

      <Text style={styles.price}>{item.price}</Text>

      <Text>
        🛏 {item.bedrooms} Beds • 🚿 {item.bathrooms} Baths
      </Text>

      <Text>📐 {item.area}</Text>

      <Text>⭐ {item.rating}</Text>
    </View>
  </View>
);

export default function Home() {
  const { user, login } = useAuth();
  useEffect(() => {
    const timer = setInterval(() => {
      console.log("Tick");
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        contentContainerStyle={styles.container}
        data={properties}
        keyExtractor={(item) => item.id}
        renderItem={renderProperty}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
        ListHeaderComponent={() => (
          <ImageBackground
            blurRadius={10}
            source={require("../../../../assets/images/background-image.jpg")}
            style={styles.headerImage}
          >
            <Image
              source={require("../../../../assets/app-icon/real-estate-app-icon.png")}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text>{userName}</Text>
            <Pressable onPress={() => setUserName("Shashi")}>
              <Text> Change Name</Text>
            </Pressable>
          </ImageBackground>
        )}
        ListFooterComponent={() => (
          <View style={styles.footer}>
            <SectionList
              sections={propertySections}
              keyExtractor={(item) => item.id}
              renderSectionHeader={({ section }) => (
                <Text style={styles.sectionHeader}>{section.title}</Text>
              )}
              renderItem={({ item }) => (
                <View style={styles.sectionCard}>
                  <Text>{item.title}</Text>
                  <Text>{item.price}</Text>
                </View>
              )}
            />
            <Link href="/Explore">Explore</Link>
            <Link href="/Profile">Profile</Link>
            <Link href="./properties/5">Property</Link>
            <Link href="/sign-in">Signin</Link>
          </View>
        )}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No Properties Found</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },

  headerImage: {
    width: "100%",
    height: 220,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    borderRadius: 12,
    overflow: "hidden",
  },

  logo: {
    width: 150,
    height: 150,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    elevation: 4,
    marginBottom: 10,
  },

  propertyImage: {
    width: "100%",
    height: 200,
  },

  cardContent: {
    padding: 15,
  },

  propertyTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },

  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: "green",
    marginVertical: 5,
  },

  footer: {
    marginTop: 20,
    gap: 10,
  },

  emptyContainer: {
    alignItems: "center",
    marginTop: 50,
  },

  emptyText: {
    fontSize: 18,
    color: "gray",
  },

  sectionHeader: {
    fontSize: 22,
    fontWeight: "bold",
    backgroundColor: "#f5f5f5",
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginTop: 20,
    borderLeftWidth: 4,
    borderLeftColor: "#2563eb",
  },

  sectionCard: {
    backgroundColor: "#ffffff",
    marginHorizontal: 15,
    marginVertical: 6,
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    elevation: 3, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
});

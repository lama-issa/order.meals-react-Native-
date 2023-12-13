import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Categories } from "../data/dummy-data";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const CategoriesScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Categories Screen",
      headerLeft: () => (
        <TouchableOpacity
          style={{ marginLeft: 10 }}
          onPress={() => navigation.toggleDrawer()}
        >
          <Ionicons
            name="ios-menu"
            size={30}
            color="white"
            style={{ marginRight: 20 }}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const renderGridItem = (itemData) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("CatMeals", { catId: itemData.item.id })
        }
        style={styles.gridItem}
      >
        <View
          style={{ ...styles.textcont, backgroundColor: itemData.item.color }}
        >
          <Text style={styles.text}>{itemData.item.title}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      keyExtractor={(item, index) => item.id}
      data={Categories}
      numColumns={2}
      renderItem={renderGridItem}
    />
  );
};

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    height: 150,
    margin: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    borderRadius: 10,
    shadowOpacity: 0.95,
    shadowRadius: 10,
    // For Android
    elevation: 5,
  },
  textcont: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  text: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
  },
});

export default CategoriesScreen;

//CatMeals: routeName    || catId:parms
// forward catId to CategoryMeals component as a parms
//itemData :object available in FlatList that have item proberty and index as  {"index": 0, "item": {"color": "#f5428d", "id": "c1", "title": "Italian"}
// itemData.item--- contans Categories array as "item": {"color": "#f5428d", "id": "c1", "title": "Italian"}

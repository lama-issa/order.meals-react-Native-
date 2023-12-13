import React, { useEffect } from "react";
import MealList from "../components/MealList";
// import { meals } from "../data/dummy-data"; //if no use redux
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux"; // to get meals array from store (inside reducer)
import DefaultText from "../components/DefaultText";

const FavoritesScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "your Favorites",

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

  //availableMeals == meals array from data/dummy-data
  // بشكل مباشرmeals-array بدل ما استخدم useSelector--reduxبدي اياها تكون محفوظة في كل الصفحات فبستخدمmeals-array لان الداتا الموجودة في

  const FavMeal = useSelector((state) => state.meals.favoriteMeals); //if use redux
  if (FavMeal.length === 0 || !FavMeal) {
    // no FavMeal
    return (
      <View style={styles.contant}>
        <DefaultText>No Favorites Meals Found. Start adding some!</DefaultText>
      </View>
    );
  }
  return <MealList listData={FavMeal} navigation={navigation} />;

  // const FavMeal = meals.filter((meal) => meal.id === "m1" || meal.id === "m1"); //if no use redux

  //state.meals ---- from App.js from rootReducer
  //.favoriteMeals ---- from store-reducer-meals.js-initialState
};
const styles = StyleSheet.create({
  contant: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default FavoritesScreen;

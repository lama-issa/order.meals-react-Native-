import React, { useEffect } from "react";
import { Categories } from "../data/dummy-data";
import MealList from "../components/MealList";
import { useSelector } from "react-redux";
import { View, StyleSheet } from "react-native";
import DefaultText from "../components/DefaultText";

const CategoryMeals = ({ route, navigation }) => {
  const { catId } = route.params;

  const availableMeals = useSelector((state) => state.meals.filteredMeals);

  const displayMeals = availableMeals.filter(
    (item) => item.categoryIds.indexOf(catId) >= 0
  );

  if (displayMeals.length === 0) {
    return (
      <View style={styles.contant}>
        <DefaultText>No meals found,Check your filters!!</DefaultText>
      </View>
    );
  }

  //if item.categoryIds.indexOf(catId)<0) so catId is not part of categoryIds

  // const selectedCategory = Categories.find((cat) => cat.id === catId);

  //find method is an array method in JavaScript that is used to find the first element in the array that satisfies a provided testing function. It returns the first element that makes the function return true
  //selectedCategory will contain the category object with the specified catId if such a category exists in the Categories array. It's a common pattern in programming to use find to locate an item in an array based on a specific condition.

  useEffect(() => {
    const selectedCategory = Categories.find((cat) => cat.id === catId);

    if (selectedCategory) {
      navigation.setOptions({
        headerTitle: selectedCategory.title,
      });
    }
  }, [catId, navigation]);

  return <MealList listData={displayMeals} navigation={navigation} />;
};
const styles = StyleSheet.create({
  contant: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default CategoryMeals;

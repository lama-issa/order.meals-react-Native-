import React from "react";
import { StyleSheet, FlatList, View } from "react-native";
import MealItem from "./MealItem";
import { useSelector } from "react-redux";

const MealList = (props) => {
  const { navigation } = props; // Destructure navigation from props
  const favoriteMeals = useSelector((state) => state.meals.favoriteMeals);
  
  const renderMealsItem = (itemData) => {
    const isFaveriote = favoriteMeals.some(
      (meal) => meal.id === itemData.item.id
    );
    return (
      <MealItem
        title={itemData.item.title}
        duration={itemData.item.duration}
        complexity={itemData.item.complexity.toUpperCase()}
        affordable={itemData.item.affordability}
        Image={itemData.item.imgUrl}
        onSelectMeal={() => {
          navigation.navigate("MealDetails", {
            mealId: itemData.item.id,
            mealTitle: itemData.item.title,
            isFav: isFaveriote,
          });
        }}
      />
    );
  };

  return (
    <View style={styles.list}>
      <FlatList
        data={props.listData}
        keyExtractor={(item, index) => item.id}
        renderItem={renderMealsItem}
        style={{ width: "100%" }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MealList;

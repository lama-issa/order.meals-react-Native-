import React, { useEffect, useCallback } from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";
import DefaultText from "../components/DefaultText";
import { toggleFavorite } from "../store/action/meals";
//useSelector to get data from the Redux store, useDispatch to get the dispatch function.
const ListItem = (props) => {
  return (
    <View style={styles.listItem}>
      <DefaultText>{props.children}</DefaultText>
    </View>
  );
};

const MealDetails = ({ route, navigation }) => {
  const { mealId } = route.params;
  const { mealTitle } = route.params;

  const availableMeals = useSelector((state) => state.meals.mealss); // if using Redux
  const currentMealsIsFavorite = useSelector( //currentMealsIsFavorite is a boolean variable indicating whether the current meal is part of the user's favorite meals based on the presence of its id in the favoriteMeals array in the Redux state.
    (state) => state.meals.favoriteMeals.some((meal) => meal.id === mealId) //mean this meals is part of favorite
  ); //to get all my favorite meals
  //some: method return true if any items in  favoriteMeals match this  condition
  const selectedMeals = availableMeals.find((meal) => meal.id === mealId);

  const dispatch = useDispatch();

  // const toggleFavoriteHandler = useCallback(() => {
  //   dispatch(toggleFavorite(mealId));
  // }, [dispatch, mealId]);

  const toggleFavoriteHandler = useCallback(() => { // dispatches the toggleFavorite action and updates the isFav parameter in navigation params.
    dispatch(toggleFavorite(mealId));
    navigation.setParams({ isFav: !isFaveriote }); //This is done to toggle the favorite status when the user interacts with the "favorite" button.
  }, [dispatch, mealId, isFaveriote, navigation]);
  

  useEffect(() => {
    navigation.setParams({ isFav: currentMealsIsFavorite });
  }, [currentMealsIsFavorite]); // when currentMealsIsFavorite is changed then forward new information to the header

  const isFaveriote = route.params.isFav; // retreive information

  useEffect(() => {
    navigation.setOptions({
      headerTitle: mealTitle,
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="favorite"
            iconName={isFaveriote ? "ios-star" : "ios-star-outline"}
            onPress={toggleFavoriteHandler}
          />
        </HeaderButtons>
      ),
    });
  }, [mealTitle, navigation, toggleFavoriteHandler, isFaveriote]);
  
  return (
    <ScrollView>
      <Image source={{ uri: selectedMeals.imgUrl }} style={styles.image} />
      <View style={styles.details}>
        <DefaultText>{selectedMeals.duration}m</DefaultText>
        <DefaultText>{selectedMeals.complexity.toUpperCase()}</DefaultText>
        <DefaultText>{selectedMeals.affordability.toUpperCase()}</DefaultText>
      </View>
      <Text style={styles.title}>Ingredients</Text>
      {selectedMeals.ingredients.map((ingred) => (
        <ListItem key={ingred}>{ingred}</ListItem>
      ))}

      <Text style={styles.title}>Steps</Text>
      {selectedMeals.steps.map((step) => (
        <ListItem key={step}>{step}</ListItem>
      ))}
    </ScrollView>
  );
};
/* <View style={styles.screen}>
        <Text>{selectedMeals.title}</Text>
        <Button
          title="Go Back To Categories"
          onPress={() => {
            navigation.popToTop();
          }}
        />
      </View> */

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 200,
  },
  details: {
    flexDirection: "row",
    padding: 15,
    justifyContent: "space-around",
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 20,
    textAlign: "center",
  },
  listItem: {
    marginVertical: 10,
    marginHorizontal: 20,
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
  },
});
//useSelector  كاملة stateبتوصل ل
//useDispatch:state لحتى اعدل على قيمة 

export default MealDetails;

// import React, { useCallback, useEffect } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   Button,
//   ScrollView,
//   Image,
// } from "react-native";
// // import { meals } from "../data/dummy-data";
// import { useSelector, useDispatch } from "react-redux";
// import { HeaderButtons, Item } from "react-navigation-header-buttons";
// import HeaderButton from "../components/HeaderButton";
// import DefaultText from "../components/DefaultText";
// import { toggleFavorite } from "../store/action/meals";

// const ListItem = (props) => {
//   return (
//     <View style={styles.listItem}>
//       <DefaultText>{props.children}</DefaultText>
//     </View>
//   );
// };

// const MealDetails = ({ route, navigation }) => {
//   const { mealId } = route.params;
//   const { mealTitle } = route.params;

//   const availableMeals = useSelector((state) => state.meals.mealss); // if using Redux

//   const selectedMeals = availableMeals.find((meal) => meal.id === mealId);

//   const dispatch = useDispatch();

//   const toggleFavoriteHandler = useCallback(() => {
//     dispatch(toggleFavorite(mealId));
//   }, [dispatch, mealId]);

//   useEffect(() => {
//     // navigation.setParams({ mealTitle: selectedMeals.title }); //setParams to anew value to forward the selectedMeals (tiltle to header)(i send this param to my header when this component renders)
//     navigation.setParams({ toggleFav: toggleFavoriteHandler });
//   }, [toggleFavoriteHandler]);

//   const toggleFavorites = route.params.toggleFav; //== const toggleFavorites = navigation.getParam("toggleFav");

//   useEffect(() => {
//     if (selectedMeals) {
//       navigation.setOptions({
//         headerTitle: mealTitle,

//         headerRight: () => (
//           <HeaderButtons HeaderButtonComponent={HeaderButton}>
//             <Item
//               title="favorite"
//               iconName="ios-star"
//               onPress={toggleFavorites}
//             />
//           </HeaderButtons>
//         ),
//       });
//     }
//   }, [mealId, navigation, selectedMeals, mealTitle, toggleFavorites]);

//   return (
//     <ScrollView>
//       <Image source={{ uri: selectedMeals.imgUrl }} style={styles.image} />
//       <View style={styles.details}>
//         <DefaultText>{selectedMeals.duration}m</DefaultText>
//         <DefaultText>{selectedMeals.complexity.toUpperCase()}</DefaultText>
//         <DefaultText>
//           {selectedMeals.affordability.toUpperCase()}
//         </DefaultText>
//       </View>
//       <Text style={styles.title}>Ingredients</Text>
//       {selectedMeals.ingredients.map((ingred) => (
//         <ListItem key={ingred}>{ingred}</ListItem>
//       ))}

//       <Text style={styles.title}>Steps</Text>
//       {selectedMeals.steps.map((step) => (
//         <ListItem key={step}>{step}</ListItem>
//       ))}
//     </ScrollView>
//   );
// };
//   /* <View style={styles.screen}>
//         <Text>{selectedMeals.title}</Text>
//         <Button
//           title="Go Back To Categories"
//           onPress={() => {
//             navigation.popToTop();
//           }}
//         />
//       </View> */

// const styles = StyleSheet.create({
//   image: {
//     width: "100%",
//     height: 200,
//   },
//   details: {
//     flexDirection: "row",
//     padding: 15,
//     justifyContent: "space-around",
//   },
//   title: {
//     fontFamily: "open-sans-bold",
//     fontSize: 20,
//     textAlign: "center",
//   },
//   listItem: {
//     marginVertical: 10,
//     marginHorizontal: 20,
//     borderColor: "#ccc",
//     borderWidth: 1,
//     padding: 10,
//   },
// });

// export default MealDetails;

// WARN  Non-serializable values were found in the navigation state. Check:( MealsFav > Meals > MealDetails > params.toggleFav (Function)
// The warning you're seeing is due to trying to serialize a function in the navigation state. React Navigation expects the state to be serializable, and functions are not serializable.

// In your case, the function toggleFavoriteHandler is being set as a parameter in the navigation state, and this is causing the warning. To resolve this, you can consider a different approach.

// One common pattern is to use the useEffect hook with navigation listeners to update the header dynamically. Instead of storing the function in the navigation state, you can dispatch the action directly when the header button is pressed.
// In this version, the toggleFavoriteHandler function is directly invoked when the header button is pressed, and you don't need to store it in the navigation state. This should help resolve the warning.

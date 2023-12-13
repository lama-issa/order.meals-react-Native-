// AppNavigator.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Colors from "../constants/Colors";
import CategoriesScreen from "../screens/CategoriesScreen";
import CategoryMeals from "../screens/CategoryMeals";
import MealDetails from "../screens/MealDetailes";
import FavoritesScreen from "../screens/FavoritesScreen";
import { Ionicons } from "@expo/vector-icons";
import FiltersScreen from "../screens/FiltersScreen";
import { Text } from "react-native-paper";

const defaultStackNavOptions = {
  headerStyle: {
    backgroundColor: Colors.primary,
  },
  headerTitleStyle: { fontFamily: "open-sans-bold" },
  headerTintColor: "white",
  headerTitle: "A Screen",
};

const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();
const Drawer = createDrawerNavigator();

const MealsNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Categories"
      screenOptions={{
        ...defaultStackNavOptions,
      }}
    >
      <Stack.Screen name="Categories" component={CategoriesScreen} />
      <Stack.Screen name="CatMeals" component={CategoryMeals} />
      <Stack.Screen name="MealDetails" component={MealDetails} />
    </Stack.Navigator>
  );
};

const FavNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        ...defaultStackNavOptions,
      }}
    >
      <Stack.Screen name="Fav" component={FavoritesScreen} />
      <Stack.Screen name="FavMealDetail" component={MealDetails} />
    </Stack.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{
          headerShown: false, // Hide the default header in all screens
          drawerActiveTintColor: Colors.accent, // Set the active tint color for the Meals screen to red
        }}
      >
        <Drawer.Screen
          name="MealsFav"
          component={TabNavigator}
          options={{ drawerLabel: "Meals" }}
        />
        <Drawer.Screen name="Filters" component={FilterNavigator} />
        {/* Other Drawer Screens */}
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

const TabNavigator = () => {
  return (
    <Tab.Navigator
      activeColor={Colors.accent}
      shifting={false}
      barStyle={{ backgroundColor: Colors.primary }}
    >
      <Tab.Screen
        name="Meals"
        component={MealsNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="ios-restaurant" size={25} color={color} />
          ),
          tabBarColor: Colors.accent,
          tabBarLabel: (
            <Text
              style={{
                fontFamily: "open-sans-bold",
                fontSize: 16,
                marginTop: 10,
              }}
            >
              Meals
            </Text>
          ),
          tabBarActiveTintColor: Colors.primary, // Set the active text and icon color
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="ios-star" size={25} color={color} />
          ),
          tabBarColor: Colors.accent,
          tabBarLabel: (
            <Text
              style={{
                fontFamily: "open-sans-bold",
                fontSize: 16,
                marginTop: 10,
              }}
            >
              Favorites
            </Text>
          ),
          tabBarActiveTintColor: Colors.primary, // Set the active text and icon color
        }}
      />
    </Tab.Navigator>
  );
};

const FilterNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        ...defaultStackNavOptions,
      }}
    >
      <Stack.Screen name="FiltersStack" component={FiltersScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;

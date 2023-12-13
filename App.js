import React, { useState, useEffect } from "react";
import MealsNavigator from "./navigation/MealsNavigator";
import { enableScreens } from "react-native-screens";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
//expo install expo-splash-screen
import { createStore, combineReducers } from "redux";
import mealsReducer from "./store/reducers/meals";
import { Provider } from "react-redux";

enableScreens();

const rootReducer = combineReducers({
  meals: mealsReducer, //slice of state
});
const store = createStore(rootReducer);
//createStore takes a Reducer

const fetchFonts = async () => {
  try {
    await Font.loadAsync({
      "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
      "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
    });
  } catch (error) {
    console.error("Error loading fonts:", error);
  }
};

export default function App() {
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    const loadAppResources = async () => {
      try {
        await SplashScreen.preventAutoHideAsync();
        await fetchFonts();
        await SplashScreen.hideAsync();
        setDataLoaded(true);
      } catch (error) {
        console.error("Error loading app resources:", error);
      }
    };

    loadAppResources();
  }, []);

  if (!dataLoaded) {
    return null; // or a loading indicator if needed
  }

  return (
    <Provider store={store}>
      <MealsNavigator />
    </Provider>
  );
}

import { meals } from "../../data/dummy-data";
import { TOGGLE_FAVORITE, SET_FILTERS } from "../action/meals";

const initialState = {
  mealss: meals,
  filteredMeals: meals,
  favoriteMeals: [],
  // favoriteMeals: []: initial is empty array because when app start we have no favorite meals
};
const mealsReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_FAVORITE:
      const existingIndex = state.favoriteMeals.findIndex(
        (meal) => meal.id === action.mealId
      );
      if (existingIndex >= 0) {
        const updatedFavMeals = [...state.favoriteMeals];
        updatedFavMeals.splice(existingIndex, 1);
        return { ...state, favoriteMeals: updatedFavMeals };
      } else {
        const meal = state.mealss.find((meal) => meal.id === action.mealId);
        return { ...state, favoriteMeals: state.favoriteMeals.concat(meal) };
      }
    case SET_FILTERS:
      const appliedFilters = action.filters;
      const updatedfilteredMeals = state.mealss.filter((meal) => {
        if (appliedFilters.glutenFree && !meal.isGlutenFree) { //meal should be droped
          return false;
        }
        if (appliedFilters.LactoseFree && !meal.isLactoseFree) { //meal should be droped
          return false;
        }
        if (appliedFilters.Vegan && !meal.isVegan) { //meal should be droped
          return false;
        }
        if (appliedFilters.Vegetarinan && !meal.isVegetarian) { //meal should be droped
          return false;
        }
        return true;
      });
      return {...state,filteredMeals:updatedfilteredMeals}
    
    default:
      return state;
  }
};
export default mealsReducer;

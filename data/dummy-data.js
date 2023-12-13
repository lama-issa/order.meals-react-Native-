import category from "../models/category";
import MealModel from "../models/Meal"; 

export const Categories = [
  new category("c1", "Italian", "#f5428d"),
  new category("c2", "French", "#f54242"),
  new category("c3", "Asian", "#f5a442"),
  new category("c4", "nnnn", "#f5d142"),
  new category("c5", "rrr", "#368dff"),
  new category("c6", "ooo", "#BC8F8F"),
];

export const meals = [
  new MealModel(
    "m1",
    ["c1", "c2"],
    "Supreme Pizza",
    "Affordable",
    "Easy",
    "https://www.southernliving.com/thmb/3x3cJaiOvQ8-3YxtMQX0vvh1hQw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/2652401_QFSSL_SupremePizza_00072-d910a935ba7d448e8c7545a963ed7101.jpg",
    30,
    ["400g ground beef", "1 Tomato", "2 Burger buns"],
    ["Form 2 patties", "Fry the patties", "Serve burger with Tomato"],
    true,
    false,
    true,
    false
  ),

  new MealModel(
    "m6",
    ["c1"],
    "Classic Hamburger",
    "Affordable",
    "Easy",
    "https://www.shutterstock.com/image-photo/classic-hamburger-stock-photo-isolated-600nw-2282033179.jpg",
    30,
    ["400g ground beef", "1 Tomato", "2 Burger buns"],
    ["Form 2 patties", "Fry the patties", "Serve burger with Tomato"],
    true,
    false,
    true,
    true
  ),

  new MealModel(
    "m2",
    ["c3", "c4"],
    "Another Meal",
    "Moderate",
    "Intermediate",
    "https://w7.pngwing.com/pngs/692/99/png-transparent-hamburger-street-food-seafood-fast-food-delicious-food-salmon-with-vegetables-salad-in-plate-leaf-vegetable-food-recipe-thumbnail.png",
    45,
    ["Ingredient 1", "Ingredient 2", "Ingredient 3"],
    ["Step 1", "Step 2", "Step 3"],
    false,
    true,
    false,
    true
  ),
];

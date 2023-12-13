import React, { useCallback, useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Switch } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import { useDispatch } from "react-redux";
import {setFilters} from "../store/action/meals"
//propsلما بدنا نكرر الكود اكثر من مرة بس بتغيير اشياء بسيطة فبنعمل كمبوننت اخر خارج الكمبوننت الاصلي وبنحط فيه الكود الي رح يتكرر وبنبعثله المتغيرات من خلال
//<FilterSwitch/>فبدل ما نكرر الكود بنحطه هون وفي كل مرة بنا اياه نستدعيه من خلال
const FilterSwitch = (props) => {
  return (
    <View style={styles.filtercont}>
      <Text>{props.label}</Text>
      <Switch
        trackColor={{ true: Colors.primary }}
        thumbColor={Colors.primary}
        value={props.state}
        onValueChange={props.onChange}
      />
    </View>
  );
};

const FiltersScreen = () => {
  const [isGlutenFee, setIsGlutenFee] = useState(false);
  const [isLactose, setIsLactose] = useState(false);
  const [isVegan, setIsVegan] = useState(false);
  const [isVegetarinan, setIsVegetarinan] = useState(false);
  const dispatch = useDispatch();

  const navigation = useNavigation();

  const saveFilters = useCallback(() => {
    const appliedFilters = {
      glutenFree: isGlutenFee,
      LactoseFree: isLactose,
      Vegan: isVegan,
      Vegetarinan: isVegetarinan,
    };

    dispatch(setFilters(appliedFilters));
  }, [dispatch, isGlutenFee, isLactose, isVegan, isVegetarinan]);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Filters meal",
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
      headerRight: () => (
        <TouchableOpacity onPress={() => saveFilters()}>
          <Ionicons
            title="Save"
            name="ios-save"
            size={30}
            color="white"
            style={{ marginRight: 20 }}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation, isGlutenFee, isLactose, isVegan, isVegetarinan]);  
  

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Available Filters</Text>
      <FilterSwitch
        label={"Gluten-fee"}
        state={isGlutenFee}
        onChange={(newValue) => setIsGlutenFee(newValue)}
      />
      <FilterSwitch
        label={"Lactose-fee"}
        state={isLactose}
        onChange={(newValue) => setIsLactose(newValue)}
      />
      <FilterSwitch
        label={"Vegan"}
        state={isVegan}
        onChange={(newValue) => setIsVegan(newValue)}
      />
      <FilterSwitch
        label={"Vegetarian"}
        state={isVegetarinan}
        onChange={(newValue) => setIsVegetarinan(newValue)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontFamily: "open-sans-bold",
    margin: 20,
    textAlign: "center",
    fontSize: 20,
  },
  filtercont: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "80%",
    marginVertical: 15,
  },
});

export default FiltersScreen;

// import React, { useCallback, useEffect, useState } from "react";
// import { View, Text, StyleSheet, TouchableOpacity, Switch } from "react-native";
// import { useNavigation } from "@react-navigation/native";
// import { Ionicons } from "@expo/vector-icons";
// import Colors from "../constants/Colors";
// //propsلما بدنا نكرر الكود اكثر من مرة بس بتغيير اشياء بسيطة فبنعمل كمبوننت اخر خارج الكمبوننت الاصلي وبنحط فيه الكود الي رح يتكرر وبنبعثله المتغيرات من خلال
// //<FilterSwitch/>فبدل ما نكرر الكود بنحطه هون وفي كل مرة بنا اياه نستدعيه من خلال
// const FilterSwitch = (props) => {
//   return (
//     <View style={styles.filtercont}>
//       <Text>{props.label}</Text>
//       <Switch
//         trackColor={{ true: Colors.primary }}
//         thumbColor={Colors.primary}
//         value={props.state}
//         onValueChange={props.onChange}
//       />
//     </View>
//   );
// };

// const FiltersScreen = () => {
//   const [isGlutenFee, setIsGlutenFee] = useState(false);
//   const [isLactose, setIsLactose] = useState(false);
//   const [isVegan, setIsVegan] = useState(false);
//   const [isVegetarinan, setIsVegetarinan] = useState(false);

//   const saveFilters = useCallback(() => {
//     const appliedFilters = {
//       glutenFree: isGlutenFee,
//       LactoseFree: isLactose,
//       Vegan: isVegan,
//       Vegetarinan: isVegetarinan,
//     };
//     console.log(appliedFilters);
//   }, [isGlutenFee, isLactose, isVegan, isVegetarinan]);

//   useEffect(() => {
//     navigation.setParams({ save: saveFilters });
//   }, [saveFilters]);

//   const navigation = useNavigation();

//   useEffect(() => {
//     navigation.setOptions({
//       headerTitle: "Filters meal",

//       headerLeft: () => (
//         <TouchableOpacity
//           style={{ marginLeft: 10 }}
//           onPress={() => navigation.toggleDrawer()}
//         >
//           <Ionicons
//             name="ios-menu"
//             size={30}
//             color="white"
//             style={{ marginRight: 20 }}
//           />
//         </TouchableOpacity>
//       ),

//       headerRight: () => (
//         <TouchableOpacity>
//           <Ionicons
//             title="Save"
//             name="ios-save"
//             size={30}
//             color="white"
//             style={{ marginRight: 20 }}
//             onPress={() => {
//               saveFilters();
//             }}
//           />
//         </TouchableOpacity>
//       ),
//     });
//   }, [navigation,saveFilters]);

//   return (
//     <View style={styles.screen}>
//       <Text style={styles.title}>Availble Filters</Text>
//       <FilterSwitch
//         label={"Gluten-fee"}
//         state={isGlutenFee}
//         onChange={(newValue) => setIsGlutenFee(newValue)}
//       />
//       <FilterSwitch
//         label={"Lactose-fee"}
//         state={isLactose}
//         onChange={(newValue) => setIsLactose(newValue)}
//       />
//       <FilterSwitch
//         label={"Vegan"}
//         state={isVegan}
//         onChange={(newValue) => setIsVegan(newValue)}
//       />
//       <FilterSwitch
//         label={"Vegetarinan"}
//         state={isVegetarinan}
//         onChange={(newValue) => setIsVegetarinan(newValue)}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   screen: {
//     flex: 1,
//     alignItems: "center",
//   },
//   title: {
//     fontFamily: "open-sans-bold",
//     margin: 20,
//     textAlign: "center",
//     fontSize: 20,
//   },
//   filtercont: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     width: "80%",
//     marginVertical: 15,
//   },
// });

// export default FiltersScreen;
// Android Bundling complete 75ms
//  WARN  Non-serializable values were found in the navigation state. Check:(Filters > FiltersStack > params.save (Function))

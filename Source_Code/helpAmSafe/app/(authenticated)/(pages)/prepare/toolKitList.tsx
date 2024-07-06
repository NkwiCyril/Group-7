// import React, { useState, useEffect } from 'react';
// import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
// import CheckBox from '@react-native-community/checkbox';
// import checklistData from './jsons/checklistItems.json'; 

// type ChecklistItem = string;

// type ChecklistData = {
//   items: ChecklistItem[];
// };

// const EmergencyKitList = () => {
//   const [checkedItems, setCheckedItems] = useState<boolean[]>([]);
//   const [checklistItems, setChecklistItems] = useState<ChecklistItem[]>([]);

//   useEffect(() => {
//     // Load checklist items from the JSON file
//     const data: ChecklistData = checklistData;
//     setChecklistItems(data.items);
//     // Initialize the checked state
//     setCheckedItems(new Array(data.items.length).fill(false));
//   }, []);

//   const handleCheck = (index: number) => {
//     const updatedCheckedItems = [...checkedItems];
//     updatedCheckedItems[index] = !updatedCheckedItems[index];
//     setCheckedItems(updatedCheckedItems);
//   };

//   const completedItemsCount = checkedItems.filter(Boolean).length;

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.completedText}>{completedItemsCount} out of {checklistItems.length} items completed</Text>
//         <Text style={styles.useTemplates}>Use Templates</Text>
//       </View>
//       <Text style={styles.title}>Vital Emergency Supplies Kit List</Text>
//       <View style={styles.buttonsContainer}>
//         <TouchableOpacity style={styles.button}>
//           <Text style={styles.buttonText}>Flood</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.button}>
//           <Text style={styles.buttonText}>Fire</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.button}>
//           <Text style={styles.buttonText}>+2</Text>
//         </TouchableOpacity>
//       </View>
//       {checklistItems.map((item, index) => (
//         <View key={index} style={styles.itemContainer}>
//           <CheckBox
//             value={checkedItems[index]}
//             onValueChange={() => handleCheck(index)}
//           />
//           <Text style={styles.itemText}>{item}</Text>
//         </View>
//       ))}
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 15,
//     backgroundColor: '#fff',
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   completedText: {
//     fontSize: 14,
//     fontWeight: 'bold',
//   },
//   useTemplates: {
//     fontSize: 14,
//     color: '#00C0C0',
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   buttonsContainer: {
//     flexDirection: 'row',
//     marginBottom: 20,
//   },
//   button: {
//     backgroundColor: '#E5E5E5',
//     borderRadius: 20,
//     paddingVertical: 5,
//     paddingHorizontal: 15,
//     marginRight: 10,
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   buttonText: {
//     fontSize: 14,
//     fontWeight: 'bold',
//   },
//   itemContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   itemText: {
//     marginLeft: 10,
//     fontSize: 16,
//   },
// });

// export default EmergencyKitList;

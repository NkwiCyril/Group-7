import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { router, useNavigation } from "expo-router";

const AddLocation: React.FC = () => {
  const [eventType, setEventType] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [images, setImages] = useState<string[]>([]);
  const navigation = useNavigation(); // Get navigation object

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
    });
    if (!result.canceled) {
      setImages([...images, ...result.assets.map((asset: any) => asset.uri)]);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Your Post</Text>
      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => router.back()}
      >
        <Ionicons name="close" size={24}></Ionicons>
      </TouchableOpacity>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Type of event</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={eventType}
            onValueChange={(itemValue) => setEventType(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Select the event you are sharing" value="" />
            <Picker.Item label="Fire" value="fire" />
            <Picker.Item label="Flood" value="flood" />
            <Picker.Item label="Accident" value="accident" />
            {/* Add more event types as needed */}
          </Picker>
        </View>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Location</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. Bongo Square, Buea"
          value={location}
          onChangeText={setLocation}
        />
        <TouchableOpacity>
          <Text style={styles.googleMapsLink}>Search with Google Maps</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>About</Text>
        <TextInput
          style={styles.textArea}
          placeholder="Write out a brief description here"
          value={description}
          onChangeText={setDescription}
          multiline
        />
        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Picture</Text>
        <TouchableOpacity onPress={pickImage}>
          <Text style={styles.addPhotoText}>Add Photo</Text>
        </TouchableOpacity>
        <View style={styles.imagesContainer}>
          {images.map((imageUri, index) => (
            <Image
              key={index}
              source={{ uri: imageUri }}
              style={styles.image}
            />
          ))}
        </View>
      </View>

      <TouchableOpacity style={styles.postButton}>
        <Text style={styles.postButtonText}>Post Event</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#ffffff",
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
  },
  closeButton: {
    position: "absolute",
    top: 16,
    right: 16,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: "bold",
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
  },
  picker: {
    height: 50,
    width: "100%",
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
  },
  googleMapsLink: {
    color: "#008cba",
    marginTop: 8,
  },
  textArea: {
    height: 100,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    textAlignVertical: "top",
  },
  saveButton: {
    backgroundColor: "#800080",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    alignSelf: "flex-end",
    marginTop: 8,
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  imagesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  image: {
    width: 100,
    height: 100,
    margin: 5,
  },
  addPhotoText: {
    color: "#008cba",
    marginBottom: 10,
  },
  postButton: {
    backgroundColor: "#800080",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  postButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default AddLocation;

import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  useBottomSheetModal,
} from "@gorhom/bottom-sheet";
import { Link } from "expo-router";
import React, { forwardRef, useCallback, useEffect, useMemo, useState } from "react";
import { StyleSheet, View, Text, Alert } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Camera } from "expo-camera";


export type Ref = BottomSheetModal;

const BottomSheet = forwardRef<Ref>((props, ref) => {

  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const openCamera = async () => {
    if (hasPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
      Alert.alert("No access to camera");
      return;
    }

    Alert.alert("Camera opens");
    

  };

  const snapPoints = useMemo(() => ["35%"], []);
  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        {...props}
      />
    ),
    []
  );

  const { dismiss } = useBottomSheetModal();
  return (
    <BottomSheetModal
      backgroundStyle={{ backgroundColor: Colors.dark }}
      overDragResistanceFactor={0}
      ref={ref}
      snapPoints={snapPoints}
      backdropComponent={renderBackdrop}
    >
      <View style={styles.contentContainer}>
        <View>
          <TouchableOpacity
            style={styles.btns}
            onPress={() => {
              openCamera();
              dismiss();
            }}
          >
            <Ionicons name="camera" size={32} color={Colors.dark} />
          </TouchableOpacity>
          <Text style={[{ color: Colors.white }, styles.btnsText]}>Camera</Text>
        </View>

        <View>
          <Link href={"/(pages)/home/addLocation"} asChild>
            <TouchableOpacity
              style={styles.btns}
              onPress={() => {
                dismiss();
              }}
            >
              <Ionicons name="cloud-upload" size={32} color={Colors.dark} />
            </TouchableOpacity>
          </Link>

          <Text style={[{ color: Colors.white }, styles.btnsText]}>Upload</Text>
        </View>
      </View>

      <View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            dismiss();
          }}
        >
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </BottomSheetModal>
  );
});

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: Colors.dark,
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
  },
  btns: {
    backgroundColor: Colors.white,
    borderRadius: 150,
    padding: 32,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  btnsText: {
    textAlign: "center",
  },
  button: {
    backgroundColor: Colors.purple,
    padding: 16,
    borderRadius: 4,
    margin: 16,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default BottomSheet;

import Colors from "@/constants/Colors";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  ListRenderItem,
} from "react-native";

interface Notification {
  id: number;
  message: string;
}

const NotificationScreen: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    // setNotifications([
    //   { id: 1, message: "New message from John" },
    //   { id: 2, message: "Your order has been shipped" },
    // ]);
  }, []);

  const renderNotification: ListRenderItem<Notification> = ({ item }) => (
    <View style={styles.notificationItem}>
      {/* <Text style={styles.notificationMessage}>{item.message}</Text> */}
    </View>
  );

  return (
    <View style={styles.container}>
      {notifications.length === 0 ? (
        <>
          <Image
            source={require("../../../assets/images/Notifications_1.png")}
            style={styles.image}
          />
          <Text style={styles.notificationText}>
            Your notifications will appear here.
          </Text>
          <Text style={styles.notificationSubText}>
            You have no notifications yet
          </Text>
        </>
      ) : (
        <FlatList
          data={notifications}
          renderItem={renderNotification}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.white,
    padding: 16,
  },
  image: {
    width: 400,
    height: 400,
    marginBottom: 20,
  },
  notificationText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: Colors.dark,
  },
  notificationSubText: {
    fontSize: 14,
    textAlign: "center",
    marginTop: 10,
    color: "#666",
  },
  notificationItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    width: "100%",
  },
  notificationMessage: {
    fontSize: 16,
  },
});

export default NotificationScreen;

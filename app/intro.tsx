import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

export default function IntroScreen({ navigation }: any) {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace("TodoList");
    }, 2000); // 2초 후에 TodoList 화면으로 전환
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>TodoList App</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  logo: {
    fontSize: 32,
    fontWeight: "bold",
  },
});

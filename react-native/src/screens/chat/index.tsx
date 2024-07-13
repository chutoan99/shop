import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  NativeModules,
} from "react-native";
const {StatusBarManager} = NativeModules;
export default function Chat() {

  return (
    <SafeAreaView style={styles.appWrapper}>
    <StatusBar animated={true} />
    
  </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  appWrapper: {
    width: "100%",
    flex: 1,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 60,
    backgroundColor: "#FFF",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
    paddingHorizontal: 14,
  },

});

import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, SafeAreaView, View, Image } from "react-native";
import { useNavigation } from '@react-navigation/native';

export default function Init() {
  const navigation = useNavigation();
  const [init, setInit] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setInit(true);
      navigation.navigate('Home'); 
    }, 5000);
    
  }, [navigation]);

  return (
    <SafeAreaView style={styles.appWrapper}>
      <StatusBar animated={true} />
      {init && (
        <View
          style={{
            display: "flex",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}>
          <Image source={require("../../assets/shopee-logo_01.png")} />
        </View>
      )}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  appWrapper: {
    width: "100%",
    flex: 1,
    backgroundColor: "#fff",
  },
});

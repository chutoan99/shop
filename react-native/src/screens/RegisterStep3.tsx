import React, { useState, useRef } from "react";
import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Svg, { Path } from "react-native-svg";
import { OtpInput } from 'react-native-otp-entry';
export default function RegisterStep3Screen() {
 

  return (
    <View style={styles.appWrapper}>
      <View style={styles.appInner}>
        <View style={styles.iconBack}>
          <Svg width="15" height="25" viewBox="0 0 15 25" fill="none">
            <Path
              d="M12.2462 3.20215L3.41452 12.0339C3.28334 12.165 3.28334 12.3777 3.41452 12.5089L12.2462 21.3406"
              stroke="#828693"
              strokeWidth="5.37436"
              strokeLinecap="round"
            />
          </Svg>
        </View>
        <View style={styles.textTitleWrapper}>
          <Text style={styles.textTitle}>My code is</Text>
        </View>
        <OtpInput
            numberOfDigits={6}
            focusColor="pink"
            onTextChange={text => console.log(text)}
            focusStickBlinkingDuration={500}
        />
        <View style={styles.btnWrapper}>
          <LinearGradient
            style={styles.backgroundGradient}
            locations={[0, 1]}
            colors={["#ee805f", "#ea4080"]}>
            <Text style={styles.btnText}>CONTINUE</Text>
          </LinearGradient>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  appWrapper: {
    position: "relative",
    width: "100%",
    flex: 1,
  },
  appInner: {
    width: "100%",
    flex: 1,
  },
  container:{
    marginTop: 150,

  },
  inputsContainer:{    marginTop: 150,},
  pinCodeContainer:{    marginTop: 150,},
  pinCodeText:{    marginTop: 150,},
  focusStick:{    marginTop: 150,},
  backgroundGradient: {
    borderRadius: 67,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    backgroundColor: "transparent",
  },
  iconBack: {
    position: "absolute",
    left: 21,
    top: 54,
  },

  textTitleWrapper: {
    marginTop: 138,
    paddingLeft: 40,
  },
  textTitle: {
    color: "#010001",
    fontFamily: "Inter-Black",
    fontSize: 38,
    fontStyle: "normal",
    fontWeight: "600",
  },

  btnWrapper: {
    marginTop: 116,
    paddingHorizontal: 60,
  },

  btnText: {
    paddingVertical: 14,
    color: "#FFF",
    fontFamily: "Inter-Black",
    fontSize: 18,
    fontWeight: "700",
  },
});

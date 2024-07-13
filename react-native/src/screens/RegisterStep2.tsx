import React, { useState, useRef } from "react";
import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Svg, { Path } from "react-native-svg";
import PhoneInput from "react-native-phone-number-input";
import "./RegisterStep2.css";

export default function RegisterStep2Screen() {
  const [value, setValue] = useState("");
  const [formattedValue, setFormattedValue] = useState("");
  const phoneInput = useRef<PhoneInput>(null);

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
          <Text style={styles.textTitle}>My number is</Text>
        </View>
        <View style={styles.textPhoneWrapper}>
          <PhoneInput
            ref={phoneInput}
            defaultValue={value}
            defaultCode="DM"
            onChangeText={(text) => {
              setValue(text);
            }}
            onChangeFormattedText={(text) => {
              setFormattedValue(text);
            }}
            withDarkTheme
            withShadow
            autoFocus
          />
        </View>
        <View style={styles.textWrapper}>
          <Text style={styles.textContent}>
            We will send a text with a verification code. Message and data rates
            may apply.
            <Text style={styles.textContentBorder}>
              Learn what happens when your number changes.
            </Text>
          </Text>
        </View>
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

  textWrapper: {
    marginLeft: 40,
    marginRight: 60,
  },

  textContent: {
    color: "#828693",
    fontFamily: "Inter-Black",
    fontSize: 13,
    fontWeight: "400",
    letterSpacing: -0.272,
  },

  textContentBorder: {
    color: "#444142",
    fontSize: 13,
    fontWeight: "400",
    letterSpacing: -0.272,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
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
  textPhoneWrapper: {
    marginTop: 15,
    marginBottom: 44,
  },
});

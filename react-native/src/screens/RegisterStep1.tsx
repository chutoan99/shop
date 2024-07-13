import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Svg, { Path } from "react-native-svg";

export default function RegisterStep1Screen() {
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
        <View style={styles.ImageWrapper}>
          <Image
            style={styles.ImageContent}
            source={require("../assets/Tinder_Icon.png")}
          />
        </View>
        <View style={styles.textTitleWrapper}>
          <Text style={styles.textTitle}>Oops!</Text>
        </View>
        <View style={styles.textWrapper}>
          <Text style={styles.textContent}>
            We couldn’t find a Tinder account connected to that Facebook
            Account.
          </Text>
        </View>
        <View style={styles.btnWrapper}>
          <LinearGradient
            style={styles.backgroundGradient}
            locations={[0, 1]}
            colors={["#ee805f", "#ea4080"]}>
            <Text style={styles.btnText}>CREATE NEW ACCOUNT</Text>
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
    paddingBottom: 50,
  },
  ImageWrapper: {
    position: "absolute",
    left: "50%",
    transform: "translateX(-50%)",
    top: 70,
  },
  ImageContent: {
    width: 33,
    height: 38,
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
    marginTop: 183,
    display: "flex",
    alignItems: "center",
  },
  textTitle: {
    color: "#444142",
    fontFamily: "Inter-Black",
    fontSize: 30,
    fontStyle: "normal",
    fontWeight: "700",
  },

  textWrapper: {
    marginTop: 52,
    marginLeft: 35,
    marginRight: 35,
  },

  textContent: {
    color: "#828693",
    textAlign: "center",
    fontFamily: "Inter-Black",
    fontSize: 19,
    fontWeight: "500",
    lineHeight: 25.192,
  },

  btnWrapper: {
    marginTop: 135,
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

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Svg, { Path } from "react-native-svg";

export default function LoginScreen() {
  return (
    <View style={styles.appWrapper}>
      <LinearGradient
        style={styles.backgroundGradient}
        locations={[0, 1]}
        colors={["#ee805f", "#ea4080"]}>
        <View style={styles.appInner}>
          <View style={styles.iconBack}>
            <Svg width="15" height="25" viewBox="0 0 15 25" fill="none">
              <Path
                d="M12.2462 3.20215L3.41452 12.0339C3.28334 12.165 3.28334 12.3777 3.41452 12.5089L12.2462 21.3406"
                stroke="white"
                strokeWidth="5.37436"
                strokeLinecap="round"
              />
            </Svg>
          </View>

          <View style={styles.logoApp}>
            <Svg width="191" height="46" viewBox="0 0 191 46" fill="none">
              <Path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M11.9126 18.7466C20.5299 15.7713 21.9895 8.03819 20.8948 0.936689C20.8948 0.684066 21.1193 0.501617 21.3298 0.57179C29.5822 4.59972 38.845 13.3994 38.845 26.5919C38.845 36.7109 30.9997 45.6509 19.6036 45.6509C9.49867 46.114 0.92353 38.2827 0.460389 28.1778C0.151628 21.4833 3.53396 15.1537 9.26008 11.6732C9.48463 11.5328 9.77936 11.6732 9.77936 11.9258C9.89163 13.2871 10.2565 16.6975 11.7582 18.7466H11.8986H11.9126Z"
                fill="white"
              />
              <Path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M63.1109 37.6227L63.7284 36.8929L65.6652 43.0541L65.4126 43.3067C63.953 44.6681 61.7496 45.3558 58.9286 45.3558H58.8163C56.248 45.3558 54.2411 44.626 52.8376 43.2646C51.4482 41.8752 50.7184 39.784 50.7184 37.1455V20.3601H45.7642V13.5814H50.7184V5.41331H58.3392V13.5814H64.3881V20.3601H58.297V35.5035C58.297 36.2052 58.4795 38.4367 60.6128 38.4367C61.7075 38.4367 62.732 38.0297 63.1109 37.5946V37.6367V37.6227ZM67.1388 44.654V13.6095H74.7596V44.654H67.1388ZM70.9141 0.922238C73.4404 0.922238 75.4894 2.97129 75.4894 5.49751C75.4894 8.02374 73.4404 10.0728 70.9141 10.0728C68.402 10.0728 66.3529 8.03778 66.3389 5.52558C66.3389 3.02743 68.43 0.908203 70.9141 0.908203V0.922238ZM95.2501 12.8376C101.846 12.8376 105.481 16.4305 105.481 22.9846V44.6119H97.8606V24.8231C97.7202 21.3005 96.022 19.6865 92.4292 19.6865C89.2012 19.6865 86.6048 21.6654 85.2856 23.3495V44.6119H77.6648V13.6376H85.2856V16.9357C87.489 14.8165 90.9976 12.9078 95.2501 12.9078V12.8376ZM130.842 16.8375V2.25552H138.463V44.6961H130.842V41.4682C128.484 43.9523 125.214 45.3698 121.79 45.3838C113.467 45.3838 107.895 38.8577 107.895 29.1458C107.895 19.3918 113.467 12.8657 121.79 12.8657C125.228 12.8797 128.498 14.3112 130.842 16.8234V16.8375ZM130.842 23.4057C129.116 21.1601 126.477 19.8128 123.656 19.7426C118.926 19.7426 115.769 23.5179 115.769 29.1598C115.769 34.7737 118.926 38.549 123.656 38.549C126.407 38.549 129.41 37.0894 130.842 34.9561V23.4057ZM156.287 12.8797C165.311 12.8797 171.57 19.8409 171.57 29.7353V31.8264H148.511C149.283 36.1912 152.722 38.97 157.423 38.97C160.399 38.97 163.655 37.6929 165.521 35.8122L166.041 35.3772L169.676 40.584L169.311 40.9208C165.872 43.9663 161.395 45.5663 156.806 45.3979C147.276 45.3979 140.568 38.6893 140.568 29.1177C140.259 20.4584 147.038 13.1885 155.697 12.8937C155.908 12.8797 156.118 12.8797 156.329 12.8797H156.287ZM148.483 26.0722H164.132C163.697 21.4127 159.837 19.2935 156.287 19.2935C150.939 19.2935 148.918 23.3214 148.483 26.1143V26.0722ZM190.012 12.8797H190.559V20.5707L189.899 20.4584C189.352 20.3461 188.65 20.2759 187.963 20.2759C185.507 20.2759 182.096 22.0022 180.819 23.8267V44.6119H173.198V13.5955H180.861V17.048C183.387 14.4095 186.728 12.8657 190.026 12.8657L190.012 12.8797Z"
                fill="white"
              />
            </Svg>
          </View>
     
          <View style={styles.textWrapper}>
            <Text style={styles.textContent}>
              By tapping Create Account or Sign In, you agree to our Terms.
              Learn how we process your data in our Privacy Policy and Cookies
              Policy.
            </Text>
          </View>
          <View style={styles.appSocialWrapper}>
            <View style={styles.border}>
              <Text style={styles.appSocialText}>SIGN IN WITH APPLE</Text>
            </View>
            <View style={styles.border}>
              <Text style={styles.appSocialText}>SIGN IN WITH FACEBOOK</Text>
            </View>
            <View style={styles.border}>
              <Text style={styles.appSocialText}>
                SIGN IN WITH PHONE NUMBER
              </Text>
            </View>
          </View>

          <Text style={styles.troubleSigningIn}>Trouble Signing In?</Text>
        </View>
      </LinearGradient>
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
  backgroundGradient: {
    flex: 1,
    width: "100%",
    backgroundColor: "transparent",
  },
  iconBack: {
    position: "absolute",
    left: 21,
    top: 70,
  },
  logoApp: {
    width: "100%",
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },

  textWrapper: {
    marginTop: 86,
    marginLeft: 45,
    marginRight: 45,
  },

  textContent: {
    color: "#FFF",
    textAlign: "center",
    fontFamily: "Inter-Medium",
    fontSize: 12,
    fontStyle: "normal",
    fontWeight: "500",
    lineHeight: 18,
  },

  appSocialWrapper: {
    paddingTop: 30,
    paddingBottom: 20,
    paddingLeft: 30,
    paddingRight: 30,
    display: "flex",
    gap: 10,
    alignItems: "center",
  },

  border: {
    paddingVertical: 16,
    justifyContent: "center",
    flexDirection: "row",
    width: "100%",
    borderWidth: 1.3,
    borderColor: "#FFF",
    borderStyle: "solid",
    borderRadius: 67,
    alignItems: "center",
  },

  appSocialText: {
    color: "#FFF",
    fontFamily: "Inter-SemiBold",
    fontSize: 15,
    fontStyle: "normal",
    fontWeight: "600",
    letterSpacing: 0.148,
  },
  appleBorder: {
    marginTop: 10.75,
    paddingVertical: 16,
    justifyContent: "center",
    flexDirection: "row",
    borderWidth: 1.3,
    borderColor: "#FFF",
    borderStyle: "solid",
    borderRadius: 67,
    alignItems: "center",
  },
  troubleSigningIn: {
    fontSize: 14,
    textAlign: "center",
    fontFamily: "Inter-Medium",
    fontWeight: "500",
    lineHeight: 18,
    color: "#FFF",
  },
});

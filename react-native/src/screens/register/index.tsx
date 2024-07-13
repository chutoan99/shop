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
import Svg, { Circle, Path, Rect } from "react-native-svg";
const {StatusBarManager} = NativeModules;
export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleRegister = () => {};
  return (
    <SafeAreaView style={styles.appWrapper}>
    <StatusBar animated={true} />
      <View style={styles.headerContainer}>
        <View>
          <Svg width="31" height="24" viewBox="0 0 31 24" fill="none">
            <Path
              d="M0.939341 10.9393C0.353554 11.5251 0.353554 12.4749 0.939341 13.0607L10.4853 22.6066C11.0711 23.1924 12.0208 23.1924 12.6066 22.6066C13.1924 22.0208 13.1924 21.0711 12.6066 20.4853L4.12132 12L12.6066 3.51472C13.1924 2.92893 13.1924 1.97919 12.6066 1.3934C12.0208 0.807611 11.0711 0.807611 10.4853 1.3934L0.939341 10.9393ZM31 10.5L2 10.5V13.5L31 13.5V10.5Z"
              fill="#ED4D2D"
            />
          </Svg>
        </View>
        <View>
          <Text
            style={{
              color: "#000",
              textAlign: "center",
              fontFamily: "Roboto",
              fontSize: 18,
              fontWeight: "400",
              letterSpacing: -0.24,
            }}>
            Register
          </Text>
        </View>
        <View style={{ display: "flex", flexDirection: "row", gap: 10 }}>
          <View>
            <Svg width="30" height="29" viewBox="0 0 30 29" fill="none">
              <Path
                d="M1.38131 9.34131C1.00116 10.9144 2.19303 12.4286 3.81136 12.4286H25.3356C26.9146 12.4286 28.0981 10.9829 27.7864 9.43501L26.4054 2.57787C26.1704 1.41085 25.1451 0.571431 23.9546 0.571431H5.4685C4.314 0.571431 3.30965 1.36198 3.03846 2.48417L1.38131 9.34131Z"
                stroke="#ED4D2D"
              />
              <Path
                d="M4.5 12.8158C4.5 12.33 4.73529 11.8743 5.13135 11.5929L7.37054 10.0024C7.9546 9.58749 8.75051 9.64354 9.27066 10.1362L10.0177 10.8437C10.9819 11.7569 12.4918 11.7569 13.4559 10.8437L14.0212 10.3084C14.5997 9.76051 15.5056 9.76051 16.0841 10.3084L16.5183 10.7196C17.5468 11.6938 19.1785 11.6195 20.1143 10.5559L20.2372 10.4162C20.7692 9.81165 21.6836 9.73498 22.3088 10.2425L23.9454 11.5711C24.2963 11.856 24.5 12.2838 24.5 12.7357V24.8571C24.5 25.6856 23.8284 26.3571 23 26.3571H6C5.17157 26.3571 4.5 25.6856 4.5 24.8571V12.8158Z"
                fill="white"
                stroke="#ED4D2D"
              />
              <Path
                d="M29.5 23.6428C29.5 26.3584 27.4534 28.5 25 28.5C22.5466 28.5 20.5 26.3584 20.5 23.6428C20.5 20.9273 22.5466 18.7857 25 18.7857C27.4534 18.7857 29.5 20.9273 29.5 23.6428Z"
                fill="white"
                stroke="#ED4D2D"
              />
              <Path d="M24.5 21.5H25.5V25.7857H24.5V21.5Z" fill="#ED4C2D" />
              <Path d="M23 23.1071H27V24.1786H23V23.1071Z" fill="#ED4C2D" />
            </Svg>
          </View>
          <View>
            <Svg
              style={{ position: "relative" }}
              width="28"
              height="28"
              viewBox="0 0 23 25"
              fill="none">
              <Path
                d="M22.5 12.5357C22.5 19.0976 17.5432 24.3572 11.5 24.3572C5.4568 24.3572 0.5 19.0976 0.5 12.5357C0.5 5.97388 5.4568 0.714294 11.5 0.714294C17.5432 0.714294 22.5 5.97388 22.5 12.5357Z"
                fill="white"
                stroke="#ED4D2D"
              />
            </Svg>
            <Text
              style={{
                position: "absolute",
                top: "3%",
                left: "30%",
                color: "#ED4D2D",
                textAlign: "center",
                fontFamily: "Roboto",
                fontSize: 18,
                fontStyle: "normal",
                fontWeight: "400",
                letterSpacing: 0.24,
              }}>
              ?
            </Text>
          </View>
        </View>
      </View>
      <View style={{ backgroundColor: "#FFF", display: "flex", flex: 1 }}>
        <View
          style={{
            marginBottom: 46,
            marginTop: 47,
            paddingRight: 5,
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}>
          <Image source={require("../../assets/shopee-logo.png")} />
        </View>
        <View style={{ display: "flex", gap: 10 }}>
          <View style={styles.InputWrapper}>
            <View style={styles.InputInner}>
              <View style={{ paddingRight: 24 }}>
                <Svg width="19" height="22" viewBox="0 0 19 22" fill="none">
                  <Path
                    d="M0.5 15.8722C0.5 15.6339 0.66817 15.4288 0.90183 15.382L5.62956 14.4353C5.87679 14.3858 6.10754 14.2748 6.30051 14.1125L9.51498 11.4091C9.71723 11.239 10.0169 11.2557 10.1991 11.4472L12.6371 14.0101C12.8499 14.2339 13.1266 14.3865 13.4294 14.4471L18.0982 15.382C18.3318 15.4288 18.5 15.6339 18.5 15.8722V21C18.5 21.2761 18.2761 21.5 18 21.5H1C0.723857 21.5 0.5 21.2761 0.5 21V15.8722Z"
                    stroke="#505050"
                  />
                  <Path
                    d="M12.6775 14.1276C13.2845 13.0548 13.7157 11.6528 13.9167 10.0989C14.1176 8.54513 14.0793 6.90928 13.8064 5.39826C13.5336 3.88724 13.0385 2.56891 12.3839 1.60999C11.7292 0.651076 10.9444 0.0946322 10.1286 0.0110298C9.31275 -0.0725727 8.50262 0.320421 7.80063 1.14031C7.09864 1.96021 6.53631 3.17017 6.18475 4.61721C5.83319 6.06424 5.7082 7.68335 5.82557 9.26979C5.94294 10.8562 6.29741 12.3387 6.84415 13.5299L7.495 12.3794C7.06421 11.4409 6.78491 10.2728 6.69243 9.02283C6.59995 7.77283 6.69844 6.49709 6.97544 5.35693C7.25245 4.21677 7.69552 3.26341 8.24864 2.61739C8.80176 1.97137 9.44008 1.66172 10.0829 1.7276C10.7257 1.79347 11.3441 2.23191 11.8599 2.98746C12.3757 3.74302 12.7658 4.78177 12.9808 5.97234C13.1957 7.16292 13.226 8.45185 13.0676 9.67614C12.9093 10.9004 12.5695 12.0051 12.0913 12.8505L12.6775 14.1276Z"
                    fill="#505050"
                  />
                  <Rect
                    x="7.43481"
                    y="10.4211"
                    width="4.95652"
                    height="4.63158"
                    fill="white"
                  />
                </Svg>
              </View>
              <TextInput
                style={styles.Input}
                placeholder="Email/Telephone/Username"
                onChangeText={(email) => setEmail(email)}></TextInput>
            </View>
            <View style={styles.border}></View>
          </View>
          <View style={styles.InputWrapper}>
            <View style={styles.InputInner}>
              <View style={{ paddingRight: 24 }}>
                <Svg width="17" height="17" viewBox="0 0 17 17" fill="none">
                  <Rect
                    x="0.5"
                    y="5.5"
                    width="16"
                    height="11"
                    rx="0.5"
                    stroke="#707070"
                  />
                  <Path
                    d="M14 5.5C14 4.77773 13.8577 4.06253 13.5813 3.39524C13.3049 2.72795 12.8998 2.12163 12.3891 1.61091C11.8784 1.10019 11.272 0.695063 10.6048 0.418662C9.93747 0.142262 9.22227 -3.15714e-08 8.5 0C7.77773 3.15714e-08 7.06253 0.142262 6.39524 0.418663C5.72795 0.695064 5.12163 1.10019 4.61091 1.61091C4.10019 2.12164 3.69506 2.72795 3.41866 3.39524C3.14226 4.06253 3 4.77773 3 5.5H4.0396C4.0396 4.91425 4.15497 4.33424 4.37913 3.79308C4.60328 3.25192 4.93183 2.76021 5.34602 2.34602C5.76021 1.93183 6.25192 1.60328 6.79308 1.37913C7.33424 1.15497 7.91425 1.0396 8.5 1.0396C9.08575 1.0396 9.66576 1.15497 10.2069 1.37913C10.7481 1.60328 11.2398 1.93183 11.654 2.34602C12.0682 2.76021 12.3967 3.25192 12.6209 3.79308C12.845 4.33424 12.9604 4.91425 12.9604 5.5H14Z"
                    fill="#707070"
                  />
                  <Circle cx="9" cy="11" r="2" fill="#707070" />
                </Svg>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  flex: 1,
                  paddingRight: 10,
                }}>
                <TextInput
                  style={styles.Input}
                  placeholder="Password"
                  onChangeText={(password) =>
                    setPassword(password)
                  }></TextInput>

                <View
                  style={{
                    flexDirection: "row",
                    gap: 8,
                    justifyContent: "flex-end",
                  }}>
                  <View>
                    <Svg width="20" height="22" viewBox="0 0 20 22" fill="none">
                      <Path
                        d="M19.2581 9C19.2581 11.3869 18.2572 13.6761 16.4756 15.364C14.694 17.0518 12.2776 18 9.75806 18C7.23851 18 4.82214 17.0518 3.04055 15.364C1.25895 13.6761 0.258059 11.387 0.258057 9.00001L2.42835 9.00001C2.42835 10.8417 3.20059 12.6079 4.57518 13.9101C5.94976 15.2123 7.8141 15.9439 9.75806 15.9439C11.702 15.9439 13.5664 15.2123 14.9409 13.9101C16.3155 12.6079 17.0878 10.8416 17.0878 9H19.2581Z"
                        fill="#C4C4C4"
                      />
                      <Rect
                        x="2.80249"
                        y="14.2226"
                        width="1"
                        height="4"
                        transform="rotate(44.4777 2.80249 14.2226)"
                        fill="#C4C4C4"
                      />
                      <Rect
                        x="6.08789"
                        y="16"
                        width="1"
                        height="4.37039"
                        transform="rotate(27.2241 6.08789 16)"
                        fill="#C4C4C4"
                      />
                      <Rect
                        x="9.29175"
                        y="17.0204"
                        width="1"
                        height="4"
                        transform="rotate(-0.727042 9.29175 17.0204)"
                        fill="#C4C4C4"
                      />
                      <Rect
                        x="13.2581"
                        y="16.3328"
                        width="1"
                        height="4"
                        transform="rotate(-19.4371 13.2581 16.3328)"
                        fill="#C4C4C4"
                      />
                      <Rect
                        x="16.2581"
                        y="13.5478"
                        width="1"
                        height="4.80271"
                        transform="rotate(-33.2192 16.2581 13.5478)"
                        fill="#C4C4C4"
                      />
                    </Svg>
                  </View>
                  <Text>|</Text>
                  <Text style={styles.textRegister}>Lupa?</Text>
                </View>
              </View>
            </View>
            <View style={styles.border}></View>
          </View>
        </View>

        <View style={{ marginHorizontal: 24, marginTop: 34, marginBottom: 14 }}>
          <TouchableOpacity onPress={handleRegister} />
          <Text style={styles.Register_button}>Register</Text>
        </View>

        <View
          style={{
            paddingLeft: 25,
            paddingRight: 25,
            paddingBottom: 10,
            gap: 10,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}>
          <Text style={styles.textRegister}>Daftar</Text>
          <Text style={styles.textRegister}>Log in dengan no.handphone</Text>
        </View>

        <View
          style={{
            marginTop: 34,
            marginBottom: 20,
            marginLeft: 25,
            marginRight: 25,
            display: "flex",
            gap: 20,
            alignItems: "center",
          }}>
          <View style={styles.appSocialWrapper}>
            <View style={{ paddingRight: 50 }}>
              <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <Path
                  d="M16.8206 2.68701C15.8406 1.773 14.6869 1.06529 13.428 0.605909C12.1691 0.146532 10.8307 -0.0551335 9.49237 0.0128926C8.15402 0.0809187 6.84299 0.417249 5.63718 1.0019C4.43136 1.58656 3.35535 2.4076 2.47308 3.41627L5.21377 5.81352C5.77479 5.17213 6.459 4.65004 7.22576 4.27827C7.99252 3.9065 8.82617 3.69263 9.67721 3.64938C10.5282 3.60612 11.3793 3.73436 12.1798 4.02647C12.9803 4.31857 13.7139 4.7686 14.3371 5.3498L16.8206 2.68701Z"
                  fill="#E13B2B"
                />
                <Path
                  d="M0.515878 13.1704C1.01814 14.6729 1.87019 16.0346 3.00184 17.1432C4.13348 18.2519 5.51234 19.0758 7.02483 19.5472C8.53731 20.0185 10.1401 20.1237 11.7013 19.8542C13.2624 19.5847 14.7372 18.9481 16.004 17.997L13.8272 15.0976C13.0197 15.7039 12.0796 16.1097 11.0845 16.2815C10.0893 16.4533 9.06762 16.3862 8.1035 16.0857C7.13939 15.7853 6.26045 15.2601 5.53909 14.5534C4.81773 13.8467 4.2746 12.9787 3.95444 12.0209L0.515878 13.1704Z"
                  fill="#35A956"
                />
                <Path
                  d="M2.46526 3.42522C1.29863 4.76218 0.508749 6.38549 0.176678 8.12855C-0.155394 9.8716 -0.0176934 11.6716 0.575647 13.3439L4.02997 12.1182C3.65411 11.0589 3.56688 9.91866 3.77724 8.81449C3.9876 7.71033 4.48796 6.68201 5.22699 5.83509L2.46526 3.42522Z"
                  fill="#FDB803"
                />
                <Path
                  d="M15.936 18.0476C17.1936 17.12 18.2163 15.9105 18.9221 14.5163C19.6278 13.122 19.997 11.5818 20 10.0191L16.3678 10.0121C16.3659 11.0072 16.1308 11.988 15.6814 12.8759C15.232 13.7637 14.5808 14.5339 13.78 15.1246L15.936 18.0476Z"
                  fill="#4188F0"
                />
                <Path
                  d="M11.1113 7.22223H20.0002V10.0311L11.1113 10V7.22223Z"
                  fill="#4188F0"
                />
              </Svg>
            </View>

            <Text
              style={{
                color: "#000",
                fontFamily: "Roboto",
                fontSize: 14,
                fontStyle: "normal",
                fontWeight: "700",
                letterSpacing: 1.54,
              }}>
              Register Google
            </Text>
          </View>
          <View style={styles.appSocialWrapper}>
            <View style={{ paddingRight: 50 }}>
              <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <Circle cx="10" cy="10" r="10" fill="#1D79E3" />
                <Path
                  d="M8.33325 9.16669H11.1879V20H8.33325V9.16669Z"
                  fill="white"
                />
                <Path
                  d="M8.33325 8.33331C8.33325 5.57189 10.5718 3.33331 13.3333 3.33331V6.24998C12.1498 6.24998 11.1904 7.20937 11.1904 8.39284V9.16665H8.33325V8.33331Z"
                  fill="white"
                />
                <Rect
                  x="5.83325"
                  y="10"
                  width="8.33333"
                  height="2.5"
                  fill="white"
                />
              </Svg>
            </View>

            <Text
              style={{
                color: "#000",
                fontFamily: "Roboto",
                fontSize: 14,
                fontStyle: "normal",
                fontWeight: "700",
                letterSpacing: 1.54,
              }}>
              Register Facebook
            </Text>
          </View>
        </View>
      </View>
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
  appSocialWrapper: {
    backgroundColor: "rgba(196, 196, 196, 0.00)",
    boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
    paddingLeft: 25,
    paddingRight: 25,
    paddingVertical: 13,
    width: "100%",
    flexDirection: "row",
    borderWidth: 1.3,
    borderColor: "#000",
    borderStyle: "solid",
    borderRadius: 5,
    alignItems: "center",
  },
  InputWrapper: {
    paddingLeft: 25,
    paddingRight: 25,
    paddingBottom: 10,
    gap: 10,
    display: "flex",
  },
  InputInner: {
    paddingLeft: 11,
    display: "flex",
    flexDirection: "row",
  },
  border: {
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "#CBCBCB",
  },
  Input: {
    height: 21,
    color: "#000",
    fontFamily: "Roboto",
    fontSize: 18,
    fontStyle: "normal",
    fontWeight: "400",
    letterSpacing: -0.2,
  },
  Register_button: {
    paddingTop: 15,
    borderRadius: 5,
    paddingBottom: 15,
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E8E8E8",
    color: "#B0B0B0",
    textAlign: "center",
    fontFamily: "Roboto",
    fontSize: 15,
    fontStyle: "normal",
    fontWeight: "400",
    letterSpacing: -0.24,
  },
  textRegister: {
    color: "#247AC7",
    fontFamily: "Roboto",
    fontSize: 15,
    fontStyle: "normal",
    fontWeight: "300",
    letterSpacing: -0.24,
  },
});

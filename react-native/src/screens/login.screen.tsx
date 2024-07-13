import { StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export const styles = StyleSheet.create({
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
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 60,
    paddingLeft: 21,
    paddingRight: 14,
    backgroundColor: "#FFF",
    boxShadow: "0px 2px 3px 0px rgba(0, 0, 0, 0.20)",
  },
});

import { StyleSheet } from "react-native";
import { Colors } from "../../common/styles/color";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    justifyContent: "space-around"
  },
  title: {
    color: Colors.black,
    fontSize: 36,
    textAlign: "center",
    fontWeight: "bold"
  },
  description: {
    color: Colors.black,
    textAlign: "center",
    marginBottom: 30,
    marginTop: 5
  },
  forgotPasswordText: {
    color: Colors.mainColor,
    fontWeight: "bold",
    textAlign: "right",
    marginRight: "10%", 
    marginTop: 10
  },
  questionText:{
    color: Colors.black,
    textAlign: "center",
    marginVertical: 10
  }
})
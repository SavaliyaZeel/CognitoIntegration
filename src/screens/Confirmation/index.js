import { View, Text, SafeAreaView, Alert } from 'react-native';
import React, { useState } from 'react';
import { styles } from './style';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { confirmResetPassword, confirmSignUp, resendSignUpCode } from '@aws-amplify/auth';
import { useDispatch } from 'react-redux';
import { authSuccess } from '../../store/action/auth';

const ConfirmationScreen = ({ navigation, route }) => {
  const { username, deliveryMedium, flow } = route.params;
  const [confirmationCode, setConfirmationCode] = useState("");
  const dispatch = useDispatch();

  const handleSignUpConfirmation = async () => {
    try {
      const { isSignUpComplete, nextStep } = await confirmSignUp({
        username,
        confirmationCode
      });
      console.log("isSignUpComplete", isSignUpComplete, nextStep);
      if (isSignUpComplete) {
        if (nextStep.signUpStep == "DONE") {
          navigation.navigate("SignIn");
        } else if (nextStep.signUpStep == "COMPLETE_AUTO_SIGN_IN") {
          dispatch(authSuccess(true));
        }
      }
    } catch (error) {
      console.log("error", error);
      if (error.name == "CodeMismatchException") {
        Alert.alert("Invalid code", error.message)
      }
    }
  }

  const handleReSend = async () => {
    try {
      const response = await resendSignUpCode({ username });
      console.log("response", response);
    } catch (error) {
      console.log("error", error, error.message);
      if (error.name == "LimitExceededException") {
        const [title, description] = error.message.split(",");
        Alert.alert(title, description);
      }
    }
  }

  const handleConfirmResetPassword= async () => {
    try {
      await confirmResetPassword({ username, confirmationCode, newPassword });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.container}>
        <View>
          <Text style={styles.title}>Confirmation code</Text>
          <Text style={styles.description}>Confirmation code was sent to your {deliveryMedium || "email"}</Text>
          <Input iconSize={24} iconName={"password"} Icon={MaterialIcons} value={confirmationCode} placeholder='Enter confirmation code' onChangeText={setConfirmationCode} />
          {/* <Text style={styles.forgotPasswordText} onPress={handleReSend}>Resend code</Text> */}
          <Button onPress={handleSignUpConfirmation} title={"Confirm"} />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default ConfirmationScreen;

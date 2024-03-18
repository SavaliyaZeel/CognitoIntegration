import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { confirmResetPassword, confirmSignUp, resetPassword, signIn, signOut, signUp } from '@aws-amplify/auth';

const App = () => {
  async function handleSignUp(username, password, email, phone_number) {
    try {
      // const { isSignUpComplete, userId, nextStep } = await signUp({
      const userData = await signUp({
        username,
        password,
        options: {
          userAttributes: {
            email,
            phone_number,
            given_name: "adsf",
            family_name: "szf",
          },
          // optional
          autoSignIn: true,
        }
      });

      console.log(userData);
    } catch (error) {
      console.log('error signing up:', error);
    }
  }
  async function handleSignIn(username, password) {
    try {
      const userInfo = await signIn({ username, password });
      console.log("userInfo ::>", userInfo);
    } catch (error) {
      console.log('error signing in', error);
    }
  }

  const onConfirmation = async (username, confirmationCode) => {
    try {
      const { isSignUpComplete, nextStep } = await confirmSignUp({
        username,
        confirmationCode
      });
      console.log("isSignUpComplete", isSignUpComplete);
    } catch (error) {
      console.log("error ::: >", error);
    }
  }

  async function handleSignOut() {
    try {
      await signOut();
    } catch (error) {
      console.log('error signing out: ', error);
    }
  }

  async function handleResetPassword(username) {
    try {
      const output = await resetPassword({ username });
      handleResetPasswordNextSteps(output);
    } catch (error) {
      console.log(error);
    }
  }
  
  function handleResetPasswordNextSteps(output) {
    const { nextStep } = output;
    switch (nextStep.resetPasswordStep) {
      case 'CONFIRM_RESET_PASSWORD_WITH_CODE':
        const codeDeliveryDetails = nextStep.codeDeliveryDetails;
        console.log(
          `Confirmation code was sent to ${codeDeliveryDetails.deliveryMedium}`
        );
        // Collect the confirmation code from the user and pass to confirmResetPassword.
        break;
      case 'DONE':
        console.log('Successfully reset password.');
        break;
    }
  }

  async function handleConfirmResetPassword(
    username,
    confirmationCode,
    newPassword
  ) {
    try {
      await confirmResetPassword({ username, confirmationCode, newPassword });
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <View style={styles.mainView}>
      <TouchableOpacity style={styles.authButton} onPress={() => handleSignUp("woxohi2933@sfpixel.com", "Test@123", "woxohi2933@sfpixel.com", "+918160253766")}>
        <Text>Sign-Up</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.authButton} onPress={() => onConfirmation("lemok49530@hidelux.com", "061738")}>
        <Text>Confirm</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.authButton} onPress={() => handleSignIn("lemok49530@hidelux.com", "123@test")}>
        <Text>Sign-In</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.authButton} onPress={() => handleSignOut()}>
        <Text>Sign-Out</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.authButton} onPress={() => handleResetPassword("nohefo8920@mcuma.com")}>
        <Text>forgot</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.authButton} onPress={() => handleConfirmResetPassword("lemok49530@hidelux.com", "188318", "123@test")}>
        <Text>reset confirm</Text>
      </TouchableOpacity>
    </View>
  )
}

export default App

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  authButton: {
    width: "90%",
    padding: 15,
    backgroundColor: "skyblue",
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 5
  }
})
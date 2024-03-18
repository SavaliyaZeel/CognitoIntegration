import { View, Text, SafeAreaView, Alert } from 'react-native';
import React, { useState } from 'react';
import { styles } from './style';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { resetPassword } from '@aws-amplify/auth';
import { useDispatch } from 'react-redux';

const ForgotPasswordScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');

  async function handleForgotPassword() {
    try {
      const output = await resetPassword({ username });
      handleForgotPasswordNextSteps(output);
    } catch (error) {
      console.log(error);
    }
  }
  
  function handleForgotPasswordNextSteps(output) {
    const { nextStep } = output;
    console.log("nextStep", nextStep, "output", output);
    switch (nextStep.resetPasswordStep) {
      case 'CONFIRM_RESET_PASSWORD_WITH_CODE':
        Alert.alert(`Confirmation code was sent to ${nextStep.codeDeliveryDetails.deliveryMedium}`);
        navigation.navigate("Confirmation", { username, deliveryMedium: nextStep.codeDeliveryDetails.deliveryMedium, flow: "FORGOT_PASSWORD" });
      break;
      case 'DONE':
        console.log('Successfully reset password.');
        break;
    }
  }

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Forgot Password</Text>
        <Text style={styles.description}>Please Enter Username</Text>
        <Input iconSize={24} iconName={"account"} Icon={MaterialCommunityIcons} value={username} placeholder='Username' onChangeText={setUsername} />
        <Button onPress={handleForgotPassword} title={"Send"} />
      </SafeAreaView>
    </View>
  );
};

export default ForgotPasswordScreen;

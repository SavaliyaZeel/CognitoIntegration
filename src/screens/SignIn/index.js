import { View, Text, TouchableOpacity, SafeAreaView, TextInput, Alert } from 'react-native';
import React, { useState } from 'react';
import { authWatcher } from '../../store/action';
import { useDispatch } from 'react-redux';
import { styles } from './style';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { signIn, signUp } from '@aws-amplify/auth';
import { authSuccess } from '../../store/action/auth';
import { useAuthenticator } from '@aws-amplify/ui-react-native';

const SignInScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
//     const { user } = useAuthenticator((context) => [context.user]);
// console.log("user", user);
    const handleSignIn = async () => {
        try {
            const {isSignedIn, nextStep: {signInStep}} = await signIn({ username, password });
            if (isSignedIn) {
                console.log("done");
                dispatch(authSuccess(true));
            } else if (signInStep == 'CONFIRM_SIGN_UP') {
                navigation.navigate("Confirmation", {username})
            }
        } catch (error) {
            console.log('error signing in', error.name, error.message);
            Alert.alert("Sign in failed", error.message)
        }
    }

    const onNavigate = (screen) => {
        navigation.navigate(screen);
    }

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.container}>
                <View>
                    <Text style={styles.title}>Welcome Back</Text>
                    <Text style={styles.description}>Enter your credential to login</Text>
                    <Input iconSize={24} iconName={"account"} Icon={MaterialCommunityIcons} value={username} placeholder='Username' onChangeText={setUsername} />
                    <Input iconSize={24} iconName={"password"} Icon={MaterialIcons} value={password} placeholder='Password' onChangeText={setPassword} secureTextEntry={true} />
                    <Button onPress={handleSignIn} title={"Sign In"} />
                    <Text style={styles.forgotPasswordText} onPress={()=>onNavigate("ForgotPassword")}>Forgot password?</Text>
                </View>
                <Text style={styles.questionText}>Don't have an account? <Text style={styles.forgotPasswordText} onPress={()=>onNavigate("SignUp")}>Sign Up</Text></Text>
            </SafeAreaView>
        </View>
    );
};

export default SignInScreen;

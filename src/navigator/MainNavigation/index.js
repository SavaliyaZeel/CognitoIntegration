import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider, useSelector } from 'react-redux';
import SignInScreen from '../../screens/SignIn';
import HomeScreen from '../../screens/Home';
import SignUpScreen from '../../screens/SignUp';
import { persistor, store } from '../../store';
import { PersistGate } from 'redux-persist/integration/react';
import ForgotPasswordScreen from '../../screens/ForgotPassword';
import ConfirmationScreen from '../../screens/Confirmation';
import { Authenticator, ThemeProvider } from '@aws-amplify/ui-react-native';
import { Colors } from '../../common/styles/color';
import { I18n } from 'aws-amplify/utils';
import { translations } from '@aws-amplify/ui';

I18n.putVocabularies(translations);
I18n.setLanguage('en');

I18n.putVocabularies({
  en: {
    'Sign In': 'Login',
    'Create Account': "Sign Up"
  },
});

const MainNavigation = () => {
    const Stack = createNativeStackNavigator();
    const Navigator = () => {
        const userData = useSelector(state => state.authReducer.userData);
        console.log("userData", userData);
        switch (userData) {
            case true:
                return (
                    <NavigationContainer>
                        <Stack.Navigator initialRouteName='Home'>
                            <Stack.Screen name="Home" component={HomeScreen} />
                        </Stack.Navigator>
                    </NavigationContainer>
                )
            default:
                return (
                    <NavigationContainer>
                        <Stack.Navigator initialRouteName='SignIn'>
                            <Stack.Screen
                                options={{
                                    headerShown: false
                                }}
                                name="SignIn"
                                component={SignInScreen} />
                            <Stack.Screen
                                options={{
                                    headerShown: false
                                }}
                                name="SignUp"
                                component={SignUpScreen} />
                            <Stack.Screen
                                options={{
                                    headerShown: false
                                }}
                                name="Confirmation"
                                component={ConfirmationScreen} />
                            <Stack.Screen
                                options={{
                                    headerShown: false
                                }}
                                name="ForgotPassword"
                                component={ForgotPasswordScreen} />
                        </Stack.Navigator>
                    </NavigationContainer>
                )
        }
    }
    return (
        <ThemeProvider
            theme={{
                overrides: [{
                    tokens: {
                        borderWidths: {
                            "small": 2
                        },
                        
                    },
                    spaceModifier: 10,
                    tokens: {
                        colors: {
                            "primary": {
                                "10": Colors.mainColor,
                                "20": Colors.mainColor,
                                "40": Colors.mainColor,
                                "60": Colors.mainColor,
                                "80": Colors.mainColor,
                                "90": Colors.mainColor,
                                "100": Colors.mainColor,
                            },
                            font:{
                                // "tertiary":  "red",
                            }
                        },
                    },
                }],
                components: {
                    button:{
                        disabled: {
                            opacity: 1,
                            backgroundColor: Colors.mainColor,
                            borderRadius: 50,
                            paddingVertical: 20
                        },
                        textPrimary: {
                            fontWeight: "400"
                        }
                    },
                    textField: {
                        fieldContainer:{
                            borderRadius: 0,
                            borderTopWidth: 0,
                            borderLeftWidth: 0,
                            borderRightWidth: 0,
                            borderColor: Colors.mainColor,
                            paddingHorizontal: 0
                        },
                        label:{
                            height: -10,
                            maxHeight: 0,
                            color: "#00000000"
                        },
                        field: {
                            color: Colors.mainColor,
                        }
                    },
                    passwordField: {
                        icon: {
                            maxWidth: 0,
                        },
                    }
                }
            }}
        >
            <Authenticator.Provider>
                <Provider store={store}>
                    <PersistGate loading={null} persistor={persistor}>
                        <Navigator />
                    </PersistGate>
                </Provider>
            </Authenticator.Provider>
        </ThemeProvider>
    )
}

export default MainNavigation;
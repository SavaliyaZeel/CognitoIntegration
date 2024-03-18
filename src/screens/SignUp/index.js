import { View } from 'react-native';
import React from 'react';
import { Colors } from '../../common/styles/color';
import { Authenticator, useTheme } from '@aws-amplify/ui-react-native';
import { Heading } from '@aws-amplify/ui-react-native/dist/primitives';

const SignUpScreen = () => {
  return (
    <Authenticator
      // Header={() => {
      //   const { tokens } = useTheme();
      //   return (
      //     <Heading
      //       padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
      //       level={3}
      //     >
      //       Sign in to your account
      //     </Heading>
      //   );
      // }}
      components={{
        SignUp: ({ fields, ...props }) => (
          console.log("fields", props),
          <Authenticator.SignUp
            {...props}
            Header={() => {
              const theme = useTheme();
              console.log("theme", theme.tokens.colors);
              return (
                <>
                  <Heading
                    level={1}
                    style={{ fontSize: 44, fontWeight: "bold", color: Colors.mainColor }}
                  >
                    Welcome to Pantry by Marble
                  </Heading>
                  <Heading
                    level={5}
                    style={{ color: Colors.mainColor, fontWeight: "400" }}
                  >
                    Sign up for easy payment, collection and much more
                  </Heading>
                  <View style={{ width: "100%", backgroundColor: Colors.mainColor, padding: 10, marginVertical: 10 }}></View>
                </>
              );
            }}
            fields={[...fields]}
          />
        )
        // ({ fields, ...props }) => (
        //   Authenticator.SignUp
        //     {...props}
        //     fields={[
        //       ...fields,
        //       // {
        //       //   name: 'preferred_username',
        //       //   label: 'Preferred Username',
        //       //   type: 'default',
        //       //   placeholder: 'Enter your preferred username',
        //       // },
        //     ]}
        //     // displayName={"sgrfg"}
        //     style={{ backgroundColor: "red" }} 
        // />
        // )
      }}
    // components={{

    //   SignUp:()=>(
    //     <View style={{flex: 1, backgroundColor: "red"}}>
    //       <Text> afrstr</Text>
    //     </View>
    //   )
    // }}
    >
      {/* <Button title="Sign Out" onPress={() => { Alert.alert("dh") }} /> */}
    </Authenticator>
  );
};

export default SignUpScreen;

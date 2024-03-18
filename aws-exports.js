const awsConfig = {
  Auth: {
    Cognito: {
      userPoolClientId: 'aei9dfubq2l5cnucfl5qja782',
      region: 'ap-south-1',
      userPoolId: 'af-south-1_EyQOL6Hkm',
        email: 'true', // Optional
      },
      identityPoolId: 'af-south-1:105e49c4-d498-42dd-a44a-480c1a08a63b',
    }
  }
  
export default awsConfig;

// const awsConfig = {
//   Auth: {
//     Cognito: {
//       userPoolClientId: '35stmcsp5eo410fakp7kra82rf',
//       region: 'us-east-1',
//       userPoolId: 'us-east-1_qKJYcdP0r',
//       signUpVerificationMethod: "code"
//       },
//       identityPoolId: 'us-east-1:b68b5814-9304-4f5d-8c4d-8392e0145717',
//     }
//   }
  
//   export default awsConfig;

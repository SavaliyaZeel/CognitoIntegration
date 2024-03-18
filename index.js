/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import {Amplify} from 'aws-amplify';
import awsConfig from './aws-exports';
import MainNavigation from './src/navigator/MainNavigation';
Amplify.configure(awsConfig);

AppRegistry.registerComponent(appName, () => MainNavigation);

import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Button from '../../components/Button'
import { useDispatch } from 'react-redux'
import { authSuccess } from '../../store/action/auth'
import { signOut } from '@aws-amplify/auth'

const HomeScreen = () => {
  const dispatch = useDispatch();
  const handleSignOut = async () => {
    try {
      await signOut();
      dispatch(authSuccess(false));
    } catch (error) {
      console.log('error signing out: ', error);
    }
  }
  return (
    <View style={{ flex: 1 }}>
      <Button onPress={handleSignOut} title={"Sign Out"} />
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors } from '../common/styles/color'

const Button = ({buttonStyle, buttonTitleStyle, title, onPress  }) => {
    return (
        <TouchableOpacity style={[styles.button, buttonStyle]} onPress={onPress}>
            <Text style={[styles.buttonTitle, buttonTitleStyle]}>{title}</Text>
        </TouchableOpacity>
    )
}

export default Button

const styles = StyleSheet.create({
    button: {
        width: '90%',
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
        backgroundColor: Colors.mainColor,
        alignSelf: "center",
        marginVertical: 5,
        marginTop: 20
    },
    buttonTitle: {
        fontWeight: 'bold',
        lineHeight: 24,
        color: Colors.white,
    },
})
import { StyleSheet, TextInput, View } from 'react-native'
import React from 'react'
import { Colors } from '../common/styles/color'

const Input = ({ value, onChangeText, Icon, placeholder, iconSize, iconName, iconColor, secureTextEntry = false, inputBox = {}, input = {} }) => {
    return (
        <View style={[styles.inputBox, inputBox]}>
            {Icon && <Icon name={iconName || "rocket"} size={iconSize || 14} color={iconColor || Colors.iconColor} />}
            <TextInput style={[styles.input, input]} value={value || ""} placeholder={placeholder || ""} onChangeText={onChangeText} secureTextEntry={secureTextEntry} />
        </View>
    )
}

export default Input

const styles = StyleSheet.create({
    inputBox: {
        width: "90%",
        backgroundColor: Colors.semiMainColor,
        alignSelf: "center",
        borderRadius: 15,
        marginVertical: 5,
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: 15
    },
    input: {
        padding: 15,
        paddingHorizontal: 15,
        flex: 1,
    }
})
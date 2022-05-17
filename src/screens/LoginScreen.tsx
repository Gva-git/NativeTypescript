import React from "react";
import { StyleSheet, View, Text } from "react-native";
import LoginForm from "../Forms/LoginForm";
import styled from "styled-components";

const LoginScreen = ({navigation}:{navigation: any}):React.ReactElement => {
    return (
        <View style={{height: '100%'}}>
            <View style={{height: '30%', justifyContent: 'center'}}><Text style={styles.loginText}>Login</Text></View>
            <View style={styles.container}>
                <LoginForm navigation={navigation}/>
                
                <Text style={{textAlign: 'center'}}>--Powered by Test--</Text>
                
            </View>
        </View>
    )
}

export default LoginScreen;

const styles = StyleSheet.create ({
    container: {
        // marginTop: 200,
        marginHorizontal: 10,
        padding: 20,
        height: '70%',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        elevation: 5,
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
    },
    loginText: {
        fontWeight: 'bold',
        fontSize: 28,
        textAlign: 'center',
        justifyContent: 'center',
        // backgroundColor: '#bebebe'
    },
})
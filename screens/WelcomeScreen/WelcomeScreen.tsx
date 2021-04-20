//import liraries
import React, { Component, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { Auth, Hub } from 'aws-amplify';
import { CommonActions, useNavigation } from '@react-navigation/core';
import { parseSync } from '@babel/core';
import AppContext from '../../src/utils/AppContext';

const image = require('../../assets/images/Saly-1.png');
const googleButtonImg = require('../../assets/images/google-sign-in.png');

// create a component
const WelcomeScreen = () => {

    const navigation = useNavigation();
    const { setUserId } = useContext(AppContext);

    useEffect(() => {
        const fetchUser = async () => {
            const user = await Auth.currentAuthenticatedUser();
            if (user) {
                setUserId(user.attributes.sub);
                navigation.dispatch(
                    CommonActions.reset({
                        index: 0,
                        routes: [
                            { name: 'Root' },
                        ],
                    })
                );
            }
        }

        fetchUser();
    }, [])

    useEffect(() => {
        Hub.listen("auth", ({ payload: { event, data } }) => {
            if (event === "signIn") {
                setUserId(data.signInUserSession.accessToken.payload.sub);
                navigation.dispatch(
                    CommonActions.reset({
                        index: 0,
                        routes: [
                            { name: 'Root' },
                        ],
                    })
                );
            }
        });
    }, [])

    const signInGoogle = async () => {
        await Auth.federatedSignIn({ provider: "Google" });
    };

    return (
        <View style={styles.container}>
            <Image
                style={styles.image}
                source={image}
            />
            <Text style={styles.header1}>Welcome to VCrypto</Text>
            <Text style={styles.header2}>Invest your virtual $100,000 and compete with others</Text>

            <Pressable onPress={signInGoogle} style={styles.googleButton}>
                <Image style={styles.buttonImage} source={googleButtonImg} />
            </Pressable>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    image: {
        height: '40%',
        aspectRatio: 1,
    },
    header1: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 5,
        color: '#eeebdd'
    },
    header2: {
        fontSize: 20,
        textAlign: 'center',
        color: '#707070'
    },
    buttonImage: {
        width: '100%',
        resizeMode: 'contain'
    },
    googleButton: {
        marginTop: 'auto',
        marginBottom: 50,
        width: '70%'
    }
});

//make this component available to the app
export default WelcomeScreen;

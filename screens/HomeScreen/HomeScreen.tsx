//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const image = require('../../assets/images/Saly-1.png');

// create a component
const HomeScreen = () => {
    return (
        <View style={styles.container}>
            <Image
                style={styles.image}
                source={image}
            />
            <Text style={styles.header1}>Welcome to VCrypto</Text>
            <Text style={styles.header2}>Invest your virtual $100,000 and compete with others</Text>
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
    }
});

//make this component available to the app
export default HomeScreen;

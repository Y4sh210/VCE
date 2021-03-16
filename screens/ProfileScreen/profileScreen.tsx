//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

// const image = require('../../assets/images/Saly-10.png');

// create a component
const ProfileScreen = () => {
    return (
        <View style={styles.container}>
            {/* <Image style={styles.image} source={image} />F */}
            <Text>ProfileScreen</Text>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
    image:{

    }
});

//make this component available to the app
export default ProfileScreen;

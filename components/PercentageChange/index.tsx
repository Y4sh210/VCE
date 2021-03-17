//import liraries
import { useLinkProps } from '@react-navigation/native';
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface PercentageChangeProps {
    value: number,
    style?: object,
}

// create a component
const PercentageChange = ({ value, style = {} }: PercentageChangeProps) => {
    return (
        <Text style={[style, { color: value > 0 ? '#4bdb00' : '#f10000' }]}>
            { value > 0 && '+'} {value} %
        </Text >
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
});

//make this component available to the app
export default PercentageChange;

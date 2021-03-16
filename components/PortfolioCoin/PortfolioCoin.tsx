//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export interface portfolioCoinProps {
    portfolioCoin: {
        image: string,
        name: string,
        symbol: string,
        amount: number,
        valueUSD: number,
    }
}

// create a component
const PortfolioCoin = (props: portfolioCoinProps) => {
    const {
        portfolioCoin: {
            image,
            name,
            symbol,
            amount,
            valueUSD,
        },
    } = props;
    return (
        <View style={styles.container}>
            <View style={styles.left}>
                <Image style={styles.image} source={require('../../assets/images/btc.png')} />
                <View>
                    <Text style={styles.name}>{name}</Text>
                    <Text style={styles.symbol}>{symbol}</Text>
                </View>
            </View>
            <View style={styles.right}>
                <Text style={styles.value}>${valueUSD}</Text>
                <Text style={styles.symbol}>{symbol} {amount}</Text>
            </View>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10,
        height: 50,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#eeebdd',
    },
    image: {
        height: 50,
        width: 50,
        marginRight: 10
    },
    left: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
    },
    right: {
        padding: 10,
        alignItems: 'flex-end'
    },
    name: {
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#eeebdd'
    },
    symbol: {
        color: '#eeebdd'
    },
    value: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 5,
        color: '#eeebdd'
    }
});

//make this component available to the app
export default PortfolioCoin;

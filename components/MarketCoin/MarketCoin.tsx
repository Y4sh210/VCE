//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import PercentageChange from '../PercentageChange';
import { useNavigation } from '@react-navigation/native';

export interface portfolioCoinProps {
    marketCoin: {
        id: string,
        image: string,
        name: string,
        symbol: string,
        valueChange24H: number,
        currentPrice: number,
    }
}

// create a component
const MarketCoin = (props: portfolioCoinProps) => {
    const {
        marketCoin: {
            id,
            image,
            name,
            symbol,
            valueChange24H,
            currentPrice,
        },
    } = props;

    const navigation = useNavigation();

    return (
        <Pressable style={styles.container} onPress={() => navigation.navigate('CoinDetails', { id })}>
            <View style={styles.left}>
                <Image style={styles.image} source={require('../../assets/images/btc.png')} />
                <View>
                    <Text style={styles.name}>{name}</Text>
                    <Text style={styles.symbol}>{symbol}</Text>
                </View>
            </View>
            <View style={styles.right}>
                <Text style={styles.value}>${currentPrice.toFixed(3)}</Text>
                <PercentageChange value={valueChange24H.toFixed(3)} />
            </View>
        </Pressable >
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
export default MarketCoin;

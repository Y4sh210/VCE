//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, FlatList } from 'react-native';
import MarketCoin from '../../components/MarketCoin/MarketCoin';

const image = require('../../assets/images/Saly-17.png');

const portfolioCoins = [{
    id: '1',
    name: 'Virtual Dollars',
    image: require('../../assets/images/btc.png'),
    symbol: 'USD',
    valueChange24H: 70.20,
    valueUSD: 70.20
},
{
    id: '2',
    name: 'Bitcoin',
    image: 'abc',
    symbol: 'BTC',
    valueChange24H: -1.21,
    valueUSD: 69.420
},
{
    id: '3',
    name: 'Ether',
    image: 'abc',
    symbol: 'ETH',
    valueChange24H: 30,
    valueUSD: 30.120
},
{
    id: '4',
    name: 'Ether',
    image: 'abc',
    symbol: 'ETH',
    valueChange24H: 30,
    valueUSD: 30.120
},
{
    id: '5',
    name: 'Ether',
    image: 'abc',
    symbol: 'ETH',
    valueChange24H: 30,
    valueUSD: 30.120
},
{
    id: '6',
    name: 'Ether',
    image: 'abc',
    symbol: 'ETH',
    valueChange24H: 30,
    valueUSD: 30.120
},
{
    id: '7',
    name: 'Ether',
    image: 'abc',
    symbol: 'ETH',
    valueChange24H: 30,
    valueUSD: 30.120
},
{
    id: '8',
    name: 'Ether',
    image: 'abc',
    symbol: 'ETH',
    valueChange24H: 30,
    valueUSD: 30.120
}]
// create a component
const MarketScreen = () => {
    return (
        <View style={styles.container}>
            <Image
                style={styles.image}
                source={image}
            />
            <Text style={styles.label}>Market</Text>
            <FlatList
                style={{ width: '100%' }}
                data={portfolioCoins}
                renderItem={({ item }) =>
                    <MarketCoin marketCoin={item} />
                }
                showsVerticalScrollIndicator={false}
            />

        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 20
    },
    balancedContainer: {
        width: '100%',
        marginVertical: 20
    },
    image: {
        height: 170,
        resizeMode: "contain",
    },
    label: {
        fontSize: 18,
        color: '#eeebdd',
        fontWeight: 'bold'
    }
});

//make this component available to the app
export default MarketScreen;

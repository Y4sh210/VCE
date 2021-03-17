//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, FlatList } from 'react-native';
import PortfolioCoin from '../../components/PortfolioCoin/PortfolioCoin';
import ProfileScreen from '../ProfileScreen/profileScreen';

const image = require('../../assets/images/Saly-10.png');

const portfolioCoins = [{
    id: '1',
    name: 'Virtual Dollars',
    image: require('../../assets/images/btc.png'),
    symbol: 'USD',
    amount: 70.20,
    valueUSD: 70.20
},
{
    id: '2',
    name: 'Bitcoin',
    image: 'abc',
    symbol: 'BTC',
    amount: 1.21,
    valueUSD: 69.420
},
{
    id: '3',
    name: 'Ether',
    image: 'abc',
    symbol: 'ETH',
    amount: 30,
    valueUSD: 30.120
},
{
    id: '4',
    name: 'Ether',
    image: 'abc',
    symbol: 'ETH',
    amount: 30,
    valueUSD: 30.120
},
{
    id: '5',
    name: 'Ether',
    image: 'abc',
    symbol: 'ETH',
    amount: 30,
    valueUSD: 30.120
},
{
    id: '6',
    name: 'Ether',
    image: 'abc',
    symbol: 'ETH',
    amount: 30,
    valueUSD: 30.120
},
{
    id: '7',
    name: 'Ether',
    image: 'abc',
    symbol: 'ETH',
    amount: 30,
    valueUSD: 30.120
},
{
    id: '8',
    name: 'Ether',
    image: 'abc',
    symbol: 'ETH',
    amount: 30,
    valueUSD: 30.120
}]
// create a component
const PortfolioScreen = () => {
    return (
        <View style={styles.container}>
            <Image
                style={styles.image}
                source={image}
            />
            <View style={styles.balancedContainer}>
                <Text style={styles.label}>Portfolio Balance</Text>
                <Text style={styles.balance}>$69.200</Text>
            </View>

            <FlatList
                style={{ width: '100%' }}
                data={portfolioCoins}
                renderItem={({ item }) =>
                    <PortfolioCoin portfolioCoin={item} />
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
        height: 160,
        resizeMode: "contain",
    },
    label: {
        fontSize: 18,
        color: '#eeebdd',
        fontWeight: 'bold'
    },
    balance: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#eeebdd',
    }
});

//make this component available to the app
export default PortfolioScreen;

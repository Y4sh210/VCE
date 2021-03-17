//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, FlatList } from 'react-native';
import UserRankingItem from '../../components/UserRankingItem/UserRankingItem';

const image = require('../../assets/images/Saly-20.png');

const portfolioCoins = [{
    id: '1',
    name: 'Virtual Dollars',
    image: require('../../assets/images/btc.png'),
    netWorth: 70.20
},
{
    id: '2',
    name: 'Virtual Dollars',
    image: require('../../assets/images/btc.png'),
    netWorth: 70.20
},
{
    id: '3',
    name: 'Virtual Dollars',
    image: require('../../assets/images/btc.png'),
    netWorth: 70.20
}]
// create a component
const RankingScreen = () => {
    return (
        <View style={styles.container}>
            <Image
                style={styles.image}
                source={image}
            />
            <Text style={styles.label}>Rankings</Text>
            <FlatList
                style={{ width: '100%' }}
                data={portfolioCoins}
                renderItem={({ item, index }) =>
                    <UserRankingItem user={item} place={index + 1} />
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
export default RankingScreen;

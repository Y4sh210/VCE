//import liraries
import React, { Component, useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList } from 'react-native';
import PortfolioCoin from '../../components/PortfolioCoin/PortfolioCoin';
import ProfileScreen from '../ProfileScreen/profileScreen';
import { API, graphqlOperation } from 'aws-amplify';
import { getUserPortfolio } from './queries';
import AppContext from '../../src/utils/AppContext';

const image = require('../../assets/images/Saly-10.png');

// create a component
const PortfolioScreen = () => {

    const [balance, setBalance] = useState(0);
    const [portfolioCoins, setPortfolioCoins] = useState([]);
    const [loading, setLoading] = useState(false);
    const { userId } = useContext(AppContext);

    const fetchPortfolio = async () => {
        setLoading(true);
        try {
            const response = await API.graphql(
                graphqlOperation(
                    getUserPortfolio,
                    { id: userId },
                )
            )
            setBalance(response.data.getUser.netWorth);
            setPortfolioCoins(response.data.getUser.portfolioCoins.items);
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPortfolio();
    }, [])

    return (
        <View style={styles.container}>
            <Image
                style={styles.image}
                source={image}
            />
            <View style={styles.balancedContainer}>
                <Text style={styles.label}>Portfolio Balance</Text>
                <Text style={styles.balance}>${balance}</Text>
            </View>

            <FlatList
                style={{ width: '100%' }}
                data={portfolioCoins}
                renderItem={({ item }) =>
                    <PortfolioCoin portfolioCoin={item} />
                }
                onRefresh={fetchPortfolio}
                refreshing={loading}
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

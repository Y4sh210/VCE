//import liraries
import React, { Component, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, FlatList } from 'react-native';
import MarketCoin from '../../components/MarketCoin/MarketCoin';
import { API, graphqlOperation } from 'aws-amplify';
import { listCoins } from '../../src/graphql/queries';

const image = require('../../assets/images/Saly-17.png');


// create a component
const MarketScreen = () => {

    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchCoins = async () => {
        setLoading(true);
        try {
            const response = await API.graphql(graphqlOperation(listCoins));
            console.log(response);
            setCoins(response.data.listCoins.items);
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchCoins();
    }, []);

    return (
        <View style={styles.container}>
            <Image
                style={styles.image}
                source={image}
            />
            <Text style={styles.label}>Market</Text>
            <FlatList
                style={{ width: '100%' }}
                data={coins}
                onRefresh={fetchCoins}
                refreshing={loading}
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
        height: 160,
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

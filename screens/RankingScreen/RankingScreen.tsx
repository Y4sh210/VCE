//import liraries
import React, { Component, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList } from 'react-native';
import UserRankingItem from '../../components/UserRankingItem/UserRankingItem';
import { API, graphqlOperation } from 'aws-amplify';
import { listUsers } from '../../src/graphql/queries';

const image = require('../../assets/images/Saly-20.png');

// const portfolioCoins = [{
//     id: '1',
//     name: 'Yash Chauhan',
//     image: require('../../assets/images/btc.png'),
//     netWorth: 100000.000
// }]
// create a component
const RankingScreen = () => {

    const [userList, setUserList] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchUserList = async () => {
        setLoading(true);
        try {
            const response = await API.graphql(graphqlOperation(listUsers));
            console.log(response);
            setUserList(response.data.listUsers.items);
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchUserList();
    }, []);

    return (
        <View style={styles.container}>
            <Image
                style={styles.image}
                source={image}
            />
            <Text style={styles.label}>Rankings</Text>
            <FlatList
                style={{ width: '100%' }}
                data={userList}
                onRefresh={fetchUserList}
                refreshing={loading}
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
export default RankingScreen;

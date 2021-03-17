//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export interface UserRankingItemProps {
    user: {
        image: string,
        name: string,
        netWorth: number,
    },
    place: number,
}

// create a component
const UserRankingItem = (props: UserRankingItemProps) => {
    const {
        user: {
            image,
            name,
            netWorth
        },
        place
    } = props;
    return (
        <View style={styles.container}>
            <View style={styles.left}>
                <Text style={styles.place}>{place}</Text>
                <Image style={styles.image} source={require('../../assets/images/btc.png')} />
                <View>
                    <Text style={styles.name}>{name}</Text>
                </View>
            </View>
            <View style={styles.right}>
                <Text style={styles.value}>${netWorth}</Text>
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
    },
    place: {
        fontSize: 18,
        width: 30,
        marginBottom: 5,
        color: '#eeebdd',

    }
});

//make this component available to the app
export default UserRankingItem;

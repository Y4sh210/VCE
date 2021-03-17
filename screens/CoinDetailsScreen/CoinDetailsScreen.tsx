//import liraries
import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, Image, Pressable, ImageBackgroundBase } from 'react-native';
import { AntDesign } from "@expo/vector-icons";
import PercentageChange from '../../components/PercentageChange';

// create a component
const CoinDetailsScreen = () => {
    const [coinData, setCoinData] = useState({
        id: '1',
        image: require('../../assets/images/btc.png'),
        name: "Bitcoin",
        symbol: 'BTC',
        valueChange24H: -1.12,
        valueChange1D: 2.12,
        valueChange7D: -1.12,
        currentPrice: 594.20,
        amount: 2
    })

    const onBuy = () => {
    };

    const onSell = () => {

    };

    return (
        <View style={styles.container}>
            <View style={styles.topContainer}>
                <View style={styles.left}>
                    <Image style={styles.image} source={require('../../assets/images/btc.png')} />
                    <View>
                        <Text style={styles.name}>{coinData.name}</Text>
                        <Text style={styles.symbol}>{coinData.symbol}</Text>
                    </View>
                </View>
                <View style={styles.right}>
                    <AntDesign name={'staro'} size={30} color={'#2f95dc'} />
                </View>
            </View>
            <View style={styles.row}>
                <View>
                    <Text style={styles.label}>Current Price</Text>
                    <Text style={styles.value}>{coinData.currentPrice}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <View style={styles.valueContainer}>
                        <Text style={styles.label}>1 hour</Text>
                        <PercentageChange value={coinData.valueChange24H} />
                    </View>

                    <View style={styles.valueContainer}>
                        <Text style={styles.label}>1 day</Text>
                        <PercentageChange value={coinData.valueChange1D} />
                    </View>

                    <View style={styles.valueContainer}>
                        <Text style={styles.label}>7 days</Text>
                        <PercentageChange value={coinData.valueChange7D} />
                    </View>
                </View>
            </View>
            <View style={styles.row2}>
                <Text style={{ color: '#eeebdd', marginVertical: 10 }}>Position</Text>
                <Text style={{ color: '#eeebdd', marginVertical: 10 }}>
                    {coinData.symbol} {coinData.amount}
                    {' '}
                    ($ {coinData.currentPrice * coinData.amount})
                </Text>
            </View>
            <View style={[styles.row, { marginTop: 'auto' }]}>
                <Pressable style={[styles.button, { backgroundColor: '#20b100' }]} onPress={onBuy}>
                    <Text style={styles.buttonText}>Buy</Text>
                </Pressable>
                <Pressable style={[styles.button, { backgroundColor: '#ff0000' }]} onPress={onSell}>
                    <Text style={styles.buttonText}>Sell</Text>
                </Pressable>
            </View>
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
    topContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10,
        height: 50,
        width: '100%'
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
    row: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        marginVertical: 15
    },
    row2: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        marginVertical: 15,
        borderWidth: 1,
        borderTopColor: '#707070',
        borderBottomColor: '#707070',
    },
    label: {
        color: '#eeebdd',
        marginBottom: 5
    },
    value: {
        fontSize: 24,
        color: '#eeebdd'
    },
    valueContainer: {
        alignItems: 'center',
        marginHorizontal: 5,
    },
    button: {
        flex: 1,
        margin: 5,
        height: 50,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        color: 'white',
        fontSize: 18,

    }
});

//make this component available to the app
export default CoinDetailsScreen;

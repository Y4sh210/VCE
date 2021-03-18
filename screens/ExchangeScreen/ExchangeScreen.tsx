//import liraries
import { useRoute } from '@react-navigation/native';
import React, { Component, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Pressable, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';



const image = require('../../assets/images/Saly-31.png');

// create a component
const ExchangeScreen = () => {
    const [coinAmount, setCoinAmount] = useState('');
    const [coinUSDAmount, setCoinUSDAmount] = useState('');

    const maxUSD = 100000;


    const route = useRoute();

    const isBuy = route?.params?.isBuy;
    const coinData = route?.params?.coinData;

    useEffect(() => {
        const amount = parseFloat(coinAmount);
        if (!amount && amount !== 0) {
            setCoinAmount("");
            setCoinUSDAmount("");
            return;
        }
        // setCoinAmount(amount.toString());
        setCoinUSDAmount((amount * coinData.currentPrice).toString());
    }, [coinAmount]);

    useEffect(() => {
        const amount = parseFloat(coinUSDAmount);
        if (!amount && amount !== 0) {
            setCoinAmount("");
            setCoinUSDAmount("");
            return;
        }
        setCoinAmount(amount.toString());
        setCoinAmount((amount / coinData.currentPrice).toString());
    }, [coinUSDAmount]);

    const onPlaceOrder = () => {
        if (isBuy && parseFloat(coinUSDAmount) > maxUSD) {
            Alert.alert('Error', `Not enough USD coins. Max: ${maxUSD}`);
            return;
        }
        if (!isBuy && parseFloat(coinAmount) > coinData.amount) {
            Alert.alert('Error', `Not enough ${coinData.symbol} coins. Max: ${coinData.amount}`)
        }
    };

    return (
        <View
            // onPress={Keyboard.dismiss}
            style={styles.container}
        >
            <Text style={styles.title}>
                {isBuy ? 'Buy ' : 'Sell '}
                {coinData?.name}
            </Text>
            <Text style={styles.subtitle}>
                1 {coinData?.symbol}
                {' = '}
                ${coinData?.currentPrice}
            </Text>
            <Image style={styles.image} source={image} />
            <View style={styles.inputsContainer}>
                <View style={styles.inputContainer}>
                    <TextInput
                        keyboardType='decimal-pad'
                        style={{ color: '#eeebdd', width: 60 }}
                        placeholder="0"
                        value={coinAmount}
                        onChangeText={(text) => setCoinAmount(text)}
                    />
                    <Text
                        style={{ color: '#eeebdd', marginLeft: 5 }}>
                        {coinData?.symbol}
                    </Text>
                </View>
                <Text style={{ color: '#eeebdd', fontSize: 30 }}>=</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        keyboardType='decimal-pad'
                        style={{ color: '#eeebdd', width: 60 }}
                        placeholder="0"
                        value={coinUSDAmount}
                        onChangeText={setCoinUSDAmount}

                    />
                    <Text
                        style={{ color: '#eeebdd', marginLeft: 5 }}>
                        USD
                    </Text>
                </View>
            </View>
            <Pressable style={styles.button} onPress={onPlaceOrder}>
                <Text style={styles.buttonText}>Place Order</Text>
            </Pressable>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#eeebdd',
        marginTop: 20
    },
    subtitle: {
        fontSize: 18,
        marginVertical: 10,
        color: '#eeebdd'
    },
    image: {
        height: 160,
        resizeMode: 'contain',
    },
    inputContainer: {
        borderWidth: 1,
        borderColor: '#eeebdd',
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 1,
        margin: 20,
    },
    inputsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        alignItems: 'center'
    },
    button: {
        backgroundColor: '#2f95dc',
        marginTop: 'auto',
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50
    },
    buttonText: {
        color: '#eeebdd',
        fontSize: 18
    }
});

//make this component available to the app
export default ExchangeScreen;

//import liraries
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { Component, useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Pressable, Alert, TouchableWithoutFeedback, Keyboard, ActivityIndicator } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { API, graphqlOperation } from 'aws-amplify';
import { exchangeCoins } from '../../src/graphql/mutations';
import AppContext from '../../src/utils/AppContext';
import { listPortfolioCoins } from '../../src/graphql/queries';



const image = require('../../assets/images/Saly-31.png');

const USD_COIN_ID = '05944a8c-c272-4338-93d1-f5239b5b8457';

// create a component
const ExchangeScreen = () => {
    const [coinAmount, setCoinAmount] = useState('');
    const [coinUSDAmount, setCoinUSDAmount] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const navigation = useNavigation();

    const maxUSD = 100000;
    const { userId } = useContext(AppContext);

    const route = useRoute();

    const isBuy = route?.params?.isBuy;
    const coin = route?.params?.coin;
    const portfolioCoin = route?.params?.portfolioCoin;

    useEffect(() => {
        const amount = parseFloat(coinAmount);
        if (!amount && amount !== 0) {
            setCoinAmount("");
            setCoinUSDAmount("");
            return;
        }
        // setCoinAmount(amount.toString());
        setCoinUSDAmount((amount * coin.currentPrice).toString());
    }, [coinAmount]);

    useEffect(() => {
        const amount = parseFloat(coinUSDAmount);
        if (!amount && amount !== 0) {
            setCoinAmount("");
            setCoinUSDAmount("");
            return;
        }
        setCoinAmount(amount.toString());
        setCoinAmount((amount / coin.currentPrice).toString());
    }, [coinUSDAmount]);

    const getPortfolioCoinId = async (coinId: string) => {
        try {
            const response = await API.graphql(
                graphqlOperation(listPortfolioCoins,
                    {
                        filter: {
                            and: {
                                coinId: { eq: coinId },
                                userId: { eq: userId }
                            }
                        }
                    }
                )
            )
            if (response.data.listPortfolioCoins.items.length > 0) {
                return (response.data.listPortfolioCoins.items[0].id);
            } else {
                return null;
            }
        } catch (e) {
            console.log(e);
            return null;
        }
    }


    const placeOrder = async () => {
        if (isLoading) {
            return;
        }
        setIsLoading(true);
        try {
            const variables =
            {
                coinId: coin.id,
                isBuy,
                amount: parseFloat(coinAmount),
                usdPortfolioCoinId: await getPortfolioCoinId(USD_COIN_ID),
                coinPortfolioCoinId: await getPortfolioCoinId(coin.id)
            }

            const response = await API.graphql(
                graphqlOperation(
                    exchangeCoins, variables
                )
            )
            if (response.data.exchangeCoins) {
                navigation.navigate('Portfolio');
            } else {
                Alert.alert('Error', 'There was an error exchanging coins');
            }
        } catch (e) {
            Alert.alert('Error', 'There was an error exchanging coins');
            console.log(e);
        }
        setIsLoading(false);
    }

    const onPlaceOrder = () => {
        if (isBuy && parseFloat(coinUSDAmount) > maxUSD) {
            Alert.alert('Error', `Not enough USD coins. Max: ${maxUSD}`);
            return;
        }
        if (!isBuy && (!portfolioCoin || parseFloat(coinAmount) > portfolioCoin.amount)) {
            Alert.alert('Error', `Not enough ${coin.symbol} coins. Max: ${coin.amount || 0}`)
        }

        await placeOrder();
    };

    return (
        <View
            // onPress={Keyboard.dismiss}
            style={styles.container}
        >
            <Text style={styles.title}>
                {isBuy ? 'Buy ' : 'Sell '}
                {coin?.name}
            </Text>
            <Text style={styles.subtitle}>
                1 {coin?.symbol}
                {' = '}
                ${coin?.currentPrice}
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
                        {coin?.symbol}
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
                {isLoading && <ActivityIndicator color={'white'} />}
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
        borderRadius: 50,
        flexDirection: 'row'
    },
    buttonText: {
        color: '#eeebdd',
        fontSize: 18
    }
});

//make this component available to the app
export default ExchangeScreen;

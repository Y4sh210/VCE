//import liraries
import React, { Component, useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Pressable, ImageBackgroundBase, ActivityIndicator } from 'react-native';
import { AntDesign } from "@expo/vector-icons";
import { API, graphqlOperation } from 'aws-amplify';
import { getCoin, listPortfolioCoins } from '../../src/graphql/queries';
import PercentageChange from '../../components/PercentageChange';
import CoinPriceGraph from '../../components/CoinPriceGraph';
import { useNavigation, useRoute } from '@react-navigation/core';
import AppContext from '../../src/utils/AppContext';


// create a component
const CoinDetailsScreen = () => {
    const [coin, setCoin] = useState(null);
    const [portfolioCoin, setPortfolioCoin] = useState(null);

    const { userId } = useContext(AppContext);

    const navigation = useNavigation();

    const route = useRoute();

    const fetchCoinData = async () => {
        if (!route.params?.id) {
            return;
        }
        try {
            const response = await API.graphql(
                graphqlOperation(getCoin, { id: route.params.id })
            )
            setCoin(response.data.getCoin);
        } catch (e) {
            console.log(e);
        }
    }

    const fetchPortfolioCoinData = async () => {
        if (!route.params?.id) {
            return;
        }
        try {
            const response = await API.graphql(
                graphqlOperation(listPortfolioCoins,
                    {
                        filter: {
                            and: {
                                coinId: { eq: route.params.id },
                                userId: { eq: userId }
                            }
                        }
                    }
                )
            )
            if (response.data.listPortfolioCoins.items.length > 0) {
                setPortfolioCoin(response.data.listPortfolioCoins.items[0])
            }
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        fetchCoinData();
        fetchPortfolioCoinData();
    }, [])

    const onBuy = () => {
        navigation.navigate('CoinExchange', { isBuy: true, coin, portfolioCoin });
    };

    const onSell = () => {
        navigation.navigate('CoinExchange', { isBuy: false, portfolioCoin });
    };

    if (!coin) {
        return <ActivityIndicator />
    }

    return (
        <View style={styles.container}>
            <View style={styles.topContainer}>
                <View style={styles.left}>
                    <Image style={styles.image} source={require('../../assets/images/btc.png')} />
                    <View>
                        <Text style={styles.name}>{coin.name}</Text>
                        <Text style={styles.symbol}>{coin.symbol}</Text>
                    </View>
                </View>
                <View style={styles.right}>
                    <AntDesign name={'staro'} size={30} color={'#2f95dc'} />
                </View>
            </View>
            <View style={styles.row}>
                <View>
                    <Text style={styles.label}>Current Price</Text>
                    <Text style={styles.value}>{coin.currentPrice.toFixed(3)}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <View style={styles.valueContainer}>
                        <Text style={styles.label}>1 hour</Text>
                        <PercentageChange value={coin.valueChange24H.toFixed(3)} />
                    </View>

                    <View style={styles.valueContainer}>
                        <Text style={styles.label}>1 day</Text>
                        <PercentageChange value={coin.valueChange1D.toFixed(3)} />
                    </View>

                    <View style={styles.valueContainer}>
                        <Text style={styles.label}>7 days</Text>
                        <PercentageChange value={coin.valueChange7D.toFixed(3)} />
                    </View>
                </View>
            </View>

            {coin?.priceHistoryString && <CoinPriceGraph dataString={coin.priceHistoryString} />}



            <View style={styles.row2}>
                <Text style={{ color: '#eeebdd', marginVertical: 10 }}>Position</Text>
                <Text style={{ color: '#eeebdd', marginVertical: 10 }}>
                    {coin.symbol} {portfolioCoin?.amount?.toFixed(3) || 0}
                    {' '}
                    ($ {coin.currentPrice * portfolioCoin?.amount?.toFixed(3) || 0})
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

//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

interface CoinPriceGraphProps {
    dataString: string;
}

// create a component
const CoinPriceGraph = ({ dataString }: CoinPriceGraphProps) => {

    const data = JSON.parse(dataString);

    return (
        <View style={styles.container}>
            <LineChart
                data={{
                    labels: ["-7D", "-6D", "-5D", "-4D", "-3D", "-2D", "now"],
                    datasets: [
                        {
                            data
                        }
                    ]
                }}
                width={Dimensions.get("window").width - 30} // from react-native??
                height={220}
                yAxisLabel="$"
                yAxisSuffix="K "
                withOuterLines={false}
                withInnerLines={false}
                yAxisInterval={1} // optional, defaults to 1
                chartConfig={{
                    // backgroundColor: "#e26a00",
                    // backgroundGradientFrom: "#fb8c00",
                    // backgroundGradientTo: "#ffa726",
                    decimalPlaces: 2, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    style: {
                        borderRadius: 16
                    },
                    propsForDots: {
                        r: "0",
                        strokeWidth: "1",
                        stroke: "#fafafa"
                    }
                }}
                style={{
                    marginVertical: 8,
                    borderRadius: 16
                }}
            />
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
});

//make this component available to the app
export default CoinPriceGraph;

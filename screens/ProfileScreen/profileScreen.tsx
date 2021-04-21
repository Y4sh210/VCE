//import liraries
import { API, Auth, graphqlOperation } from 'aws-amplify';
import { getUser } from '../../src/graphql/queries';
import { useNavigation } from '@react-navigation/core';
import { CommonActions } from '@react-navigation/native';
import React, { Component, useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Pressable, ActivityIndicator } from 'react-native';
import AppContext from '../../src/utils/AppContext';

const image = require('../../assets/images/Saly-16.png');

// create a component
const ProfileScreen = () => {
    const [user, setUser] = useState([]);
    const { userId } = useContext(AppContext);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await API.graphql(graphqlOperation(getUser, { id: userId }));
                setUser(response.data.getUser);

            } catch (e) {
                console.log(e);
            }
        }
        fetchUser();
    }, [])

    const navigation = useNavigation();

    const signout = async () => {
        await Auth.signOut();
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [
                    { name: 'Welcome' },
                ],
            })
        );
    };

    if (!user) {
        return (<ActivityIndicator color="white" />)
    }

    return (
        <View style={styles.container}>
            <Image style={styles.image} source={image} />
            <View style={styles.userContainer}>
                <View style={styles.left}>
                    <Image style={styles.userImage} source={{ uri: user.image }} />
                    <View>
                        <Text style={styles.name}>{user.name}</Text>
                        <Text style={styles.email}>{user.email}</Text>
                    </View>
                </View>
                <View style={styles.right}>
                    <Text style={styles.value}>${user.networth}</Text>
                </View>
            </View>
            <Pressable onPress={signout} style={{ marginTop: 'auto' }}>
                <Text style={styles.signout}>Sign Out</Text>
            </Pressable>
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
    image: {
        height: 160,
        resizeMode: "contain",
    },
    userContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 50,
        marginVertical: 10,
        width: '100%'
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
    email: {
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#eeebdd'
    },
    value: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 5,
        color: '#eeebdd'
    },
    userImage: {
        height: 75,
        width: 75,
        marginRight: 10,
        borderRadius: 50
    },
    signout: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 5,
        color: '#ff0000'
    }
});

//make this component available to the app
export default ProfileScreen;

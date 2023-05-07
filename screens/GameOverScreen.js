import { View, 
    Image, 
    Text, 
    ScrollView,
    StyleSheet, 
    useWindowDimensions } from 'react-native'

import PrimaryButton from '../components/PrimaryButton';
import Colors from '../assets/Colors';
import { useState } from 'react';

function GameOverScreen({gameOverText, backFunction}) {  
    return (
        <View style={styles.screen}>
            <View style={styles.container}>
                <Text style={styles.text}>{gameOverText}</Text>
            </View>
            <View style={styles.buttonContainer}>
                <PrimaryButton onPress={e => backFunction(0)}>Back</PrimaryButton>
            </View>
        </View>
    );
}

export default GameOverScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    container: {
        marginTop: 300,
        alignItems: "center"
    },
    buttonContainer: {
        marginHorizontal: 80
    },
    text: {
        marginBottom: 50,
        fontSize: 80
    }
});
import { Text, StyleSheet, View, TextInput } from 'react-native';
import PrimaryButton from './PrimaryButton';
import CharacterSelectButton from './CharacterSelectButton';

import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

function CharacterWindow({ unit, backFunction, attackFunction, guardFunction, specialFunction, moveTypeFunction, targets, targetMode}) {
    let content = (
        <View>
            <View style={styles.commandContainer}>
                <PrimaryButton onPress={e => attackFunction(unit)}>Attack</PrimaryButton>
                <PrimaryButton onPress={guardFunction}>Guard</PrimaryButton>
            </View>
            <View style={styles.commandContainer}>
                <PrimaryButton onPress={e => specialFunction(unit.unitType)}>Special</PrimaryButton>
                <PrimaryButton onPress={backFunction}>Back</PrimaryButton>
            </View>
        </View>
    );
    
    if(targetMode == true)
    {
        content = (
            <View>
                <View style={styles.commandContainer}>
                    <CharacterSelectButton onPress={e => moveTypeFunction(unit, targets[0], "player")} unit={targets[0]}>{targets[0].name}</CharacterSelectButton>
                    <CharacterSelectButton onPress={e => moveTypeFunction(unit, targets[1], "player")} unit={targets[1]}>{targets[1].name}</CharacterSelectButton>
                </View>
                <View style={styles.commandContainer}>
                    <CharacterSelectButton onPress={e => moveTypeFunction(unit, targets[2], "player")} unit={targets[2]}>{targets[2].name}</CharacterSelectButton>
                    <CharacterSelectButton onPress={e => moveTypeFunction(unit, targets[3], "player")} unit={targets[3]}>{targets[3].name}</CharacterSelectButton>
                </View>
                
                <View style={styles.commandContainer}>
                    <PrimaryButton onPress={backFunction}>Back</PrimaryButton>
                </View>
            </View>
        );
    }

    return(
        <View style={styles.titleBackground}>
        <Text style={styles.title}>{unit.unitType}</Text>
            <Text style={styles.title}>{unit.name}</Text>
            <View style={styles.statContainer}>
                <Text style={styles.statName}>HP</Text>
                <View style={styles.statBackground}>
                    <Text Text style={styles.statText}>{unit.hp}/{unit.maxHp}</Text>
                </View>
                <Text style={styles.statName}>SP</Text>
                <View style={styles.statBackground}>
                    <Text style={styles.statText}>{unit.sp}/{unit.maxSP}</Text>
                </View>
            </View>
            {content}
        </View>
    )
}

export default CharacterWindow;

const styles = StyleSheet.create({
    title: {
        //fontFamily: 'open-sans-bold',
        fontSize: 25,
        color: 'black',
        marginTop: 5,
        textAlign: "center"
    },
    titleBackground: {
        borderWidth: 2,
        borderColor: 'black',
        backgroundColor: "#804539",
        justifyContent: 'center'
    },
    statBackground: {
        borderWidth: 2,
        borderColor: 'black',
        marginHorizontal: 5,
        marginVertical: 5,
        backgroundColor: "#E7DBD9",
    },
    statContainer: {
        flexDirection: "row",
        justifyContent: "center"
    },
    statText: {
        fontSize: 14,
        color: 'black',
        textAlign: 'center',
        margin: 5
    },
    statName: {
        fontSize: 17,
        color: 'black',
        marginTop: 11
    },
    commandContainer: {
        flexDirection: "row",
        justifyContent: 'center',
        marginBottom: 5
    }
})
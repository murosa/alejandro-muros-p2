import { Text, StyleSheet, View, Pressable } from 'react-native';

import { useState } from 'react';

function CharacterSelect({ unit, onPress, targetabble }) {
    let content = (
        <View style={styles.titleBackground}>
            <Pressable 
                style={({pressed}) => 
                    pressed 
                        ? [styles.buttonInnerContainer, styles.pressed] 
                        : styles.buttonInnerContainer
                } 
                onPress={onPress} 
                android_ripple={{ color: '#21321' }}
            >         
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
            </Pressable>
        </View>
    );

    if(unit.hp <= 0)
    {
        content = (
            <View style={[styles.titleBackground, {backgroundColor: "#D3D3D3"}]}>
                <Text style={styles.title}>{unit.unitType}</Text>
                <Text style={styles.title}>{unit.name}</Text>
                <View style={styles.statContainer}>
                <Text style={styles.statName}>HP</Text>
                <View style={[styles.statBackground, backgroundColor = "#F7F1F0"]}>
                    <Text Text style={styles.statText}>{unit.hp}/{unit.maxHp}</Text>
                </View>
                <Text style={styles.statName}>SP</Text>
                <View style={[styles.statBackground, backgroundColor = "#F7F1F0"]}>
                    <Text style={styles.statText}>{unit.sp}/{unit.maxSP}</Text>
                </View>
                </View>
            </View>
        );
    }

    else if(targetabble == false)
    {
        content = (
            <View style={[styles.titleBackground, {backgroundColor: "#DA7A66"}]}>
                <Text style={styles.title}>{unit.unitType}</Text>
                <Text style={styles.title}>{unit.name}</Text>
                <View style={styles.statContainer}>
                <Text style={styles.statName}>HP</Text>
                <View style={[styles.statBackground, backgroundColor = "#F7F1F0"]}>
                    <Text Text style={styles.statText}>{unit.hp}/{unit.maxHp}</Text>
                </View>
                <Text style={styles.statName}>SP</Text>
                <View style={[styles.statBackground, backgroundColor = "#F7F1F0"]}>
                    <Text style={styles.statText}>{unit.sp}/{unit.maxSP}</Text>
                </View>
                </View>
            </View>
        );
    }

    return(
        <View>
            {content}
        </View>
    )
}

export default CharacterSelect;

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
        justifyContent: 'center',
        marginTop: 10,
        marginHorizontal: 10
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
        marginTop: 11,
        marginLeft: 5
    },
    commandContainer: {
        flexDirection: "row",
        justifyContent: 'center',
    }
})
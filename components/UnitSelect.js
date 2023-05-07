import { Text, StyleSheet, View, TextInput } from 'react-native';
import PrimaryButton from './PrimaryButton';

import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

function UnitSelect({ unitNameFunction, unitTypeFunction, id }) {
    const [unit, setUnit] = useState("Armored Knight");
    const [unitID, setUnitID] = useState(0);
    const [enteredName, setEnteredName] = useState('');

    function changeUnitID(unitType)
    {
        const unitTypes = ["Armored Knight", "Knight", "Sorcerer", "Cleric"]
        var newID = unitID + unitType

        if(newID < 0)
        {
            newID = unitTypes.length-1
            setUnitID(newID)
        }

        else if(newID > unitTypes.length-1)
        {
            newID = 0
            setUnitID(newID)
        }

        else
        {
            setUnitID(newID)
        }

        setUnit(unitTypes[newID])
        unitTypeFunction(unitTypes[newID], id)
    }

    function nameInputHandler(enteredText) {
        setEnteredName(enteredText);
        unitNameFunction(enteredText, id)
    }


    return(
        <View>
            <View style={styles.titleBackground}>
                <Text style={styles.title}>{unit}</Text>
            </View>
            <View style={styles.nameBackground}>
                <TextInput 
                        style={styles.nameInput}
                        maxLength={12} 
                        keyboardType="default"
                        autoCapitalize="none"
                        autoCorrect={false}
                        onChangeText={nameInputHandler}
                        value={enteredName}
                    />
            </View>

            <View style={styles.boxContainer}>
                <PrimaryButton onPress={e => changeUnitID(-1)}>
                    <Ionicons name="md-arrow-back-outline" size={25} color="white" />
                </PrimaryButton>
                <PrimaryButton onPress={e => changeUnitID(1)}>
                    <Ionicons name="md-arrow-forward-outline" size={25} color="white" />
                </PrimaryButton>
            </View>
        </View>
    )
}

export default UnitSelect;

const styles = StyleSheet.create({
    boxContainer: {
        marginTop: 10,
        marginBottom: 20,
        flexDirection: "row",
        justifyContent: 'center',
    },
    title: {
        //fontFamily: 'open-sans-bold',
        fontSize: 25,
        color: 'black',
        textAlign: 'center'
    },
    nameInput: {
        fontSize: 20,
        color: 'black',
        textAlign: 'center'
    },
    titleBackground: {
        borderWidth: 2,
        borderColor: 'red',
        marginHorizontal: 100,
        backgroundColor: "white",
        justifyContent: 'center'
    },
    nameBackground: {
        borderWidth: 2,
        borderColor: 'red',
        marginTop: 20,
        marginHorizontal: 120,
        backgroundColor: "white",
        justifyContent: 'center',
        borderRadius: 20
    }
})
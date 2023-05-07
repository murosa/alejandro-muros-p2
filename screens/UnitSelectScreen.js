import { View, 
    Text, 
    ScrollView,
    StyleSheet, 
    Alert,
    KeyboardAvoidingView
} from 'react-native'

import UnitSelect from '../components/UnitSelect';
import PrimaryButton from '../components/PrimaryButton';
import { useState } from 'react';

function UnitSelectScreen({backFunction, startFunction, generateEnemies}) {
    var unitType = ["Armored Knight", "Armored Knight", "Armored Knight", "Armored Knight"]
    var unitName = ["", "", "", ""]

    function changeUnitType(type, id)
    {
        unitType[id] = type

        console.log(unitType)
    }

    function changeUnitName(name, id)
    {
        unitName[id] = name

        console.log(unitName)
    }

    function checkUnitNames()
    {
        var allNamesSet = true

        for(var i = 0; i < unitName.length; i++)
        {
            if(unitName[i] == "")
            {
                allNamesSet = false
                break
            }
        }

        if(allNamesSet == true)
        {
            startFunction(unitType, unitName)
            generateEnemies()
            backFunction(3)
        }

        else
        {
            Alert.alert(
                'Missing names!', 
                'Not every unit has had their name set!',
                [{ text: 'Okay', style: 'destructive' }]
            );

        }
    }

    return (
        <View style={styles.screen}>
            <KeyboardAvoidingView behavior='position'>
                <UnitSelect unitNameFunction={changeUnitName} unitTypeFunction={changeUnitType} id={0} />
                <UnitSelect unitNameFunction={changeUnitName} unitTypeFunction={changeUnitType} id={1} />
                <UnitSelect unitNameFunction={changeUnitName} unitTypeFunction={changeUnitType} id={2} />
                <UnitSelect unitNameFunction={changeUnitName} unitTypeFunction={changeUnitType} id={3} />
                <View style={styles.buttonContainer}>
                    <PrimaryButton style={{marginBottom: 30}} onPress={e => backFunction(0)}>Back</PrimaryButton>
                    <PrimaryButton onPress={checkUnitNames}>Start</PrimaryButton>
                </View>
            </KeyboardAvoidingView>
        </View>
    );
}

export default UnitSelectScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        marginTop: 100
    },
    buttonContainer: {
        marginHorizontal: 110
    },
});
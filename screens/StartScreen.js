import { View, 
    Image, 
    Text, 
    ScrollView,
    StyleSheet, 
    useWindowDimensions } from 'react-native'

import PrimaryButton from '../components/PrimaryButton';
import Title from '../components/Title';

function StartScreen({startFunction, infoFunction}) {   
    return (
        <View style={styles.screen}>
            <View style={styles.titleBox}>
                <Title>RPG Battle Simulator</Title>
            </View>
            <View style={styles.buttonContainer}>
                <PrimaryButton onPress={e => startFunction(2)} >Start</PrimaryButton>
                <PrimaryButton onPress={e => infoFunction(1)} >Info</PrimaryButton>
            </View>
        </View>
    );
}

// const deviceWidth = Dimensions.get('window').width;

export default StartScreen;

const styles = StyleSheet.create({
    screen: {
        marginTop: 250,
        flex: 1
    },
    titleBox: {
        alignItems: "center",
    },
    buttonContainer: {
        marginTop: 40,
        marginHorizontal: 80,
        flexDirection: 'column',
    },
});
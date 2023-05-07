import { View, 
    Image, 
    Text, 
    ScrollView,
    StyleSheet, 
    useWindowDimensions } from 'react-native'

import PrimaryButton from '../components/PrimaryButton';
import Title from '../components/Title';
import CharacterInfo from '../components/CharacterInfo';
import Colors from '../assets/Colors';

function InfoScreen({backFunction, units}) {   
    return (
        <View style={styles.screen}>
            <View style={styles.titleBox}>
                <Title>Unit Info</Title>
            </View>
            <View>
                <CharacterInfo name="Armored Knight">
                    Has the highest stats compared to other units. They have the
                    highest hp and defense stat while having a middling magic 
                    defense stat. They are weak to sorcerer units.
                    There special skill is called fortify which lets them
                    increase both there defense and magic defense stat.
                </CharacterInfo>
                <CharacterInfo name="Knight">
                    They have a high attack stat but middling defense and magic defense 
                    stat. There special skill is called heavy blow which lets them
                    attack enemy units with a stronger attack.
                </CharacterInfo>
                <CharacterInfo name="Sorcerer">
                    They have a high attack stat. There attacks use the magic defense 
                    to calculate damage. They have a low defense stat but they do 
                    have a high magic defense stat. There special skill is called 
                    lighting which lets them attack an enemy unit with a stronger 
                    magic attack.
                </CharacterInfo>
                <CharacterInfo name="Cleric">
                    They have the lowest hp stat but they do have fairly high defense 
                    and magic defense. There attacks use the magic defense to calculate 
                    damage. There attack stat is low. There special skill is called 
                    heal which lets them restore an ally's health for 25% of their max 
                    hp. Can use on self to heal for 50% of hp.
                </CharacterInfo>
            </View>
            <View style={styles.buttonContainer}>
                <PrimaryButton onPress={e => backFunction(0)}>Back</PrimaryButton>
            </View>
        </View>
    );
}

export default InfoScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        marginTop: 85
    },
    titleBox: {
        alignItems: "center"
    },
    buttonContainer: {
        marginHorizontal: 80,
        marginTop: 10,
        flexDirection: 'column',
    },
});
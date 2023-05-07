import { View,Text, StyleSheet } from 'react-native';

function CharacterInfo({ children, name }) {
    return (
        <View >
            <Text style={styles.textName}>{ name }</Text>
            <Text style={styles.textDescription}>
                {children}
            </Text>
        </View>
    );
}

export default CharacterInfo;

const styles = StyleSheet.create({
    textDescription: {
        fontSize: 15,
        marginHorizontal: 15,
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: 'black',
        color: "white",
        borderRadius: 20,
    },
    textName: {
        backgroundColor: '#72063c',
        fontSize: 20,
        textAlign: "center",
        paddingVertical: 10,
        marginHorizontal: 140,
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 20,
    }
});
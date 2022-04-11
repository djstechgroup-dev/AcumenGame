import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
// import { Button } from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SelectActComponent from './SelectActComponent';

const data = [
    { label: 'Item 1', value: '1' },
    { label: 'Item 2', value: '2' },
    { label: 'Item 3', value: '3' },
    { label: 'Item 4', value: '4' },
    { label: 'Item 5', value: '5' },
    { label: 'Item 6', value: '6' },
    { label: 'Item 7', value: '7' },
    { label: 'Item 8', value: '8' },
];
var act;
const TimeManagerScreen = (props) => {
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

    return (
        <View style={{ flexDirection: 'row', width: '100%' }}>
            <View style={{ width: '55%', justifyContent: 'space-evenly', height: '100%', marginLeft: '5%' }}>
                <SelectActComponent title={'Act III, Final Event'} data={[{ label: 'off brand boss battle', value: 'off brand boss battle' }, { label: 'the indescribable horror', value: 'the indescribable horror' }, { label: 'wave battle', value: 'wave battle' }]} />
                <SelectActComponent title={'Act II, Event II'} data={[{ label: "jonsin'", value: "jonsin'" }, { label: 'hype up event', value: 'hype up event' }, { label: 'oh, rats!', value: 'oh, rats!' }]} />
                <SelectActComponent title={'Act II, Event I'} data={[{ label: 'sentient objects', value: 'sentient objects' }, { label: 'a very snobby banquet', value: 'a very snobby banquet' }, { label: 'arch nemisis', value: 'arch nemisis' }]} />
                <SelectActComponent title={'Act I, Event III'} data={[{ label: 'family and friends', value: 'family and friends' }, { label: 'fading memory', value: 'fading memory' }, { label: 'chicken', value: 'chicken' }]} />
                <SelectActComponent title={'Act I, Event II'} data={[{ label: 'classic giant boulder', value: 'classic giant boulder' }, { label: 'work hard, play hard', value: 'work hard, play hard' }, { label: 'calculation error', value: 'calculation error' }]} />
                <SelectActComponent title={'Act I, Event I'} data={[{ label: 'vice', value: 'vice' }, { label: 'good cop, bad cop', value: 'good cop, bad cop' }, { label: "prisoner's dilemma", value: "prisoner's dilemma" }]} />
            </View>
            <View style={{ width: '35%', alignItems: 'center', marginTop: '13%', justifyContent: 'space-around' }}>
                <Text style={{ fontSize: 14, lineHeight: 30 }}>
                    Pick one from the following three(3) Event Cards for Act, Event:
                </Text>
                <Button title='start game' color={'#28a745'} onPress={() => {
                    props.navigation.navigate('EventDetail');
                }} />
            </View>
        </View>

    );
};

export default TimeManagerScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'Black',
        padding: 16,
    },
    dropdown: {
        height: '10%',
        borderColor: 'grey',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
        backgroundColor: 'white',
        width: '80%',
        marginLeft: '10%',
        marginRight: '10%'
    },
    icon: {
        marginRight: 5,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
});

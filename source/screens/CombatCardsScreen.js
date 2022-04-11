import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    TextInput,
    View,
    Button,
    CheckBox,
    FlatList,
    Modal,
    TouchableHighlight
} from 'react-native';
const InnateTrateData = [
    {
        key: 'Balance',
        Text: 'Balanced - Automatically start each Event with 40 HP',
        Type: 'Innate Trait: Passively Modifies a Party Member',
    },
    {
        key: 'Lucky',
        Text: 'Add a +1 Bonus to any Skill Check made during QTE Events.',
        Type: 'Innate Trait: Passively Modifies a Party Member',
    },
    {
        key: 'Cautious',
        Text: 'Cautious - Grants all attacks Exploding 1, Abilities with Heal trait can be used as an attack for half value (rounded up)',
        Type: 'Innate Trait: Passively Modifies a Party Member',
    },
    {
        key: 'Dense',
        Text: 'Dense - Gain Shielding 3, Enemies Hit with Opportune Trait are Restrained',
        Type: 'Innate Trait: Passively Modifies a Party Member',
    },
    {
        key: 'Powerful',
        Text: 'Powerful - Attacks Gain Exploding 6',
        Type: 'Innate Trait: Passively Modifies a Party Member',
    },
];
const BasicAttacksTrateData = [
    {
        key: 'sure Shot',
        Text: '1⚀+7, Rend',
        Type: 'Basic Attack: Uses Attack Action, is not discussed on use',
    },
    {
        key: 'Shield Wall',
        Text: '1⚀+1, Opportune to Conceal Allies, Melee',
        Type: 'Basic Attack: Uses Attack Action, is not discussed on use',
    },
    {
        key: 'Multi-Shot',
        Text: '2⚀+1, Targeting 2',
        Type: 'Basic Attack: Uses Attack Action, is not discussed on use',
    },
    {
        key: 'Personal Strike',
        Text: '2⚀, Power Drain 1⚀+4, Melee',
        Type: 'Basic Attack: Uses Attack Action, is not discussed on use',
    },
    {
        key: 'Personal Strike',
        Text: '2⚀, Power Drain 1⚀+4, Melee',
        Type: 'Basic Attack: Uses Attack Action, is not discussed on use',
    }, {
        key: 'Confusion Ray',
        Text: '1⚀+2, Confuse Target',
        Type: 'Basic Attack: Uses Attack Action, is not discussed on use',
    }, {
        key: 'Tides of Glory',
        Text: '2⚀+3, Power Bonus +7, Heal',
        Type: 'Basic Attack: Uses Attack Action, is not discussed on use',
    }, {
        key: 'Protective Bubble',
        Text: '2⚀+5, Shielding 4, Heal',
        Type: 'Basic Attack: Uses Attack Action, is not discussed on use',
    },
    {
        key: 'Stay Put',
        Text: '1⚀, Restrain, Targeting 2',
        Type: 'Basic Attack: Uses Attack Action, is not discussed on use',
    },
];
const SpecialAttacksTrateData = [{
    key: 'Make it Personal',
    Text: "3⚀+6, All Target's abilities gain Melee permenantly",
    Type: 'Special Attack: Uses Attack and Move Action, is discussed on use',
},
{
    key: 'Tri-Shot',
    Text: "1⚀+5, Targeting 3",
    Type: 'Special Attack: Uses Attack and Move Action, is discussed on use',
},
{
    key: 'Shake it Off',
    Text: "3⚀+10, Cleanse Self",
    Type: 'Special Attack: Uses Attack and Move Action, is discussed on use',
},
{
    key: 'Spook or Boom',
    Text: "Versatile: 2⚀+1, Fear Target or 4⚀+1, Entropic",
    Type: 'Special Attack: Uses Attack and Move Action, is discussed on use',
},
]
const CombatCardsScreen = (props) => {
    const [modalVisible, SetModalVisible] = React.useState(false);
    const [traidDetail, SetTraitDetail] = React.useState({});
    const [traitModalVisible, SetTraitModalVisible] = React.useState(false);
    const [innateTrateData, SetInnateTrateData] = React.useState([InnateTrateData[0], InnateTrateData[1]])
    const [basicAttacksTrateData, SetBasicAttacksTrateData] = React.useState([BasicAttacksTrateData[0], BasicAttacksTrateData[1]])
    const [specialAttacksTrateData, SetSpecialAttacksTrateData] = React.useState([SpecialAttacksTrateData[0]])
    const { navigation } = props;

    const go = () => {
        navigation.navigate('PaymentBBPSOptionContainor');
    };
    getListViewItem = (item) => {
        Alert.alert(item.key);
    }
    return (
        <ScrollView style={{ position: 'relative', width: '80%', alignSelf: 'center' }}>
            <Modal animationType={"slide"} transparent={false}
                visible={modalVisible}
                onRequestClose={() => { console.log("Modal has been closed.") }}>
                <View style={{ alignSelf: 'flex-end', marginRight: '4%' }}>

                    <Button title='x' color={'grey'} onPress={() => {
                        SetModalVisible(false)

                    }} />
                </View>
                <View style={styles.modal}>
                    <Text style={{ fontSize: 30, marginBottom: '5%' }}>{traidDetail.key}</Text>
                    <Text style={{ fontSize: 20, marginBottom: '5%' }}>{traidDetail.Text}</Text>
                    <Text>{traidDetail.Type}</Text>
                </View>
                <View style={{ alignSelf: 'flex-end', marginRight: '4%' }}>
                    <Button title='?' color={'grey'} onPress={() => {
                        SetTraitModalVisible(true)

                    }} />
                </View>
            </Modal>
            <Modal animationType={"slide"} transparent={false}
                visible={traitModalVisible}
                onRequestClose={() => { console.log("Modal has been closed.") }}>
                <View style={{ alignSelf: 'flex-end', marginRight: '4%' }}>
                    <Button title='x' color={'grey'} onPress={() => {
                        SetTraitModalVisible(false)

                    }} />
                </View>
                <View style={styles.modal}>
                    <Text style={{ fontSize: 30, marginBottom: '5%' }}>Opportune</Text>
                    <Text style={{ fontSize: 20, marginBottom: '5%' }}>If you were not the sole target of an attack last round, activate the Opportune effect listed in the attack</Text>
                </View>
            </Modal>
            <View>
                <Text style={{ fontSize: 30 }}>Innate Trait:</Text>
                <FlatList
                    scrollEnabled={true}
                    data={innateTrateData}
                    renderItem={({ item }) =>
                        <Text style={{ backgroundColor: 'white', fontSize: 20 }} onPress={(e) => {
                            SetModalVisible(true);
                            SetTraitDetail(item);
                        }}>{item.key}</Text>}
                />
                <View style={{ flexDirection: 'row', marginTop: '1%', justifyContent: 'space-between' }}>
                    <Button title=' - ' color='grey' />
                    <Button title=' + ' color={'#28a745'} />
                    <Button title=' E ' color={'#28a745'} onPress={() => {
                        SetInnateTrateData([InnateTrateData[Math.floor(Math.random() * InnateTrateData.length)]])
                    }} />
                </View>
            </View>
            <View>
                <Text style={{ fontSize: 30 }}>Basic Attack:</Text>
                <FlatList
                    data={basicAttacksTrateData}
                    renderItem={({ item }) =>
                        <Text style={{ backgroundColor: 'white', fontSize: 20 }} onPress={() => {
                            SetModalVisible(true);
                            SetTraitDetail(item);
                        }}>{item.key}</Text>}
                />
                <View style={{ flexDirection: 'row', marginTop: '1%', justifyContent: 'space-between' }}>
                    <Button title=' - ' color='grey' />
                    <Button title=' + ' color={'#28a745'} />

                </View>
            </View>
            <View>
                <Text style={{ fontSize: 30 }}>Special Attack(s)</Text>
                <FlatList
                    data={specialAttacksTrateData}
                    renderItem={({ item }) =>
                        <Text style={{ backgroundColor: 'white', fontSize: 20 }} onPress={() => {
                            if (item.key == '') {
                                return;
                            }
                            SetModalVisible(true);
                            SetTraitDetail(item);
                        }}>{item.key}</Text>}
                />
                <View style={{ flexDirection: 'row', marginTop: '1%', justifyContent: 'space-between' }}>
                    <Button title=' - ' color='grey' />
                    <Button title=' + ' color={'#28a745'} />

                </View>
            </View>
            <View style={{ marginTop: '2%' }}>
                <Button title='go To ID badge' onPress={() => {
                    navigation.navigate('PartyMember');

                }} />
            </View>
        </ScrollView>
    );
};
const styles = StyleSheet.create({
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
    },
    highlight: {
        fontWeight: '700',
    },
    modal: {
        flex: 1,
        alignItems: 'center',
        padding: 100
    },
});

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});
// export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);
export default CombatCardsScreen;
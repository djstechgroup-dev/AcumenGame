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
  TouchableHighlight,
  Image,
  Modal
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import CheckBox from 'react-native-checkbox';
const EventDetailScreen = (props) => {
  const [isLockScreen, SetIsLockScreen] = React.useState(false);
  const [isHpEditable, SetIsHpEditable] = React.useState(false);
  const [avartar, SetAvartar] = React.useState(undefined);
  const [checkboxDisabled, setCheckboxDisabled] = React.useState(true);
  const [isSickDayDisabled, setIsSickDayDisabled] = React.useState(true);
  const [checked, setChecked] = React.useState(false);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [counter, setCounter] = React.useState(0);
  const { navigation } = props;
  const go = () => {
    navigation.navigate('PaymentBBPSOptionContainor');
  };

  return (
    <View>
      <Modal animationType={"slide"} transparent={false}
        visible={modalVisible}
        onRequestClose={() => { console.log("Modal has been closed.") }}>
        <View style={{ alignSelf: 'flex-end', marginRight: '4%' }}>

          <Button title='x' color={'grey'} onPress={() => {
            setModalVisible(false)

          }} />
        </View>
        <View style={styles.modal}>
          <Text style={{ fontSize: 30, marginBottom: '5%' }}>Event Title</Text>
          <Text style={{ fontSize: 20, marginBottom: '5%' }}>Event Description displays here more detail</Text>
        </View>
      </Modal>
      <View style={{ position: 'relative', height: '100%', padding: '1%', alignItems: 'center', justifyContent: 'space-around' }}>
        <View style={{ width: '100%', height: '90%', backgroundColor: 'grey' }}>
          <View style={{ height: '10%', alignItems: 'center' }}>
            <Text style={{ fontSize: 20 }}>Event Title {counter}</Text>
          </View>
          <View style={{ height: '90%', flexDirection: 'row' }}>
            <View style={{ width: '20%', height: '100%', backgroundColor: 'lightgrey', paddingLeft: '1%', justifyContent: 'space-around' }}>
              <Text style={{ fontSize: 15 }}>EVENT TYPE</Text>
              <View>
                <Text style={{ fontSize: 15 }}>Quick Time Event:</Text>
                <Text>
                  Party must take immediate action to prevent danger while the Time Manager descrives the outcome of the Skill Check.
                </Text>
              </View>
              <View>
                <Text>Easy-3 or better</Text>
                <Text>Med-5 or better</Text>
                <Text>Hard-7 or better</Text>
              </View>
              <View>
                <Text>
                  Party can earn +2 bonus from flavor.
                </Text>
              </View>
            </View>
            <View style={{ width: '80%', height: '100%', paddingLeft: '1%', backgroundColor: 'white', justifyContent: 'space-around' }}>
              <View>
                <Text>NARRATION</Text>
                <Text>A villon's silhouette hounces as they chuckle, exiting the room. the Party has been strapped to a table, and a slow moving death laser is earning it's namesake as it inches closer.</Text>
              </View>
              <View>
                <Text>OBJECTIVE</Text>
                <Text>Party must succeed either 3 medium Checks or 1 Hard check to disable the laser or escape before failing three of either type of check. if two (or three when playing with five in the party) Members escape, all members instantly escape.</Text>
              </View>
              <View>
                <Text>REWARD</Text>
                <Text>Any Members who failed a check once has their HP reduced in half. Any player that failed three times has their HP reduced to 1. Any player that failed 4 times is then dealt 1 damage. Party gains +2 Special Attacks</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={{ width: '100%', height: '10%', backgroundColor: 'grey', justifyContent: 'space-between', flexDirection: 'row', paddingLeft: '1%', paddingRight: '1%' }}>
          <TouchableHighlight onPress={() => {
            setModalVisible(true);
          }}>
            <Text style={{ fontSize: 30 }}>?</Text>
          </TouchableHighlight>
          <View>
            <Text>Current Event</Text>
            <Text>ACt II, Event II</Text>
          </View>
          {counter < 6 ? <Button title='Next Event' onPress={() => {
            setCounter(counter+1);
          }}/> : <Button title='Start Game' color={'#28a745'} onPress={() => {
          }}/>}
        </View>
      </View>
    </View>
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
export default EventDetailScreen;
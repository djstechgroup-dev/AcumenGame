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
  Image
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import CheckBox from 'react-native-checkbox';
const PartyMemberScreen = (props) => {
  const [isLockScreen, SetIsLockScreen] = React.useState(false);
  const [isHpEditable, SetIsHpEditable] = React.useState(false);
  const [avartar, SetAvartar] = React.useState(undefined);
  const [checkboxDisabled, setCheckboxDisabled] = React.useState(true);
  const [isSickDayDisabled, setIsSickDayDisabled] = React.useState(true);
  const [checked, setChecked] = React.useState(false);
  const { navigation } = props;
  const go = () => {  
    navigation.navigate('PaymentBBPSOptionContainor');
  };
 
  return (
    <View style={{ position: 'relative', height: '100%', alignItems: 'center', flexDirection: 'row' }}>
      <View style={{ width: '40%', height: '100%' }}>

        <TouchableHighlight onPress={async () => {
          var result = await launchImageLibrary();
          SetAvartar(result);
          console.log(result);
        }} style={{ height: '60%', width: '80%', backgroundColor: '#fff', marginRight: '10%', marginLeft: '10%', marginTop: '5%', marginBottom: '5%' }}>
          { avartar == undefined ? <Image source={require('../assets/29630.jpg')} style={{width: '100%', height: '100%'}}/> : <Image source={{ uri: avartar.assets[0].uri }} style={{width: '100%', height: '100%'}}/>}
        </TouchableHighlight>
        <View style={{ height: '20%', flexDirection: 'row', alignItems: 'center' }}>
          <TextInput defaultValue='50' maxLength={3} editable={isHpEditable} style={{ width: '40%', fontSize: 50, textAlign: 'center', marginLeft: '10%', height: '100%', backgroundColor: 'transparent' }} />
          <View style={{ width: '20%', marginLeft: '10%', height: '60%', alignItems: 'center', justifyContent: 'center'}}>
            <CheckBox checked={checked} onChange={() => {
              if(isSickDayDisabled) {
                return
              } else {
                setChecked(!checked);
              }
            }} label='' style={{width: '100%', height: '100%'}}/>
          </View>
        </View>
        <View style={{ height: '10%', justifyContent: 'center', marginLeft: '10%', width: '80%' }}>
          {!isLockScreen ? <Button title='Start Game' color={'#28a745'} onPress={() => {
            SetIsLockScreen(true);
            SetIsHpEditable(true);
            setCheckboxDisabled(false);
            setIsSickDayDisabled(!isSickDayDisabled);
          }}/> : <Button title='Flip To Attacks' color={'#dc3545'} onPress={() => {
            navigation.navigate('CombatCard');
          }}/>}
        </View>
      </View>
      <View style={{ width: '60%', height: '100%', backgroundColor: '#eee', paddingLeft:'5%',paddingRight:'5%'}}>
        <View style={{marginTop: '10%', height:'30%'}}>
          <Text>Name</Text>
          <TextInput style={{backgroundColor:'white'}} />
        </View>
        <View style={{height:'30%'}}>
          <Text>Occupation</Text>
          <TextInput style={{backgroundColor:'white'}} />
        </View>
        <View style={{height:'30%'}}>
          <Text>Keyword</Text>
          <TextInput style={{backgroundColor:'white'}} />
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
});

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});
// export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);
export default PartyMemberScreen;
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
  CheckBox
} from 'react-native';

const PartyMemberLockScreen = (props) => {
  const { navigation } = props;
  const go = () => {
    navigation.navigate('PaymentBBPSOptionContainor');
  };
 
  return (
    <View style={{ position: 'relative', height: '100%', alignItems: 'center', flexDirection: 'row' }}>
      <View style={{ width: '40%', height: '100%' }}>
        <View style={{ height: '60%', width: '80%', backgroundColor: '#fff', marginRight: '10%', marginLeft: '10%', marginTop: '5%', marginBottom: '5%' }}>
        </View>
        <View style={{ height: '20%', flexDirection: 'row', alignItems: 'center' }}>
          <TextInput defaultValue='50' maxLength={3} editable={false} style={{ width: '40%', fontSize: 50, textAlign: 'center', marginLeft: '10%', height: '100%', backgroundColor: 'transparent' }} />
          <View onTouchStart={(e) => {
            console.log(e);
          }} style={{ width: '20%', marginLeft: '10%', height: '60%', backgroundColor: 'white' }}>
          </View>
        </View>
        <View style={{ height: '10%', justifyContent: 'center', marginLeft: '10%', width: '80%' }}>
          <Button title='Start Game' color={'#c'}/>
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
export default PartyMemberLockScreen;
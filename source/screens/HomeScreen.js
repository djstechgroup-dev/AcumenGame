import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button
} from 'react-native';

var buttonRef, navigationstate;
const HomeScreen = (props) => {
  const { navigation } = props;
  const go = () => {
    navigation.navigate('PaymentBBPSOptionContainor');
  };

  return (
    <View style={{ height: '100%', alignItems: 'center', flexDirection: 'column', paddingTop: '5%' }}>
      <Text style={{ textAlign: 'center', fontSize: 50 }}>
        Welcom to Acumen
      </Text>
      <Text style={{ textAlign: 'center', fontSize: 35, paddingTop: '3%' }}>
        Please select your role for this Timeline
      </Text>
      <View
        style={{
          width: '100%',
          alignItems: 'flex-end',
          marginTop: '10%',
          flexDirection: 'row'
        }}>
        <View style={{ width: '20%', marginLeft: '2%', marginRight: '3%'}}>
          <Button title='How to Play' />
        </View>
        <View style={{ width: '50%', flexDirection: 'column' }}>
          <View style={{ marginBottom: '10%' }}>
            <Button title="Party Member" color={'#841584'} onPress={(e) => {
              navigation.navigate('PartyMember')
            }} />
          </View>
          <View style={{ marginBottom: '10%' }}> 
            <Button title="Time Manager" onPress={(e) => {
              navigation.navigate('TimeManager')
            }} />
          </View>
        </View>

        <View style={{ width: '20%', marginRight: '2%', marginLeft: '3%' }}>
          <Button title='Reset' />
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
export default HomeScreen;
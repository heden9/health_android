import React, { Component } from 'react';
import { StyleSheet, View, Image, Button, Text } from 'react-native';
import { Carousel } from 'antd-mobile';
import { connect } from 'react-redux';

import { NavigationActions } from '../utils';

@connect()
class Account extends Component {
  static navigationOptions = {
    title: 'Account',
    tabBarLabel: 'Account',
    tabBarIcon: ({ focused, tintColor }) =>
      <Image
        style={[styles.icon, { tintColor: focused ? tintColor : 'gray' }]}
        source={require('../images/person.png')}
      />,
  }

  gotoLogin = () => {
    this.props.dispatch(NavigationActions.navigate({ routeName: 'Login' }));
  }

  render() {
    return (
      <View style={styles.container}>
        <Button title="Goto Login" onPress={this.gotoLogin} />
        <Carousel
          vertical
          dots={false}
          dragging={false}
          swiping={false}
          autoplay
          infinite
        >
          <Text>carousel 1</Text>
          <Text>carousel 2</Text>
          <Text>carousel 3</Text>
        </Carousel>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  icon: {
    width: 32,
    height: 32,
  },
});

export default Account;

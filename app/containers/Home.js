import React, { Component } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Button } from 'antd-mobile';
import { connect } from 'react-redux';
import { NavigationActions } from '../utils';
import MyTab from '../components/myDataTab';
import { time } from '../utils/time';

const pink = 'rgb(252,49,86)';
const headGrey = 'white';
function mapStateToProps({ app: { headerTitle } }) {
  return {
    headerTitle,
  };
}
@connect(mapStateToProps)
class Home extends Component {
  static navigationOptions = {
    headerStyle: {
      elevation: 0,
      backgroundColor: headGrey,
    },
    headerTitleStyle: {
      color: pink,
      fontWeight: '300',
    },
    tabBarLabel: 'Home',
    tabBarIcon: ({ focused, tintColor }) =>
      <Image
        style={[styles.icon, { tintColor: focused ? tintColor : 'gray' }]}
        source={require('../images/house.png')}
      />,
  };
  static tabs = time(new Date());
  componentDidMount() {
    this.props.navigation.setParams({
      headerTitle: this.props.headerTitle,
    });
  }
  gotoDetail = () => {
    this.props.dispatch(NavigationActions.navigate({ routeName: 'Detail' }));
  };
  render() {
    return (
      <View style={styles.container}>
        <MyTab {...Home.tabs} />
        <Button onClick={this.gotoDetail}>Goto Detail</Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  icon: {
    width: 32,
    height: 32,
  },
});

export default Home;

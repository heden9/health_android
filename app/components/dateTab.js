import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Tabs, WhiteSpace, Carousel } from 'antd-mobile';
import { chunk } from 'lodash';

const pink = 'rgb(252,49,86)';

export default class DateTab extends React.PureComponent {
  static defaultProps = {
    tabs: [],
  }
  state = {
    activeTab: 0,
  }
  onChange = (...arg) => {}
  renderContent = tab =>
    <View style={style.tabContent}>
      <Text>
        Content of {tab.getDate()}
      </Text>
    </View>
  renderTabBar = arg => {
    console.log(arg);
    return (
      <View>
        <WeekRow />
        <Tabs.DefaultTabBar
          {...arg}
          animated={false}
          onTabClick={this.onChange}
          renderTab={this.renderTab}
          page={7}
        />
        <Text style={[style.tabBarText, style.dayText]}>
          {'2017年10月24日 星期二'}
        </Text>
      </View>
    );
  }
  renderTabBar = arg => {
    const tmp = chunk(this.props.tabs, 7);
    console.log(arg);
    return (
      <View>
        <WeekRow />
        <Carousel
          vertical
          selectedIndex={parseInt(this.props.tabs.length / 2)}
          dots={false}
          dragging={false}
          swiping={false}
        >
          {tmp.map(item =>
            <Tabs.DefaultTabBar
              {...arg}
              key={item[0]}
              tabs={item}
              animated={false}
              onTabClick={this.onChange}
              renderTab={this.renderTab}
              page={7}
            />
          )}
        </Carousel>
        <Text style={[style.tabBarText, style.dayText]}>
          {'2017年10月24日 星期二'}
        </Text>
      </View>
    );
  }
  renderTab = tab =>
    <View style={style.tabBarItemContent}>
      <Text style={style.dayText}>
        {tab.getDate()}
      </Text>
    </View>
  render() {
    return (
      <View style={style.container}>
        <Tabs
          renderTabBar={this.renderTabBar}
          tabs={this.props.tabs.slice(0, 7)}
          tabBarActiveTextColor={pink}
          tabBarUnderlineStyle={{ backgroundColor: pink }}
        >
          {this.renderContent}
        </Tabs>
        <WhiteSpace />
      </View>
    );
  }
}

const week = ['日', '一', '二', '三', '四', '五', '六'];
function WeekRow() {
  return (
    <View style={style.tabBar}>
      {week.map((item, index) =>
        <Text key={item} style={[style.weekText, isDim(index)]}>
          {item}
        </Text>
      )}
    </View>
  );
}

function isDim(index) {
  return index === 0 || index === week.length - 1 ? style.textDim : null;
}
const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center',
  },
  weekText: {
    fontSize: 10,
  },
  dayText: {
    fontSize: 16,
    fontWeight: '400',
  },
  textDim: {
    opacity: 0.7,
  },
  tabBarText: {
    textAlign: 'center',
    marginVertical: 5,
  },
  tabContent: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 150,
  },
  tabBarItem: {
    paddingVertical: 10,
    backgroundColor: 'blue',
  },
  tabBarItemContent: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

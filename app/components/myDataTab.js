import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  Platform,
  UIManager,
  LayoutAnimation,
  TouchableWithoutFeedback,
} from 'react-native';
import { chunk } from 'lodash';
import moment from 'moment';
import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get('window');
const CustomLayoutAnimation = {
  duration: 400,
  create: {
    type: LayoutAnimation.Types.spring,
    property: LayoutAnimation.Properties.opacity,
  },
  update: {
    type: LayoutAnimation.Types.spring,
    property: LayoutAnimation.Properties.opacity,
  },

};
export default class MyTab extends React.PureComponent {
  constructor(...arg) {
    super(...arg);
    this.map = new Map();
    this.props.tabs.forEach((item, index) => {
      this.map.set(item, [
        {
          title: '跑步 + 步行距离',
          time: moment(item).format('D'),
          number: 0.1,
          unit: '公里',
        },
        {
          title: '步数',
          time: '19:58',
          number: this.props.now === index ? this.props.nowStep : 10000,
          unit: '步',
        },
        {
          title: '已爬楼层',
          time: '19:57',
          number: 3,
          unit: '层',
        },
      ]);
    });
  }
  state = {
    activeTab: this.props.now,
    contentTabArrs: [],
  };
  componentWillMount() {
    this.loadMessage(this.props.now);
    // if (Platform.OS === 'android') {
    //   UIManager.setLayoutAnimationEnabledExperimental(true)
    // }
    // LayoutAnimation.configureNext(CustomLayoutAnimation);
  }
  componentWillReceiveProps({ now, tabs, nowStep }){
    if(this.flag){
      return;
    }
    this.map.set(tabs[now], [
      {
        title: '跑步 + 步行距离',
        time: moment(tabs[now]).format('D'),
        number: 0.1,
        unit: '公里',
      },
      {
        title: '步数',
        time: '19:58',
        number: nowStep,
        unit: '步',
      },
      {
        title: '已爬楼层',
        time: '19:57',
        number: 3,
        unit: '层',
      }
    ]);
  }
  componentDidMount() {
    setTimeout(() => {
      const x = width * parseInt(this.props.tabs.length / 7 / 2);
      this.ScrollView.scrollTo({ x, y: 0, animated: true });
    }, 0);
  }
  onPressHandle = (activeTab, flag = false) => {
    if (activeTab < 0 || activeTab >= this.props.tabs.length) {
      return;
    }
    this.setState({
      activeTab,
    });
    this.loadMessage(activeTab, flag);
  };
  newPressHandle = index => {
    const { activeTab } = this.state;
    if (index > activeTab) {
      this.contentView.scrollTo({ x: 0, y: 0, animated: false });
    } else if (index < activeTab) {
      this.contentView.scrollToEnd({ animated: false });
    }
    // if(this.test === 0){
    //   console.log('hahhah,');
    //   this.contentView.scrollTo({x: width, y: 0, animated: true});
    // }else if (this.test === contentTabArrs.length - 1){
    //   console.log('zzzzz');
    //   this.contentView.scrollTo({x: 0, y: 0, animated: true});
    // }else {
    // }
    this.onPressHandle(index, true);
  };
  loadMessage = (activeTab, flag) => {
    const { tabs } = this.props;
    const tmp = [tabs[activeTab]];
    if (tabs[activeTab - 1]) {
      tmp.unshift(tabs[activeTab - 1]);
    } else {
      tmp.unshift(null);
    }
    if (tabs[activeTab + 1]) {
      tmp.push(tabs[activeTab + 1]);
    } else {
      tmp.push(null);
    }
    this.setState({
      contentTabArrs: tmp,
    });
    setTimeout(() => {
      this.test = tmp.indexOf(tabs[activeTab]);
      if (this.test !== -1) {
        this.contentView.scrollTo({
          x: this.test * width,
          y: 0,
          animated: flag,
        });
      }
      this.scrollTabBar(activeTab);
    }, 0);
  };
  animatedEnd = e => {
    const offsetX = e.nativeEvent.contentOffset.x;
    const result = Math.round(offsetX / width);
    if (result === 0) {
      this.onPressHandle(this.state.activeTab - 1);
    } else if (result === this.state.contentTabArrs.length - 1) {
      this.onPressHandle(this.state.activeTab + 1);
    }
    this.flag = false;
  };
  scrollTabBar = activeTab => {
    const result = parseInt(activeTab / 7);
    this.ScrollView.scrollTo({ x: result * width, y: 0, animated: true });
  };
  animatedStart = (...arg) => {
    this.flag = true;
    console.log('start', arg);
  };
  renderTabBar = tabs => {
    const tmp = chunk(tabs, 7);
    return tmp.map((item, i) =>
      <View key={item[0]} style={[style.tabBar, { width }]}>
        {item.map((item2, j) => {
          const index = 7 * i + j;
          const onPress = this.newPressHandle.bind(this, index);
          return (
            <TabContent
              index={index}
              now={this.props.now}
              activeTab={this.state.activeTab}
              onPress={onPress}
              key={item2}
              tab={item2}
            />
          );
        })}
      </View>
    );
  };
  render() {
    const { tabs } = this.props;
    const { activeTab } = this.state;
    const activeTime = tabs[activeTab];
    const timeText = `${moment(activeTime).format('YYYY年MM月D日')} 星期${week[
      new Date(activeTime).getDay()
    ]}`;
    return (
      <View style={style.c}>
        <View style={style.container}>
          <WeekRow />
          <ScrollView
            ref={ref => {
              this.ScrollView = ref;
            }}
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            removeClippedSubviews
            style={[style.scrollView, { width }]}
            horizontal
          >
            {this.renderTabBar(tabs)}
          </ScrollView>
          <Text style={style.tabBarText}>
            {timeText}
          </Text>
        </View>
        <ScrollView>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            ref={ref => {
              this.contentView = ref;
            }}
            scrollEnabled={false}
            // onMomentumScrollEnd={this.animatedEnd}
            // onMomentumScrollStart={this.animatedStart}
            scrollEventThrottle={50}
            style={[style.contentContainer, { width }]}
            horizontal
          >
            {this.state.contentTabArrs.map(item => {
              const data = this.map.get(item);
              return <ContentItem key={`_${item}`} data={data} />;
            })}
          </ScrollView>
        </ScrollView>
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
function TabContent({ tab, activeTab, now, index, onPress }) {
  const isActive = activeTab === index;
  const nowActive = isActive && activeTab === now;
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View
        style={[
          style.tabBarItemContent,
          isActive ? style.tabBarItemContentActive2 : null,
          nowActive ? style.tabBarItemContentActive : null,
        ]}
      >
        <Text style={[style.dayText, isActive ? style.activeText : null]}>
          {moment(tab).format('D')}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

function ContentItem({ data }) {
  if (data) {
    return (
      <View style={[style.contentItem, { width }]}>
        <Text>健身记录</Text>
        {data.map(item => <RecordItem key={item.unit} {...item} />)}
      </View>
    );
  }
  return (
    <View
      style={[
        style.contentItem,
        { width, justifyContent: 'center', alignItems: 'center' },
      ]}
    >
      <Text>你来到了没有知识的荒原：）</Text>
    </View>
  );
}
function RecordItem({ title, time, number, unit }) {
  return (
    <LinearGradient
      colors={['rgb(252,115,90)', 'rgb(251,82,66)']}
      style={style.recordItem}
    >
      <Text style={style.recordText}>
        {title}
      </Text>
      <View style={style.textGroup2}>
        <View style={style.textGroup}>
          <Text style={style.number}>{`${number}`}</Text>
          <Text style={style.unit}>
            {unit}
          </Text>
        </View>
        <Text style={style.time}>
          {time}
        </Text>
      </View>
    </LinearGradient>
  );
}
function isDim(index) {
  return index === 0 || index === week.length - 1 ? style.textDim : null;
}
const Tabheight = 80;
const TabItem = 30;
const pink = 'rgb(252,49,86)';
const style = StyleSheet.create({
  recordItem: {
    flexDirection: 'row',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    justifyContent: 'space-between',
  },
  textGroup2: {
    alignItems: 'flex-end',
  },
  textGroup: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  recordText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  number: {
    fontSize: 40,
    color: 'white',
  },
  unit: {
    lineHeight: 30,
    color: 'white',
  },
  time: {
    fontSize: 10,
    color: 'white',
  },
  tabBarText: {
    textAlign: 'center',
    marginVertical: 5,
  },
  c: {
    flex: 1,
  },
  contentItem: {
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
  container: {
    height: Tabheight,
    backgroundColor: 'rgba(255,255,255,0)',
  },
  scrollView: {
    backgroundColor: 'rgba(255,255,255,.6)',
  },
  tabBar: {
    overflow: 'hidden',
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center',
  },
  box: {
    width: 100,
  },
  activeText: {
    color: 'white',
  },
  tabBarItemContent: {
    height: TabItem,
    width: TabItem,
    borderRadius: TabItem / 2,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBarItemContentActive: {
    backgroundColor: pink,
  },
  tabBarItemContentActive2: {
    backgroundColor: 'black',
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
  contentContainer: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,.5)',
  },
});

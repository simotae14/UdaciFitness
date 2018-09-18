/* Demo TabNavigator */
import React from 'react';
import {
  Text,
  View,
  StyleSheet
} from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { TabNavigator, StackNavigator, DrawerNavigator } from 'react-navigation';

function Home() {
  return (
    <View style={styles.container}>
      <Text>HOME</Text>
    </View>
  );
}

function Dashboard() {
  return (
    <View style={styles.container}>
      <Text>Dashboard</Text>
    </View>
  );
}

const Tabs = TabNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      tabBarIcon: () => <FontAwesome name='home' size={30} color='black' />
    }
  },
  Dashboard: {
    screen: Dashboard,
    navigationOptions: {
      tabBarIcon: () => <FontAwesome name='dashboard' size={30} color='black' />
    }
  }
});

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Tabs />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

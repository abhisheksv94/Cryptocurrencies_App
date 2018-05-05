/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet,  Text,  View} from 'react-native';
import {StackNavigator} from 'react-navigation';
import ListingPage from './Components/ListingPage';
import DetailsPage from './Components/DetailsPage';
import GraphPage from './Components/GraphPage';


const Navigation=StackNavigator({
  Listing:{screen:ListingPage},
  Details:{screen:DetailsPage},
  Graph:{screen:GraphPage},
});

export default class App extends Component {
  render() {
    return (
      <Navigation/>
    );
  }
}


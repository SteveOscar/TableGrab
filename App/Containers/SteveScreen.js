// @flow

import React from 'react'
import { ScrollView, View, Text, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import { Metrics } from '../Themes'
// external libs
import Icon from 'react-native-vector-icons/FontAwesome'
import Animatable from 'react-native-animatable'
import { Actions as NavigationActions } from 'react-native-router-flux'

// Styles
import styles from './Styles/SteveScreenStyle'

// I18n
import I18n from 'react-native-i18n'

import RoundedButton from '../Components/RoundedButton'

class SteveScreen extends React.Component {

  render () {
    return (
      <View style={styles.mainContainer}>
        <ScrollView style={styles.container}>
          <View style={styles.section}>
            <Text style={styles.darkSectionText}>
              How many Steve could a Steve Steve Steve if a Steve Steve could Steve Steve?
            </Text>
            <Text style={styles.darkSectionText}>
              Oh another block of text!
            </Text>
            <RoundedButton onPress={NavigationActions.presentationScreen}>View Main Screen</RoundedButton>
          </View>
        </ScrollView>
      </View>
    )
  }

}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SteveScreen)

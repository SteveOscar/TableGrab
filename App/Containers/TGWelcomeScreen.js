// @flow

import React from 'react'
import {
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Keyboard,
  LayoutAnimation
} from 'react-native'
import { connect } from 'react-redux'
import Styles from './Styles/TGWelcomeScreenStyle'
import {Images, Metrics} from '../Themes'
import LoginActions from '../Redux/LoginRedux'
import { Actions as NavigationActions } from 'react-native-router-flux'
import I18n from 'react-native-i18n'

import RoundedButton from '../Components/RoundedButton'

class LoginScreen extends React.Component {
  state: {
    visibleHeight: number,
    topLogo: {
      width: number
    }
  }

  constructor (props: LoginScreenProps) {
    super(props)
    this.state = {
      visibleHeight: Metrics.screenHeight,
      topLogo: { width: Metrics.screenWidth }
    }
  }

  render () {
    return (
      <ScrollView contentContainerStyle={{justifyContent: 'center'}} style={[Styles.container, {height: this.state.visibleHeight}]} keyboardShouldPersistTaps>
        <Image source={Images.logo} style={[Styles.topLogo, this.state.topLogo]} />
        <View style={Styles.welcomeSection}>
          <Text style={Styles.lightSectionText}>
            Welcome to TableGrab
          </Text>
          <Text style={Styles.lightSectionText}>
            Log in or Sign up...
          </Text>
        </View>
        <View style={Styles.welcomeSection}>
          <RoundedButton onPress={NavigationActions.presentationScreen}>Log In</RoundedButton>
        </View>
        <View style={Styles.welcomeSection}>
          <RoundedButton onPress={NavigationActions.presentationScreen}>Sign Up</RoundedButton>
        </View>

      </ScrollView>
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)

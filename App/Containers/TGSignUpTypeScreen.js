// @flow

import React from 'react'
import {
  View,
  ScrollView,
  Text,
  Image,
  LayoutAnimation
} from 'react-native'
import { connect } from 'react-redux'
import Styles from './Styles/TGWelcomeScreenStyle'
import {Images, Metrics} from '../Themes'
import { Actions as NavigationActions } from 'react-native-router-flux'
import LoginActions, { isLoggedIn } from '../Redux/LoginRedux'
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
    const { loggedIn } = this.props
    return (
      <ScrollView contentContainerStyle={{justifyContent: 'center'}} style={[Styles.container, {height: this.state.visibleHeight}]} keyboardShouldPersistTaps>
        <Image source={Images.logo} style={[Styles.topLogo, this.state.topLogo]} />
        <View style={Styles.welcomeSection}>
          <Text style={Styles.lightSectionText}>
            Which kind of account?
          </Text>
        </View>
        <View style={Styles.welcomeSection}>
          <RoundedButton onPress={NavigationActions.presentationScreen}>User</RoundedButton>
        </View>
        <View style={Styles.welcomeSection}>
          <RoundedButton onPress={NavigationActions.presentationScreen}>Restaurant</RoundedButton>
        </View>

      </ScrollView>
    )
  }

  renderErrors() {
    const { error } = this.props
    if(error) {
      return 'Login Failed'
    } else {
      return null
    }
  }

}

const mapStateToProps = (state) => {
  return {
    loggedIn: isLoggedIn(state.login),
    error: state.login.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(LoginActions.logout())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)

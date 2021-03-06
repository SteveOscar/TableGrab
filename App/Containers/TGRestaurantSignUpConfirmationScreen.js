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

class RestaurantSignUpConfirmationScreen extends React.Component {
  state: {
    visibleHeight: number,
    topLogo: {
      width: number
    }
  }

  constructor (props: RestaurantSignUpConfirmationScreenProps) {
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
            Your information was successfully submitted. You will be contacted soon to verify your account. After it is verified, you can proceed.
          </Text>
        </View>
        <View style={Styles.welcomeSection}>
          <RoundedButton onPress={NavigationActions.login}>
            {I18n.t('signIn')}
          </RoundedButton>
        </View>
        {/* <View style={Styles.welcomeSection}>
          <RoundedButton onPress={NavigationActions.signUpType}>Sign Up</RoundedButton>
        </View> */}

      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    loggedIn: isLoggedIn(state.login),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantSignUpConfirmationScreen)

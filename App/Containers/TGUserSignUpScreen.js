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
import Styles from './Styles/UserSignUpScreenStyle'
import GlobalStyles from './Styles/AllComponentsScreenStyle'
import { Metrics } from '../Themes'
import SignUpActions from '../Redux/SignUpRedux'
import { Actions as NavigationActions } from 'react-native-router-flux'
import I18n from 'react-native-i18n'

type UserSignUpScreenProps = {
  dispatch: () => any,
  fetching: boolean,
  attemptUserSignUp: () => void
}

class UserSignUpScreen extends React.Component {

  props: UserSignUpScreenProps

  state: {
    email: string,
    password: string,
    name: string,
    visibleHeight: number,
    topLogo: {
      width: number
    }
  }

  isAttempting: boolean
  keyboardDidShowListener: Object
  keyboardDidHideListener: Object

  constructor (props: UserSignUpScreenProps) {
    super(props)
    this.state = {
      email: '',
      password: '',
      name: '',
      visibleHeight: Metrics.screenHeight,
      topLogo: { width: Metrics.screenWidth },
      error: ''
    }
    this.isAttempting = false
  }

  componentWillReceiveProps (newProps) {
    this.forceUpdate()
    // Did the signUp attempt complete?
    if (this.isAttempting && !newProps.fetching) {
      if(newProps.error !== "WRONG") {
        // NavigationActions.userscreen()
        console.log('SOME ERROR')
      } else {
        NavigationActions.pop()
      }
    }
  }

  componentWillMount () {
    // Using keyboardWillShow/Hide looks 1,000 times better, but doesn't work on Android
    // TODO: Revisit this if Android begins to support - https://github.com/facebook/react-native/issues/3468
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow)
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide)
  }

  componentWillUnmount () {
    this.keyboardDidShowListener.remove()
    this.keyboardDidHideListener.remove()
  }

  keyboardDidShow = (e) => {
    // Animation types easeInEaseOut/linear/spring
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    let newSize = Metrics.screenHeight - e.endCoordinates.height
    this.setState({
      visibleHeight: newSize,
      topLogo: {width: 100, height: 70}
    })
  }

  keyboardDidHide = (e) => {
    // Animation types easeInEaseOut/linear/spring
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    this.setState({
      visibleHeight: Metrics.screenHeight,
      topLogo: {width: Metrics.screenWidth}
    })
  }

  handlePressSignUp = () => {
    const { email, password, name } = this.state
    this.isAttempting = true
    // attempt a signUp - a saga is listening to pick it up from here.
    this.props.attemptUserSignUp(name, email, password)
  }

  handleChangeEmail = (text) => {
    this.setState({ email: text })
  }

  handleChangePassword = (text) => {
    this.setState({ password: text })
  }

  handleChangeName = (text) => {
    this.setState({ name: text })
  }

  render () {
    const { email, password, name } = this.state
    const { fetching } = this.props
    const editable = !fetching
    const textInputStyle = editable ? Styles.textInput : Styles.textInputReadonly
    return (
      <ScrollView contentContainerStyle={{justifyContent: 'center'}} style={[Styles.container, {height: this.state.visibleHeight}]} keyboardShouldPersistTaps>
        <Text style={GlobalStyles.errorText} >
          New User Sign Up
        </Text>
        <View style={Styles.form}>
          <View style={Styles.row}>
            <Text style={Styles.rowLabel}>name</Text>
            <TextInput
              ref='name'
              style={textInputStyle}
              value={name}
              editable={editable}
              keyboardType='default'
              returnKeyType='next'
              autoCapitalize='none'
              autoCorrect={false}
              onChangeText={this.handleChangeName}
              underlineColorAndroid='transparent'
              onSubmitEditing={() => this.refs.password.focus()}
              placeholder='carl carl' />
          </View>

          <View style={Styles.row}>
            <Text style={Styles.rowLabel}>email</Text>
            <TextInput
              ref='email'
              style={textInputStyle}
              value={email}
              editable={editable}
              keyboardType='default'
              returnKeyType='next'
              autoCapitalize='none'
              autoCorrect={false}
              onChangeText={this.handleChangeEmail}
              underlineColorAndroid='transparent'
              onSubmitEditing={() => this.refs.password.focus()}
              placeholder='someone@somewhere.com' />
          </View>

          <View style={Styles.row}>
            <Text style={Styles.rowLabel}>{I18n.t('password')}</Text>
            <TextInput
              ref='password'
              style={textInputStyle}
              value={password}
              editable={editable}
              keyboardType='default'
              returnKeyType='go'
              autoCapitalize='none'
              autoCorrect={false}
              secureTextEntry
              onChangeText={this.handleChangePassword}
              underlineColorAndroid='transparent'
              onSubmitEditing={this.handlePressSignUp}
              placeholder='clever_password2!$' />
          </View>

          <View style={[Styles.loginRow]}>
            <TouchableOpacity style={Styles.loginButtonWrapper} onPress={this.handlePressSignUp}>
              <View style={Styles.loginButton}>
                <Text style={Styles.loginText}>Sign Up</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={Styles.loginButtonWrapper} onPress={NavigationActions.pop}>
              <View style={Styles.loginButton}>
                <Text style={Styles.loginText}>Cancel</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

      </ScrollView>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    fetching: state.login.fetching,
    error: state.login.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptUserSignUp: (name, email, password) => dispatch(SignUpActions.signUpRequest(name, email, password))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserSignUpScreen)

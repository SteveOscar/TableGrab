import { call, put } from 'redux-saga/effects'
import SignUpActions from '../Redux/SignUpRedux'
import { AsyncStorage } from 'react-native'

// attempts to sign up
export function * signUp (api, action) {
  const { name, email, password } = action
  console.log('IN TGSignUpSaga!!')
  if (password === '') {
    // dispatch failure
    yield put(SignUpActions.signUpFailure('WRONG'))
  } else {
    // dispatch successful signs up
    const response = yield call(api.signUp, name, email, password)
    if (response.ok) {
      try {
        console.log('Sign Up Successful: ', response.data.status)
      } catch (error) {
        console.log('ERROR: ', error)
      }
      yield put(SignUpActions.signUpSuccess(response.data.status))
    } else {
      yield put(SignUpActions.signUpFailure('WRONG'))
    }
  }
}

import { call, put } from 'redux-saga/effects'
import SignUpActions from '../Redux/SignUpRedux'
import { AsyncStorage } from 'react-native'

// attempts to sign up
export function * signUp (api, action) {
  const { payload } = action
  console.log('IN TGSignUpSaga!!')
  if (payload.password === '') {
    // dispatch failure
    yield put(SignUpActions.signUpFailure(['Password Requred']))
  } else if(payload.name === '') {
    yield put(SignUpActions.signUpFailure(['Name Requred']))
  } else {
    // dispatch successful signs up
    const response = yield call(api.signUp, payload)
    if (response.ok) {
      try {
        console.log('Sign Up Successful: ', response.data.status)
      } catch (error) {
        console.log('ERROR: ', error)
      }
      yield put(SignUpActions.signUpSuccess(response.data.status))
    } else {
      yield put(SignUpActions.signUpFailure(response.data.errors))
    }
  }
}

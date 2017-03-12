import { call, put } from 'redux-saga/effects'
import LoginActions from '../Redux/LoginRedux'
import { AsyncStorage } from 'react-native'

// attempts to login
export function * login (api, action) {
  const { username, password } = action
  console.log('IN TGLoginSaga!!')
  if (password === '') {
    // dispatch failure
    yield put(LoginActions.loginFailure('WRONG'))
  } else {
    // dispatch successful logins
    const response = yield call(api.login, username, password)
    if (response.ok) {
      try {
        yield AsyncStorage.setItem('auth_token', response.data.auth_token);
        console.log('Token saved: ', response.data.auth_token)
      } catch (error) {
        console.log('ERROR: ', error)
        console.log('Error saving token: ', response.data.auth_token)
      }
      yield put(LoginActions.loginSuccess(username))
    } else {
      yield put(LoginActions.loginFailure('WRONG'))
    }
  }
}
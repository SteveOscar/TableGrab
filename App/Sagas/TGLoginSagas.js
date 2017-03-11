import { call, put } from 'redux-saga/effects'
import LoginActions from '../Redux/LoginRedux'

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
      yield put(LoginActions.loginSuccess(username))
    } else {
      yield put(LoginActions.loginFailure('WRONG'))
    }
  }
}

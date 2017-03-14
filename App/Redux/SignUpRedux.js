// @flow

import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  signUpRequest: ['name', 'email', 'password'],
  signUpSuccess: ['user'],
  signUpFailure: ['error'],
  logout: null
})

export const SignUpTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  email: null,
  error: null,
  fetching: false
})

/* ------------- Reducers ------------- */

// we're attempting to sign up
export const request = (state: Object) => state.merge({ fetching: true })

// we've successfully signed up
export const success = (state: Object, { user }: Object) =>
  state.merge({ fetching: false, error: null, user })

// we've had a problem signing up
export const failure = (state: Object, { error }: Object) =>
  state.merge({ fetching: false, error })

// we've logged out
export const logout = (state: Object) => INITIAL_STATE

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SIGN_UP_REQUEST]: request,
  [Types.SIGN_UP_SUCCESS]: success,
  [Types.SIGN_UP_FAILURE]: failure,
  [Types.LOGOUT]: logout
})

/* ------------- Selectors ------------- */

// Is the current user logged in?
export const isLoggedIn = (loginState: Object) => loginState.user && loginState.user.email

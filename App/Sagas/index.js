import { takeLatest } from 'redux-saga'
// import API from '../Services/Api'
import API from '../Services/Api'
import TableAPI from '../Services/TableApi'
import FixtureAPI from '../Services/FixtureApi'
import DebugSettings from '../Config/DebugSettings'

/* ------------- Types ------------- */

import { StartupTypes } from '../Redux/StartupRedux'
import { TemperatureTypes } from '../Redux/TemperatureRedux'
import { LoginTypes } from '../Redux/LoginRedux'
import { SignUpTypes } from '../Redux/SignUpRedux'
import { OpenScreenTypes } from '../Redux/OpenScreenRedux'

/* ------------- Sagas ------------- */

import { startup } from './StartupSagas'
import { login } from './TGLoginSagas'
import { signUp } from './TGSignUpSagas'
// import { login } from './LoginSagas'
import { getTemperature } from './TemperatureSagas'
import { openScreen } from './OpenScreenSagas'

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugSettings.useFixtures ? FixtureAPI : API.create()
const TableApi = DebugSettings.useFixtures ? FixtureAPI : TableAPI.create()

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield [
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup),
    // takeLatest(LoginTypes.LOGIN_REQUEST, login),
    takeLatest(OpenScreenTypes.OPEN_SCREEN, openScreen),

    // some sagas receive extra parameters in addition to an action
    takeLatest(LoginTypes.LOGIN_REQUEST, login, TableApi),
    takeLatest(SignUpTypes.SIGN_UP_REQUEST, signUp, TableApi),
    takeLatest(TemperatureTypes.TEMPERATURE_REQUEST, getTemperature, api)
  ]
}

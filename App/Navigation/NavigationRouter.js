// @flow

import React, { Component } from 'react'
import { Scene, Router } from 'react-native-router-flux'
import Styles from './Styles/NavigationContainerStyle'
import NavigationDrawer from './NavigationDrawer'
import NavItems from './NavItems'
import CustomNavBar from '../Navigation/CustomNavBar'

// screens identified by the router
import PresentationScreen from '../Containers/PresentationScreen'
import AllComponentsScreen from '../Containers/AllComponentsScreen'
import UsageExamplesScreen from '../Containers/UsageExamplesScreen'
import TGLoginScreen from '../Containers/TGLoginScreen'
import ListviewExample from '../Containers/ListviewExample'
import ListviewGridExample from '../Containers/ListviewGridExample'
import ListviewSectionsExample from '../Containers/ListviewSectionsExample'
import ListviewSearchingExample from '../Containers/ListviewSearchingExample'
import MapviewExample from '../Containers/MapviewExample'
import APITestingScreen from '../Containers/APITestingScreen'
import ThemeScreen from '../Containers/ThemeScreen'
import DeviceInfoScreen from '../Containers/DeviceInfoScreen'
import TGWelcomeScreen from '../Containers/TGWelcomeScreen'
import TGUserScreen from '../Containers/TGUserScreen'
import TGSignUpTypeScreen from '../Containers/TGSignUpTypeScreen'
import RestaurantLogIn from '../Containers/TGRestaurantLogIn'
import UserSignUpScreen from '../Containers/TGUserSignUpScreen'
import RestaurantSignUpScreen from '../Containers/TGRestaurantSignUpScreen'
import TGSignUpConfirmationScreen from '../Containers/TGSignUpConfirmationScreen'
import RestaurantSignUpConfirmationScreen from '../Containers/TGRestaurantSignUpConfirmationScreen'

/* **************************
* Documentation: https://github.com/aksonov/react-native-router-flux
***************************/

class NavigationRouter extends Component {
  render () {
    return (
      <Router>
        <Scene key='drawer' component={NavigationDrawer} open={false}>
          <Scene key='drawerChildrenWrapper' navigationBarStyle={Styles.navBar} titleStyle={Styles.title} leftButtonIconStyle={Styles.leftButton} rightButtonTextStyle={Styles.rightButton}>
            <Scene key='presentationScreen' component={PresentationScreen} title='Ignite' renderLeftButton={NavItems.hamburgerButton} />
            <Scene key='componentExamples' component={AllComponentsScreen} title='Components' />
            <Scene key='usageExamples' component={UsageExamplesScreen} title='Usage' rightTitle='Example' onRight={() => window.alert('Example Pressed')} />
            <Scene key='listviewExample' component={ListviewExample} title='Listview Example' />
            <Scene key='listviewGridExample' component={ListviewGridExample} title='Listview Grid' />
            <Scene key='listviewSectionsExample' component={ListviewSectionsExample} title='Listview Sections' />
            <Scene key='listviewSearchingExample' component={ListviewSearchingExample} title='Listview Searching' navBar={CustomNavBar} />
            <Scene key='mapviewExample' component={MapviewExample} title='Mapview Example' />
            <Scene key='apiTesting' component={APITestingScreen} title='API Testing' />
            <Scene key='theme' component={ThemeScreen} title='Theme' />

            <Scene key='signUpType' component={TGSignUpTypeScreen} title='Account Type'  />
            <Scene key='login' component={TGLoginScreen} title='Login'  />
            <Scene key='userSignUpScreen' component={UserSignUpScreen} title='Create User Account'  />
            <Scene key='restaurantSignUpScreen' component={RestaurantSignUpScreen} title='Sign Up'  />
            <Scene key='restaurantLogIn' component={RestaurantLogIn} title='Restaurant Log In'  />
            <Scene key='userscreen' component={TGUserScreen} title='User Screen' renderLeftButton={NavItems.hamburgerButton} type="reset"/>
            <Scene key='signUpConfirmation' component={TGSignUpConfirmationScreen} title='Sign Up Confirmation' renderLeftButton={NavItems.hamburgerButton} />
            <Scene key='restaurantSignUpConfirmation' component={RestaurantSignUpConfirmationScreen} title='Account Pending Confirmation' renderLeftButton={NavItems.hamburgerButton} />
            <Scene initial key='welcomeScreen' component={TGWelcomeScreen} title='Welcome' renderLeftButton={NavItems.hamburgerButton} type="reset"/>

            {/* Custom navigation bar example */}
            <Scene key='deviceInfo' component={DeviceInfoScreen} title='Device Info' />
          </Scene>
        </Scene>
      </Router>
    )
  }
}

export default NavigationRouter

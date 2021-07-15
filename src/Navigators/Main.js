import React from 'react'
import { LogBox } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { IndexExampleContainer } from '@/Containers'
import { TikTakToe } from '@/Containers'

const Tab = createBottomTabNavigator()

LogBox.ignoreAllLogs();
// @refresh reset
const MainNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={IndexExampleContainer} />
      <Tab.Screen name="TikTakToe" component={TikTakToe} />
    </Tab.Navigator>
  )
}

export default MainNavigator

import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Alert, StatusBar, Linking } from 'react-native'
import { useTheme } from '@/Theme'

const TikTakToe = ({ navigation }) => {
  const { Layout, Gutters, Colors } = useTheme()
  // const [val, setVal] = useState('');
  const [state, setState] = useState({
    currentPlayer: 1,
    multiArray: [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ],
    draw: null,
  })

  navigation.setOptions({
    tabBarVisible: !state.focus,
  })

  const initializeArray = () => {
    setState((prev) => ({
      ...prev, multiArray: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ],
      currentPlayer: 1,
    }))
  }

  const isDraw = () => {
    var sum = 0;
    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
        console.log('sum with array', i, j, sum, state.multiArray[i][j])
        sum = sum + ((state.multiArray[i][j] == -1) ? 1 : state.multiArray[i][j])
        // setState((prev) => ({ ...prev, draw: true }))
      }
    }
    return sum;
  }

  useEffect(() => {
    var winner = getWinner();
    var draw = isDraw();
    console.log('draw', draw, winner)
    if (winner == 1) {
      Alert.alert('Match', '⚽️ WIN ')
      initializeArray();
    }
    else if (winner == -1) {
      Alert.alert('Match', '🏐  WIN ')
      initializeArray();
    }
    else if (draw == 9) {
      Alert.alert('Match', 'Match is draw 😞')
      initializeArray();
    }
  }, [state.multiArray])

  const getWinner = () => {
    const total = 3;
    let arr = state.multiArray
    var sum;

    //check row
    for (var i = 0; i < 3; i++) {
      sum = arr[i][0] + arr[i][1] + arr[i][2]
      if (sum == 3) { console.log('⚽️ row win', arr[i][0], arr[i][1], arr[i][2]); return 1; }
      else if (sum == -3) { console.log(`🏐 row win ${i}0, ${i}1, ${i}2`); return -1; }

    }

    //check column
    for (var i = 0; i < 3; i++) {
      sum = arr[0][i] + arr[1][i] + arr[2][i]
      if (sum == 3) { console.log('⚽️ column win', arr[0][i], arr[1][i], arr[2][i]); return 1; }
      else if (sum == -3) { console.log(`🏐 column win, 01, 1${i}, 2${i}`); return -1; }

    }



    //check diagonal
    diagonalRight = arr[0][0] + arr[1][1] + arr[2][2]
    if (diagonalRight == 3) { return 1; }
    else if (diagonalRight == -3) { return -1; }

    diagonalLeft = arr[0][2] + arr[1][1] + arr[2][0]
    if (diagonalLeft == 3) { return 1; }
    else if (diagonalLeft == -3) { return -1; }

    // no winner 
    return 0;
  }

  const setVal = (row, column) => {
    var values = state.multiArray[row][column]
    if (values !== 0) { return; }
    let currentPlayer = state.currentPlayer;
    let arr = state.multiArray.slice();
    arr[row][column] = currentPlayer;
    setState((prev) => ({ ...prev, multiArray: arr }))

    let nextPlayer = (currentPlayer == 1) ? -1 : 1;
    setState((prev) => ({ ...prev, currentPlayer: nextPlayer }))
  }

  const mainValue = (row, column) => {
    let values = state.multiArray[row][column]
    // console.log('values', values)
    if (values === 1) {
      return '⚽️ '
    } else if (values === -1) {
      return '🏐'
    } else {
      return ''
    }
  }

  const focusFun = () => {
    state.focus ? Alert.alert('Message by Arunabh Verma', 'Focused Mode activate, for disable press again 🤓 ')
      : Alert.alert('Message by Arunabh Verma', 'Focused Mode deactivated');
    setState((prev) => ({ ...prev, focus: !state.focus }))
  }
  return (
    <>
      <StatusBar backgroundColor='#FDD2BF' barStyle='dark-content' hidden={state.focus} />
      <View style={styles.header}>
        <TouchableOpacity activeOpacity={0.5} style={styles.headerButton} onPress={focusFun}>
          <Text style={{ fontWeight: 'bold', fontSize: 15, color: state.focus ? '#5C33F6' : '#47597E' }}>{state.focus ? 'Activated' : 'Deactivated'}</Text>
          <View style={styles.emojiHeader} >
            <Text style={styles.headerText}>{state.focus ? '🤓' : '😞'}</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <View>
          <Text style={styles.focusText}>
            Tik Tak Toe
          </Text>
          <View style={styles.playerCard}>
            <Text style={styles.playerText}>Player  {state.currentPlayer == 1 ? '1' : '2'}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => setVal(0, 0)}
            style={styles.column}
          >
            <Text style={styles.text}>{mainValue(0, 0)}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => setVal(0, 1)}
            style={styles.column}
          >
            <Text style={styles.text}>{mainValue(0, 1)}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => setVal(0, 2)}
            style={styles.column}
          >
            <Text style={styles.text}>{mainValue(0, 2)}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => setVal(1, 0)}
            style={styles.column}
          >
            <Text style={styles.text}>{mainValue(1, 0)}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => setVal(1, 1)}
            style={styles.column}
          >
            <Text style={styles.text}>{mainValue(1, 1)}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => setVal(1, 2)}
            style={styles.column}
          >
            <Text style={styles.text}>{mainValue(1, 2)}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => setVal(2, 0)}
            style={styles.column}
          >
            <Text style={styles.text}>{mainValue(2, 0)}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => setVal(2, 1)}
            style={styles.column}
          >
            <Text style={styles.text}>{mainValue(2, 1)}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => setVal(2, 2)}
            style={styles.column}
          >
            <Text style={styles.text}>{mainValue(2, 2)}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText}>Presented By </Text>
        <TouchableOpacity
          onPress={() => Linking.openURL('instagram://user?username=arunabh_verma')} >
          <Text style={{ fontWeight: 'bold' }}>
            Arunabh Verma 😇
          </Text>
        </TouchableOpacity>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDD2BF',
    justifyContent: 'center',
    alignItems: 'center'
  },
  row: {
    flexDirection: 'row',
    // height: 50,
  },
  text: {
    color: '#492F10',
    fontSize: 50,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  column: {
    width: 80,
    height: 80,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(104,121,247)',
    elevation: 10,
    borderRadius: 10,
  },
  focusButton: {
    // backgroundColor: 'red',
    // width: '100%',

    paddingHorizontal: 50,
    paddingVertical: 20
  },
  focusText: {
    // marginBottom: 100,
    color: '#52006A',
    fontSize: 40,
    fontWeight: 'bold',
  },
  playerCard: {
    backgroundColor: '#7868E6',
    marginVertical: 30,
    height: 40,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
  },
  playerText: {
    color: '#E4FBFF',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  footerText: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  footer: {
    backgroundColor: '#FDD2BF',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 30,
  },
  header: {
    backgroundColor: '#FDD2BF',
    flexDirection: 'row-reverse',
  },
  headerButton: {
    elevation: 10,
    flexDirection: 'row',
    margin: 10,
    paddingLeft: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#96BAFF',
    borderRadius: 45,
    width: 150,
    height: 45,
  },
  headerText: {
    fontSize: 35,
    elevation: 10,
  },
  emojiHeader: {
    width: 50,
    height: 50,
    backgroundColor: '#7C83FD',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  value: {
    flexDirection: 'row',
    backgroundColor: 'red',
  }
})

export default TikTakToe

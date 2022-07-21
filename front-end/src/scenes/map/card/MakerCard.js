import React, { useMemo, useState } from 'react'
import {
  Alert, Modal, StyleSheet, Text, Pressable, View,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'


const MarkerCard = (props) => {
  const [modalVisible, setModalVisible] = useState(true)
  const { elam, idUserPressed } = props
  const navigation = useNavigation()

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.')
          setModalVisible(!modalVisible)
        }}
        onPress={() => {
          setModalVisible(false)
          console.log('taped press out')
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.textStyle}>{elam?.pseudo}</Text>
            <Text>{elam?.age}</Text>
            <Text>{elam?.nationality}</Text>
            <Pressable
              style={[styles.button, styles.buttonOpen]}
              onPress={() => {
                setModalVisible(false)
                navigation.navigate('USER_PROFIL_SCREEN', { id: idUserPressed })
              }}
            >
              <Text style={styles.textStyle}>Profile</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      {/* <Pressable */}
      {/*   style={[styles.button, styles.buttonOpen]} */}
      {/*   onPress={() => setModalVisible(true)} */}
      {/* > */}
      {/*   <Text style={styles.textStyle}>Show Modal</Text> */}
      {/* </Pressable> */}
    </View>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#50aa67',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
})

export default MarkerCard

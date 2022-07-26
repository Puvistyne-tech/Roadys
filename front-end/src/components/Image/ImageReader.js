// // // import React, { useState } from 'react'
// // // import { Button, Text, View } from 'react-native'
// // // // import * as ImagePicker from 'expo-image-picker'
// // // import { Input } from 'react-native-elements'
// // //
// // // const ImageReader = () => {
// // //    const [photo, setPhoto] = useState(null)
// // //
// // //    const onSubmit = (e) => {
// // //       e.preventDefault()
// // //
// // //       const data = new FormData()
// // //       data.append('photo', photo)
// // //
// // //       console.log(photo)
// // //       console.log(data)
// // //
// // //    }
// // //
// // //    const onInputChange = (e) => {
// // //       console.log(e.target)
// // //       // setPhoto(e.target.files[0])
// // //    }
// // //
// // //
// // //    const pickImage = async () => {
// // //       // No permissions request is necessary for launching the image library
// // //       // let result = await ImagePicker.launchImageLibraryAsync({
// // //       //    mediaTypes: ImagePicker.MediaTypeOptions.All,
// // //       //    allowsEditing: true,
// // //       //    aspect: [4, 3],
// // //       //    quality: 1,
// // //       // });
// // //
// // //
// // //
// // //       console.log(result);
// // //
// // //       if (!result.cancelled) {
// // //          console.log(result)
// // //          // setImage(result.uri);
// // //       }
// // //    };
// // //
// // //
// // //    return (
// // //       <View>
// // //          {/*<form onSubmit={onSubmit}>*/}
// // //          <Text>File Upload</Text>
// // //
// // //             <Input type='file' value={photo} onChange={e => onInputChange(e)} >
// // //                hi
// // //             </Input>
// // //          {/*<Button title='submit' onPress={e => onSubmit(e)}>upload</Button>*/}
// // //          {/*</form>*/}
// // //
// // //          <Button title="Change my picture" onPress={e=>onSubmit(e)} />
// // //
// // //       </View>
// // //    )
// // // }
// // //
// // // export default ImageReader
// //
// //
// // // Example of Image Picker in React Native
// // // https://aboutreact.com/example-of-image-picker-in-react-native/
// //
// // // Import React
// // import React, {useState} from 'react'
// // // Import required components
// // import {
// //    SafeAreaView,
// //    StyleSheet,
// //    Text,
// //    View,
// //    TouchableOpacity,
// //    Image,
// //    Platform,
// //    PermissionsAndroid,
// // } from 'react-native'
// //
// // // Import Image Picker
// // // import ImagePicker from 'react-native-image-picker';
// // import {
// //    launchCamera,
// //    launchImageLibrary,
// // } from 'react-native-image-picker'
// //
// // const App = () => {
// //    const [filePath, setFilePath] = useState({})
// //
// //    const requestCameraPermission = async () => {
// //       if (Platform.OS === 'android') {
// //          try {
// //             const granted = await PermissionsAndroid.request(
// //                PermissionsAndroid.PERMISSIONS.CAMERA,
// //                {
// //                   title: 'Camera Permission',
// //                   message: 'App needs camera permission',
// //                },
// //             )
// //             // If CAMERA Permission is granted
// //             return granted === PermissionsAndroid.RESULTS.GRANTED
// //          } catch (err) {
// //             console.warn(err)
// //             return false
// //          }
// //       } else return true
// //    }
// //
// //    const requestExternalWritePermission = async () => {
// //       if (Platform.OS === 'android') {
// //          try {
// //             const granted = await PermissionsAndroid.request(
// //                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
// //                {
// //                   title: 'External Storage Write Permission',
// //                   message: 'App needs write permission',
// //                },
// //             )
// //             // If WRITE_EXTERNAL_STORAGE Permission is granted
// //             return granted === PermissionsAndroid.RESULTS.GRANTED
// //          } catch (err) {
// //             console.warn(err)
// //             alert('Write permission err', err)
// //          }
// //          return false
// //       } else return true
// //    }
// //
// //    const captureImage = async (type) => {
// //       let options = {
// //          mediaType: type,
// //          maxWidth: 300,
// //          maxHeight: 550,
// //          quality: 1,
// //          videoQuality: 'low',
// //          durationLimit: 30, //Video max duration in seconds
// //          saveToPhotos: true,
// //       }
// //       let isCameraPermitted = await requestCameraPermission()
// //       let isStoragePermitted = await requestExternalWritePermission()
// //       console.log(isCameraPermitted && isStoragePermitted)
// //       if (isCameraPermitted && isStoragePermitted) {
// //          launchCamera(options, (response) => {
// //             console.log('Response = ', response)
// //
// //             if (response.didCancel) {
// //                alert('User cancelled camera picker')
// //                return
// //             } else if (response.errorCode === 'camera_unavailable') {
// //                alert('Camera not available on device')
// //                return
// //             } else if (response.errorCode === 'permission') {
// //                alert('Permission not satisfied')
// //                return
// //             } else if (response.errorCode === 'others') {
// //                alert(response.errorMessage)
// //                return
// //             }
// //             console.log('base64 -> ', response.base64)
// //             console.log('uri -> ', response.uri)
// //             console.log('width -> ', response.width)
// //             console.log('height -> ', response.height)
// //             console.log('fileSize -> ', response.fileSize)
// //             console.log('type -> ', response.type)
// //             console.log('fileName -> ', response.fileName)
// //             setFilePath(response)
// //             console.log(response)
// //          }).then(r => {
// //             console.log(r)
// //          })
// //       }
// //    }
// //
// //    const chooseFile = (type) => {
// //       let options = {
// //          mediaType: type,
// //          maxWidth: 300,
// //          maxHeight: 550,
// //          quality: 1,
// //       }
// //       launchImageLibrary(options, (response) => {
// //          console.log('Response = ', response)
// //
// //          if (response.didCancel) {
// //             alert('User cancelled camera picker')
// //             return
// //          } else if (response.errorCode == 'camera_unavailable') {
// //             alert('Camera not available on device')
// //             return
// //          } else if (response.errorCode == 'permission') {
// //             alert('Permission not satisfied')
// //             return
// //          } else if (response.errorCode == 'others') {
// //             alert(response.errorMessage)
// //             return
// //          }
// //          console.log('base64 -> ', response.base64)
// //          console.log('uri -> ', response.uri)
// //          console.log('width -> ', response.width)
// //          console.log('height -> ', response.height)
// //          console.log('fileSize -> ', response.fileSize)
// //          console.log('type -> ', response.type)
// //          console.log('fileName -> ', response.fileName)
// //          setFilePath(response)
// //       })
// //    }
// //
// //    return (
// //       <SafeAreaView style={{flex: 1}}>
// //          <Text style={styles.titleText}>
// //             Example of Image Picker in React Native
// //          </Text>
// //          <View style={styles.container}>
// //             <Image
// //                source={{
// //                   uri: 'data:image/jpeg;base64,' + filePath.data,
// //                }}
// //                style={styles.imageStyle}
// //             />
// //             <Image
// //                source={{uri: filePath.uri}}
// //                style={styles.imageStyle}
// //             />
// //             <Text style={styles.textStyle}>{filePath.uri}</Text>
// //             <TouchableOpacity
// //                activeOpacity={0.5}
// //                style={styles.buttonStyle}
// //                onPress={() => captureImage('photo')}>
// //                <Text style={styles.textStyle}>
// //                   Launch Camera for Image
// //                </Text>
// //             </TouchableOpacity>
// //             <TouchableOpacity
// //                activeOpacity={0.5}
// //                style={styles.buttonStyle}
// //                onPress={() => captureImage('video')}>
// //                <Text style={styles.textStyle}>
// //                   Launch Camera for Video
// //                </Text>
// //             </TouchableOpacity>
// //             <TouchableOpacity
// //                activeOpacity={0.5}
// //                style={styles.buttonStyle}
// //                onPress={() => chooseFile('photo')}>
// //                <Text style={styles.textStyle}>Choose Image</Text>
// //             </TouchableOpacity>
// //             <TouchableOpacity
// //                activeOpacity={0.5}
// //                style={styles.buttonStyle}
// //                onPress={() => chooseFile('video')}>
// //                <Text style={styles.textStyle}>Choose Video</Text>
// //             </TouchableOpacity>
// //          </View>
// //       </SafeAreaView>
// //    )
// // }
// //
// // export default App
// //
// // const styles = StyleSheet.create({
// //    container: {
// //       flex: 1,
// //       padding: 10,
// //       backgroundColor: '#fff',
// //       alignItems: 'center',
// //    },
// //    titleText: {
// //       fontSize: 22,
// //       fontWeight: 'bold',
// //       textAlign: 'center',
// //       paddingVertical: 20,
// //    },
// //    textStyle: {
// //       padding: 10,
// //       color: 'black',
// //       textAlign: 'center',
// //    },
// //    buttonStyle: {
// //       alignItems: 'center',
// //       backgroundColor: '#DDDDDD',
// //       padding: 5,
// //       marginVertical: 10,
// //       width: 250,
// //    },
// //    imageStyle: {
// //       width: 200,
// //       height: 200,
// //       margin: 5,
// //    },
// // })
//
// import * as React from 'react';
// import {StyleSheet, SafeAreaView, View, Image, ScrollView, Text} from 'react-native';
// // import {DemoTitle, DemoButton, DemoResponse} from './components';
//
// import * as ImagePicker from 'react-native-image-picker';
// import Button from "../Button";
//
// /* toggle includeExtra */
// const includeExtra = true;
//
// export default function ImageReader() {
//    const [response, setResponse] = React.useState(null);
//
//    let options = {
//       title: 'Pick Image',
//       mediaType: 'Photo',
//       includeBase64: true,
//       customButtons: [
//          {
//             name: 'customOptionKey',
//             title: 'Choose Photo from Custom Option'
//          },
//       ],
//       storageOptions: {
//          skipBackup: true,
//          path: 'images',
//       },
//    }
//
//    const onButtonPress = React.useCallback(async (type, options) => {
//       // if (type === 'capture') {
//       //    ImagePicker.launchCamera(options, setResponse);
//       // } else {
//       await ImagePicker.launchImageLibrary(options, setResponse)
//       // await res()
//       console.log(response)
//
//       // }
//
//       // ImagePicker.launchImage
//    }, []);
//
//    return (
//       <SafeAreaView style={styles.container}>
//          <Text>React Native Image Picker</Text>
//          <ScrollView>
//             <View style={styles.buttonContainer}>
//                {actions.map(({title, type, options}) => {
//                   return (
//                      <Button
//                         key={title}
//                         title={title}
//                         onPress={() => onButtonPress(type, options)}
//                      >
//                      </Button>
//                   );
//                })}
//             </View>
//             <View>{response}</View>
//
//             {response?.assets &&
//                response?.assets.map(({uri}) => (
//                   <View key={uri} style={styles.image}>
//                      <Image
//                         resizeMode="cover"
//                         resizeMethod="scale"
//                         style={{width: 200, height: 200}}
//                         source={{uri: uri}}
//                      />
//                   </View>
//                ))}
//          </ScrollView>
//       </SafeAreaView>
//    );
// }
//
// const styles = StyleSheet.create({
//    container: {
//       flex: 1,
//       backgroundColor: 'aliceblue',
//    },
//    buttonContainer: {
//       flexDirection: 'row',
//       flexWrap: 'wrap',
//       marginVertical: 8,
//    },
//
//    image: {
//       marginVertical: 24,
//       alignItems: 'center',
//    },
// });
//
// //
// interface Action {
//    title: string;
//    type: 'capture' | 'library';
//    options: ImagePicker.ImageLibraryOptions;
// }
//
// const actions: Action[] = [
//    {
//       title: 'Take Image',
//       type: 'capture',
//       options: {
//          saveToPhotos: true,
//          mediaType: 'photo',
//          includeBase64: false,
//          includeExtra,
//       },
//    },
//    {
//       title: 'Select Image',
//       type: 'library',
//       options: {
//          maxHeight: 200,
//          maxWidth: 200,
//          selectionLimit: 0,
//          mediaType: 'photo',
//          includeBase64: false,
//          includeExtra,
//       },
//    },
//    {
//       title: 'Take Video',
//       type: 'capture',
//       options: {
//          saveToPhotos: true,
//          mediaType: 'video',
//          includeExtra,
//       },
//    },
//    {
//       title: 'Select Video',
//       type: 'library',
//       options: {
//          selectionLimit: 0,
//          mediaType: 'video',
//          includeExtra,
//       },
//    },
//    {
//       title: `Select Image or Video\n(mixed)`,
//       type: 'library',
//       options: {
//          selectionLimit: 0,
//          mediaType: 'mixed',
//          includeExtra,
//       },
//    },
// ];


import React, { Component } from 'react';
import { Button, Image, Text, View, StyleSheet } from 'react-native';
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
// import { ImagePicker, Constants } from 'expo';

export default class ImageReader extends Component {
   state = {
      pickerResult: null,
   };

   _pickImg = async () => {
      let pickerResult = await ImagePicker.launchImageLibraryAsync({
         base64: true,
         allowsEditing: true,
         aspect: [4, 3],
      });

      this.setState({
         pickerResult,
      });
   };

   render() {
      let { pickerResult } = this.state;
      let imageUri = pickerResult ? `data:image/jpg;base64,${pickerResult.base64}` : null;
      imageUri && console.log({uri: imageUri.slice(0, 100)});
      imageUri && console.log(imageUri);

      return (
         <View style={styles.container}>
            <Button onPress={this._pickImg} title="Open Picker" />
            {pickerResult
               ? <Image
                  source={{uri: imageUri}}
                  style={{ width: 200, height: 200 }}
               />
               : null}
            {pickerResult
               ? <Text style={styles.paragraph}>
                  Keys on pickerResult:
                  {' '}
                  {JSON.stringify(Object.keys(pickerResult))}
               </Text>
               : null}
         </View>
      );
   }
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: Constants.statusBarHeight,
      backgroundColor: '#ecf0f1',
   },
   paragraph: {
      margin: 24,
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
      color: '#34495e',
   },
});

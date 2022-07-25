import React, {useCallback, useEffect, useState, useMemo, useRef} from 'react';
import {Text, View, ScrollView, TouchableOpacity, TextInput, StyleSheet, Alert} from "react-native";
import {useForm, Controller} from 'react-hook-form';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import Button from '../../../components/Button';
import styles from './style';
// import {SMTPClient} from "emailjs";
// import emailjs from 'emailjs-com';


const FeedbackScreen = ({route}) => {
   const navigation = useNavigation();

   const {handleSubmit, control, formState: {errors}} = useForm({
      values: ''
   });

   {/*  const form = useRef();   */
   }


   const sendEmail = (e) => {
      e.preventDefault();

//       const client = new SMTPClient({
//          user: 'puvistien@gmail.com',
//          password: 'Styne1995@@@S',
//          host: 'smtp.gmail.com',
//          ssl: true,
//       });
//
// // send the message and get a callback with an error or details of the message that was sent
//       client.send(
//          {
//             text: 'i hope this works',
//             from: 'you <puvistien@gmail.com>',
//             to: 'someone <as.nicola.styne@gmail.com>',
//             cc: '',
//             subject: 'testing emailjs',
//          },
//          (err, message) => {
//             console.log(err || message);
//          }
//       );

      // emailjs.sendForm('gmail', 'template_8bhzkma', form.current, 'AdW8nR8J7QDeXzExa')
      //    .then((result) => {
      //       console.log(result.text);
      //       Alert.alert('Success', 'Your feedback was sent successfully');
      //    }, (error) => {
      //       console.log(error.text);
      //       Alert.alert('Oops', 'Your feedback could not be sent');
      //    });
   };


   return (
      <ScrollView style={styles.formContainer}>
         <KeyboardAwareScrollView
            contentContainerStyle={styles.container}
         >

            <Controller
               name="firstname"
               control={control}
               rules={{
                  required: true,
               }}
               render={({field: {onChange, onBlur, value}}) => (
                  <View style={styles.inputContainer}>
                     <Text style={styles.label}>First Name</Text>
                     <TextInput
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        style={[styles.input, {borderColor: errors?.test ? '#fc6d47' : '#c0cbd3'}]}
                     />
                     <Text style={styles.textError}>{errors?.test && "first name is required."}</Text>
                  </View>
               )}
            />

            <Controller
               name="lastname"
               control={control}
               rules={{
                  required: true,
               }}
               render={({field: {onChange, onBlur, value}}) => (
                  <View style={styles.inputContainer}>
                     <Text style={styles.label}>Last Name</Text>
                     <TextInput
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        style={[styles.input, {borderColor: errors?.test ? '#fc6d47' : '#c0cbd3'}]}
                     />
                     <Text style={styles.textError}>{errors?.test && "last name is required."}</Text>
                  </View>
               )}
            />

            <Controller
               name="feedback"
               control={control}
               rules={{
                  required: true,
               }}
               render={({field: {onChange, onBlur, value}}) => (
                  <View style={styles.inputContainer}>
                     <Text style={styles.label}>Feedback</Text>
                     <TextInput
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        style={[styles.feedback, {borderColor: errors?.test ? '#fc6d47' : '#c0cbd3'}]}
                     />
                     <Text style={styles.textError}>{errors?.test && "description is required."}</Text>
                  </View>
               )}
            />

            <Controller
               name="suggestion"
               control={control}
               rules={{
                  required: true,
               }}
               render={({field: {onChange, onBlur, value}}) => (
                  <View style={styles.inputContainer}>
                     <Text style={styles.label}>Any other suggestion ?</Text>
                     <TextInput
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        style={[styles.input, {borderColor: errors?.test ? '#fc6d47' : '#c0cbd3'}]}
                     />
                     <Text style={styles.textError}>{errors?.test && "last name is required."}</Text>
                  </View>
               )}
            />

            <Button title="Send Feedback"
                    onPress={handleSubmit(sendEmail)}
                    style={styles.button}
            />
         </KeyboardAwareScrollView>
      </ScrollView>
   );
}

export default FeedbackScreen;

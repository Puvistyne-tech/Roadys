import React, {useState} from 'react';
import * as ImagePicker from "expo-image-picker";
import {showMessage} from "react-native-flash-message";
import {useMutation} from "@apollo/client";
import {UPDATE_USER_IMAGE} from "../../screens/EditProfileScreen.js/queries";
import {Button} from 'react-native-elements';
import LoadingModal from "../LoadingModal";

const ImageReader = ({id}) => {

   const [updateImage, {l}] = useMutation(UPDATE_USER_IMAGE)
   const [loading, setLoading] = useState(false);

   const _pickImg = async () => {
      let res = await ImagePicker.launchImageLibraryAsync({
         base64: true,
         allowsEditing: true,
         aspect: [4, 3],
         exif: true,
         quality: 0
      });

      if (res&&res.cancelled===false) {
         let imageUri = `data:image/jpg;base64,${res.base64}`;
         if (imageUri) {
            setLoading(true)
            await sendImage(imageUri)
            setLoading(false)
         }
      }
   };

   const sendImage = async (picker) => {

      const variables = {
         id: id,
         photo: picker
      }

      try {
         await updateImage({variables})
         showMessage({
            message: "Success",
            description: "your image was updated",
            type: "success",
            duration: 10000
         })
      } catch (err) {
         showMessage({
            message: "Error",
            description: err.message,
            type: "warning",
            duration: 10000
         });
      }
   }

   return (
      <>
         {
            loading ?
               <LoadingModal loading={loading}/>
               :
               <Button title="Change Image" onPress={_pickImg}/>
         }
      </>
   );

}


export default ImageReader;

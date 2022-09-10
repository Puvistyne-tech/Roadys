import React, {useState} from 'react';
import * as ImagePicker from "expo-image-picker";
import {showMessage} from "react-native-flash-message";
import {useMutation} from "@apollo/client";
import {UPDATE_USER_IMAGE} from "../../screens/EditProfileScreen.js/queries";
import LoadingModal from "../LoadingModal";
import AppStyles from '../../../assets/styles/main.scss';
import Button from "../../components/Button";

/**
 * It's a button that when pressed, opens the image picker, and when an image is selected, it sends the image to the server
 * @returns A button that when pressed will open the image picker and allow the user to select an image.
 */
const ImageReader = ({id}) => {

    const [updateImage, {l}] = useMutation(UPDATE_USER_IMAGE)
    const [loading, setLoading] = useState(false);

    /**
     * _pickImg() is an async function that launches the image picker, and if the user selects an image, it converts the
     * image to base64 and sends it to the server
     */
    const _pickImg = async () => {
        let res = await ImagePicker.launchImageLibraryAsync({
            base64: true,
            allowsEditing: true,
            aspect: [4, 3],
            exif: true,
            quality: 0
        });

        if (res && res.cancelled === false) {
            let imageUri = `data:image/jpg;base64,${res.base64}`;
            if (imageUri) {
                setLoading(true)
                await sendImage(imageUri)
                setLoading(false)
            }
        }
    };

    /**
     * It takes a picker object as an argument, and then it uses the updateImage mutation to update the user's image
     * @param picker - the image that was selected
     */
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
                    <Button
                        title="Change Image"
                        style={{
                            ...AppStyles.button,
                            flex: 1,
                        }}
                        onPress={_pickImg}
                    />
            }
        </>
    );

}


export default ImageReader;

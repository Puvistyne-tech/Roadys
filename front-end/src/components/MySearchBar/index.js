import React from 'react';
import {Text, TextInput, View} from 'react-native';
import {FontAwesome} from "@expo/vector-icons";

/**
 * It returns a View that contains a TextInput and two FontAwesome icons
 * @param props - This is the props object that is passed to the component.(text input for search )
 * @returns A view with a text input and two icons.
 */
const MySearchBar = (props) => {


    return (
        <View
            style={{
                position: 'absolute',
                top: 10,
                width: '100%',

            }}
        >

            <View
                style={{
                    borderRadius: 10,
                    margin: 10,
                    color: '#000',
                    borderColor: '#666',
                    backgroundColor: '#FFF',
                    borderWidth: 1,
                    // height: 45,
                    paddingHorizontal: 10,
                    padding: 8,
                    fontSize: 18,
                    display: "flex",
                    justifyContent: "space-between",
                    flexDirection: "row",
                    alignContent: "center"
                }}
                // placeholder={'Search'}
                // placeholderTextColor={'#666'}
            >
                <FontAwesome name="search" size={32} color="grey"/>
                <TextInput
                    style={{
                        flexGrow: 1
                    }}
                    onChangeText={props.onChangeText}
                    placeholder={'Search here'}
                    value={"searchInput"}
                >
                </TextInput>
                {/*{searchInput !== '' &&*/}
                <FontAwesome name="close" size={16} color="red"
                             onPress={() => {
                                 // setSearchInput('')
                                 // setIsPressed(false)
                             }}
                             style={{
                                 alignSelf: "center",
                                 marginRight: 10
                             }}
                />
                {/*}*/}
                <FontAwesome name="filter" size={32} color="grey"
                             onPress={() => {
                                 console.log("iefi")
                             }}
                />
            </View>
        </View>
    );
}

export default MySearchBar;

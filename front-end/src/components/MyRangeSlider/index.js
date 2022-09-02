import React, {useState} from 'react';

import {StyleSheet, View, Text, Image, Slider, TouchableOpacity} from 'react-native';
import MultiSlider from "@ptomasroos/react-native-multi-slider";


const MyRangeSlider = (props) => {

    // const [multiSliderValue, setMultiSliderValue] = useState([3, 7]);
    // console.log(props);
    const {
        ageRange,
        setAgeRange,
    } = props;


    // const multiSliderValuesChange = values => setMultiSliderValue(values);

    const handleOnChange = values => {
        setAgeRange(values);
    }

    const [showLabel, setShowLabel] = useState(false);

    return (
        <View style={styles.container}>
            <View style={styles.sliderOne}>
                <Text style={styles.text}>Minimum Age : {ageRange[0]} </Text>
                <Text style={styles.text}>Maximum Age : {ageRange[1]}</Text>
            </View>
            <MultiSlider
                values={[ageRange[0], ageRange[1]]}
                sliderLength={380}
                onValuesChange={handleOnChange}
                onValuesChangeStart={() => setShowLabel(true)}
                onValuesChangeFinish={() => setShowLabel(false)}
                min={1}
                max={99}
                step={1}
                allowOverlap={true}
                enableLabel={showLabel}
                showStepMarkers={true}
                snapped
                showStepLabels={true}
                smoothSnapped={true}
            />
        </View>
    );
}


const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'stretch',
        },
        sliders: {
            margin: 20,
            width: 100,
        }
        ,
        text: {
            alignSelf: 'center',
            paddingVertical: 20,
        },
        title: {
            fontSize: 30,
        },
        sliderOne: {
            flexDirection: 'row',
            justifyContent: 'space-around',
        },
        image: {
            height: 40,
            width: 40,
        },
    });

export default MyRangeSlider;

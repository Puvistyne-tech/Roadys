import React, {useState} from 'react';

import {StyleSheet, View, Text, Image, Slider, TouchableOpacity} from 'react-native';
import MultiSlider from "@ptomasroos/react-native-multi-slider";


/**
 * It's a function that returns a view that contains a text and a slider
 * @param props -  props of the component (title, min, max, step, value, onChange)
 * @returns A component that renders a slider with a range of values. Ex: age range
 */
const MyRangeSlider = (props) => {

    const {
        ageRange,
        setAgeRange,
    } = props;


    /**
     * It sets the age range to the values that are passed in.
     */
    const handleOnChange = values => {
        setAgeRange(values);
    }

    /* It's a state variable that is used to show the label of the slider. */
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

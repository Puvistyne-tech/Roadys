import React, {useState} from 'react';
import {Slider} from '@miblanchard/react-native-slider';
import {AppRegistry, StyleSheet, View, Text} from 'react-native';
import {componentThumbStyles, customStyles, trackMarkStyles} from "@miblanchard/react-native-slider/lib/stories/styles";

const MyRangeSlider = (props) => {

    const [value, setValue] = useState([
        props?.min,
        props?.max
    ]);
    const [min, setMin] = useState(18);
    const [max, setMax] = useState(80);

    return (
        <View style={styles.container}>
            <SliderContainer
                caption="<Slider/> 2 thumbs, min, max, and custom tint"
                value={value}>
                setValue={setValue}
                <Slider
                    animateTransitions
                    maximumTrackTintColor="#d3d3d3"
                    maximumValue={99}
                    minimumTrackTintColor="#2875FF"
                    minimumValue={1}
                    step={1}
                    thumbTintColor="#2875FF"
                />
            </SliderContainer>
            <Text>Value: {min} -- {max}</Text>
            <Text>Value: {value.min} -- {value.max}</Text>
        </View>
    );

}


const CustomThumb = () => (
    <View style={componentThumbStyles.container}>
        <Text>Any</Text>
    </View>
);

const SliderContainer = (props: {
    caption: string;
    children: React.ReactElement;
    value?: number | Array<number>;
    trackMarks?: Array<number>;
    setValue?: (value: number | Array<number>) => void;
}) => {
    const {caption, value, trackMarks,setValue} = props;
    // const [value, setValue] = useState(
    //     sliderValue ? sliderValue : 0.2,
    // );
    let renderTrackMarkComponent;

    if (trackMarks?.length && (!Array.isArray(value) || value?.length === 1)) {
        renderTrackMarkComponent = (index: number) => {
            const currentMarkValue = trackMarks[index];

            const style =
                currentMarkValue >
                Math.max(Array.isArray(value) ? value[0] : value)
                    ? trackMarkStyles.activeMark
                    : trackMarkStyles.inactiveMark;
            return <View style={style}/>;
        };
    }

    const renderChildren = () => {
        return React.Children.map(
            props.children,
            (child) => {
                if (!!child && child.type === Slider) {
                    return React.cloneElement(child, {
                        onValueChange: setValue,
                        renderTrackMarkComponent,
                        trackMarks,
                        value,
                    });
                }

                return child;
            },
        );
    };

    return (
        <View style={styles.sliderContainer}>
            <View style={styles.titleContainer}>
                <Text>{caption}</Text>
                {/*<Text>{Array.isArray(value) ? value.join(' - ') : value}</Text>*/}
            </View>
            {renderChildren()}
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginLeft: 10,
        marginRight: 10,
        alignItems: 'stretch',
        justifyContent: 'center',
    },
    thumb: {
        width: 30,
        height: 30,
        borderRadius: 30 / 2,
        backgroundColor: '#1a9274',
        borderColor: '#1a9274',
        borderWidth: 2,
    },

});

export default MyRangeSlider;

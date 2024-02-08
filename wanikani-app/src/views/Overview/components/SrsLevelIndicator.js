import {useEffect, useState} from "react";
import { StyleSheet, Text, View } from 'react-native';
import {LinearGradient} from "expo-linear-gradient";
import styles from "../../../styles/styles"

export default function SrsLevelIndicator(props : {srs_stage : number}) {
    return (
        <View style={styles.srsIndicatorContainer}>
            <View style={[styles.indicatorCell, styles.startCell, props.srs_stage > 0 ? styles.activeCell : styles.disabledCell]}></View>
            <View style={[styles.indicatorCell, props.srs_stage > 1 ? styles.activeCell : styles.disabledCell]}></View>
            <View style={[styles.indicatorCell, props.srs_stage > 2 ? styles.activeCell : styles.disabledCell]}></View>
            <View style={[styles.indicatorCell, props.srs_stage > 3 ? styles.activeCell : styles.disabledCell]}></View>
            <View style={[styles.indicatorCell, styles.endCell, props.srs_stage > 4 ? styles.activeCell : styles.disabledCell]}></View>
        </View>
    );
}

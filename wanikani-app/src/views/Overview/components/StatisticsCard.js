import {Pressable, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {LinearGradient} from "expo-linear-gradient";
import styles from "../../../styles/styles"

export default function StatisticsCard(props) {
    return (
        <TouchableOpacity  onPress={() => {props.onPress()}}>
        <LinearGradient colors={[props.colorOne, props.colorTwo]} style={styles.statisticsCard}>
                <Text style={styles.statisticsCardNumberHeader}>{props.number}</Text>
                <Text style={styles.statisticsCardNumberLabel}>{props.label}</Text>
        </LinearGradient>
        </TouchableOpacity >


    );
}

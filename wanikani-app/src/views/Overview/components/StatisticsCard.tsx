import {Text, TouchableOpacity} from 'react-native';
import {LinearGradient} from "expo-linear-gradient";
import styles from "../../../styles/styles"

export default function StatisticsCard(props : {onPress : () => void, colorOne : string, colorTwo : string, number : number, label : string}) {
    return (
        <TouchableOpacity  onPress={() => {props.onPress()}}>
        <LinearGradient colors={[props.colorOne, props.colorTwo]} style={styles.statisticsCard}>
                <Text style={styles.statisticsCardNumberHeader}>{props.number}</Text>
                <Text style={styles.statisticsCardNumberLabel}>{props.label}</Text>
        </LinearGradient>
        </TouchableOpacity >


    );
}

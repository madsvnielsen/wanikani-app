import {View} from "react-native";
import StatisticsCard from "./StatisticsCard"
import styles from "../../../styles/styles"
export default function StatisticsView(props) {
  return (
    <View style={styles.statisticsContainer}>
      <StatisticsCard colorOne={"#DF37A7"} colorTwo={"#B42E87"} number={props.lessonCount} label={"Lessons"} onPress={() => {navigation.navigate("Lessons")}}/>
      <StatisticsCard colorOne={"#00AAFF"} colorTwo={"#0676AD"} number={props.reviewCount} label={"Reviews"} onPress={() => {navigation.navigate("Reviews")}}/>
    </View>
  )

}

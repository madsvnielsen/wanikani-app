import {Text, View, StyleSheet} from 'react-native';
import {LinearGradient} from "expo-linear-gradient";
import {ReviewItem} from "../../../models/ReviewItemModel"
import {SubjectType} from "../../../models/subjects/types/SubjectTypes"




export default function ReviewItemDetails(props : {reviewItem : ReviewItem}) {
  const type : SubjectType = props.reviewItem.subjectAssignment.assignment.subject_type;
    return(
        <View style={styles.detailsContainer}>
          <View style={styles.tabContainer}>
          <Text>Meanings</Text>
          {props.reviewItem.subjectAssignment.subject.meanings.map((meaning : Meaning) => {
            return <Text>{meaning.meaning}</Text>
          })}
          </View>
          <View style={styles.tabContainer}>
          {/*
          <Text>Readings</Text>
          {props.reviewItem.subjectAssignment.subject.readings.map((reading : Reading) => {
            return <Text>{reading.reading}</Text>
          })}
          */}
          </View>
        </View>
    )
}

const styles = StyleSheet.create({
  detailsContainer:{
    backgroundColor: "#d9d9d9",
    height: "100%",
    padding: 20
  },
  tabContainer:{
    backgroundColor: "#e8e8e8",
    padding: 10,
    borderRadius: 3
  }
})

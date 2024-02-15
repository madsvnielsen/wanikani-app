
import { ReviewItem } from "../../../../models/ReviewItemModel"
import { Text, View, StyleSheet, useWindowDimensions } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import { SubjectType } from "../../../../models/subjects/types/SubjectTypes"
import Collapsible from 'react-native-collapsible';
import { useState, useEffect } from 'react'
import RenderHtml from 'react-native-render-html';
import wanikaniMarkupToHtml from "../WanikaniMarkupHelper"
import Ionicons from '@expo/vector-icons/Ionicons';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';



export default function ReadingSection(props: { reviewItem: ReviewItem}) {

  const subject = props.reviewItem.subjectAssignment.subject as KanjiSubject;

  const primaryReadings = subject.readings.filter((reading : Reading) => reading.primary)
  const alternativeReadings = subject.readings.filter((reading : Reading) => !reading.primary)



  return <>
    {primaryReadings.length > 0 ? <Text style={styles.subLabel} >Primary</Text> : <></> }
    {primaryReadings.map((reading: Reading, index : number) => {
      return <View key={index}>
      <Text style={styles.meaningStyle}>{reading.reading}</Text>
      <Text style={styles.meaningStyle}>{reading.type}</Text>
      </View>
    })}
    {alternativeReadings.length > 0 ? <Text style={styles.subLabel} >Alternative</Text> : <></> }

    {alternativeReadings.map((reading: Reading, index : number) => {
      return <View key={index}>
      <Text style={styles.meaningStyle}>{reading.reading}</Text>
      <Text style={styles.meaningStyle}>{reading.type}</Text>
      </View>
    })}
    <Text style={styles.bigSubLabel} >Mnemonic</Text>
    <RenderHtml
         source={{
            html:wanikaniMarkupToHtml(subject.reading_mnemonic)}}
            contentWidth={useWindowDimensions().width}
       />
  
</>

  ;

}




const styles = StyleSheet.create({
  detailsContainer: {
    backgroundColor: "#d9d9d9",
    height: "100%",
    padding: 20
  },
  tabContainer: {
    backgroundColor: "#e8e8e8",
    padding: 10,
    borderRadius: 3
  },
  sectionHeader: {
    textAlignVertical: "center",
    fontWeight: "300",
    fontSize: 20
  },
  sectionSeperatorLine: {
    width: "100%",
    height: 1,
    backgroundColor: "#9c9c9c",
    marginTop: 5,
    marginBottom: 5
  },
  subLabel : {
    fontWeight: "300",
    fontSize: 15,
    paddingTop: 5
  },
  bigSubLabel : {
    fontWeight: "300",
    fontSize: 16,
    paddingTop: 15
  },
  collapsibleStyle : {
    padding: 5,
    marginBottom: 10

  },
  meaningStyle: {
    paddingRight: 5,
    fontWeight: "300",
  }
})

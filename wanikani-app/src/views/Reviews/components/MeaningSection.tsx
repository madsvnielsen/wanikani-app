
import { ReviewItem } from "../../../models/ReviewItemModel"
import { Text, View, StyleSheet, useWindowDimensions } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import { SubjectType } from "../../../models/subjects/types/SubjectTypes"
import Collapsible from 'react-native-collapsible';
import { useState, useEffect } from 'react'
import RenderHtml from 'react-native-render-html';
import wanikaniMarkupToHtml from "./WanikaniMarkupHelper"



export default function MeaningSection(props: { reviewItem: ReviewItem, onToggle : () => void, tabCollapsed : boolean}) {

  const primaryMeanings = props.reviewItem.subjectAssignment.subject.meanings.filter((meaning : Meaning) => meaning.primary)
  const alternativeMeanings = props.reviewItem.subjectAssignment.subject.meanings.filter((meaning : Meaning) => !meaning.primary)





  return <><Text onPress={props.onToggle} style={styles.sectionHeader}>Meaning</Text>
  <View style={styles.sectionSeperatorLine}></View>
  <Collapsible collapsed={props.tabCollapsed} style={styles.collapsibleStyle}>
    {primaryMeanings.length > 0 ? <Text style={styles.subLabel} >Primary</Text> : <></> }
    {primaryMeanings.map((meaning: Meaning, index : number) => {
      return <Text style={styles.meaningStyle} key={index}>{meaning.meaning}</Text>
    })}
    {alternativeMeanings.length > 0 ? <Text style={styles.subLabel} >Alternative</Text> : <></> }

    {alternativeMeanings.map((meaning: Meaning, index : number) => {
      return <Text style={styles.meaningStyle} key={index}>{meaning.meaning}</Text>
    })}
    <Text style={styles.bigSubLabel} >Explanation</Text>
    <RenderHtml
         source={{
            html:wanikaniMarkupToHtml(props.reviewItem.subjectAssignment.subject.meaning_mnemonic)}}
            contentWidth={useWindowDimensions().width}
       />
  </Collapsible>

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


import { ReviewItem } from "../../../models/ReviewItemModel"
import { Text, View, StyleSheet, useWindowDimensions } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import { SubjectType } from "../../../models/subjects/types/SubjectTypes"
import Collapsible from 'react-native-collapsible';
import { useState, useEffect } from 'react'
import RenderHtml from 'react-native-render-html';
import wanikaniMarkupToHtml from "./WanikaniMarkupHelper"
import Ionicons from '@expo/vector-icons/Ionicons';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';



export default function DetailsSection(props: { reviewItem: ReviewItem,
  onToggle : () => void,
  tabCollapsed : boolean, 
  locked : boolean,
  title : String,
  children : React.ReactNode}) {
  return <><Text onPress={props.onToggle} style={styles.sectionHeader}>
  {props.locked ? <Entypo name="lock" size={15} color="black" /> :
  props.tabCollapsed ? <MaterialIcons name="keyboard-arrow-right" size={15} color="black" /> :
  <MaterialIcons name="keyboard-arrow-down" size={15} color="black" />

}
  {props.title}
  </Text>
  <View style={styles.sectionSeperatorLine}></View>
  <Collapsible collapsed={props.tabCollapsed} style={styles.collapsibleStyle}>
    {props.children}
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

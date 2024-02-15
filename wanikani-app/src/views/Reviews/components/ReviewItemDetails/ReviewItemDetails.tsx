import { Text, ScrollView, View, StyleSheet } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import { ReviewItem } from "../../../../models/ReviewItemModel"
import { SubjectType } from "../../../../models/subjects/types/SubjectTypes"
import Collapsible from 'react-native-collapsible';
import { useState, useEffect } from 'react'
import MeaningSection from "./MeaningSection"
import ReadingSection from "./ReadingSection"
import ContextSection from "./ContextSection"
import DetailsSection from "./DetailsSection"



export default function ReviewItemDetails(props: { reviewItem: ReviewItem, recentMistake: boolean }) {
  const type: SubjectType = props.reviewItem.subjectAssignment.assignment.subject_type;

  const [meaningTabCollapsed, setMeaningTabCollapsed] = useState(true);
  const [readingTabCollapsed, setReadingTabCollapsed] = useState(true);
  const [contextTabCollapsed, setContextTabCollapsed] = useState(true);

  const canOpen = props.reviewItem.incorrect_meaning_answers.length > 0 || props.reviewItem.incorrect_reading_answers.length > 0






  return (
    <ScrollView style={styles.detailsContainer}>

      <View style={styles.tabContainer}>
        <DetailsSection
          reviewItem={props.reviewItem}
          locked={!canOpen}
          tabCollapsed={props.recentMistake ? false : meaningTabCollapsed || !canOpen}
          onToggle={() => {
            if (canOpen) {
              setMeaningTabCollapsed(!meaningTabCollapsed)
            }
          }}
          title={"Meaning"}
        >
          <MeaningSection reviewItem={props.reviewItem} />
        </DetailsSection>

        {type == SubjectType.kanji || type == SubjectType.vocabulary ?
          <DetailsSection
            reviewItem={props.reviewItem}
            locked={!canOpen}
            tabCollapsed={props.recentMistake ? false : readingTabCollapsed || !canOpen}
            onToggle={() => {
              if (canOpen) {
                setReadingTabCollapsed(!readingTabCollapsed)
              }
            }}
            title={"Readings"}
          >
            <ReadingSection reviewItem={props.reviewItem} />
          </DetailsSection> : <></>}
        {type == SubjectType.vocabulary || type == SubjectType.kana_vocabulary ?
          <DetailsSection
            reviewItem={props.reviewItem}
            locked={!canOpen}
            tabCollapsed={props.recentMistake ? false : contextTabCollapsed || !canOpen}
            onToggle={() => {
              if (canOpen) {
                setContextTabCollapsed(!contextTabCollapsed)
              }
            }}
            title={"Context"}
          >
            <ContextSection reviewItem={props.reviewItem} />
          </DetailsSection> : <></>}

      </View>

    </ScrollView>
  )
}

const styles = StyleSheet.create({
  detailsContainer: {
    backgroundColor: "#d9d9d9",
    padding: 20,
  },
  tabContainer: {
    backgroundColor: "#e8e8e8",
    padding: 10,
    borderRadius: 5,
    marginBottom: 15
  },
  sectionHeader: {
    textAlignVertical: "center",
    fontWeight: "300",
    fontSize: 20
  },
  sectionSeperatorLine: {
    width: "100%",
    height: 1,
    backgroundColor: "#9c9c9c"
  },
  subLabel: {
    fontWeight: "300",
    fontSize: 18,
    paddingTop: 5
  },
  collapsibleStyle: {
    padding: 5,
    marginBottom: 10
  },
  meaningStyle: {
    paddingRight: 5,
    fontWeight: "300",
  }
})

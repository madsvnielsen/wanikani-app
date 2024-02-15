import { Text, ScrollView, View, StyleSheet } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import { ReviewItem } from "../../../models/ReviewItemModel"
import { SubjectType } from "../../../models/subjects/types/SubjectTypes"
import Collapsible from 'react-native-collapsible';
import { useState, useEffect } from 'react'
import MeaningSection from "./MeaningSection"
import ReadingSection from "./ReadingSection"
import ContextSection from "./ContextSection"
import DetailsSection from "./DetailsSection"



export default function ReviewItemDetails(props: { reviewItems: Array<ReviewItem> }) {
    const count = props.reviewItems.length
    const mistakes = props.reviewItems.filter((reviewItem: ReviewItem) => reviewItem.incorrect_meaning_answers.length > 0
        || reviewItem.incorrect_reading_answers.length > 0)

    const corrects = props.reviewItems.filter((reviewItem: ReviewItem) => reviewItem.incorrect_meaning_answers.length == 0
        && reviewItem.incorrect_reading_answers.length == 0)


    return (
        <ScrollView style={styles.detailsContainer}>
            <Text style={styles.header}>Session completed</Text>
            <Text style={styles.headerBadge}>よくやった！</Text>
            <Text style={styles.subHeader}>Items reviewed</Text>
            <View style={styles.flexBox}>
                <View style={[styles.subHeaderBadge]}>
                    <Text style={styles.badgeHeader}>{count}</Text>
                    <Text style={styles.badgeLabel}>Subjects</Text>
                </View>
                <View style={[styles.subHeaderBadge]}>
                    <Text style={styles.badgeHeader}>{(Math.round((corrects.length / count) * 100)) + "%"}</Text>
                    <Text style={styles.badgeLabel}>Accuracy</Text>
                </View>
            </View>
            <View style={styles.flexBox}>
                <View style={[styles.subHeaderBadge, { backgroundColor: "#ab1f4e" }]}>
                    <Text style={styles.badgeHeader}>{mistakes.length}</Text>
                    <Text style={styles.badgeLabel}>Mistakes</Text>
                </View>
                <View style={[styles.subHeaderBadge, { backgroundColor: "#1fab91" }]}>
                    <Text style={styles.badgeHeader}>{corrects.length}</Text>
                    <Text style={styles.badgeLabel}>Correct</Text>
                </View>
            </View>

            <Text style={styles.subHeader}>Mistakes</Text>
            <View >
            {mistakes.map((mistake : ReviewItem, index : number) => {
                return <View key={index} style={{display: "flex", flexDirection: "column"}}>
                <Text style={{color:"white", fontSize:40, flex: 1, textAlign: "center", marginBottom:10}}>{mistake.subjectAssignment.subject.characters}</Text>
                <View style={{flex: 1, display: "flex", flexDirection: "row", alignContent:"center", marginBottom: 15}}>
                <View style={{flex: 1}}>
                <Text style={{color:"white", textAlign: "center", fontSize:15, fontWeight: "200"}}>Meaning</Text>
                {mistake.incorrect_meaning_answers.map((answer : string, index : number) => {
                    return <Text key={index} style={{color: "white", textAlign: "center"}}>{answer}</Text>
                })}
                </View>
                <View style={{flex: 1}}>
                <Text style={{color:"white", textAlign: "center", fontSize:15, fontWeight: "200"}}>Reading</Text>
                {mistake.incorrect_reading_answers.map((answer : string, index : number) => {
                    return <Text key={index} style={{color: "white", textAlign: "center"}}>{answer}</Text>
                })}
                </View>
                </View>
                <View style={styles.sectionSeperatorLine}></View>
                </View>
            })}
            </View>


        </ScrollView>
    )
}

const styles = StyleSheet.create({
    detailsContainer: {
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
        backgroundColor: "#9c9c9c",
        marginBottom: 10
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
    },
    headerBadge: {
        marginLeft: "auto",
        marginRight: "auto",
        fontWeight: "300",
        fontSize: 30,
        color: "white",
        backgroundColor: "#DF37A7",
        padding: 15,
        borderRadius: 30,
        borderColor: "white",
        borderWidth: 3,
        marginBottom: 10

    },
    header: {
        marginLeft: "auto",
        marginRight: "auto",
        fontWeight: "300",
        fontSize: 30,
        color: "white",
        marginBottom: 10
    },
    subHeader: {
        marginLeft: "auto",
        marginRight: "auto",
        fontWeight: "100",
        fontSize: 25,
        color: "white",
        marginBottom: 10
    },

    subHeaderBadge: {
        fontWeight: "500",
        fontSize: 25,
        color: "white",

        padding: 15,
        borderRadius: 15,
        borderColor: "white",
        marginBottom: 10,
        marginHorizontal: 10,
        textAlign: "center",
        minWidth: 100,
        flex: 1

    },
    badgeHeader: {
        marginLeft: "auto",
        marginRight: "auto",
        fontWeight: "500",
        fontSize: 20,
        color: "white",
    },

    badgeLabel: {
        marginLeft: "auto",
        marginRight: "auto",
        fontWeight: "100",
        fontSize: 15,
        color: "white",
    },
    flexBox: {
        display: "flex", flexDirection: "row", alignContent: "center"
    }


})

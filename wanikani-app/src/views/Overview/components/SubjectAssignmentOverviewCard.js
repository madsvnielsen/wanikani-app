import {useEffect, useState} from "react";
import { StyleSheet, Text, View } from 'react-native';
import {LinearGradient} from "expo-linear-gradient";
import SrsLevelIndicator from "./SrsLevelIndicator";
import styles from "../../../styles/styles"
import {SubjectType} from "../../../models/subjects/types/SubjectTypes"

export default function SubjectAssignmentOverviewCard(props : {key : number, srs_stage : number, characters : string | null, subject_type : SubjectType}) {
    return (
        <LinearGradient style={styles.subjectCard} colors={getGradientFromType(props.subject_type, props.srs_stage)}>
            <Text style={styles.subjectText}>{props.characters}</Text>
            <SrsLevelIndicator srs_stage={props.srs_stage}/>
        </LinearGradient>

    );
}

const getGradientFromType = (type : SubjectType, srs_stage : number) =>{
    if(srs_stage=== null){
        return["#b6b6b6","#606060"]
    }
    if(type=== SubjectType.radical){
        return["#00AAFF","#0676AD"]
    }
    return["#DF37A7", "#B42E87"]

}

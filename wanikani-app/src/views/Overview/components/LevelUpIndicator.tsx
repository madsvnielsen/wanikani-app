import {Text, DimensionValue} from "react-native";
import styles from "../../../styles/styles"
import {LinearGradient} from "expo-linear-gradient";
import {SubjectType} from "../../../models/subjects/types/SubjectTypes"


export default function LevelUpIndicator(props : {currentSubjectAssignments : Array<SubjectAssignmentPair>}) {
    const requiredKanji = props.currentSubjectAssignments.filter((subjectAssignment : SubjectAssignmentPair) => subjectAssignment.assignment.subject_type === SubjectType.kanji)
    const kanjiPassed = requiredKanji.filter((subject : SubjectAssignmentPair) => subject.assignment.passed_at !== null).length;
    const kanjiRequired = Math.round((requiredKanji.length*0.9))
    let percentage = Math.round((kanjiPassed/kanjiRequired)*100);
   if(percentage > 100){
       percentage = 100;
   }
    return (
        <LinearGradient colors={["#9d9d9d","#c5c5c5"]} style={styles.indicatorContainer}>
            <LinearGradient colors={["#f100a1","#86005a"]} style={[styles.indicatorBar, {width: (percentage.toString() + "%") as DimensionValue}]}>
            </LinearGradient>
            <Text style={styles.indicatorText}>  {kanjiPassed} of {kanjiRequired} kanji passed</Text>
        </LinearGradient>

    );
}

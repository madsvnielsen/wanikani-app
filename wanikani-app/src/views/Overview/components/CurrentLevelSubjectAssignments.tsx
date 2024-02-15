import {Text, View} from "react-native";
import styles from "../../../styles/styles"
import SubjectAssignmentOverviewCard from "./SubjectAssignmentOverviewCard"
import {SubjectAssignmentPair} from "../../../models/SubjectAssignmentPairModel"

export default function CurrentLevelSubjectAssignments(props : {currentSubjectAssignments : Array<SubjectAssignmentPair>}) {
  return (
        <View style={styles.subjectContainer}>
            {props.currentSubjectAssignments.map(
                (subjectAssignment : SubjectAssignmentPair) =>{
                    return (<SubjectAssignmentOverviewCard key={subjectAssignment.subject.id}
                                                 characters={subjectAssignment.subject.characters}
                                                 subject_type={subjectAssignment.assignment.subject_type}
                                                 srs_stage={subjectAssignment.assignment.srs_stage}
                    />)
                }
            )}


        </View>

    );
}

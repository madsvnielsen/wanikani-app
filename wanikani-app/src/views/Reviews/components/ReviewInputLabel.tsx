import {Text} from 'react-native';
import {LinearGradient} from "expo-linear-gradient";
import {ReviewItem} from "../../../models/ReviewItemModel"
import {SubjectType} from "../../../models/subjects/types/SubjectTypes"
import styles from "../../../styles/styles"



export default function ReviewInputLabel(props : {reviewItem : ReviewItem, askReading : boolean}) {
  const type : SubjectType = props.reviewItem.subjectAssignment.assignment.subject_type;
    return(
        <LinearGradient style={styles.inputLabelContainer} colors={props.askReading ? ['#484848', '#262626'] : ['#313131', 'black']}>
            <Text style={styles.inputLabelText}

            >{type === SubjectType.kanji ? "Kanji" : type === SubjectType.radical ? "Radical" : "Vocabulary"} <Text style={{fontWeight: "500"}}> {props.askReading ? "reading" : "meaning"}</Text></Text>
        </LinearGradient>
    )
}

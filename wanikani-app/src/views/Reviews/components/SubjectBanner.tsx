import {StyleSheet, Text} from 'react-native';
import {LinearGradient} from "expo-linear-gradient";
import {SubjectType} from "../../../models/subjects/types/SubjectTypes"
import {ReviewItem} from "../../../models/ReviewItemModel"

export default function SubjectBanner(props : {reviewItem : ReviewItem, reviewQueue : Array<ReviewItem>}) {

    const solvedReviews = props.reviewQueue.filter(review => review.meaningComplete && review.readingComplete).length
    const totalReviews = props.reviewQueue.length

    return(
        <LinearGradient style={styles.bannerContainer} colors={getGradientFromType(props.reviewItem.subjectAssignment.assignment.subject_type)}>
            <Text style={{textAlign: "right", color: "white", padding: 2, fontWeight: "bold"}}>{solvedReviews + "/" + totalReviews}</Text>
            <Text style={styles.bannerText}
                  adjustsFontSizeToFit={true}
            >{props.reviewItem.subjectAssignment.subject.characters}</Text>
        </LinearGradient>
    )
}

const getGradientFromType = (type : SubjectType) =>{

    if(type=== SubjectType.radical){
        return["#00AAFF","#0676AD"]
    }
    if(type=== SubjectType.kanji){
        return["#DF37A7", "#90226c"]
    }
    return["#5a06ea", "#4316b7"]

}


const styles = StyleSheet.create({
    bannerContainer:{
        width: "100%",
        height: 150,
    },
    bannerText:{
        color: "white",
        textAlign: "center",
        textAlignVertical: "center",
        fontSize: 70,

    }
})

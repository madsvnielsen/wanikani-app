import {ReviewItem} from "../../../../models/ReviewItemModel";
import {StyleSheet, Text, View} from "react-native";
import {SubjectType} from "../../../../models/subjects/types/SubjectTypes";
import {LinearGradient} from "expo-linear-gradient";


export function MistakesSummary(props: { reviewItems: ReviewItem[] }) {
    return <View>
        <Text style={styles.subHeader}>Mistakes</Text>
        {props.reviewItems.map((mistake: ReviewItem, index: number) => <MistakeDetailsCard key={index}
                                                                                           mistake={mistake}/>)}
    </View>;
}

function MeaningReadingList(props: { mistake: ReviewItem, reading : boolean}) {

    const subject = props.mistake.subjectAssignment.subject;

    const currentType = props.mistake.subjectAssignment.assignment.subject_type;

    if(props.reading &&  (currentType != SubjectType.kanji ||  SubjectType.vocabulary)){

    }
    const meaningReading : Array<Meaning | Reading> = props.reading ? (subject as KanjiSubject).readings : subject.meanings;


    return <View style={{flex: 1}}>
        <Text style={{color: "white", fontSize: 18, textAlign: "center", fontWeight: "100"}}>
            {
                props.reading ?
                    "Readings" :
                    "Meanings"
            }
        </Text>
        {meaningReading.map((meaningOrReading: Meaning | Reading, index: number) =>
            <Text key={index}
                  style={{color: "white", textAlign: "center"}}
            >
                {
                    props.reading ?
                        (meaningOrReading as Reading).reading :
                        (meaningOrReading as Meaning).meaning
                }</Text>)}
    </View>;
}

function MistakeDetailsCard(props: { mistake: ReviewItem }) {
    return <View style={{display: "flex", flexDirection: "column"}}>
        <LinearGradient style={{flex: 1, minWidth:70, borderRadius: 4, marginLeft: "auto", marginRight: "auto", marginBottom: 10}}
                        colors={getGradientFromType(props.mistake.subjectAssignment.assignment.subject_type)}>
            <Text
                style={{color: "white", fontSize: 40,  textAlign: "center", marginBottom: 10}}>
                {props.mistake.subjectAssignment.subject.characters}</Text>
        </LinearGradient>
        <View
            style={{flex: 1, display: "flex", flexDirection: "row", alignContent: "center", marginBottom: 15}}>
            <MeaningReadingList mistake={props.mistake} reading={false}/>
            <MeaningReadingList mistake={props.mistake} reading={true}/>


        </View>
        <Text style={{color: "white", fontSize: 20, textAlign: "center", fontWeight: "100"}}>Errors</Text>
        <View
            style={{flex: 1, display: "flex", flexDirection: "row", alignContent: "center", marginBottom: 15}}>

            <MistakenAnswersList mistake={props.mistake} readings={false}/>
            <MistakenAnswersList mistake={props.mistake} readings={true}/>
        </View>
        <View style={styles.sectionSeperatorLine}></View>
    </View>;
}


function MistakenAnswersList(props: { mistake: ReviewItem, readings : boolean}) {
    const inputMistakes : Array<string> = props.readings ? props.mistake.incorrect_reading_answers : props.mistake.incorrect_meaning_answers
    if (inputMistakes.length == 0)  {
        return;
    }
    return <View style={{flex: 1}}>
        <Text
            style={{color: "white", textAlign: "center", fontSize: 15, fontWeight: "200"}}>{props.readings ? "Reading" :"Meaning"}</Text>
        {inputMistakes.map((answer: string, index: number) => {
            return <Text key={index}
                         style={{color: "white", textAlign: "center", fontSize: 15, fontStyle: "italic"}}>{answer}</Text>
        })}
    </View>;
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


const getGradientFromType = (type : SubjectType) =>{

    if(type=== SubjectType.radical){
        return["#00AAFF","#0676AD"]
    }
    if(type=== SubjectType.kanji){
        return["#DF37A7", "#90226c"]
    }
    return["#5a06ea", "#4316b7"]

}

import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {ReviewItem} from "../../../models/ReviewItemModel"
import {MistakesSummary} from "./components/MistakesSummary";


function SessionBanner() {
    return <>
        <Text style={styles.header}>Session completed</Text>
        <Text style={styles.headerBadge}>よくやった！</Text>
    </>;
}

function SessionStatistics(props: { count: number, correctReviewItems: ReviewItem[], mistakenReviewItems: ReviewItem[] }) {
    return <>
        <Text style={styles.subHeader}>Items reviewed</Text>
        <View style={styles.flexBox}>
            <View style={[styles.subHeaderBadge]}>
                <Text style={styles.badgeHeader}>{props.count}</Text>
                <Text style={styles.badgeLabel}>Subjects</Text>
            </View>
            <View style={[styles.subHeaderBadge]}>
                <Text
                    style={styles.badgeHeader}>{(Math.round((props.correctReviewItems.length / props.count) * 100)) + "%"}</Text>
                <Text style={styles.badgeLabel}>Accuracy</Text>
            </View>
        </View>
        <View style={styles.flexBox}>
            <View style={[styles.subHeaderBadge, {backgroundColor: "#ab1f4e"}]}>
                <Text style={styles.badgeHeader}>{props.mistakenReviewItems.length}</Text>
                <Text style={styles.badgeLabel}>Mistakes</Text>
            </View>
            <View style={[styles.subHeaderBadge, {backgroundColor: "#1fab91"}]}>
                <Text style={styles.badgeHeader}>{props.correctReviewItems.length}</Text>
                <Text style={styles.badgeLabel}>Correct</Text>
            </View>
        </View>
    </>;
}





export default function ReviewSessionSummary(props: { reviewItems: Array<ReviewItem> }) {
    const count = props.reviewItems.length
    const mistakes = props.reviewItems.filter((reviewItem: ReviewItem) => reviewItem.incorrect_meaning_answers.length > 0
        || reviewItem.incorrect_reading_answers.length > 0)

    const corrects = props.reviewItems.filter((reviewItem: ReviewItem) => reviewItem.incorrect_meaning_answers.length == 0
        && reviewItem.incorrect_reading_answers.length == 0)


    return (
        <ScrollView style={styles.detailsContainer}>
            <SessionBanner/>
            <SessionStatistics count={count} correctReviewItems={corrects} mistakenReviewItems={mistakes}/>
            <MistakesSummary reviewItems={mistakes} />


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
        borderRadius: 10,
        borderColor: "white",
        borderWidth: 3,
        marginBottom: 10,
        textAlign: "center"

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

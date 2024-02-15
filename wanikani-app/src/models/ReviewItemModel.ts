import { SubjectAssignmentPair } from "./SubjectAssignmentPairModel"

export interface ReviewItem {
    subjectAssignment: SubjectAssignmentPair,
    readingComplete: boolean,
    meaningComplete: boolean,
    incorrect_meaning_answers: Array<string>,
    incorrect_reading_answers: Array<string>
}

import {SubjectAssignmentPair} from "./SubjectAssignmentPairModel"

export interface ReviewItem{
  subjectAssignment : SubjectAssignmentPair,
  readingComplete : boolean,
  meaningComplete : boolean
}

import {useEffect, useState} from "react";
import SubjectBanner from "./components/SubjectBanner";
import ReviewInputLabel from "./components/ReviewInputLabel";

import {RootStackParamList} from "../../../App"
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import styles from "../../styles/styles"
import {LinearGradient} from "expo-linear-gradient"
import {WaniKaniApi} from "../../api/wanikani-api"
import {SubjectAssignmentPair} from "../../models/SubjectAssignmentPairModel"
import {ReviewItem} from "../../models/ReviewItemModel"
import {SubjectType} from "../../models/subjects/types/SubjectTypes"


/*
import ReviewInputLabel from "../components/ReviewInputLabel";
import ReviewInput from "../components/ReviewInput";
*/
export default function ReviewScreen({navigation} : NativeStackScreenProps<RootStackParamList,'Reviews'>) {

  const [queue, setQueue]  = useState([] as Array<ReviewItem>)

  const [currentItem, setCurrentItem] = useState(undefined as ReviewItem | undefined)

  const [askReadingMode, setAskReadingMode] = useState(true)
  /*
  askReadingMode : boolean
*/
    const initializeReviews = () =>  {
      WaniKaniApi.getCurrentReviews().then((pairs : Array<SubjectAssignmentPair>) => {
        let newQueue = queue

        pairs.forEach((pair : SubjectAssignmentPair) => {
          newQueue = [... newQueue,
            {
              subjectAssignment: pair,
              meaningComplete: false,
              readingComplete: pair.assignment.subject_type === SubjectType.radical ||
              pair.assignment.subject_type === SubjectType.kana_vocabulary} as ReviewItem ];
        })
        setQueue(newQueue)
        const randomIndex = Math.floor(Math.random() * newQueue.length);
        setCurrentItem(newQueue[randomIndex])
        if(Math.random() > 0.5 && !newQueue[randomIndex].readingComplete){
            setAskReadingMode(true)
        }else {
            setAskReadingMode(newQueue[randomIndex].meaningComplete)
        }



      })

    }

     const nextReviewItem = () => {
        const unfinishedReviews = queue.filter(review => !review.readingComplete || !review.meaningComplete);

        const randomIndex = Math.floor(Math.random() * unfinishedReviews.length);
        setCurrentItem(unfinishedReviews[randomIndex])
        if(Math.random() > 0.5 && !unfinishedReviews[randomIndex].readingComplete){
            setAskReadingMode(true)
        }else {
            setAskReadingMode(unfinishedReviews[randomIndex].meaningComplete)
        }
    }


    useEffect(()=>{
      initializeReviews()
    }, [])



    return (
            <LinearGradient colors={['#172959', '#242424']} style={styles.container}>
            {currentItem == undefined ? <></>:
              <>
              <SubjectBanner reviewItem={currentItem} reviewQueue={queue}/>
              <ReviewInputLabel reviewItem={currentItem} askReading={askReadingMode} />
              </>

            }

            </LinearGradient>

    );
  }

import {useEffect, useState, useRef} from "react";
import {RootStackParamList} from "../../../App"
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import styles from "../../styles/styles"
import {LinearGradient} from "expo-linear-gradient"
import {WaniKaniApi} from "../../api/wanikani-api"
import {SubjectAssignmentPair} from "../../models/SubjectAssignmentPairModel"
import {ReviewItem} from "../../models/ReviewItemModel"
import {SubjectType} from "../../models/subjects/types/SubjectTypes"
import SubjectBanner from "./components/SubjectBanner";
import ReviewInputLabel from "./components/ReviewInputLabel";
import ReviewInput from "./components/ReviewInput";
import ReviewItemDetails from "./components/ReviewItemDetails";
import {View, Animated} from "react-native"


/*
import ReviewInputLabel from "../components/ReviewInputLabel";
import ReviewInput from "../components/ReviewInput";
*/
export default function ReviewScreen({navigation} : NativeStackScreenProps<RootStackParamList,'Reviews'>) {

  const [queue, setQueue]  = useState([] as Array<ReviewItem>)

  const [currentItem, setCurrentItem] = useState(undefined as ReviewItem | undefined)

  const [askReadingMode, setAskReadingMode] = useState(true)

  const [answer, setAnswer] = useState('');

  const [lastSubmissionWrong, setLastSubmissionWrong] = useState(false)

  /*
  askReadingMode : boolean
*/
    const initializeReviews = () =>  {
      setQueue([])
      WaniKaniApi.getCurrentReviews().then((pairs : Array<SubjectAssignmentPair>) => {
        let newQueue = queue

        pairs.forEach((pair : SubjectAssignmentPair) => {
          newQueue = [... newQueue,
            {
              subjectAssignment: pair,
              meaningComplete: false,
              readingComplete: pair.assignment.subject_type === SubjectType.radical ||
              pair.assignment.subject_type === SubjectType.kana_vocabulary,

            } as ReviewItem ];
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
        setAnswer("")
        const unfinishedReviews = queue.filter(review => !review.readingComplete || !review.meaningComplete);
        const randomIndex = Math.floor(Math.random() * unfinishedReviews.length);
        setCurrentItem(unfinishedReviews[randomIndex])
        if(Math.random() > 0.5 && !unfinishedReviews[randomIndex].readingComplete){
            setAskReadingMode(true)
        }else {
            setAskReadingMode(unfinishedReviews[randomIndex].meaningComplete)
        }
    }

    const submitAnswer = () => {
      if(answer == ""){
        return
      }

      if(lastSubmissionWrong){
        setLastSubmissionWrong(false)
        nextReviewItem()
        return
      }

      let correct = false;
      if(askReadingMode){
        const subject : KanjiSubject = currentItem?.subjectAssignment.subject as KanjiSubject;
        subject.readings.forEach((reading : Reading) => {
          if(reading.reading.toLowerCase().replace(" ", "") == answer.toLowerCase().replace(" ", "") && reading.accepted_answer){
            correct = true;
            return;
          }
        })
      } else{
        const subject : Subject = currentItem?.subjectAssignment.subject as Subject;
        subject.meanings.forEach((meaning : Meaning) => {
          if(meaning.meaning.toLowerCase().replace(" ", "") == answer.toLowerCase().replace(" ", "") && meaning.accepted_answer){
            correct = true;
            return;
          }
        })
      }


      if(correct){
        const tempQueue = queue;
        const item : ReviewItem = tempQueue.findLast((reviewItem : ReviewItem) => {
           return reviewItem.subjectAssignment.subject.id == currentItem?.subjectAssignment.subject.id
         }) as ReviewItem

        if(askReadingMode){
          item.readingComplete = true;
        } else{
          item.meaningComplete = true;
        }
          animatePopUp()
         setQueue(tempQueue)
         nextReviewItem()

        return
      }

      setLastSubmissionWrong(true)


    }


  const fadeCorrectAnim = useRef(new Animated.Value(0)).current;

    // Will change fadeAnim value to 1 in 5 seconds

  const animatePopUp = () => {
    Animated.timing(fadeCorrectAnim, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(fadeCorrectAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }).start(() => {

      })
    })
  }



    useEffect(()=>{
      initializeReviews()


    }, [])



    return (
            <LinearGradient colors={['#172959', '#242424']} style={styles.container}>
            {currentItem == undefined ? <></>:
              <>
              <SubjectBanner reviewItem={currentItem} reviewQueue={queue} popUpAnimState={fadeCorrectAnim}/>
              <ReviewInputLabel reviewItem={currentItem} askReading={askReadingMode} />
              <ReviewInput askReading={askReadingMode} onDone={submitAnswer} answer={answer} setAnswer={setAnswer} lastSubmissionWrong={lastSubmissionWrong}/>
              <ReviewItemDetails reviewItem={currentItem}/>
              </>

            }

            </LinearGradient>

    );
  }

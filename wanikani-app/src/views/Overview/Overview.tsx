import { LinearGradient } from 'expo-linear-gradient';
import {ScrollView, View, Text} from 'react-native';
import { useState, useEffect } from 'react';
import UserNameLabel from "./components/UserNameLabel"
import UserLevelLabel from "./components/UserLevelLabel"
import StatisticsView from "./components/StatisticsView"
import ReviewForecast from "./components/ReviewForecast"
import styles from "../../styles/styles"
import {WaniKaniApi} from "../../api/wanikani-api"
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {RootStackParamList} from "../../../App"





export default function OverviewScreen({navigation} : NativeStackScreenProps<RootStackParamList,'Overview'>) {

  const [summary, setSummary] = useState<Summary>({} as Summary);
  const [profile, setProfile] = useState<Profile>({} as Profile);
  useEffect(() => {
    let ignore = false;
    async function updateUserSummary() {
      WaniKaniApi.getSummary().then(
        (data: Summary) => {
          if (!ignore) {
            setSummary(data)
          }
        }
      );
    }

    async function setUserProfile(){
      WaniKaniApi.getUserProfile().then(
        (data : Profile) => {
          if(!ignore){
            setProfile(data)
            setSubjectAssignmentPairs(data.level)
          }
        }
      )
    }

    async function setSubjectAssignmentPairs(level : number){
        WaniKaniApi.getSubjectAssignmentPairsAtLevel(level).then((pairs : Array<SubjectAssignmentPair>) => {
            console.log(pairs[0].subject.meanings)
        } )
    }


    updateUserSummary()
    setUserProfile()


    return () => {
      ignore = true;
    }
  }
    , [])



  return (
    <LinearGradient colors={['#172959', '#242424']} style={styles.container}>
      <ScrollView >
        <View style={styles.scrollView}>
          <UserNameLabel username={profile.username} />
          <StatisticsView lessonCount={summary.available_lessons_count} reviewCount={summary.available_reviews_count} />
          <ReviewForecast reviews={summary.reviews}/>
          <UserLevelLabel level={profile.level}/>
        </View>
      </ScrollView>
    </LinearGradient>


  );
}

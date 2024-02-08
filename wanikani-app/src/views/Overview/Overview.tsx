import { LinearGradient } from 'expo-linear-gradient';
import {ScrollView, View, Text} from 'react-native';
import { useState, useEffect } from 'react';
import UserNameLabel from "./components/UserNameLabel"
import LevelStatus from "./components/LevelStatus"
import StatisticsView from "./components/StatisticsView"
import ReviewForecast from "./components/ReviewForecast"
import CategorialStatus from "./components/CategorialStatus"
import styles from "../../styles/styles"
import {WaniKaniApi} from "../../api/wanikani-api"
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {RootStackParamList} from "../../../App"
import {Assignment} from "../../models/assignment/AssignmentModel"




export default function OverviewScreen({navigation} : NativeStackScreenProps<RootStackParamList,'Overview'>) {

  const [summary, setSummary] = useState<Summary>({} as Summary);
  const [profile, setProfile] = useState<Profile>({} as Profile);
  const [allAssignments, setAllAssignments] = useState<Array<Assignment>>([]);
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
          }
        }
      )
    }

    async function getAllAssignments(){
      WaniKaniApi.getAllAssignments().then(
        (data : Array<Assignment>) => {
          if(!ignore){
            setAllAssignments(data)
          }
        }
      )
    }




    updateUserSummary()
    setUserProfile()
    getAllAssignments()


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
          {profile.level === undefined ? null :<LevelStatus profile={profile}/> }
          <CategorialStatus allAssignments={allAssignments}/>

        </View>
      </ScrollView>
    </LinearGradient>


  );
}

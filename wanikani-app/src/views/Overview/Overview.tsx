import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, ScrollView, Text, View } from 'react-native';
import { useState, useEffect } from 'react';
import UserNameLabel from "./components/UserNameLabel"
import UserLevelLabel from "./components/UserLevelLabel"
import StatisticsView from "./components/StatisticsView"
import styles from "../../styles/styles"
import {WaniKaniApi} from "../../api/wanikani-api"



export default function OverviewScreen({ navigation }) {

  const [summary, setSummary] = useState<Summary>({});
  const [profile, setProfile] = useState<Profile>({});

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
          <UserLevelLabel level={profile.level}/>
        </View>
      </ScrollView>
    </LinearGradient>


  );
}

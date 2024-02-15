import {View, Text} from "react-native";
import UserLevelLabel from "./UserLevelLabel"
import CurrentLevelSubjectAssignments from "./CurrentLevelSubjectAssignments"
import LevelUpIndicator from "./LevelUpIndicator"
import {useEffect, useState} from "react"
import {WaniKaniApi} from "../../../api/wanikani-api"
import {SubjectAssignmentPair} from "../../../models/SubjectAssignmentPairModel"

export default function LevelStatus(props : {profile : Profile}) {

  const [currentLevelSubjectAssignmentPairs, setCurrentLevelSubjectAssignmentPairs] = useState<Array<SubjectAssignmentPair>>([])

  useEffect(() => {
    let ignore = false;

    async function setSubjectAssignmentPairs(level : number){
        WaniKaniApi.getSubjectAssignmentPairsAtLevel(level).then((pairs : Array<SubjectAssignmentPair>) => {
            if(!ignore){
              setCurrentLevelSubjectAssignmentPairs(pairs)

            }
        } )
    }

    setSubjectAssignmentPairs(props.profile.level)
    return () => {
      ignore = true;
    }
  }
    , [])

  return (
    <View>
      <UserLevelLabel level={props.profile.level}/>
      <CurrentLevelSubjectAssignments currentSubjectAssignments={currentLevelSubjectAssignmentPairs}/>
      <LevelUpIndicator currentSubjectAssignments={currentLevelSubjectAssignmentPairs}/>
    </View>
  )

}

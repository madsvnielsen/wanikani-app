import {Text, View} from "react-native";
import styles from "../../../styles/styles"
import {LinearGradient} from "expo-linear-gradient"
import {Assignment} from "../../../models/assignment/AssignmentModel"


export default function CategorialStatus(props : {allAssignments : Array<Assignment>}) {

  let apprenticeCount = props.allAssignments.filter((assignment : Assignment) => assignment.srs_stage > 0 && assignment.srs_stage <= 4).length
  let guruCount = props.allAssignments.filter((assignment : Assignment) => assignment.srs_stage === 5 || assignment.srs_stage === 6 ).length
  let masterCount = props.allAssignments.filter((assignment : Assignment) => assignment.srs_stage === 7).length
  let enlightenedCount = props.allAssignments.filter((assignment : Assignment) => assignment.srs_stage === 8).length
  let burnedCount = props.allAssignments.filter((assignment : Assignment) => assignment.srs_stage === 9).length

  return (
    <View style={styles.categoryContainer}>
              <LinearGradient colors={["#DF37A7", "#B42E87"]} style={styles.categoryBox}>
                  <Text style={styles.categoryNumberText}>{apprenticeCount}</Text>
                  <Text style={styles.categoryNumberLabel}>Apprentice</Text>
              </LinearGradient>
              <LinearGradient colors={["#5a06ea", "#4316b7"]} style={styles.categoryBox}>
                  <Text style={styles.categoryNumberText}>{guruCount}</Text>
                  <Text style={styles.categoryNumberLabel}>Guru</Text>
              </LinearGradient>
              <LinearGradient colors={["#6ac4ef","#3bb5f1"]} style={styles.categoryBox}>
                  <Text style={styles.categoryNumberText}>{masterCount}</Text>
                  <Text style={styles.categoryNumberLabel}>Master</Text>
              </LinearGradient>
              <LinearGradient colors={["#00AAFF","#0676AD"]} style={styles.categoryBox}>
                  <Text style={styles.categoryNumberText}>{enlightenedCount}</Text>
                  <Text style={styles.categoryNumberLabel}>Enlightened</Text>
              </LinearGradient>
              <LinearGradient colors={["#363636","#2c2c2c"]} style={styles.categoryBox}>
                  <Text style={styles.categoryNumberText}>{burnedCount}</Text>
                  <Text style={styles.categoryNumberLabel}>Burned</Text>
              </LinearGradient>
          </View>
  )

}

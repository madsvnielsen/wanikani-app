import {Text} from "react-native";
import styles from "../../../styles/styles"
export default function UserLevelLabel(props) {
  return (
    <Text style={styles.levelText}>Level {props.level}</Text>

  )

}

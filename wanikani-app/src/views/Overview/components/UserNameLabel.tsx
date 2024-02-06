import {Text} from "react-native";
import styles from "../../../styles/styles"
export default function UserNameLabel(props : {username : string}) {
  return (
    <Text style={styles.usernameText}>{props.username}</Text>
  )

}

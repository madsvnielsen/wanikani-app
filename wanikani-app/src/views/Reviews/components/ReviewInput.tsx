import { SafeAreaView, StyleSheet, TextInput} from 'react-native';

import {toHiragana} from 'wanakana';
import {Dispatch, SetStateAction, useEffect} from "react";



export default function ReviewInput(props : {askReading : boolean,
  answer : string,
  setAnswer : Dispatch<SetStateAction<string>>,
  onDone : () => void,
  lastSubmissionWrong : boolean
}) {

  useEffect(()=>{
  }, [])
    const inputToKana = (e : string)=> {
        props.setAnswer(toHiragana(e, {IMEMode : true}))
    }
    return(
        <SafeAreaView>
                <TextInput
                    style={props.lastSubmissionWrong ? styles.mistakeInput :styles.input}
                    placeholder={props.askReading ? "答え..." : "Meaning..." }
                    value={props.answer}
                    onChangeText={props.lastSubmissionWrong ? undefined : (props.askReading ?  inputToKana : props.setAnswer)}
                    onSubmitEditing={props.onDone}
                    blurOnSubmit={false}
                    autoCorrect={false}
                    autoCapitalize={"none"}
                    enablesReturnKeyAutomatically={true}
                >

                </TextInput>
        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    input: {
        height: 50,
        padding: 10,
        width: "100%",
        backgroundColor: "#F2F2F2",
        textAlign : "center",
        borderBottomColor: "black",
        borderBottomWidth: 2

    },
    mistakeInput: {
        height: 50,
        padding: 10,
        width: "100%",
        backgroundColor: "#d13434",
        textAlign : "center",
        color: "white",
        borderBottomColor: "black",
        borderBottomWidth: 2

    },

})

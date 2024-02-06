import {StyleSheet} from "react-native";


export default StyleSheet.create({

    container: {
        flex:1,
        flexDirection:"column",

    },
    usernameText:{
        color: "white",
        fontSize: 30,
        margin: 5,
        width: "100%",
        fontWeight: "100",

    },
    statisticsContainer:{
      flex:1,
      justifyContent: "space-evenly",
      flexDirection:"row",
    },
    statisticsCardNumberHeader:{
        color:"white",
        fontSize: 50,
        textAlign: "center",
        width: "100%",

        fontWeight: "700"
    },
    statisticsCardNumberLabel:{
        color:"white",
        fontSize: 25,
        width: "100%",
        textAlign: "center",
        marginTop: "auto",
        fontWeight: "300"
    }
    ,
    levelText:{
        color: "white",
        fontSize: 20,
        marginHorizontal: 5,
        marginTop: 20,
        width: "100%",
    },
    scrollView:{
        marginHorizontal : 20
    },
    statisticsCard: {
        width: 150,
        height: 130,
        borderRadius:5,
        padding: 10,
        margin:15,
    },
    header: {
        color: "white",
        width : "100%",
        textAlign:"center",
        fontSize: 20,
        margin:0,
        fontWeight: "bold"
    },
});

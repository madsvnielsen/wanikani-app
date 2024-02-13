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
    subjectContainer: {
      flexDirection: "row",
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "flex-start",
        flexWrap: "wrap",
        width:"100%",
        marginHorizontal:"auto"
    },
    subjectCard:{
        height: 35,
        width: 35,
        margin: 2,
        borderRadius: 2,
        padding:2,
    },
    subjectText:{
        color:"white",
        textAlign: "center",
        fontSize: 15
    },
    indicatorContainer: {
        width:"100%",
        marginHorizontal:"auto",
        marginVertical: 15,
        borderRadius: 20,

    },
    indicatorBar: {
        borderRadius: 20,
        height: 30,
    },
    indicatorText:{
        position: "absolute",
        textAlign:"center",
        textAlignVertical: "center",
        height:"100%",
        width:"100%",
        color:"#ffffff"
    },
      srsIndicatorContainer:{
          width:"100%",
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-evenly",
          marginTop:4
      },
      indicatorCell:{
          height: 3,
          width:5,

      },
      startCell:{
          borderBottomLeftRadius: 1,
          borderTopLeftRadius: 1,
      },
      endCell:{
          borderBottomRightRadius: 1,
          borderTopRightRadius: 1,
      },
      activeCell:{
          backgroundColor:"#60f542"
      },
      disabledCell:{
          backgroundColor:"#818181"
    },
    categoryContainer: {
        flexDirection: "row",
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "flex-start",
        flexWrap: "wrap",
        width:"100%",
        marginHorizontal:"auto",

    },
    categoryBox: {
        backgroundColor : "red",
        height: 75,
        width:100,
        marginVertical: 5,
        marginRight: 10,
        borderRadius: 5
    },
    categoryNumberText: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
    height: 50,
    textAlignVertical: "center",
    fontWeight: "bold"

},
  categoryNumberLabel: {
    color: "#dadada",
    textAlign: "center",
    fontSize: 15,

  },
  inputLabelContainer:{
      width: "100%",
      height: 50,
  },
  inputLabelText:{
      color: "white",
      textAlign: "center",
      textAlignVertical: "center",
      height: "100%",
      fontWeight: "200",
      fontSize: 20

  }

});

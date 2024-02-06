import {Text, View} from 'react-native';
import styles from "../../../styles/styles"
import Moment from 'moment';
import {BarChart, barDataItem} from 'react-native-gifted-charts'

export default function ReviewForecast(props : {reviews : Array<ReviewBatch>}) {
  if(props.reviews === undefined){
    return
  }

  const data : Array<barDataItem> = [];

  Moment.locale('en');

  props.reviews.forEach((reviewBatch : ReviewBatch) => {
    const reviewCount : number = reviewBatch.subject_ids.length
    if(reviewCount > 0){
      data.push({
        value: reviewCount,
        label: Moment(reviewBatch.available_at).format("HH:mm"),
        labelWidth : 30,
        topLabelComponent: () => (
          <Text style={{color: 'white', fontSize: 18, marginBottom: 6}}>{reviewCount}</Text>
        )
      } as barDataItem)


    }
  })
  if(data.length > 0){
    data[0].label = "now";
  }


    return (
      <View>
      <Text style={styles.header}>Upcoming reviews</Text>
            <BarChart width={300}
                      data={data}
                      frontColor="#00AAFFFF"
                      xAxisLabelTextStyle={{color : "white"}}
                      yAxisTextStyle={{color: "white"}}
                      hideYAxisText={true}
                      yAxisThickness={0}
                      isAnimated
                      barBorderTopLeftRadius={5}
                      barBorderTopRightRadius={5}
                      hideRules={true}
            />
      </View>

    );
}

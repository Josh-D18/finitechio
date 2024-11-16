import { StyleSheet, Image, Platform, View, Text, Dimensions } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import {
  LineChart, 
} from "react-native-chart-kit";
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { calculateHousePayment } from '@/utils/utils';
import interestData from "@/localData/savingInterest.json"
import { useEffect, useState } from 'react';

interface IData {
    income: number,
    savings: number,
    spending: number,
    homePrice: number,
    futureSavings: number
}

export default function TabTwoScreen() {
  const [userData, setUserData] = useState<IData>({
    futureSavings: 0,
    homePrice: 0,
    income:0,
    savings:0,
    spending:0
  })
  
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("userData");
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  };

  useEffect(() => {
    const readData = async () => {
      const data = await getData();
      console.log(data)
      setUserData(data);
    }


    readData();
  }, [])

  const {totalSavings, totalAmountInFiveYears, totalAmountInTenYears, surplusAmountInFive,surplusAmountInTen,differenceAmountInFive,differenceAmountInTen} = calculateHousePayment(userData.savings, userData.homePrice, interestData);


  const data = {
    labels: ["Year 1", "Year 2", "Year 3", "Year 4", "Year 5", "Year 6", "Year 7", "Year 8", "Year 9", "Year 10"],
    datasets: [
      {
        data: totalSavings,
        color: (opacity = 1) => `rgba(34, 65, 244, ${opacity})`,
        strokeWidth: 2
      }
    ],
    legend: ["Amount Of Savings"]
  };

  const chartConfig = {
    backgroundGradientFrom: "#000000",
    backgroundGradientFromOpacity: 0.7, // Adjust opacity to make gradient visible
    backgroundGradientTo: "#000000",
    backgroundGradientToOpacity: 1,
    color: (opacity = 1) => `rgba(126, 255, 146, ${opacity})`, // Adjust opacity for chart elements
    strokeWidth: 2, // optional, default 3
    barPercentage: 1,
    useShadowColorFromDataset: false // optional
  };
  
 

  return (
    <SafeAreaView>
    <ThemedView style={styles.container}>
     <ThemedText type="title">Data Centre</ThemedText>
      <Text>Data Chart</Text>
      <LineChart
        data={data}
        width={420}
        height={220}
        chartConfig={chartConfig}
      />
    
    <Text>Total Amount Saved In 5 Years: ${Math.round(totalAmountInFiveYears)}</Text>
    <Text>Total Amount Saved In 10 Years: ${Math.round(totalAmountInTenYears)}</Text>
    {surplusAmountInFive === 0
           ? (<Text>Sorry You Will Not Reach The Amount Needed To Put A Down Payment Down. You Will Be Short: ${Math.round(differenceAmountInFive)} in 5 Years and ${Math.round(differenceAmountInTen)} In 10</Text>)
           : <Text>Congrats You Not Will Have Enough Saved In Order To Put A Down Payment Down. You Will Pass The Amount Needed By: ${Math.round(surplusAmountInFive)} in 5 Years and ${Math.round(surplusAmountInTen)} In 10</Text>
          }
    
    </ThemedView>
    </SafeAreaView>
   
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  container: {
    flexDirection: 'column',
    gap: 8,
    alignItems: 'center'
  },
});


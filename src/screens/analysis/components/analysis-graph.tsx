import {Card, Text} from '@ui-kitten/components';
import React, {useEffect} from 'react';
import {Dimensions, ScrollView} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import {Colors} from '../../../constants/colors';
import {AbstractChartConfig} from 'react-native-chart-kit/dist/AbstractChart';
import {LineChartData} from 'react-native-chart-kit/dist/line-chart/LineChart';
import {useAppSelector} from '../../../redux';

export const AnalysisGraphComponent = () => {
  const {user, token} = useAppSelector(state => state.auth);
  // const [
  //   getUserQuizAnalysis,
  //   {isLoading, isError, error, data: analysisData = []},
  // ] = Api.useLazyGetUserQuizesAnalysisQuery();
  const analysisData: any[] = [];
  const chartConfig: AbstractChartConfig = {
    backgroundGradientFrom: '#FFF',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#FFF',
    backgroundGradientToOpacity: 1,
    color: (opacity = 1) => '#000',
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: true, // optional
    decimalPlaces: 0,
  };
  const screenWidth = Dimensions.get('window').width;
  const data: LineChartData = {
    labels: analysisData.map(v => v.label),
    datasets: [
      {
        data: analysisData.map(v => v.score),
        color: (opacity = 1) => Colors.primary, // optional
        strokeWidth: 2, // optional
      },
    ],
    legend: ['All Subjects'], // optional
  };

  // useEffect(() => {
  //   if (user && userToken) {
  //     getUserQuizAnalysis(user.id);
  //   }
  // }, [user, userToken]);

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <Card
        style={{
          backgroundColor: 'white',
        }}>
        <LineChart
          data={data}
          width={screenWidth}
          height={220}
          chartConfig={chartConfig}
          withInnerLines={false}
          withHorizontalLines={true}
          withVerticalLines={true}
          horizontalLabelRotation={0}
          verticalLabelRotation={45}
          yLabelsOffset={20}
          xLabelsOffset={-15}
          style={{
            borderStyle: 'solid', // Set the border style to solid
          }}
          bezier
        />
      </Card>
    </ScrollView>
  );
};

import React from 'react';
import { ResponsivePie } from '@nivo/pie';

function AccountPieChart({ data /* see data tab */ }) {
  const foodTotal = data
    .filter(el => el.category === '식비')
    .map(el => el.price)
    .reduce((acc, cur) => {
      return acc + cur;
    }, 0);
  const transportationTotal = data
    .filter(el => el.category === '교통비')
    .map(el => el.price)
    .reduce((acc, cur) => {
      return acc + cur;
    }, 0);
  const hotelTotal = data
    .filter(el => el.category === '숙박비')
    .map(el => el.price)
    .reduce((acc, cur) => {
      return acc + cur;
    }, 0);
  const ticketTotal = data
    .filter(el => el.category === '티켓')
    .map(el => el.price)
    .reduce((acc, cur) => {
      return acc + cur;
    }, 0);
  const presentTotal = data
    .filter(el => el.category === '기념품')
    .map(el => el.price)
    .reduce((acc, cur) => {
      return acc + cur;
    }, 0);
  const etcTotal = data
    .filter(el => el.category === '기타')
    .map(el => el.price)
    .reduce((acc, cur) => {
      return acc + cur;
    }, 0);

  const finalData = [
    { id: '식비', value: foodTotal },
    { id: '교통비', value: transportationTotal },
    { id: '숙박비', value: hotelTotal },
    { id: '티켓', value: ticketTotal },
    { id: '기념품', value: presentTotal },
    { id: '기타', value: etcTotal },
  ];

  return (
    <ResponsivePie
      data={finalData}
      margin={{ top: 70, right: 110, bottom: 110, left: 110 }}



function AccountPieChart({ data /* see data tab */ }) {
  return (
    <ResponsivePie
      data={data}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      borderWidth={1}
      colors={{ scheme: 'pastel1' }}
      borderColor={{
        from: 'color',
        modifiers: [['darker', 0.2]],
      }}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor="#333333"
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: 'color' }}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor={{
        from: 'color',
        modifiers: [['darker', 2]],
      }}
      legends={[
        {
          anchor: 'bottom',
          direction: 'row',
          justify: false,
          translateX: 0,
          translateY: 56,
          itemsSpacing: 0,
          itemWidth: 100,
          itemHeight: 18,
          itemTextColor: '#999',
          itemDirection: 'left-to-right',
          itemOpacity: 1,
          symbolSize: 18,
          symbolShape: 'circle',
          effects: [
            {
              on: 'hover',
              style: {
                itemTextColor: '#000',
              },
            },
          ],
        },
      ]}
    />
  );
}

export default AccountPieChart;

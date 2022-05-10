import React from 'react';
import { ResponsivePie } from '@nivo/pie';

function AccountPieChart({ data /* see data tab */ }) {
  function totalPrice(category) {
    return data
      .filter(el => el.category === category)
      .map(el => el.price)
      .reduce((acc, cur) => {
        return Number(acc) + Number(cur);
      }, 0);
  }

  const foodTotal = totalPrice('식비');
  const transportationTotal = totalPrice('교통비');
  const hotelTotal = totalPrice('숙박비');
  const ticketTotal = totalPrice('티켓');
  const presentTotal = totalPrice('기념품');
  const etcTotal = totalPrice('기타');

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
      margin={{ top: 70, right: 120, bottom: 120, left: 120 }}
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

/* eslint-disable react/jsx-no-useless-fragment */
import React from 'react';
import { ResponsivePie } from '@nivo/pie';
import Swal from 'sweetalert2';
import styled, { keyframes } from 'styled-components';

const PieAnimation = keyframes`
  0% {
    transform: translateY(45%);
    width:100%
  }
  100% {
    transform: translateY(0);
    width:100%
  }
`;

const AccountPieChartBox = styled.div`
  animation-name: ${PieAnimation};
  animation-duration: 0.7s;
`;

function AccountPieChart({ openModalHandler, data /* see data tab */ }) {
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

  const CustomLayerComponent = myProps => layerProps => {
    const { centerX, centerY } = layerProps;

    console.log(myProps);
    console.log(layerProps);

    return (
      <text
        x={centerX}
        y={centerY}
        textAnchor="middle"
        dominantBaseline="central"
        style={{
          fontSize: '1.5vw',
          fontWeight: '600',
        }}
      >
        {myProps}원 사용 !
      </text>
    );
  };

  const mySpecialValue = data
    .map(el => el.price)
    .reduce((acc, cur) => {
      return Number(acc) + Number(cur);
    }, 0);

  const totalPriceText = CustomLayerComponent(mySpecialValue);

  return (
    <>
      {mySpecialValue === 0 ? (
        (Swal.fire({
          icon: 'error',
          title: '🙅‍♂️ 그래프를 그릴 수 없어요!',
          text: '가계부를 먼저 작성해주세요',
          confirmButtonText: '알겠어요',
          allowOutsideClick: false,
          backdrop: `
          rgba(0,0,110,0.5)
        `,
        }).then(result => {
          if (result.isConfirmed) {
            openModalHandler(false);
          }
        }),
        '')
      ) : (
        <AccountPieChartBox>
          <ResponsivePie
            data={finalData}
            margin={{ top: 20, right: 120, bottom: 120, left: 120 }}
            innerRadius={0.5}
            padAngle={0.7}
            cornerRadius={3}
            activeOuterRadiusOffset={8}
            borderWidth={3}
            colors={{ scheme: 'pastel1' }}
            borderColor={{
              from: 'color',
              modifiers: [['darker', 0.2]],
            }}
            arcLinkLabelsSkipAngle={20}
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
                symbolSize: 20,
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
            layers={[
              'arcs',
              'arcLabels',
              'arcLinkLabels',
              'legends',
              totalPriceText,
            ]}
          />
        </AccountPieChartBox>
      )}
    </>
  );
}

export default AccountPieChart;

import React from 'react';
import styled from 'styled-components';
import { ResponsiveRadialBar } from '@nivo/radial-bar'
const MyResponsiveRadialBar = () => (
  <div style={{ width: 'auto', height: '150px', margin: '0 auto' }}>
    <ResponsiveRadialBar
      data={[
        {
          id: "Supermarket",
          data: [
            {
              x: "Vegetables",
              y: 94,
            },
          ],
        },
      ]}
      valueFormat=">-.2f"
      startAngle={-125}
      endAngle={125}
      innerRadius={0.5}
      enableRadialGrid={false}
      enableCircularGrid={false}
      radialAxisStart={null}
      circularAxisOuter={false}
      cornerRadius={50}
      colors={['#0000ff']}


      padding={0.5}
      margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
      legends={[]}
    />
  </div>
);
export default MyResponsiveRadialBar;

// const ResponsiveRadialBar = styled(ResponsiveRadialBar)``;
const ChartBox = styled.div`
font:700 100px/1 'Noto sans','Arial','sans-serif';
`;
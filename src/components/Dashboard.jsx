// components/Dashboard.js
'use client';  // 确保这是一个客户端组件

import React from 'react';
import ReactEcharts from 'echarts-for-react';

const Dashboard = () => {
  const getOption = () => {
    return {
      title: {
        text: '基础图表'
      },
      tooltip: {},
      xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
      },
      yAxis: {},
      series: [
        {
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }
      ]
    };
  };

  return (
    <div>
      <ReactEcharts option={getOption()} />
    </div>
  );
};

export default Dashboard;

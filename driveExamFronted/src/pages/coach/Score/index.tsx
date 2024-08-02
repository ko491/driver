import React, { useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Pie } from '@ant-design/plots';
import { getStudentScores } from "@/services/ant-design-pro/api";

const Score: React.FC = () => {
  const [pieData, setPieData] = useState<any[]>([]); // 用于存储 Pie 图的数据

  useEffect(() => {
    // 使用接口获取考试记录数据
    getStudentScores()
      .then(response => {
        const data = response?.data;

        // 更新 Pie 图数据
        setPieData(data);
      })
      .catch(error => {
        console.error('Error fetching exam records:', error);
      });
  }, []);

  const config = {
    data: pieData, // 使用获取的数据
    angleField: 'percent',
    colorField: 'username',
    tooltip: {
      title: (d) => d.username, // 设置 tooltip 标题为用户名
      items: [{ channel: 'y' }],
    },
    radius: 0.8,
    label: {
      text: (d) => `${d.username}\n ${d.score}`,
      position: 'spider',
    },
    legend: {
      color: {
        title: false,
        position: 'right',
        rowPadding: 5,
      },
    },
  };

  return (
    <PageContainer>
      <div id="container">
        <Pie {...config} />
      </div>
    </PageContainer>
  );
};

export default Score;

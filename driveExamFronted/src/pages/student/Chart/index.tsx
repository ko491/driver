import { PageContainer } from '@ant-design/pro-layout';
import type { FC} from 'react';
import { useEffect, useState } from 'react';
import { Column } from '@ant-design/plots';
import { getRecords } from "@/services/ant-design-pro/api";

const Chart: FC = () => {
  const [data, setData] = useState<any[]>([]); // 使用 useState 来存储数据

  useEffect(() => {
    // 在组件挂载后调用 getRecords 函数获取数据
    const fetchData = async () => {
      try {
        // @ts-ignore
        const response = await getRecords(); // 调用获取数据的函数
        setData(response.data); // 将获取的数据存储到 state 中
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData(); // 调用获取数据的函数
  }, []);

  // 将数据转换为图表所需的格式
  const chartData = data.map((item, index) => ({
    x: `第${index + 1}次`, // x 轴标签
    y: item.score, // y 轴值
    label: {
      text: `${(item.score * 100).toFixed(1)}%`, // 设置标签内容
      textBaseline: 'bottom', // 设置标签垂直对齐方式
    },
  }));

  const config = {
    data: chartData, // 使用转换后的数据作为图表的数据
    xField: 'x', // 设置 x 轴字段
    yField: 'y', // 设置 y 轴字段
    label: {
      textBaseline: 'bottom', // 设置标签垂直对齐方式
    },
    xAxis: {
      title: {
        text: '次数', // 设置 x 轴标题
      },
    },
    yAxis: {
      title: {
        text: '分数', // 设置 y 轴标题
      },
      min: 0, // 设置 y 轴最小值
      max: 100, // 设置 y 轴最大值
    },
  };

  return (
    <PageContainer>
      <Column {...config} />
    </PageContainer>
  );
};

export default Chart;

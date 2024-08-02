import { PageContainer } from '@ant-design/pro-layout';
import { FC, useEffect, useState } from 'react';
import {getPractice} from '@/services/ant-design-pro/api';
import {useLocation} from "react-router-dom";
import styles from "@/pages/student/Exam/style.less";
import {Card} from "antd";
import ProTable, {ProColumns} from "@ant-design/pro-table";
import {API} from "@/services/ant-design-pro/typings";


const columns: ProColumns<API.TableListItemPractice>[] = [
  {
    title: '题库文本',
    dataIndex: 'questiontext',
  },
  {
    title: '题库答案',
    dataIndex: 'answer',
    align: 'right',
    sorter: true,
  },
  {
    title: '题目解析',
    dataIndex: 'explanation',
    sorter: true,
  },
];
const Practice: FC = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const id = params.get('id');
  const [testData, setTestData] = useState<any>(null); // 用于存储接口返回的数据
  useEffect(() => {
    // 在组件加载时调用接口请求数据
    const fetchData = async () => {
      try {
        const response = await getPractice({ id: id });
        setTestData(response.data); // 设置接收到的数据到状态中
      } catch (error) {
        console.error('Error fetching test details:', error);
      }
    };
    if (id) {
      fetchData(); // 只有在 id 存在时才调用接口请求数据
    }
  }, [id]); // 当 id 发生变化时重新请求数据

  return (
    <PageContainer>
      <div className={styles.standardList}>
        <Card>
          <ProTable<API.TableListItemPractice,API.TableListPagination>
            dataSource={testData}
            columns={columns}
            search={false}
            headerTitle="练习题库"
          />
        </Card>
      </div>
    </PageContainer>
  );
};

export default Practice;

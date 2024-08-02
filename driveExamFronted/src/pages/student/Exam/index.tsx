import {FC, useEffect, useState} from 'react';
import React from 'react';
import { Card, Col, Row, Button} from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { useHistory } from 'react-router-dom';  // 导入 useHistory
import styles from './style.less';
import ProTable, {ProColumns} from "@ant-design/pro-table";
import { getRecords} from "@/services/ant-design-pro/api";
import {API} from "@/services/ant-design-pro/typings";


const columns: ProColumns<API.TableListItemExam>[] = [
  {
    title: '考试序号',
    dataIndex: 'id',
  },
  {
    title: '开始时间',
    dataIndex: 'starttime',
    align: 'right',
    sorter: true,
  },
  {
    title: '结束时间',
    dataIndex: 'endtime',
    sorter: true,
  },
  {
    title: '考试得分',
    dataIndex: 'score',
    sorter: true,
  },
];
const Info: FC<{
  title: React.ReactNode;
  value: React.ReactNode;
  bordered?: boolean;
}> = ({ title, value, bordered }) => (
  <div className={styles.headerInfo}>
    <span>{title}</span>
    <p>{value}</p>
    {bordered && <em />}
  </div>
);

export const Exam: FC = () => {
  const history = useHistory();  // 使用 useHistory 获取 history 对象

  const [examCount, setExamCount] = useState<number | undefined>(undefined);
  const [averageScore, setAverageScore] = useState<number | undefined>(undefined);
  const [wrongQuestions, setWrongQuestions] = useState<number | undefined>(undefined);



  const handleStartExam = () => {
    // 处理开始考试的逻辑
    history.push('/student/exam/exampage');
  };

  const handleViewMistakes = () => {
    // 导航到查看错题页面
    history.push('/student/mistake');
  };
  useEffect(() => {
    // 使用接口获取考试记录数据
    getRecords({ current: 1, pageSize: 10 })
      .then(response => {
        const data = response?.data;
        if (data && data.length > 0) {
          const examCount = data.length;
          setExamCount(examCount);
          // 计算平均分
          const totalScore = data.reduce((sum, record) => sum + Number(record.score || 0), 0);
          const average = totalScore / data.length;
          setAverageScore(average);

// 计算错题数
          const totalQuestions = data.length * 100; // 假设每次考试有100道题
          const correctAnswers = data.reduce((sum, record) => sum + Number(record.score || 0), 0);
          const wrongQuestionsCount = totalQuestions - correctAnswers;
          setWrongQuestions(wrongQuestionsCount);
        }
      })
      .catch(error => {
        console.error('Error fetching exam records:', error);
      });
  }, []);

  return (
    <div>
      <PageContainer>
        <div className={styles.standardList}>
          <Card bordered={false}>
            <Row gutter={16} justify="space-between">
              <Col span={8}>
                <Info title="我的考试" value={examCount !== undefined ? `${examCount}次` : '0'} bordered />
              </Col>
              <Col span={8}>
                <Info title="平均分数" value={averageScore !== undefined ? `${averageScore.toFixed(2)}分` : '0.00'} bordered />
              </Col>
              <Col span={8}>
                <Info title="考试错题" value={wrongQuestions !== undefined ? `${wrongQuestions}道` : '0'} />
              </Col>
            </Row>
            <Row style={{ marginTop: 16 }}>
              <Col span={24}>
                {/* 开始考试和查看错题按钮 */}
                <div style={{ textAlign: 'center' }}>
                  <Button
                    type="primary"
                    onClick={handleStartExam}
                  >
                    开始考试
                  </Button>
                  <Button
                    type="primary"
                    onClick={handleViewMistakes}
                  >
                    查看错题
                  </Button>
                </div>
              </Col>
            </Row>
          </Card>
          <Card>
            <ProTable<API.TableListItemExam,API.TableListPagination>
              request={getRecords}
              columns={columns}
              search={false}
              headerTitle="考试记录"
            />
          </Card>
        </div>
      </PageContainer>
    </div>
  );
};

export default Exam;

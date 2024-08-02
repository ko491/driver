import React, {useState} from "react";
import {Button, Card, Spin, Typography} from 'antd';
import { PageContainer } from "@ant-design/pro-layout";
import {useHistory} from "react-router-dom";
import {getExamQuestions} from "@/services/ant-design-pro/api";

const { Title, Paragraph } = Typography;

const ExamStartButton: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleStartExam = async () => {
    try {
      setLoading(true);
      // 调用 API 函数获取题目数据
      const questions = await getExamQuestions();
      // @ts-ignore
      const data = questions.data;

      // 将获取到的题目数据传递给新页面
      history.push('/student/exam/startexam', { data });
    } catch (error) {
      console.error('Failed to start exam:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <Title level={2} style={{ fontWeight: 'bold', marginBottom: '1rem' }}>欢迎参加本次考试！</Title>
      <Paragraph style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
        本次考试共有100道题，总分100分，考试时间为45分钟。
      </Paragraph>
      <Button type="primary" size="large" style={{ fontSize: '1.2rem' }} onClick={handleStartExam}>
        {loading ? <Spin /> : '开始考试'}
      </Button>
    </div>
  );
}
const ExamPage: React.FC = () => {
  return (
    <PageContainer>
      <Card style={{ width: '80%', margin: '0 auto' }}>
        <ExamStartButton />
      </Card>
    </PageContainer>
  );
}

export default ExamPage;

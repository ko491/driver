import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Card, Col, Divider, List, message, Popconfirm, Row, Skeleton } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import { CheckCard } from '@ant-design/pro-components';
import { useHistory } from 'react-router-dom';
import { API } from '@/services/ant-design-pro/typings';
import {examRecord} from "@/services/ant-design-pro/api";

const ExamPage: React.FC = () => {
  const history = useHistory();
  const location = useLocation();
  // @ts-ignore
  const examData = location.state?.data;

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<API.QuestionParams[]>([]);
  const [timer, setTimer] = useState(45 * 60); // 初始时间设置为 45 分钟，以秒为单位
  const [userAnswers, setUserAnswers] = useState(Array(100).fill(''));

  const handleSelectChange = (value, id) => {
    setUserAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[id] = value;
      return updatedAnswers;
    });
  };
  // 在其他地方使用 useEffect 等待状态更新
  useEffect(() => {
  }, [userAnswers]); // 仅当 userAnswers 更新时执行

  const handleCancel = () => {
    message.info('已取消退出考试');
  };

  const handleCancelSubmit = () => {
    message.info('已取消提交答案');
    // 清空已经提交的答案
    setUserAnswers(Array(100).fill(''));
  };

  const handleSubmitExam = async () => {
    // 创建数组用于存储错题信息
    const wrongAnswers = [];
    // 获取用户选择的答案
    const userAnswer = userAnswers;// 获取用户选择的答案，可能需要根据实际结构调整
    console.log(userAnswer)
    // 统计用户的得分
    // @ts-ignore
    let score = 0;
    // 遍历每个题目
    data.forEach((item, index) => {
      // 获取用户选择的答案
      const userAnswer = userAnswers; // 获取用户选择的答案，可能需要根据实际结构调整
      // 获取题目的正确答案
      const correctAnswer = item.answer; // 假设 correctAnswer 为每题的正确答案，具体需要替换为实际数据
      const id = Number(item.id); // 将题目的 id 转换为数字

      // 在 userAnswer 中找到对应的乱序索引
      const userAnswerIndex = userAnswer.findIndex((answer, i) => i === id);

      // 比较用户答案和正确答案
      if (userAnswerIndex !== -1 && userAnswer[userAnswerIndex] === correctAnswer) {
        // 答对，加一分
        score += 1;
      } else {
        // 答错，记录错题信息
        wrongAnswers.push({
          id: item.id, // 题目ID
          userSelected: userAnswerIndex !== -1 ? userAnswer[userAnswerIndex] : null, // 用户选择的答案
        });
      }
    });
    // 发送数据到后端
    try {
      const response = await examRecord(wrongAnswers, score,timer);

      if (response.code == 0) {
        message.success('数据提交成功');
        // 根据实际情况进行处理
        history.push('/student/exam/result',{timer,score})
      } else {
        message.error('数据提交失败');
        // 根据实际情况进行处理
      }
    } catch (error) {
      message.error('网络错误:', error);
      // 根据实际情况进行处理
    }

    return '提交考试';
  };

  const handleCancelExam = () => {
    if (data.length > 0) {
      // 如果有题目数据，即用户已开始答题
      // 提示用户确认是否退出考试
      Popconfirm({
        title: '您还未提交试卷，确定要退出考试吗？',
        onConfirm: () => history.push('/student/exam'),
        onCancel: handleCancel,
        okText: '确定',
        cancelText: '取消',
      });
    } else {
      // 如果没有题目数据，直接退出考试
      history.push('/student/exam');
    }
  };

  const loadMoreData = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      const newData = examData || [];
      // @ts-ignore
      setData((prevData) => [...prevData, ...newData]);
    } catch (error) {
      console.error('Error loading more data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMoreData();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimer((prevTimer) => {
        // 减少计时器的值
        if (prevTimer > 0) {
          return prevTimer - 1;
        } else {
          // 计时器归零时执行的操作，例如提交试卷、跳转页面等
          clearInterval(intervalId);
          handleSubmitExam();
          return 0;
        }
      });
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  // 将剩余秒数格式化为分钟:秒钟的形式
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <PageContainer>
      <Card>
        <InfiniteScroll
          dataLength={data.length}
          next={loadMoreData}
          hasMore={data.length < 50}
          loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
          endMessage={<Divider plain>做完了，恭喜你！</Divider>}
          scrollableTarget="scrollableDiv"
        >
          <List
            dataSource={data}
            renderItem={(item, index) => (
              <>
                <Card>
                  <List.Item>
                    <div
                      style={{
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        textAlign: 'left',
                        marginBottom: '10px',
                      }}
                    >
                      <span style={{ marginRight: '10px', fontWeight: 'bold' }}>{index + 1}.</span>
                      {item.questiontext}
                    </div>
                  </List.Item>
                  <CheckCard.Group
                    onChange={(value) => handleSelectChange(value, item.id)}
                    style={{ display: 'flex', justifyContent: 'space-around', width: '100%' }}
                  >
                    <CheckCard description={`A. ${item.optionA}`} value="A" />
                    <CheckCard description={`B. ${item.optionB}`} value="B" />
                    <CheckCard description={`C. ${item.optionC}`} value="C" />
                    <CheckCard description={`D. ${item.optionD}`} value="D" />
                  </CheckCard.Group>
                </Card>
              </>
            )}
          />
        </InfiniteScroll>
        <Row style={{ marginTop: 16 }}>
          <Col span={12}>
            <div style={{ textAlign: 'center' }}>
              <Popconfirm
                title="确定要提交答案吗？"
                onConfirm={handleSubmitExam}
                onCancel={handleCancelSubmit}
                okText="确定"
                cancelText="取消"
              >
                <Button type="primary">
                  提交答案
                </Button>
              </Popconfirm>
            </div>
          </Col>
          <Col span={12}>
            <div style={{ textAlign: 'center' }}>
              <Popconfirm
                title="确定要退出考试吗？"
                onConfirm={handleCancelExam}
                onCancel={handleCancel}
                okText="确定"
                cancelText="取消"
              >
                <Button type="primary" danger>
                  退出考试
                </Button>
              </Popconfirm>
            </div>
          </Col>
        </Row>
        <div style={{ textAlign: 'center', marginTop: '10px' }}>
          <span style={{ fontSize: '20px' }}>剩余时间: {formatTime(timer)}</span>
        </div>
      </Card>
    </PageContainer>
  );
};

export default ExamPage;


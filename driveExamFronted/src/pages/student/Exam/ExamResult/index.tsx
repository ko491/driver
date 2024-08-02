import React from "react";
import {PageContainer} from "@ant-design/pro-layout";
import {useHistory, useLocation} from "react-router-dom";
import {Button, Col, Result, Row, Typography} from "antd";


const ExamResult: React.FC = () => {
  const location = useLocation();
  // @ts-ignore
  const timer = location.state?.timer
  // @ts-ignore
  const score = location.state?.score;
  const history = useHistory();

  const handleReturn = () => {
    // 返回首页或者其他逻辑
    history.push('/student/exam');
  };
  const handleViewMistakes = () => {
    // 导航到查看错题页面
    history.push('/student/mistake');
  };
  const formatTime = (seconds) => {
    if (seconds < 60) {
      return `${seconds} 秒`;
    } else {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${minutes} 分 ${remainingSeconds} 秒`;
    }
  };

  return(
      <PageContainer>
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <Result
            status="success"
            title="恭喜你完成考试！"
            subTitle={`用时: ${formatTime(timer)}`}
            extra={[
              <Typography.Title level={3} key="score">
                得分: {score} 分
              </Typography.Title>,
              <Row style={{ marginTop: 16 }}>
                <Col span={24}>
                  {/* 开始考试和查看错题按钮 */}
                  <div style={{ textAlign: 'center' }}>
                    <Button
                      type="primary"
                      onClick={handleReturn}
                    >
                      返回首页
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
            ]}
          />
        </div>
      </PageContainer>
    )

}
export default ExamResult;

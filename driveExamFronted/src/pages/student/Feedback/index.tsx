import React, { useRef, useState } from 'react';
import type { FormInstance } from 'antd';
import { Card, Result, Button, Descriptions, Divider, Alert} from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { ProFormTextArea, StepsForm} from '@ant-design/pro-form';

import styles from './style.less';
import {API} from "@/services/ant-design-pro/typings";
import {upFeed} from "@/services/ant-design-pro/api";

const StepDescriptions: React.FC<{
  stepData: API.FeedParams;
  bordered?: boolean;
}> = ({ stepData, bordered }) => {
  const { content } = stepData;
  return (
    <Descriptions column={1} bordered={bordered}>
      <Descriptions.Item label="投诉内容"> {content}</Descriptions.Item>
    </Descriptions>
  );
};

const StepResult: React.FC<{
  onFinish: () => Promise<void>;
}> = (props) => {
  return (
    <Result
      status="success"
      title="操作成功"
      extra={
          <>
              <Button type="primary" onClick={props.onFinish}>
                  返回
              </Button>
          </>
      }
      subTitle="已反馈"
      className={styles.result}
    >
      {props.children}
    </Result>
  );
};

const Feedback: React.FC<Record<string, any>> = () => {
  const [stepData, setStepData] = useState<API.FeedParams>({});
  const [current, setCurrent] = useState(0);
  const formRef = useRef<FormInstance>();

    const handleSubmit = async (stepData: API.FeedParams) => {
        try {
            console.log('Submitting:', stepData);
            // 发送请求
            const response = await upFeed(stepData);
            // 这里可以根据后端返回的数据进行一些逻辑处理，比如根据返回的状态决定是否切换到下一步
            if (response.code === 0) {
                setCurrent(current + 1);
            } else {
                // 处理请求失败的情况
                console.error('API Error:', response.message);
            }
        } catch (error) {
            // 捕获请求发生的错误
            console.error('API Request Error:', error);
        }
    };
  return (
    <PageContainer>
      <Card bordered={false}>
        <StepsForm
          current={current}
          onCurrentChange={setCurrent}
          submitter={{
            render: (props, dom) => {
              if (props.step === 2) {
                return null;
              }
              return dom;
            },
          }}
        >
          <StepsForm.StepForm<API.FeedParams>
              formRef={formRef}
              title="填写投诉信息"
              initialValues={stepData}
              onFinish={async (values) => {
                  // 这里进行同步操作
                  setStepData(values);
                  setCurrent(current + 1); // 切换到下一步
              }}
          >
              <ProFormTextArea
                  label="投诉内容"
                  width="md"
                  name="content"
                  rules={[{ required: true, message: '请输入投诉内容' }]}
                  placeholder="请输入投诉内容"
              />
          </StepsForm.StepForm>

          <StepsForm.StepForm
              formRef={formRef}
              title="确认投诉信息"
              initialValues={stepData}
              onFinish={async (values) => {
                  // 这里进行同步操作
                  setStepData({ ...stepData, ...values });
                  await handleSubmit({ ...stepData, ...values }); // 提交数据
                  setCurrent(current + 1); // 切换到下一步
              }}
          >
            <div className={styles.result}>
              <Alert
                closable
                showIcon
                message="确认投诉后，无法撤回。"
                style={{ marginBottom: 24 }}
              />
              <StepDescriptions stepData={stepData} bordered />
              <Divider style={{ margin: '24px 0' }} />
            </div>
          </StepsForm.StepForm>
          <StepsForm.StepForm title="完成">
            <StepResult
              onFinish={async () => {
                setCurrent(0);
                formRef.current?.resetFields();
              }}
            >
              <StepDescriptions stepData={stepData} />
            </StepResult>
          </StepsForm.StepForm>
        </StepsForm>
        <Divider style={{ margin: '40px 0 24px' }} />
      </Card>
    </PageContainer>
  );
};

export default Feedback;

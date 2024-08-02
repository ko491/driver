import React, { useRef, useState } from 'react';
import { Card, Result, Descriptions, Divider, Alert, Button } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { ProFormDatePicker, ProFormText, ProFormTextArea, StepsForm } from '@ant-design/pro-form';
import styles from './style.less';
import { API } from "@/services/ant-design-pro/typings";
import moment from "moment";
import { upNotice } from "@/services/ant-design-pro/api";

const StepDescriptions: React.FC<{
    stepData: API.NoticeParams;
    bordered?: boolean;
}> = ({ stepData, bordered }) => {
    const { title, content, publishtime } = stepData;
    return (
        <Descriptions column={1} bordered={bordered}>
            <Descriptions.Item label="标题"> {title}</Descriptions.Item>
            <Descriptions.Item label="公告内容"> {content}</Descriptions.Item>
            <Descriptions.Item label="发布时间"> {publishtime}</Descriptions.Item>
        </Descriptions>
    );
};

const StepResult: React.FC<{
    onFinish: () => void;
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
            subTitle="已发布"
            className={styles.result}
        >
            {props.children}
        </Result>
    );
};

const UpNotice: React.FC<Record<string, any>> = () => {
    // @ts-ignore
  const [stepData, setStepData] = useState<API.NoticeParams>({
        publishtime: moment().format('YYYY-MM-DD HH:mm:ss'),
    });
    const [current, setCurrent] = useState(0);
    const formRef = useRef<any>();

    const handleSubmit = async (stepData: API.NoticeParams) => {
        try {
            console.log('Submitting:', stepData);
            // 发送请求
            const response = await upNotice(stepData);
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
                    formRef={formRef}
                    submitter={{
                        render: (props, dom) => {
                            if (props.step === 2) {
                                return null;
                            }
                            return dom;
                        },
                    }}
                >
                    <StepsForm.StepForm<API.NoticeParams>
                        formRef={formRef}
                        title="填写公告信息"
                        initialValues={stepData}
                        onFinish={async (values) => {
                            // 这里进行同步操作
                            setStepData(values);
                            setCurrent(current + 1); // 切换到下一步
                        }}
                    >
                        <ProFormText
                            label="公告标题"
                            width="md"
                            name="title"
                            rules={[{ required: true, message: '请输入公告标题' }]}
                            placeholder="请输入公告标题"
                        />
                        <ProFormTextArea
                            label="公告内容"
                            width="md"
                            name="content"
                            rules={[{ required: true, message: '请输入公告内容' }]}
                            placeholder="请输入公告内容"
                        />
                        <ProFormDatePicker
                            name="publishTime"
                            width="md"
                            label="发布时间"
                            rules={[{ required: true, message: '请输入发布时间' }]}
                            placeholder="请输入发布时间"
                        />
                    </StepsForm.StepForm>
                    <StepsForm.StepForm
                        formRef={formRef}
                        title="确认公告信息"
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
                                message="发布公告前请仔细确认，无法撤回"
                                style={{ marginBottom: 24 }}
                            />
                            <StepDescriptions stepData={stepData} bordered />
                            <Divider style={{ margin: '24px 0' }} />
                        </div>
                    </StepsForm.StepForm>
                    <StepsForm.StepForm title="完成">
                        <StepResult
                            onFinish={() => {
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

export default UpNotice;

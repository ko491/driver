import React from 'react';
import { Modal } from 'antd';
import {
  ProFormTextArea,
  StepsForm,
} from '@ant-design/pro-form';
import {API} from "@/services/ant-design-pro/typings";

export type FormValueType = {
  target?: string;
  template?: string;
  type?: string;
  time?: string;
  frequency?: string;
} & Partial<API.TableListItemQuestion>;

export type UpdateFormProps = {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => Promise<void>;
  updateModalVisible: boolean;
  values: Partial<API.updateTestList>;
};

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  return (
    <StepsForm
      stepsProps={{
        size: 'small',
      }}
      stepsFormRender={(dom, submitter) => {
        return (
          <Modal
            width={640}
            bodyStyle={{
              padding: '32px 40px 48px',
            }}
            destroyOnClose
            title="修改题目"
            visible={props.updateModalVisible}
            footer={submitter}
            onCancel={() => {
              props.onCancel();
            }}
          >
            {dom}
          </Modal>
        );
      }}
      onFinish={props.onSubmit}
    >
      <StepsForm.StepForm
        initialValues={{
          questiontext: props.values.questiontext,
        }}
        title="题目内容"
      >
        <ProFormTextArea
          label={"题目内容"}
          rules={[
            {
              required: true,
              message: '题目内容为必填项',
            },
          ]}
          placeholder={"请输入题目内容"}
          width="md"
          name="questiontext"
        />
      </StepsForm.StepForm>
      <StepsForm.StepForm
        initialValues={{
          answer: props.values.answer,
          explanation: props.values.explanation,
        }}
        title="答案及解析"
      >
        <ProFormTextArea
          label={"题目答案"}
          rules={[
            {
              required: true,
              message: '题目答案为必填项',
            },
          ]}
          placeholder={"请输入题目答案"}
          width="md"
          name="answer"
        />
        <ProFormTextArea
          label={"题目解析"}
          placeholder={"请输入题目解析"}
          rules={[
            {
              required: true,
              message: '题目解析为必填项',
            },
          ]}
          width="md"
          name="explanation"
        />
      </StepsForm.StepForm>
    </StepsForm>
  );
};

export default UpdateForm;

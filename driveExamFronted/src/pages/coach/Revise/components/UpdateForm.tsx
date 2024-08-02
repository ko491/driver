import React from 'react';
import { Modal } from 'antd';
import {
  ProFormSelect,
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
  values: Partial<API.TableListItemQuestion>;
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
          id: props.values.id,
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
          optionA: props.values.optionA,
          optionB: props.values.optionB,
          optionC: props.values.optionC,
          optionD: props.values.optionD,
        }}
        title="题目选项"
      >
        <ProFormTextArea
          label={"选项A"}
          placeholder={"请输入选项A"}
          rules={[
            {
              required: true,
              message: '选项A为必填项',
            },
          ]}
          width="md"
          name="optionA"
        />
        <ProFormTextArea
          label={"选项B"}
          placeholder={"请输入选项B"}
          rules={[
            {
              required: true,
              message: '选项B为必填项',
            },
          ]}
          width="md"
          name="optionB"
        />
        <ProFormTextArea
          label={"选项C"}
          placeholder={"请输入选项C"}
          rules={[
            {
              required: true,
              message: '选项C为必填项',
            },
          ]}
          width="md"
          name="optionC"
        />
        <ProFormTextArea
          label={"选项D"}
          placeholder={"请输入选项D"}
          rules={[
            {
              required: true,
              message: '选项D为必填项',
            },
          ]}
          width="md"
          name="optionD"
        />
      </StepsForm.StepForm>
      <StepsForm.StepForm
        initialValues={{
          answer: props.values.answer,
          explanation: props.values.explanation,
        }}
        title="答案及解析"
      >
        <ProFormSelect
          label={"题目答案"}
          rules={[
            {
              required: true,
              message: '答案为必填项',
            },
          ]}
          width="md"
          name="answer"
          valueEnum={{
            A: 'A',
            B: 'B',
            C: 'C',
            D: 'D',
          }}
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

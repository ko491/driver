import React from 'react';
import { Modal } from 'antd';
import {
  StepsForm,
} from '@ant-design/pro-form';
import {API} from "@/services/ant-design-pro/typings";
import {ProFormText} from "@ant-design/pro-components";

export type FormValueType = {
  target?: string;
  template?: string;
  type?: string;
  time?: string;
  frequency?: string;
} & Partial<API.TableListItemCoach>;

export type UpdateFormProps = {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => Promise<void>;
  updateModalVisible: boolean;
  values: Partial<API.TableListItemCoach>;
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
            title="修改教练"
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
          username: props.values.username,
          password: props.values.password,
          id: props.values.id,
        }}
        title="登录账户"
      >
        <ProFormText
          label={"登录账户"}
          rules={[
            {
              required: true,
              message: '登录账户为必填项',
            },
          ]}
          placeholder={"请输入教练账户"}
          width="md"
          name="username"
        />
        <ProFormText
          label={"登录密码"}
          rules={[
            {
              required: true,
              message: '密码为必填项',
            },
          ]}
          placeholder={"请输入教练账户密码"}
          width="md"
          name="password"
        />
      </StepsForm.StepForm>
      <StepsForm.StepForm
        initialValues={{
          fullname: props.values.fullname,
          address: props.values.address,
        }}
        title="教练信息"
      >
        <ProFormText
          label={"教练姓名"}
          placeholder={"请输入教练姓名"}
          rules={[
            {
              required: true,
              message: '教练姓名为必填项',
            },
          ]}
          width="md"
          name="fullname"
        />
        <ProFormText
          label={"常住地址"}
          placeholder={"请输入教练常住地址"}
          rules={[
            {
              required: true,
              message: '教练常住地址为必填项',
            },
          ]}
          width="md"
          name="address"
        />
      </StepsForm.StepForm>
      <StepsForm.StepForm
        initialValues={{
          phone: props.values.phone,
          email: props.values.email,
        }}
        title="教练联系方式"
      >
        <ProFormText
          label={"教练手机号"}
          rules={[
            {
              required: true,
              message: '手机号为必填项',
            },
            {
              pattern: /^\d{11}$/,
              message: '手机号格式错误!',
            },
          ]}
          width="md"
          name="phone"
        />
        <ProFormText
          label={"教练邮箱"}
          placeholder={"请输入教练邮箱"}
          rules={[
            {
              required: true,
              message: '教练邮箱为必填项',
            },
            {
              pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/,
              message: '邮箱格式错误!',
            },
          ]}
          width="md"
          name="email"
        />
      </StepsForm.StepForm>
    </StepsForm>
  );
};

export default UpdateForm;

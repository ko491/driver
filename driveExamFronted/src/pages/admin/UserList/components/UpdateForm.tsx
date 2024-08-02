import React from 'react';
import { Modal } from 'antd';
import {
  ProFormText,
  StepsForm,
} from '@ant-design/pro-form';
import {API} from "@/services/ant-design-pro/typings";


export type FormValueType = {
  target?: string;
  template?: string;
  type?: string;
  time?: string;
  frequency?: string;
} & Partial<API.TableListItemStudent>;

export type UpdateFormProps = {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => Promise<void>;
  updateModalVisible: boolean;
  values: Partial<API.TableListItemStudent>;
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
            title="更新学员信息"
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
        }}
        title="登录账户信息"
      >
          <ProFormText
              label={"登录账户"}
              rules={[
                  {
                      required: true,
                      message: '登录账户为必填项',
                  },
              ]}
              placeholder={"请输入学员账户"}
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
              placeholder={"请输入学员账户密码"}
              width="md"
              name="password"
          />
      </StepsForm.StepForm>
      <StepsForm.StepForm
        initialValues={{
          fullname: props.values.fullname,
        }}
        title="学员信息"
      ><ProFormText
          label={"学员姓名"}
          placeholder={"请输入学员姓名"}
          rules={[
              {
                  required: true,
                  message: '学员姓名为必填项',
              },
          ]}
          width="md"
          name="fullname"
      />
      </StepsForm.StepForm>
      <StepsForm.StepForm
          initialValues={{
              phone: props.values.phone,
              email: props.values.email,
          }}
          title="学员联系方式"
      >
          <ProFormText
              label={"学员手机号"}
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
              label={"学员邮箱"}
              placeholder={"请输入学员邮箱"}
              rules={[
                  {
                      required: true,
                      message: '学员邮箱为必填项',
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

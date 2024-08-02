import Footer from '@/components/Footer';
import {login} from '@/services/ant-design-pro/api';
import {
  LockOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  LoginForm,
  ProFormCheckbox,
  ProFormText,
} from '@ant-design/pro-components';
import { Alert, message, Tabs } from 'antd';
import React, { useState } from 'react';
// @ts-ignore
import { history, useModel } from 'umi';
import styles from './index.less';
import {API} from "@/services/ant-design-pro/typings";
import { ProFormRadio } from '@ant-design/pro-form';
const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);
const Login: React.FC = () => {
  const [userLoginState] = useState<API.LoginResult>({});
  const [type, setType] = useState<string>('login');
  const {initialState, setInitialState} = useModel('@@initialState');

  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();

    if (userInfo) {
      await setInitialState((s) => ({...s, currentUser: userInfo}));
    }
  };
  const handleSubmit = async (values: API.LoginParams) => {
    try {
      // 登录
      const user = await login({...values, type});
        if (user && user.code === 0) {
            // 用户成功登录的逻辑
            const defaultLoginSuccessMessage = '登录成功！';
            message.success(defaultLoginSuccessMessage);

            // 在此处调用 fetchUserInfo 函数以获取用户信息
            await fetchUserInfo();

            if (!history) return;
            const { query } = history.location;
            const { redirect } = query as {
                redirect: string;
            };
            history.push(redirect || '');
            return;
        } else {
            const defaultLoginFailureMessage = '登录失败，请重试！';
            message.error(defaultLoginFailureMessage);
        }

    } catch (error) {
      const defaultLoginFailureMessage = '登录失败，请重试！';
      message.error(defaultLoginFailureMessage);
    }
  };
  // @ts-ignore
  const {status, type: loginType,currentAuthority} = userLoginState;
  // if (currentAuthority === 'STUDENT')
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <LoginForm
          logo={<img alt="logo" src="/logo.svg" />}
          title="平安驾校"
          subTitle={'平安驾校，你值得拥有'}
          initialValues={{
            autoLogin: true,
          }}
          onFinish={async (values) => {
            await handleSubmit(values as API.LoginParams);
          }}
        >
          <Tabs activeKey={type} onChange={setType}>
            <Tabs.TabPane key="login" tab={'账户登录'} />
          </Tabs>

          {status === 'error' && loginType === 'login' && (
            <LoginMessage content={'错误的用户名和密码'} />
          )}
          {type === 'login' && (
            <>
              <ProFormText
                name="username"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={styles.prefixIcon} />,
                }}
                placeholder={'用户名'}
                rules={[
                  {
                    required: true,
                    message: '用户名是必填项！',
                  },
                ]}
              />
              <ProFormText.Password
                name="password"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon} />,
                }}
                placeholder={'密码'}
                rules={[
                  {
                    required: true,
                    message: '密码是必填项！',
                  },
                ]}
              />
              <ProFormRadio.Group
                fieldProps={{
                  size: 'large',
                }}
                name="role"
                options={[
                  {
                    label: '管理员',
                    value: 'admin',
                  },
                  {
                    label: '教练',
                    value: 'coach',
                  },
                  {
                    label: '学员',
                    value: 'student',
                  },
                ]}
              />
            </>
          )}

          <div
            style={{
              marginBottom: 24,
            }}
          >
            <ProFormCheckbox noStyle name="autoLogin">
              自动登录
            </ProFormCheckbox>
            <a
              style={{
                float: 'right',
              }}
              href={'/user/register'}
            >
              账号注册
            </a>
          </div>
        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};
export default Login;

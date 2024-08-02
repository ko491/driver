import React, { useState, useEffect } from 'react';
import {Form, Button, Input, Popover, Progress, message, Select} from 'antd';
// @ts-ignore
import { Link, history} from 'umi';
import {userRegister} from '@/services/ant-design-pro/api';
import styles from './style.less';
import { API } from '@/services/ant-design-pro/typings';

const FormItem = Form.Item;
const InputGroup = Input.Group;

const passwordStatusMap = {
  ok: (
    <div className={styles.success}>
      <span>强度：强</span>
    </div>
  ),
  pass: (
    <div className={styles.warning}>
      <span>强度：中</span>
    </div>
  ),
  poor: (
    <div className={styles.error}>
      <span>强度：太短</span>
    </div>
  ),
};
const passwordProgressMap: {
  ok: 'success';
  pass: 'normal';
  poor: 'exception';
} = {
  ok: 'success',
  pass: 'normal',
  poor: 'exception',
};

const Register: React.FC = () => {
  const [visible, setVisible]: [boolean, any] = useState(false);
  const [popover, setPopover]: [boolean, any] = useState(false);
  const confirmDirty = false;
  let interval: number | undefined;
  const [form] = Form.useForm();

  useEffect(
    () => () => {
      clearInterval(interval);
    },
    [interval],
  );

  const getPasswordStatus = () => {
    const value = form.getFieldValue('password');
    if (value && value.length > 9) {
      return 'ok';
    }
    if (value && value.length > 5) {
      return 'pass';
    }
    return 'poor';
  };

  const handSubmit = async (values: API.RegisterParams) => {
    try {
      const id = await userRegister(values);
      if (id) {
        console.log(id)
        message.success('注册成功！');
        history.push({
          pathname: '/user/register/result',
          state: {
            account: values.username,
          },
        });
      } else {
        message.error('注册失败，请重试！');
      }
    } catch (error) {
      message.error('注册失败，请重试！');
    }
  };

// 调用
  const onFinish = async (values: API.RegisterParams) => {
    await handSubmit(values);
  };

  const checkConfirm = (_: any, value: string) => {
    const promise = Promise;
    if (value && value !== form.getFieldValue('password')) {
      return promise.reject('两次输入的密码不匹配!');
    }
    return promise.resolve();
  };

  const checkPassword = (_: any, value: string) => {
    const promise = Promise;
    // 没有值的情况
    if (!value) {
      setVisible(!!value);
      return promise.reject('请输入密码!');
    }
    // 有值的情况
    if (!visible) {
      setVisible(!!value);
    }
    setPopover(!popover);
    if (value.length < 8) {
      return promise.reject('');
    }
    if (value && confirmDirty) {
      form.validateFields(['confirm']);
    }
    return promise.resolve();
  };

  const renderPasswordProgress = () => {
    const value = form.getFieldValue('password');
    const passwordStatus = getPasswordStatus();
    return value && value.length ? (
      <div className={styles[`progress-${passwordStatus}`]}>
        <Progress
          status={passwordProgressMap[passwordStatus]}
          className={styles.progress}
          strokeWidth={6}
          percent={value.length * 10 > 100 ? 100 : value.length * 10}
          showInfo={false}
        />
      </div>
    ) : null;
  };

  return (
    <div className={styles.main}>
      <h3>注册</h3>
      <Form form={form} name="UserRegister" onFinish={onFinish}>
        <Form.Item name="role">
          <Select placeholder={'请选择你注册的身份'} size="large" defaultValue={"student"}>
            <Select.Option value="coach">教练</Select.Option>
            <Select.Option value="student">学员</Select.Option>
          </Select>
        </Form.Item>
        <FormItem
          name="username"
          rules={[
            {
              required: true,
              message: '请输入用户名!',
            },
          ]}
        >
          <Input size="large" placeholder="用户名" />
        </FormItem>
        <Popover
          getPopupContainer={(node) => {
            if (node && node.parentNode) {
              return node.parentNode as HTMLElement;
            }
            return node;
          }}
          content={
            visible && (
              <div style={{ padding: '4px 0' }}>
                {passwordStatusMap[getPasswordStatus()]}
                {renderPasswordProgress()}
                <div style={{ marginTop: 10 }}>
                  <span>请至少输入 8 个字符。请不要使用容易被猜到的密码。</span>
                </div>
              </div>
            )
          }
          overlayStyle={{ width: 240 }}
          placement="right"
          visible={visible}
        >
          <FormItem
            name="password"
            className={
              form.getFieldValue('password') &&
              form.getFieldValue('password').length > 0 &&
              styles.password
            }
            rules={[
              {
                validator: checkPassword,
              },
            ]}
          >
            <Input size="large" type="password" placeholder="至少8位密码，区分大小写" />
          </FormItem>
        </Popover>
        <FormItem
          name="checkPassword"
          rules={[
            {
              required: true,
              message: '确认密码',
            },
            {
              validator: checkConfirm,
            },
          ]}
        >
          <Input size="large" type="password" placeholder="确认密码" />
        </FormItem>
        <InputGroup compact>
          <FormItem
              style={{ width: '100%' }}
              name="fullname"
              rules={[
                {
                  required: true,
                  message: '请输入姓名!',
                },
              ]}
          >
            <Input size="large" placeholder="姓名" />
          </FormItem>
        </InputGroup>
        <InputGroup compact>
          <FormItem
            style={{ width: '100%' }}
            name="phone"
            rules={[
              {
                required: true,
                message: '请输入手机号!',
              },
              {
                pattern: /^\d{11}$/,
                message: '手机号格式错误!',
              },
            ]}
          >
            <Input size="large" placeholder="手机号" />
          </FormItem>
        </InputGroup>
        <InputGroup compact>
          <FormItem
              style={{ width: '100%' }}
              name="email"
              rules={[
                {
                  required: true,
                  message: '邮箱账号!',
                },
                {
                  pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/,
                  message: '邮箱格式错误!',
                },
              ]}
          >
            <Input size="large" placeholder="邮箱账号" />
          </FormItem>
        </InputGroup>
        <FormItem>
          <Button
            size="large"
            className={styles.submit}
            type="primary"
            htmlType="submit"
          >
            <span>注册</span>
          </Button>
          <Link className={styles.login} to="/user/login">
            <span>使用已有账户登录</span>
          </Link>
        </FormItem>
      </Form>
    </div>
  );
};
export default Register;

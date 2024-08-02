import React from 'react';
import { Button, message, Popconfirm } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { history, useModel } from 'umi';
import {outLogin} from "@/services/ant-design-pro/api";

const Logout: React.FC = () => {
  const { initialState, setInitialState } = useModel('@@initialState');

  const handleLogout = async () => {
    try {
      // 调用你的退出登录接口
      await outLogin();
      // 清除本地存储的用户信息
      localStorage.removeItem('user');
      // 更新状态
      setInitialState({ ...initialState, currentUser: null });
      // 跳转到登录页面
      history.push('/user/login');
    } catch (error) {
      message.error('退出登录失败，请重试');
    }
  };

  const handleCancel = () => {
    message.info('已取消退出登录');
  };

  return (
    <Popconfirm
      title="确定要退出登录吗？"
      onConfirm={handleLogout}
      onCancel={handleCancel}
      okText="确定"
      cancelText="取消"
    >
      <Button type="primary" icon={<LogoutOutlined />}>
        退出登录
      </Button>
    </Popconfirm>
  );
};

export default Logout;

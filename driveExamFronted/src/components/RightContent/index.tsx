import { Space } from 'antd';
import React, { useState, useEffect } from 'react';
import { useModel } from 'umi';
import styles from './index.less';

export type SiderTheme = 'light' | 'dark';

const GlobalHeaderRight: React.FC = () => {
  const { initialState } = useModel('@@initialState');

  if (!initialState || !initialState.settings || !initialState.currentUser) {
    return null;
  }

  const username = initialState.currentUser?.data.username;
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    const timerID = setInterval(() => {
      const currentDate = new Date();
      setCurrentTime(currentDate.toLocaleString());
    }, 1000);

    return () => {
      clearInterval(timerID);
    };
  }, []); // 空数组表示只在组件加载时执行一次

  const { navTheme, layout } = initialState.settings;
  let className = styles.right;

  if ((navTheme === 'dark' && layout === 'top') || layout === 'mix') {
    className = `${styles.right} ${styles.dark}`;
  }

  return (
    <Space className={className} style={{ color: 'white' }}>
      Hi, {username}, 现在是 {currentTime}
    </Space>
  );
};

export default GlobalHeaderRight;

import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import {Card, Divider, List, Skeleton} from 'antd';
import ProDescriptionsComponent from './components/ProDescriptionsComponent';
import { getNotices } from '@/services/ant-design-pro/api';
import { API } from '@/services/ant-design-pro/typings';
import { PageContainer } from '@ant-design/pro-layout';

const Notice: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<API.NoticeParams[]>([]);

  const loadMoreData = async () => {
    if (loading) {
      return;
    }
    setLoading(true);

    try {
      const body = await getNotices();
      const newNotices = body || [];
      // @ts-ignore
      setData((prevData) => [...prevData, ...newNotices]);
    } catch (error) {
      console.error('Error loading more data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMoreData();
  }, []);

  return (
    <PageContainer>
      <Card>
        <InfiniteScroll
          dataLength={data.length}
          next={loadMoreData}
          hasMore={data.length < 1}
          loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
          endMessage={<Divider plain>已经到底了 🤐</Divider>}
        >
          <List
            dataSource={data}
            renderItem={(item) => (
              <ProDescriptionsComponent dataSource={item}/>
            )
          }
          />
        </InfiniteScroll>
      </Card>
    </PageContainer>
  );
};

export default Notice;

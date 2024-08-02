import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import {Button, Card, Divider, List, Skeleton} from 'antd';
import ProDescriptionsComponent from './components/ProDescriptionsComponent';
import { API } from '@/services/ant-design-pro/typings';
import { PageContainer } from '@ant-design/pro-layout';
import {getFeed} from "@/services/ant-design-pro/api";
import {CommentOutlined, SafetyOutlined } from '@ant-design/icons';

const Refeed: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<API.NoticeParams[]>([]);

  const loadMoreData = async () => {
    if (loading) {
      return;
    }
    setLoading(true);

    try {
      const body = await getFeed();
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
          endMessage={<Divider plain>已经到底了🤐</Divider>}
        >
          <List
            dataSource={data}
            renderItem={(item) => (
              <div>
                <ProDescriptionsComponent dataSource={item}/>
                {/*<Button onClick={() => handleReview(item)}>审核</Button>*/}
                {/*<Button onClick={() => handleReply(item)}>回复</Button>*/}
                {/*<Button onClick={() => handleDelete(item)}>删除</Button>*/}
                <Button type="primary" icon={<SafetyOutlined />}>
                  审核
                </Button>
                <Button type="primary" icon={<CommentOutlined />}>
                  回复
                </Button>
                <Button type="primary" danger>
                  删除
                </Button>
              </div>
            )}
          />
        </InfiniteScroll>
      </Card>
    </PageContainer>
  );
};

export default Refeed;


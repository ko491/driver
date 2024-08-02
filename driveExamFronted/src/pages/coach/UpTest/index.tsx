import React from 'react';
import { UploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import {Button, Card, message, Upload} from 'antd';
import { PageContainer } from '@ant-design/pro-layout';

const props: UploadProps = {
  name: 'file',
  action: 'http://localhost:8000/api/coach/uptest',
  headers: {
    authorization: 'authorization-text',
  },
  accept: '.xlsx',
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

const UpTest: React.FC = () => (
  <PageContainer>
    <Card>
      <Upload {...props}>
        <Button icon={<UploadOutlined />}>上传学习题库</Button>
      </Upload>
    </Card>
  </PageContainer>
);

export default UpTest;

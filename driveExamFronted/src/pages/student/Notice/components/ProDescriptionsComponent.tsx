import {ProDescriptionsActionType} from "@ant-design/pro-descriptions";
import {ProDescriptions} from "@ant-design/pro-components";
import React from "react";

interface ProDescriptionsComponentProps {
  dataSource: {
      title?: string;
      content?: string;
      publishtime?: string;
      username?: string;
  };
}

const ProDescriptionsComponent: React.FC<ProDescriptionsComponentProps> = ({ dataSource }) => {
  const actionRef = React.useRef<ProDescriptionsActionType>();

  return (
    <ProDescriptions
      actionRef={actionRef}
      dataSource={dataSource}
      >
      <ProDescriptions.Item
        label="标题"
        dataIndex={'title'}
      />
      <ProDescriptions.Item
        dataIndex={'content'}
        label="公告内容"
      />
      <ProDescriptions.Item
        dataIndex={'publishtime'}
        label="发布时间"
      />
      <ProDescriptions.Item
        label="发布管理员"
        dataIndex={'username'}
      />
    </ProDescriptions>

  );
};

export default ProDescriptionsComponent;

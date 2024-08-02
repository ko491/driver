import { PageContainer} from '@ant-design/pro-layout';
import  {FC} from 'react';
import ProTable, {ActionType, ProColumns} from "@ant-design/pro-table";
import {API} from "@/services/ant-design-pro/typings";

import {useRef} from "react";
import {allMistake} from "@/services/ant-design-pro/api";


const Mistake: FC = () => {
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<API.TableListItemMistake>[] = [
    {
      title: '错题序号',
      dataIndex: 'id',
    },
    {
      title: '题目内容',
      dataIndex: 'question',
    },
    {
      title: '我的选项',
      dataIndex: 'selectAnswer',
      hideInForm: true,
      render: (_, record) => record.selectAnswer || '未选择',
    },
    {
      title: '正确答案',
      dataIndex: 'answer',
      hideInForm: true,
    },
    {
      title: '题目解析',
      dataIndex: 'explanation',
      hideInForm: true,
    },
  ];
  return (
    <PageContainer>
      <ProTable<API.TableListItemMistake, API.TableListPagination>
        headerTitle="查询表格"
        actionRef={actionRef}
        rowKey="id"
        search={false}
        request={allMistake}
        columns={columns}
      />

    </PageContainer>
  );
};

export default Mistake;

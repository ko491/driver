import { Button, message } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import {API} from '@/services/ant-design-pro/typings';
import UpdateForm, {FormValueType} from "./components/UpdateForm";
import {alltest, updateTest} from '@/services/ant-design-pro/api';

/**
 * 更新节点
 *
 * @param fields
 * @param currentRow
 */

const handleUpdate = async (fields: FormValueType, currentRow?: API.updateTestList) => {
  const hide = message.loading('正在更新');
  try {
    await updateTest({
      ...currentRow,
      ...fields,
    });
    hide();
    message.success('更新成功');
    return true;
  } catch (error) {
    hide();
    message.error('更新失败请重试！');
    return false;
  }
};

const Study: React.FC = () => {
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<API.updateTestList>();
  /** 分布更新窗口的弹窗 */
  const actionRef = useRef<ActionType>();
  const [selectedRowsState, setSelectedRows] = useState<API.updateTestList[]>([]);

  const columns: ProColumns<API.updateTestList>[] = [
    {
      title: '题目内容',
      dataIndex: 'questiontext',
      valueType: 'textarea',
    },
    {
      title: '正确选项',
      dataIndex: 'answer',
      hideInForm: true,
    },
    {
      title: '答案详解',
      dataIndex: 'explanation',
      hideInForm: true,
    },
    {
      title: '上传教练',
      dataIndex: 'createuser',
      sorter: true,
    },
    {
      title: '发布时间',
      dataIndex: 'uptime',
      sorter: true,
    },
  ];

  return (
    <PageContainer>
      <ProTable<API.updateTestList, API.TableListPagination>
        headerTitle="查询表格"
        actionRef={actionRef}
        rowKey="questiontext"
        search={false}
        request={alltest}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              已选择{' '}
              <a
                style={{
                  fontWeight: 600,
                }}
              >
                {selectedRowsState.length}
              </a>{' '}
              项 &nbsp;&nbsp;
            </div>
          }
        >
          <Button type="primary"
                  onClick={() => {
                    setCurrentRow(selectedRowsState[0]);
                    handleUpdateModalVisible(true);
                  }}
          >修改</Button>
        </FooterToolbar>
      )}
      <UpdateForm
        onSubmit={async (value) => {
          const success = await handleUpdate(value, currentRow);
          if (success) {
            handleUpdateModalVisible(false);
            setCurrentRow(value);
            if (actionRef.current) {
              await actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleUpdateModalVisible(false);
          setCurrentRow(undefined);
        }}
        updateModalVisible={updateModalVisible}
        values={currentRow || {}}
      />
    </PageContainer>
  );
};

export default Study;

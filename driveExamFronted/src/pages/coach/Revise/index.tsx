import { PlusOutlined } from '@ant-design/icons';
import { Button, message } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import {ModalForm, ProFormSelect, ProFormTextArea} from '@ant-design/pro-form';
import { API } from '@/services/ant-design-pro/typings';
import UpdateForm, {FormValueType} from "./components/UpdateForm";
import {addQuestion, allquestion, removeQuestion, updateQuestion} from '@/services/ant-design-pro/api';
/**
 * 添加节点
 *
 * @param fields
 */

const handleAdd = async (fields: API.AddQuestion) => {
  const hide = message.loading('正在添加');
  try {
    await addQuestion({ ...fields });
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    message.error('添加失败请重试！');
    return false;
  }
};
/**
 * 更新节点
 *
 * @param fields
 * @param currentRow
 */

const handleUpdate = async (fields: FormValueType, currentRow?: API.updateQuestion) => {
  const hide = message.loading('正在更新');
  try {
    await updateQuestion({
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
/**
 * 删除节点
 *
 * @param selectedRows
 */

const handleRemove = async (selectedRows: API.TableListItemQuestion[]) => {
  const hide = message.loading('正在删除');

  if (selectedRows.length === 0) {
    hide();
    return true;
  }
  try {
    await removeQuestion({
      id: selectedRows.map((row) => row.id),
    });
    hide();
    message.success('删除成功，即将刷新', 2);
    return true;
  } catch (error) {
    hide();
    message.error(`删除失败，请重试: ${error.message}`);
    return false;
  }
};

const TableList: React.FC = () => {
  /** 新建窗口的弹窗 */
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<API.updateQuestion>();
  /** 分布更新窗口的弹窗 */
  const actionRef = useRef<ActionType>();
  const [selectedRowsState, setSelectedRows] = useState<API.TableListItemQuestion[]>([]);
  /** 国际化配置 */

  const columns: ProColumns<API.TableListItemQuestion>[] = [
    {
      title: '题目序号',
      dataIndex: 'id',
    },
    {
      title: '题目内容',
      dataIndex: 'questiontext',
      valueType: 'textarea',
    },
    {
      title: '选项A',
      dataIndex: 'optionA',
      hideInForm: true,
    },
    {
      title: '选项B',
      dataIndex: 'optionB',
      hideInForm: true,
    },
    {
      title: '选项C',
      dataIndex: 'optionC',
      hideInForm: true,
    },
    {
      title: '选项D',
      dataIndex: 'optionD',
      hideInForm: true,
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
      title: '发布者',
      dataIndex: 'fullname',
      hideInForm: true,
    },
    {
      title: '发布时间',
      dataIndex: 'uploadtime',
      sorter: true,
    },
  ];

  return (
    <PageContainer>
      <ProTable<API.TableListItemQuestion, API.TableListPagination>
        headerTitle="查询表格"
        actionRef={actionRef}
        rowKey="id"
        search={false}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleModalVisible(true);
            }}
          >
            <PlusOutlined /> 新建
          </Button>,
        ]}
        request={allquestion}
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
          <Button
            onClick={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            批量删除
          </Button>
          <Button type="primary"
                  onClick={() => {
                    setCurrentRow(selectedRowsState[0]);
                    handleUpdateModalVisible(true);
                  }}
          >修改</Button>
        </FooterToolbar>
      )}
      <ModalForm
        title="新建题目"
        width="400px"
        visible={createModalVisible}
        onVisibleChange={handleModalVisible}
        onFinish={async (value) => {
          const success = await handleAdd(value as API.AddQuestion);
          if (success) {
            handleModalVisible(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      >
        <ProFormTextArea
          rules={[
            {
              required: true,
              message: '题目内容为必填项',
            },
          ]}
          placeholder={"请输入题目内容"}
          width="md"
          name="questiontext"
        />
        <ProFormTextArea
          placeholder={"请输入选项A"}
          rules={[
            {
              required: true,
              message: '选项A为必填项',
            },
          ]}
          width="md"
          name="optionA"
        />
        <ProFormTextArea
          placeholder={"请输入选项B"}
          rules={[
            {
              required: true,
              message: '选项B为必填项',
            },
          ]}
          width="md"
          name="optionB"
        />
        <ProFormTextArea
          placeholder={"请输入选项C"}
          rules={[
            {
              required: true,
              message: '选项C为必填项',
            },
          ]}
          width="md"
          name="optionC"
        />
        <ProFormTextArea
          placeholder={"请输入选项D"}
          rules={[
            {
              required: true,
              message: '选项D为必填项',
            },
          ]}
          width="md"
          name="optionD"
        />
        <ProFormSelect
          rules={[
            {
              required: true,
              message: '答案为必填项',
            },
          ]}
          width="md"
          name="answer"
          valueEnum={{
            A: 'A',
            B: 'B',
            C: 'C',
            D: 'D',
          }}
        />
        <ProFormTextArea
          placeholder={"请输入题目解析"}
          rules={[
            {
              required: true,
              message: '题目解析为必填项',
            },
          ]}
          width="md"
          name="explanation"
        />
      </ModalForm>
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

export default TableList;

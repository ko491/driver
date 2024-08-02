import { PlusOutlined } from '@ant-design/icons';
import { Button, message } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import type{ ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import {ModalForm} from '@ant-design/pro-form';
import { API } from '@/services/ant-design-pro/typings';
import UpdateForm, {FormValueType} from "./components/UpdateForm";
import {addStudent, allStudent, removeStudent, updateStudent} from "@/services/ant-design-pro/api";
import {ProFormText} from "@ant-design/pro-components";

/**
 * 添加节点
 *
 * @param fields
 */

const handleAdd = async (fields: API.AddStudent) => {
  const hide = message.loading('正在添加');
  try {
    await addStudent({ ...fields });
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

const handleUpdate = async (fields: FormValueType, currentRow?: API.updateStudent) => {
  const hide = message.loading('正在更新');
  try {
    await updateStudent({
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

const handleRemove = async (selectedRows: API.TableListItemStudent[]) => {
  const hide = message.loading('正在删除');

  if (selectedRows.length === 0) {
    hide();
    return true;
  }
  try {
    await removeStudent({
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

const UserList: React.FC = () => {
  /** 新建窗口的弹窗 */
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<API.updateStudent>();
  /** 分布更新窗口的弹窗 */
  const actionRef = useRef<ActionType>();
  const [selectedRowsState, setSelectedRows] = useState<API.TableListItemStudent[]>([]);
  /** 国际化配置 */

  const columns: ProColumns<API.TableListItemStudent>[] = [
    {
      title: '学员序号',
      dataIndex: 'id',
    },
    {
      title: '登录账户',
      dataIndex: 'username',
      valueType: 'textarea',
    },
    {
      title: '登录密码',
      dataIndex: 'password',
      hideInForm: true,
    },
    {
      title: '学员姓名',
      dataIndex: 'fullname',
      hideInForm: true,
    },
    {
      title: ' 联系方式',
      dataIndex: 'phone',
      hideInForm: true,
    },
    {
      title: '邮箱账号',
      dataIndex: 'email',
      hideInForm: true,
    },
    {
      title: '所属教练',
      dataIndex: 'coach',
      hideInForm: true,
    },
  ]
  return (
    <PageContainer>
      <ProTable<API.TableListItemStudent, API.TableListPagination>
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
        request={allStudent}
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
        title="新建学员"
        width="400px"
        visible={createModalVisible}
        onVisibleChange={handleModalVisible}
        onFinish={async (value) => {
          const success = await handleAdd(value as API.AddStudent);
          if (success) {
            handleModalVisible(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      >
        <ProFormText
          label={"登录账号"}
          placeholder={"请输入登录账号"}
          rules={[
            {
              required: true,
              message: '登录账号为必填项',
            },
          ]}
          width="md"
          name="username"
        />
        <ProFormText
          label={"登录密码"}
          placeholder={"请输入登录密码"}
          rules={[
            {
              required: true,
              message: '登录密码为必填项',
            },
          ]}
          width="md"
          name="password"
        />
        <ProFormText
        label={"学员姓名"}
        placeholder={"请输入学员姓名"}
        rules={[
          {
            required: true,
            message: '学员姓名为必填项',
          },
        ]}
        width="md"
        name="fullname"
      />
        <ProFormText
          label={"联系方式"}
          rules={[
            {
              required: true,
              message: '手机号为必填项',
            },
            {
              pattern: /^\d{11}$/,
              message: '手机号格式错误!',
            },
          ]}
          width="md"
          name="phone"
        />
        <ProFormText
          label={"学员邮箱"}
          placeholder={"请输入学员邮箱"}
          rules={[
            {
              required: true,
              message: '学员邮箱为必填项',
            },
            {
              pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/,
              message: '邮箱格式错误!',
            },
          ]}
          width="md"
          name="email"
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

export default UserList;

import { PageContainer } from '@ant-design/pro-layout';
import type { FC } from 'react';
import styles from "@/pages/student/Exam/style.less";
import {Card} from "antd";
import ProTable, {ProColumns} from "@ant-design/pro-table";
import {API} from "@/services/ant-design-pro/typings";
import {getTest} from "@/services/ant-design-pro/api";
import {Link} from "umi";

const columns: ProColumns<API.TableListItemTest>[] = [
  {
    title: '题库序号',
    dataIndex: 'id',
  },
  {
    title: '题库名称',
    dataIndex: 'testname',
    align: 'right',
    sorter: true,
  },
  {
    title: '上传时间',
    dataIndex: 'uptime',
    sorter: true,
  },
  {
    title: '进入练习',
    dataIndex: 'starttest',
    render: (_, record) => (
      <Link to={`/student/test/practice?id=${record.id}`}>进入练习</Link>
    ),
  },
];

const Test: FC = () => {


  return (
    <PageContainer>
      <div className={styles.standardList}>
        <Card>
          <ProTable<API.TableListItemExam,API.TableListPagination>
            request={getTest}
            columns={columns}
            search={false}
            headerTitle="练习题库"
          />
        </Card>
      </div>
    </PageContainer>
  )
};

export default Test;

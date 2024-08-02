import { useEffect, useState } from 'react';
import { Card, Descriptions, Form, Input, Button } from 'antd';
import { currentCoachInfo, updateCoach } from "@/services/ant-design-pro/api";
import {PageContainer} from "@ant-design/pro-layout";

const UserInfoPage = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // 模拟从后端获取数据，实际情况中请替换为真实的后端接口
        const response = await currentCoachInfo();
        setUserData(response.data);
        form.setFieldsValue(response.data); // 将数据填充到表单中
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const onFinish = async (values) => {
    try {
      await updateCoach(values);
      // 更新成功后重新获取用户信息并更新页面
      const response = await currentCoachInfo();
      setUserData(response.data);
      form.setFieldsValue(response.data);
    } catch (error) {
      console.error('Error updating user info:', error);
    }
  };

  return (
    <PageContainer>
      <div style={{ maxWidth: 600, margin: 'auto', padding: 16 }}>
        <Card loading={loading}>
          <Form
            form={form}
            onFinish={onFinish}
            initialValues={userData}
            layout="vertical"
          >
            <Descriptions title="教练信息" bordered column={1}>
              <Descriptions.Item label="真实姓名：" span={2}>
                <Form.Item name="fullname">
                  <Input disabled />
                </Form.Item>
              </Descriptions.Item>
              <Descriptions.Item label="用户名：" span={2}>
                <Form.Item name="username">
                  <Input disabled />
                </Form.Item>
              </Descriptions.Item>
              <Descriptions.Item label="密码：" span={2}>
                <Form.Item name="password" initialValue="********" noStyle>
                  <Input.Password />
                </Form.Item>
              </Descriptions.Item>
              <Descriptions.Item label="常住地址：" span={2}>
                <Form.Item name="address">
                  <Input />
                </Form.Item>
              </Descriptions.Item>
              <Descriptions.Item label="手机号：" span={2}>
                <Form.Item name="phone">
                  <Input />
                </Form.Item>
              </Descriptions.Item>
              <Descriptions.Item label="邮箱：" span={2}>
                <Form.Item name="email">
                  <Input />
                </Form.Item>
              </Descriptions.Item>
              <Descriptions.Item label="创建管理员：" span={2}>
                <Form.Item name="coach" initialValue={userData?.admin} noStyle>
                  <Input disabled />
                </Form.Item>
              </Descriptions.Item>
            </Descriptions>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                保存
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </PageContainer>
  );
};

export default UserInfoPage;

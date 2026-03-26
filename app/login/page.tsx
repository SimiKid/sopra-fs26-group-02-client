/*.
 * Current backend of US-00-Shared-Foundations only supports:
 *   POST /users with { username }
 *
 * It can be reused later for:
 *   - #77 Registration UI
 *   - #78 Login UI
 */

export default function DisabledPage() {
  return null;
}

/*
"use client";

import { useRouter } from "next/navigation"; 
import { useApi } from "@/hooks/useApi";
import useLocalStorage from "@/hooks/useLocalStorage";
import { User } from "@/types/user";
import { Button, Form, Input } from "antd";

interface FormFieldProps {
  label: string;
  value: string;
}

const Login: React.FC = () => {
  const router = useRouter();
  const apiService = useApi();
  const [form] = Form.useForm();

  const {set: setToken,
  } = useLocalStorage<string>("token", ""); 

  const handleLogin = async (values: FormFieldProps) => {
    try {
      const response = await apiService.post<User>("/users", values);
      if (response.token) {
        setToken(response.token);
      }
      router.push("/users");
    } catch (error) {
      if (error instanceof Error) {
        alert(`Something went wrong during the login:\n${error.message}`);
      } else {
        console.error("An unknown error occurred during login.");
      }
    }
  };

  return (
    <div className="login-container">
      <Form
        form={form}
        name="login"
        size="large"
        variant="outlined"
        onFinish={handleLogin}
        layout="vertical"
      >
        <Form.Item
          name="username"
          label="Username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input placeholder="Enter username" />
        </Form.Item>
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <Input placeholder="Enter name" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-button">
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
*/
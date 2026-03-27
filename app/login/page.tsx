"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; 
import { useApi } from "@/hooks/useApi";
import { Alert, Button, Card, Form, Input, Typography } from "antd";
import useLocalStorage from "@/hooks/useLocalStorage";
import { AuthCredentials, AuthToken } from "@/types/user";
import { ApplicationError } from "@/types/error"; 

const { Title, Text } = Typography;

const Login: React.FC = () => {
  const router = useRouter();
  const apiService = useApi();
  const [form] = Form.useForm();

  const {set: setToken} = useLocalStorage<string>("token", "");
  
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleLogin = async (values: AuthCredentials) => { 
    setLoading(true);
    setErrorMessage(null);

    try {
      const response = await apiService.post<AuthToken>("/login", values);
      setToken(response.token);
      
      router.push("/lobby");

    } catch (error) {
      const err = error as ApplicationError;

      if (err.status === 401) {
        setErrorMessage("Invalid username or password.");
      } else {
        setErrorMessage("Login failed");
      }
    } finally {
      setLoading(false); // Reset loading state after failed or successful login
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
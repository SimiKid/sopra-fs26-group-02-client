"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; 
import { useApi } from "@/hooks/useApi";
import { Alert, Button, Form, Input } from "antd";
import useLocalStorage from "@/hooks/useLocalStorage";
import { AuthCredentials, AuthToken } from "@/types/user";
import { ApplicationError } from "@/types/error"; 

const Login: React.FC = () => {
  const router = useRouter();
  const apiService = useApi(); 
  const [form] = Form.useForm();

  const {set: setToken} = useLocalStorage<string>("token", "");
  const {set: setUserId} = useLocalStorage<string>("userId", "");
  
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleLogin = async (values: AuthCredentials) => { 
    setLoading(true);
    setErrorMessage(null);

    try {
      const response = await apiService.post<AuthToken>("/login", values);

      setToken(response.token);
      setUserId(response.id);

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
    <div className="page">
      <div className="container">
        <h1 className="title">Log in</h1>
        <p className="subtitle">Enter your credentials</p>

        {errorMessage && (  
          <Alert
            message={errorMessage}
            type="error"
            showIcon
            style={{ marginBottom: 16 }}
          />
        )} 

        <Form form={form} onFinish={handleLogin} layout="vertical">
          <Form.Item name="username" label="Username" rules={[{ required: true, message: "Please enter your username" }]}>
            <Input className="input" placeholder="Username" />
          </Form.Item>
          <Form.Item name="password" label="Password" rules={[{ required: true, message: "Please enter your password" }]}>
            <Input.Password className="input" placeholder="Password" />
          </Form.Item>
          
          <Form.Item>
            <Button block className="button-primary" htmlType="submit" loading={loading}>
              Log in
            </Button>
          </Form.Item>

          <Form.Item>
            <Button block className="button-secondary" htmlType = "button" onClick={() => router.push("/register")}>
              Create account
            </Button>
          </Form.Item>

          <Form.Item>
            <Button block className="button-back" htmlType = "button" onClick={() => router.push("/")}>
              Back
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
};

export default Login;
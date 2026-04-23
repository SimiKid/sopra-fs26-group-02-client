"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; 
import { useApi } from "@/hooks/useApi";
import { App, Button, Form, Input } from "antd";
import useLocalStorage from "@/hooks/useLocalStorage";
import { AuthCredentials, AuthToken } from "@/types/user";
import { ApplicationError } from "@/types/error"; 

const Register: React.FC = () => {
  const router = useRouter();
  const apiService = useApi(); 
  const [form] = Form.useForm();
  const { message } = App.useApp();
  const [loading, setLoading] = useState(false);

  const { set: setToken } = useLocalStorage<string>("token", "");
  const { set: setUserId } = useLocalStorage<string>("userId", "");

  const handleRegister = async (values: AuthCredentials) => { 
    setLoading(true);
    try {
      await apiService.post("/register", values); 
      const response = await apiService.post<AuthToken>("/login", values); 
      setToken(response.token);
      setUserId(response.id);
      window.location.href = "/lobby";
    } catch (error) {
      const err = error as ApplicationError;
      message.error(err.message ?? "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="container">
        <h1 className="title">Create Account</h1>
        <p className="subtitle">Choose your credentials</p>

        <Form form={form} onFinish={handleRegister} layout="vertical">
          <Form.Item name="username" label="Username" rules={[{ required: true, message: "Please enter your username" }]}>
            <Input className="input" placeholder="Username"/>
          </Form.Item>
          
          <Form.Item name="password" label="Password" rules={[{ required: true, message: "Please enter your password" }]}>
            <Input.Password className="input" placeholder="Password"/>
          </Form.Item>
          
          <Form.Item>
            <Button block className="button-primary" htmlType="submit" loading={loading}>
              Create Account
            </Button>
          </Form.Item>

          <Form.Item>
            <Button block className="button-secondary" htmlType = "button" onClick={() => router.push("/login")}>
              go to Login
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

export default Register;
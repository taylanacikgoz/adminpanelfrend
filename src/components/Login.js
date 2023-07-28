import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Button, Form, Input } from "antd";

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 32,
    },
  },
};

const Login = () => {
  const [checkInputMessage, setCheckInputMessage] = useState("");
  const [form] = Form.useForm();

  let navigate = useNavigate();

  function handleRegister(values) {
    axios
      .post("https://localhost:7276/api/User/login", values)
      .then((response) => {
        if (response.status === 200) {
          navigate("/configuration");
        }
      })
      .catch((error) => {
        console.error(error);
        if (error.response && error.response.status === 400) {
          // Bad request,password is incorrect
          setCheckInputMessage(
            "Please Check Your Information and try again..."
          );
          setTimeout(() => {
            setCheckInputMessage("");
          }, 3000);
        } else {
          // to Other errors
          setCheckInputMessage("An error occurred. Please try again later.");
        }
      });
  }

  return (
    <div className="container-form">
      <h3>Login Form</h3>

      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={handleRegister}
        style={{
          maxWidth: 1200,
        }}
        scrollToFirstError
      >
        <Form.Item
          name="Username"
          label="Username"
          rules={[
            {
              required: true,

              message: (
                <p style={{ color: "yellow" }}>Please input your Username</p>
              ),
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="Password"
          label="Password"
          rules={[
            {
              required: true,
              message: (
                <p style={{ color: "yellow" }}>Please input your Password!</p>
              ),
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          {checkInputMessage && (
            <span
              style={{
                color: "red",
                fontWeight: "bold",
                fontSize: "14px",
                margin: "auto",
              }}
            >
              {checkInputMessage}
            </span>
          )}
        </Form.Item>
        <Form.Item>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: "20px",
              alignItems: "center",
            }}
          >
            <Button type="primary" htmlType="submit">
              Login
            </Button>
            <span>OR</span>
            <Link
              to="/register"
              style={{
                color: "black",
                fontWeight: "900",
                textDecorationLine: "underline",
              }}
            >
              Create an account!
            </Link>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};
export default Login;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const Registration = () => {
  const [isUsernameAvailable, setIsUsernameAvailable] = useState("");
  const [isEmailAvailable, setIsEmailAvailable] = useState("");
  const [checkPasswordLength, setCheckPasswordLength] = useState("");
  const [users, setUsers] = useState([]);

  const [form] = Form.useForm();

  let navigate = useNavigate();

  useEffect(() => {
    axios.get(`https://localhost:7276/api/User/AllUsers`).then((response) => {
      console.log(response);
      setUsers(response.data);
    });
  }, []);

  function handleRegister(values) {
    // Check Username or Email isExist;
    const isUsernameTaken = users.filter(
      (item) => item.username === values.Username
    );
    const isEmailTaken = users.filter((item) => item.email === values.Email);
    if (isUsernameTaken.length > 0) {
      setIsUsernameAvailable("This Username has already taken.");
      setTimeout(() => {
        setIsUsernameAvailable("");
      }, 2000);
    } else if (isEmailTaken.length > 0) {
      setIsEmailAvailable("This Email has already taken.");
      setTimeout(() => {
        setIsEmailAvailable("");
      }, 2000);
    } else if (values.Password.length < 6) {
      setCheckPasswordLength("Password must be at least 6 characters");
      setTimeout(() => {
        setCheckPasswordLength("");
      }, 2000);
    }

    //All inputs assigned to values parameter.
    axios
      .post("https://localhost:7276/api/User/register", values)
      .then((response) => {
        if (response.data.isSuccess) {
          navigate("/login");
        }
        // Registration is Success
      })
      .catch((error) => {
        // Registration is unsuccessful.
      });
  }

  return (
    <div className="container-form">
      <h3>Registration Form</h3>

      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={handleRegister}
        style={{
          maxWidth: 800,
        }}
        scrollToFirstError
      >
        <Form.Item
          name="Username"
          label="Username"
          tooltip="What do you want others to call you?"
          rules={[
            {
              required: true,

              message: (
                <span style={{ color: "yellow" }}>
                  Please input your Username
                </span>
              ),
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        {isUsernameAvailable && (
          <span
            style={{
              color: "black",
              fontWeight: "bold",
            }}
          >
            {isUsernameAvailable}
          </span>
        )}
        <Form.Item
          name="Email"
          label="E-mail"
          rules={[
            {
              type: "email",
              message: (
                <span style={{ color: "yellow" }}>
                  The input is not valid E-mail!
                </span>
              ),
            },
            {
              required: true,
              message: (
                <span style={{ color: "yellow" }}>
                  Please input your E-mail!
                </span>
              ),
            },
          ]}
        >
          <Input />
        </Form.Item>
        {isEmailAvailable && (
          <span style={{ color: "red", fontWeight: "bold" }}>
            {isEmailAvailable}
          </span>
        )}
        <Form.Item
          name="Password"
          label="Password"
          rules={[
            {
              required: true,
              message: (
                <span style={{ color: "yellow" }}>
                  Please input your Password!
                </span>
              ),
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>
        {checkPasswordLength && (
          <span style={{ color: "red", fontWeight: "bold" }}>
            {checkPasswordLength}
          </span>
        )}

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default Registration;

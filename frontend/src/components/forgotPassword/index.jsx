import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Form, Input, Card, Button } from "antd";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
// import axios from "axios";
// axios.defaults.baseURL=import.meta.env.VITE_BASE_URL
import { toast } from "react-toastify";
import SecondPagelayout from "../../layout/SecondPagelayout";
// import { set } from "mongoose";
import http  from "../../utils/http";

const { Item } = Form;

const ForgotPassword = () => {
  const [ForgotForm] = Form.useForm();
  const [rePassword] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [params] = useSearchParams();
  const [token, setToken] = useState(null);

  // ✅ FIX: useEffect instead of useState
  useEffect(() => {
    const tok = params.get("token");
    if (tok) {
      checkToken(tok);
    } else {
      setToken(null);
    }
  }, [params]);

  const checkToken = async (tok) => {
    try {
      await http.post(
        "/api/user/verify-token",
        {},
        {
          headers: {
            Authorization: `Bearer ${tok}`,
          },
        }
      );
      setToken(tok);
    } catch (err) {
      setToken(null);
    }
  };

  const onFinish = async (values) => {
    try {
      setLoading(true);
      await http.post("/api/user/forgot-password", values);
      toast.success("Please check your email for reset instructions");
    } catch (err) {
      toast.error(err.response ? err.response.data.message : err.message);
    } finally {
      setLoading(false);
    }
  };

const onChangePassword = async (values) => {
  try {
    if (values.password !== values.rePassword) 
    return  toast.warning("Passwords do not match");
    
    setLoading(true);

    await http.put(
      "/api/user/change-password",
      values,
      {
        headers: {
          Authorization: `Bearer ${params.get("token")}`,
        },
      }
    );
toast.success("Password changed successfully, please login with your new password");
setTimeout(() => {
  navigate("/");
}, 3000);
  } catch (err) {
    toast.error(err.response ? err.response.data.message : err.message);
  } finally {
    setLoading(false);
  }
};


  return (
    <SecondPagelayout>
      <div className="flex">
        
        {/* Left Image */}
        <div className="w-1/2 hidden md:flex items-center justify-center">
          <img
            src="/otp-img.jpg"
            alt="Bank"
            className="w-4/5 object-contain"
          />
        </div>

        {/* Right Form */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-2 md:p-6 bg-white">
          <Card className="w-full max-w-sm shadow-xl">

            <h2 className="font-bold text-[#BD5EBD] text-2xl text-center mb-6">
              {token ? "Change Password" : "Forgot Password"}
            </h2>

            {
              token ? (
                <Form
                  layout="vertical"
                  onFinish={onChangePassword}
                  form={rePassword}
                >
                  <Item
                    name="password"
                    label="Password"
                    rules={[{ required: true }]}
                  >
                    <Input.Password prefix={<LockOutlined />} placeholder="Enter your new password" />
                  </Item>

                  <Item
                    name="rePassword"
                    label="Re-enter Password"
                    rules={[{ required: true }]}
                  >
                    <Input.Password prefix={<LockOutlined />} placeholder="Re-enter your password" />
                  </Item>

                  <Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      block
                      loading={loading}
                      className="!bg-[#BD5EBD]"
                    >
                      Change Password
                    </Button>
                  </Item>
                </Form>
              ) : (
                <Form
                  layout="vertical"
                  onFinish={onFinish}
                  form={ForgotForm}
                >
                  <Item
                    name="email"
                    label="Email"
                    rules={[{ required: true }]}
                  >
                    <Input prefix={<UserOutlined />}  placeholder="Enter the email"/>
                  </Item>

                  <Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      block
                      loading={loading}
                      className="!bg-[#BD5EBD]"
                    >
                      Forgot
                    </Button>
                  </Item>
                </Form>
              )
            }

            {/* Links */}
            <div className="flex justify-between">
              <Link to="/home" className="text-[#BD5EBD] font-bold underline">
                Sign in
              </Link>

              <Link to="/signup" className="text-[#BD5EBD] font-bold underline">
                Don’t have an account?
              </Link>
            </div>

          </Card>
        </div>
      </div>
    </SecondPagelayout>
  );
};

export default ForgotPassword;

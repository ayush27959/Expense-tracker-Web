import React, { useState, useEffect } from "react";
import {
  Card,
  Avatar,
  Button,
  Typography,
  Upload,
  message,
  Row,
  Col,
  Tag,
  Statistic,
} from "antd";
import {
  UserOutlined,
  UploadOutlined,
  MailOutlined,
  SafetyOutlined,
  LogoutOutlined,
  WalletOutlined,
  RiseOutlined,
  FallOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import http from "../../../utils/http";

const { Title, Text } = Typography;

const Account = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  // =====================================================
  // GET USER FROM LOCAL STORAGE
  // =====================================================
  useEffect(() => {
    const storedData = localStorage.getItem("expense-user");

    if (storedData) {
      try {
        const parsed = JSON.parse(storedData);
        
        /**
         * FIX: If your login API saves the whole response, 
         * the user data might be inside 'parsed.user' or 'parsed.data'.
         * We check for both.
         */
        const userData = parsed.user || parsed.data || parsed;
        setUser(userData);
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  // =====================================================
  // LOGOUT
  // =====================================================
  const handleLogout = () => {
    localStorage.removeItem("expense-user");
    localStorage.removeItem("token");
    message.success("Logged out successfully");
    navigate("/");
  };

  // =====================================================
  // PROFILE PHOTO UPLOAD
  // =====================================================
  const handlePhotoUpload = async (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }

    if (info.file.originFileObj) {
      const formData = new FormData();
      formData.append("avatar", info.file.originFileObj);

      try {
        const res = await http.post("/api/user/update-profile", formData);
        
        const updatedUser = {
          ...user,
          avatar: res.data.avatarUrl || res.data.user?.avatar,
        };

        setUser(updatedUser);
        localStorage.setItem("expense-user", JSON.stringify(updatedUser));
        message.success("Profile updated successfully");
      } catch (err) {
        message.error("Photo upload failed");
      } finally {
        setLoading(false);
      }
    }
  };

  // Derived values for cleaner rendering
  const displayName = user?.name || user?.fullname || user?.fullName || "User";
  const displayEmail = user?.email || "Email Not Set";

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-rose-100 p-4 md:p-10">
      <div className="max-w-6xl mx-auto">
        
        <div className="mb-10">
          <Title className="!mb-1 !text-4xl !font-extrabold text-slate-800">
            My Account
          </Title>
          <Text className="text-gray-500 text-lg">
            Manage your profile and account settings
          </Text>
        </div>

        <Row gutter={[24, 24]}>
          <Col xs={24} lg={8}>
            <Card className="rounded-3xl border-0 shadow-2xl overflow-hidden">
              <div className="h-32 bg-gradient-to-r from-[#FF735C] to-orange-400" />

              <div className="relative flex flex-col items-center pb-8 px-5">
                <div className="-mt-16 relative">
                  <Avatar
                    size={130}
                    src={user?.avatar}
                    icon={<UserOutlined />}
                    className="border-[6px] border-white shadow-xl"
                  />
                  <Upload
                    showUploadList={false}
                    beforeUpload={() => true}
                    onChange={handlePhotoUpload}
                  >
                    <Button
                      shape="circle"
                      icon={<UploadOutlined />}
                      loading={loading}
                      className="absolute bottom-2 right-0 !bg-[#FF735C] !text-white border-none shadow-lg"
                    />
                  </Upload>
                </div>

                <Title level={3} className="!mt-5 !mb-1 capitalize">
                  {displayName}
                </Title>

                <Text className="text-gray-500">
                  {displayEmail}
                </Text>

                <Tag color="orange" className="mt-4 px-4 py-1 rounded-full text-sm">
                  Premium Member
                </Tag>
              </div>
            </Card>
          </Col>

          <Col xs={24} lg={16}>
            <div className="grid gap-6">
              <Card className="rounded-3xl border-0 shadow-xl">
                <Title level={4} className="!mb-8">
                  Personal Information
                </Title>
                <div className="space-y-7">
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600 text-xl">
                      <MailOutlined />
                    </div>
                    <div>
                      <Text className="block text-xs uppercase text-gray-400 font-bold">
                        Email Address
                      </Text>
                      <Text className="text-lg font-semibold">
                        {displayEmail}
                      </Text>
                    </div>
                  </div>

                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center text-green-600 text-xl">
                      <SafetyOutlined />
                    </div>
                    <div>
                      <Text className="block text-xs uppercase text-gray-400 font-bold">
                        Account Status
                      </Text>
                      <Text className="text-lg font-semibold">
                        Verified Account
                      </Text>
                    </div>
                  </div>
                </div>
              </Card>

              <Row gutter={[16, 16]}>
                <Col xs={24} md={8}>
                  <Card className="rounded-3xl shadow-lg border-0">
                    <Statistic title="Total Balance" value="₹ 25,000" prefix={<WalletOutlined />} />
                  </Card>
                </Col>
                <Col xs={24} md={8}>
                  <Card className="rounded-3xl shadow-lg border-0">
                    <Statistic title="Income" value="₹ 40,000" valueStyle={{ color: "#16a34a" }} prefix={<RiseOutlined />} />
                  </Card>
                </Col>
                <Col xs={24} md={8}>
                  <Card className="rounded-3xl shadow-lg border-0">
                    <Statistic title="Expenses" value="₹ 15,000" valueStyle={{ color: "#dc2626" }} prefix={<FallOutlined />} />
                  </Card>
                </Col>
              </Row>

              <Card className="rounded-3xl border-0 shadow-xl">
                <div className="flex flex-col md:flex-row gap-4">
                  <Button type="primary" className="!bg-[#FF735C] !border-none !h-14 rounded-2xl flex-1 text-lg font-bold">
                    Edit Profile
                  </Button>
                  <Button danger icon={<LogoutOutlined />} onClick={handleLogout} className="!h-14 rounded-2xl flex-1 text-lg font-bold">
                    Logout
                  </Button>
                </div>
              </Card>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Account;
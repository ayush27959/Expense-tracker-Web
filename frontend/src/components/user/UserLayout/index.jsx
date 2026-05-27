import {
  AppstoreOutlined,
  BarChartOutlined,
  DollarCircleOutlined,
  LoginOutlined,
  MenuOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Image, Menu, Button, theme } from "antd";
// ❌ remove unused
// import { icons } from "antd/es/image/PreviewGroup";

import { useState } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import useSWR from "swr";
import fetcher from "../../../utils/fetch";
import Loader from "../../shared/loader";
import { toast } from "react-toastify";
import http from "../../../utils/http";

const { Sider, Header, Content } = Layout;

// ❌ remove + and fix route case
const items = [
  {
    key: "/app/user/dashboard",
    label: "Dashboard",
    icon: <AppstoreOutlined />,
  },
  {
    key: "/app/user/reports",
    label: "Reports",
    icon: <BarChartOutlined />,
  },

  {
    key: "/app/user/transactions",
    label: "Transactions",
    icon: <DollarCircleOutlined />,
  },
  {
  key: "/app/user/account",
    label: "Account",
    icon: <UserOutlined />,
  }
];

const UserLayout = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [Loading, setLoading] = useState(false);
  const { pathname } = useLocation();

  const handleNavigate = (menu) => {
    navigate(menu.key);
  };

  // const { data: session, error, isLoading } = useSWR(
  //   "/api/user/session",
  //   fetcher
  // );
  // if(isLoading)
  //   return <Loader />
  // if(!session && session?.role!=="user")

  //   return <Navigate  to="/" />
  // if(error)

  //   return <Navigate  to="/" />

  const siderStyle = {
    position: "sticky",
    insetInlineStart: 0, // ❌ insertInlineStart → fixed
    top: 0,
    bottom: 0,
  };

  const headerStyle = {
    position: "sticky",
    top: 0,
    zIndex: 1,
    width: "100%",
    backgroundColor: "#fff",
    boxShadow: "0 2px 8px #f0f1f2",
    display: "flex",
    alignItems: "center",
    padding: "0 20px",
  };
  //loagout
  const logout = async () => {
    try {
      setLoading(true);
      await http.get("/api/user/logout");
      navigate("/");
      setLoading(false);
    } catch (err) {
      setLoading(false);
      toast.error(err.response ? err.response.data.message : err.message);
    }
  };
  const {
    token: { colorBgContainer, borderRadiusLG },  
  }=theme.useToken()

  return (
    <Layout className="!min-h-screen">
      <Sider style={siderStyle} collapsible collapsed={open}>
        <div className="flex items-center justify-center my-4">
          <Image
            src="/otp-img.jpg"
            width={65}
            height={65}
            alt="logo"
            className="rounded-full mb-3"
          />
        </div>

        <Menu
          defaultSelectedKeys={[pathname]}
          theme="dark"
          items={items}
          onClick={handleNavigate}
        />
      </Sider>

      <Layout>
        <Header style={headerStyle} className="flex justify-between">
          <Button onClick={() => setOpen(!open)} icon={<MenuOutlined />} />
          <Button icon={<LoginOutlined />} onClick={logout} loading={Loading} />
        </Header>

        <Content
          style={{
            margin: "4px 8px",
            padding: 2,
            minHeight: 280,
            backgroundColor: "colorBgContainer",
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default UserLayout;

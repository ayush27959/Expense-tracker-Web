import React from 'react';
import { Layout, theme,Button } from "antd";
import { Link } from "react-router-dom";

const { Header, Footer, Content } = Layout;

const SecondPagelayout   = ({ children }) => {

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
           <Header className="!bg[#FF735C] shadow-md px-6 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          {/* Circular Logo Icon Placeholder */}
          <div className="w-10 h-10 bg-[#FF735C] rounded-xl flex items-center justify-center text-white font-bold text-xl">E</div>
          <h1 className="text-white text-xl md:text-2xl font-extrabold tracking-tight">
            Expense<span className="text-[#FF735C]">Tracker</span>
          </h1>
        </div>
<Link to='/'>
        <Button
          type="primary"
          className="!bg-[#FF735C] !border-none"
          >
        Go back on HomePage
        </Button>
          </Link>
      </Header>

      <Content
        style={{
          margin: '24px 16px',
          padding: 24,
          minHeight: 200,
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
        }}
      >
        {children}
      </Content>

 
    </Layout>
  );
};

export default SecondPagelayout;

import React from 'react';
import { Layout, theme,Button } from "antd";
import { Link } from "react-router-dom";

const { Header, Footer, Content } = Layout;

const Homelayout = ({ children }) => {

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
        <Header className="!bg-white shadow-md px-6 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          {/* Circular Logo Icon Placeholder */}
          <div className="w-10 h-10 bg-[#FF735C] rounded-xl flex items-center justify-center text-white font-bold text-xl">E</div>
          <h1 className="text-[#1e293b] text-xl md:text-2xl font-extrabold tracking-tight">
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

    <Footer className="!bg-gradient-to-r !from-[#FF735C] !to-rose-500 py-10 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 items-center text-center md:text-left">
          <div>
            <h2 className="text-white text-2xl font-extrabold tracking-wide">
              Expense<span className="text-yellow-200">Tracker</span>
            </h2>
            <p className="text-white/80 mt-3 leading-7">
              Smart and secure expense management platform to track your income, savings, and spending habits.
            </p>
          </div>

          <div>
            <h3 className="text-white text-xl font-semibold mb-3">
              Quick Links
            </h3>
            <div className="flex flex-col gap-2 text-white/90">
              <span className="hover:text-yellow-200 cursor-pointer transition-all">Home</span>
              <span className="hover:text-yellow-200 cursor-pointer transition-all">Features</span>
              <span className="hover:text-yellow-200 cursor-pointer transition-all">Analytics</span>
            </div>
          </div>

          <div>
            <h3 className="text-white text-xl font-semibold mb-3">
              Contact
            </h3>
            <p className="text-white/90">expensetracker.support@gmail.com</p>
            <p className="text-white/90 mt-2">+91 7079919201</p>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-6 text-center">
          <p className="text-white text-sm md:text-base m-0 font-medium">
            © 2026 Expense Tracker App 
          </p>
        </div>
      </Footer>
    </Layout>
  );
};

export default Homelayout;

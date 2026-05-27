import React from 'react';
import { Layout, Button } from 'antd';
import { Link } from "react-router-dom";
import {
  WalletOutlined,
  PieChartOutlined,
  SafetyCertificateOutlined,
} from '@ant-design/icons';

const { Header, Footer, Content } = Layout;

const HomeLayout = ({ children }) => {
  return (
    <Layout className="min-h-screen bg-gradient-to-br from-orange-50 to-rose-100">
      {/* Header */}
      <Header className="!bg-white shadow-md px-6 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          {/* Circular Logo Icon Placeholder */}
          <div className="w-10 h-10 bg-[#FF735C] rounded-xl flex items-center justify-center text-white font-bold text-xl">E</div>
          <h1 className="text-[#1e293b] text-xl md:text-2xl font-extrabold tracking-tight">
            Expense<span className="text-[#FF735C]">Tracker</span>
          </h1>
        </div>
<Link
    to="/home"
>
        <Button
          type="primary"
      
          className="!bg-[#FF735C] !border-none"
        >
          Get Started
        </Button>
        </Link>
      </Header>

      {/* Hero Section */}
      <div className="px-6 md:px-16 py-16 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 leading-tight">
            Track Your <span className="text-[#FF735C]">Expenses</span>
            <br /> Smarter & Faster
          </h1>

          <p className="text-gray-600 mt-6 text-lg leading-8">
            Manage your income, expenses, and savings with a modern and easy-to-use expense tracker dashboard.
          </p>

          <div className="flex gap-4 mt-8">
            <Link
            to="/home"
            >
            <Button
              size="large"
              type="primary"
              className="!bg-[#FF735C] !border-none"
              >
              Start Tracking
            </Button>
              </Link>
<Link to='/learnmore'>
            <Button size="large">
              Learn More
            </Button>
</Link>
          </div>
        </div>

        <div className="flex justify-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2489/2489756.png"
            alt="expense tracker"
            className="w-[300px] md:w-[450px] drop-shadow-2xl"
          />
        </div>
      </div>

      {/* Features */}
      <div className="px-6 md:px-16 pb-16">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
          Features
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-3xl p-8 shadow-lg hover:scale-105 transition-all duration-300">
            <PieChartOutlined className="text-5xl text-[#FF735C]" />
            <h3 className="text-2xl font-semibold mt-4">
              Analytics
            </h3>
            <p className="text-gray-600 mt-3">
              View detailed reports and charts of your daily expenses.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-lg hover:scale-105 transition-all duration-300">
            <WalletOutlined className="text-5xl text-[#FF735C]" />
            <h3 className="text-2xl font-semibold mt-4">
              Budget Control
            </h3>
            <p className="text-gray-600 mt-3">
              Set budgets and track spending to manage your finances.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-lg hover:scale-105 transition-all duration-300">
            <SafetyCertificateOutlined className="text-5xl text-[#FF735C]" />
            <h3 className="text-2xl font-semibold mt-4">
              Secure Data
            </h3>
            <p className="text-gray-600 mt-3">
              Your transactions and data stay safe and protected.
            </p>
          </div>
        </div>
      </div>

      {/* Call To Action Section */}
      <Content className="px-6 md:px-16 pb-16">
        <div className="bg-white rounded-3xl shadow-2xl p-10 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-800">
            Take Control of Your Finances Today
          </h2>

          <p className="text-gray-600 text-lg mt-6 max-w-3xl mx-auto leading-8">
            Start managing your expenses, track your savings, and build better financial habits with our smart expense tracking platform.
          </p>

          <div className="mt-8 flex justify-center gap-4 flex-wrap">
            <Link to='/home'>
            <Button
              type="primary"
              size="large"
              className="!bg-[#FF735C] !border-none"
              >
              Start Free
            </Button>
              </Link>
<Link to='/learnmore'>
            <Button size="large">
              Explore Features
            </Button>
</Link>
          </div>
        </div>
      </Content>

      {/* Footer */}
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
            <p className="text-white/90">ayushkumar27959@gmail.com</p>
            <p className="text-white/90 mt-2">+91 7079919291</p>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-6 text-center">
          <p className="text-white text-sm md:text-base m-0 font-medium">
            © 2026 Expense Tracker App | Built with React & Ant Design
          </p>
        </div>
      </Footer>
    </Layout>
  );
};

export default HomeLayout;

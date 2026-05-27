// import Homelayout from "../../../layout/Homelayout";
import React from 'react';
import { Link } from "react-router-dom";

import { Card, Button } from 'antd';
import {
  PieChartOutlined,
  WalletOutlined,
  SafetyCertificateOutlined,
  LineChartOutlined,
} from '@ant-design/icons';
import HomeLayout from '../../layout/Homelayout';


const LearnMore = () => {
    return (
<HomeLayout>

    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-rose-100 px-6 md:px-16 py-12">
      {/* Hero Section */}
      <div className="text-center max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-800 leading-tight">
          Learn More About
          <span className="text-[#FF735C]"> ExpenseTracker</span>
        </h1>

        <p className="text-gray-600 text-lg mt-6 leading-8">
          Discover how ExpenseTracker helps you manage expenses, track income,
          monitor savings, and build better financial habits with smart analytics.
        </p>
<Link to='/home'>
        <Button
          type="primary"
          size="large"
          className="!bg-[#FF735C] !border-none mt-8"
          >
          Get Started
        </Button>
            </Link>
      </div>

      {/* Features */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
        <Card className="rounded-3xl shadow-xl border-0 hover:scale-105 transition-all duration-300">
          <PieChartOutlined className="text-5xl text-[#FF735C]" />
          <h2 className="text-2xl font-bold mt-5">Analytics</h2>
          <p className="text-gray-600 mt-3 leading-7">
            Visualize your spending patterns with detailed charts and reports.
          </p>
        </Card>

        <Card className="rounded-3xl shadow-xl border-0 hover:scale-105 transition-all duration-300">
          <WalletOutlined className="text-5xl text-[#FF735C]" />
          <h2 className="text-2xl font-bold mt-5">Budget Planning</h2>
          <p className="text-gray-600 mt-3 leading-7">
            Create budgets and keep your monthly spending under control.
          </p>
        </Card>

        <Card className="rounded-3xl shadow-xl border-0 hover:scale-105 transition-all duration-300">
          <LineChartOutlined className="text-5xl text-[#FF735C]" />
          <h2 className="text-2xl font-bold mt-5">Growth Tracking</h2>
          <p className="text-gray-600 mt-3 leading-7">
            Track your savings growth and financial progress over time.
          </p>
        </Card>

        <Card className="rounded-3xl shadow-xl border-0 hover:scale-105 transition-all duration-300">
          <SafetyCertificateOutlined className="text-5xl text-[#FF735C]" />
          <h2 className="text-2xl font-bold mt-5">Secure Data</h2>
          <p className="text-gray-600 mt-3 leading-7">
            Your financial data is protected with secure authentication.
          </p>
        </Card>
      </div>

      {/* About Section */}
      <div className="mt-20 bg-white rounded-3xl shadow-2xl p-10 md:p-16">
        <h2 className="text-4xl font-bold text-gray-800 text-center">
          Why Choose ExpenseTracker?
        </h2>

        <p className="text-gray-600 text-lg leading-9 mt-8 text-center max-w-5xl mx-auto">
          ExpenseTracker is designed to simplify personal finance management.
          Whether you are tracking daily expenses, planning monthly budgets,
          or analyzing your spending habits, our platform provides everything
          you need in one modern dashboard.
        </p>

        <div className="grid md:grid-cols-3 gap-8 mt-12">
          <div className="bg-orange-50 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-[#FF735C]">
              Easy to Use
            </h3>
            <p className="text-gray-600 mt-4 leading-7">
              Clean and simple interface for fast expense management.
            </p>
          </div>

          <div className="bg-orange-50 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-[#FF735C]">
              Smart Reports
            </h3>
            <p className="text-gray-600 mt-4 leading-7">
              Generate reports to understand your spending behavior.
            </p>
          </div>

          <div className="bg-orange-50 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-[#FF735C]">
              Real-Time Tracking
            </h3>
            <p className="text-gray-600 mt-4 leading-7">
              Add and manage transactions instantly from anywhere.
            </p>
          </div>
        </div>
      </div>
    </div>

</HomeLayout>
  );
};

export default LearnMore;

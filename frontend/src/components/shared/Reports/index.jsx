import {
  BarChartOutlined,
  DollarCircleOutlined,
  MinusCircleOutlined,
  PlusCircleOutlined,
  SaveOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Progress,
  InputNumber,
  Typography,
  Space,
  message,
  Tag,
} from "antd";
import { useState, useEffect } from "react";
import http from "../../../utils/http";
import Loader from "../loader";

const { Title, Text } = Typography;

const Report = () => {
  const [report, setReport] = useState(null);

  // Get current user for unique key
  const currentUser = JSON.parse(localStorage.getItem("expense-user"));
  const budgetKey = currentUser?._id ? `monthlyBudget_${currentUser._id}` : "monthlyBudget";

  const [monthlyBudget, setMonthlyBudget] = useState(() => {
    const saved = localStorage.getItem(budgetKey);
    return saved ? Number(saved) : 0;
  });

  useEffect(() => {
    http
      .get("/api/dashboard/report")
      .then((res) => setReport(res.data))
      .catch(console.error);
  }, []);

  if (!report) return <Loader />;

  const { summary } = report;
  const spentAmount = summary.totalDebit;
  const percent = monthlyBudget > 0 ? Math.round((spentAmount / monthlyBudget) * 100) : 0;

  const handleSave = () => {
    localStorage.setItem(budgetKey, monthlyBudget);
    message.success("Monthly budget updated successfully!");
  };

  return (
    <div className="p-2 md:p-4 bg-[#f8fafc] min-h-screen">
      {/* Header Section */}
      <div className="mb-8">
        <Title level={2} className="!mb-0 !font-bold">Financial Analysis</Title>
        <Text type="secondary">Review your spending habits and manage your monthly limits.</Text>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { label: "Transactions", val: summary.totalTransaction, est: summary.totalTransactionEstimate, icon: <BarChartOutlined />, color: "rose", suffix: "T" },
          { label: "Total Credit", val: summary.totalCredit, est: summary.totalCreditEstimate, icon: <PlusCircleOutlined />, color: "green", suffix: "₹" },
          { label: "Total Debit", val: summary.totalDebit, est: summary.totalDebitEstimate, icon: <MinusCircleOutlined />, color: "orange", suffix: "₹" },
          { label: "Net Balance", val: summary.balance, est: summary.balanceEstimate, icon: <DollarCircleOutlined />, color: "indigo", suffix: "₹" },
        ].map((item, i) => (
          <Card key={i} className="border-none shadow-sm hover:shadow-md transition-all rounded-2xl overflow-hidden">
            <div className="flex items-start justify-between">
              <div>
                <Text type="secondary" className="block mb-1 font-medium">{item.label}</Text>
                <Title level={3} className="!m-0 !font-bold">
                  {item.val} <span className="text-sm font-normal text-gray-400">{item.suffix}</span>
                </Title>
                <div className="mt-2 text-[12px] bg-slate-50 px-2 py-1 rounded-md inline-block text-slate-400">
                  Est: {item.est} {item.suffix}
                </div>
              </div>
              <div className={`p-3 rounded-xl bg-${item.color}-50 text-${item.color}-500 text-xl`}>
                {item.icon}
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Set Budget Tool */}
        <Card className="shadow-sm border-none rounded-2xl lg:col-span-1">
          <Title level={4} className="!mb-6">Budget Settings</Title>
          <div className="flex flex-col gap-4">
            <div>
              <Text className="block mb-2 font-medium">Monthly Spending Limit</Text>
              <InputNumber
                size="large"
                formatter={value => `₹ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={value => value.replace(/\₹\s?|(,*)/g, '')}
                placeholder="Enter amount"
                value={monthlyBudget}
                onChange={(v) => setMonthlyBudget(v)}
                className="w-full !rounded-xl"
              />
            </div>
            <Button 
              type="primary" 
              icon={<SaveOutlined />} 
              size="large" 
              block 
              className="!h-12 !rounded-xl !bg-[#FF735C] !border-none font-bold shadow-lg shadow-orange-100"
              onClick={handleSave}
            >
              Save Budget
            </Button>
          </div>
        </Card>

        {/* Progress Visualization */}
        <Card className="shadow-sm border-none rounded-2xl lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <Title level={4} className="!m-0">Budget Utilization</Title>
            {percent > 100 && <Tag color="error" icon={<WarningOutlined />} className="animate-pulse">Critical Over-spent</Tag>}
          </div>

          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="relative">
              <Progress
                type="dashboard"
                percent={percent}
                strokeColor={{ '0%': '#FF735C', '100%': percent > 100 ? '#ff4d4f' : '#87d068' }}
                strokeWidth={10}
                size={180}
              />
            </div>

            <div className="flex-1 w-full">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-4 bg-slate-50 rounded-2xl">
                  <Text type="secondary" className="block text-xs uppercase tracking-wider font-bold">Spent So Far</Text>
                  <Title level={3} className="!m-0 !text-orange-500">₹ {spentAmount}</Title>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl">
                  <Text type="secondary" className="block text-xs uppercase tracking-wider font-bold">Total Budget</Text>
                  <Title level={3} className="!m-0 !text-slate-700">₹ {monthlyBudget}</Title>
                </div>
              </div>
              
              {percent > 100 ? (
                <div className="bg-red-50 border border-red-100 p-4 rounded-xl flex items-center gap-3">
                  <WarningOutlined className="text-red-500 text-xl" />
                  <Text className="text-red-600 font-medium">
                    You have exceeded your monthly limit by ₹ {spentAmount - monthlyBudget}!
                  </Text>
                </div>
              ) : (
                <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl">
                  <Text className="text-blue-600 font-medium">
                    Remaining balance: ₹ {monthlyBudget - spentAmount}
                  </Text>
                </div>
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Report;
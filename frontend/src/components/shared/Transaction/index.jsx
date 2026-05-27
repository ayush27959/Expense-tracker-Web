import React, { useState, useEffect } from "react";

// ======================================================
// ANT DESIGN COMPONENTS
// ======================================================

import {
  Button,
  Card,
  Input,
  Modal,
  Popconfirm,
  Table,
  Form,
  Select,
  Tag,
  Space,
  Typography,
  DatePicker,
} from "antd";

// ======================================================
// ICONS
// ======================================================

import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
  DownloadOutlined,
  PrinterOutlined,
  PlusOutlined,
} from "@ant-design/icons";

// ======================================================
// API
// ======================================================

import http from "../../../utils/http";

// ======================================================
// TOAST
// ======================================================

import { toast } from "react-toastify";

// ======================================================
// DATE FORMAT
// ======================================================

import { formDate } from "../../../../../Backend/src/utils/date";

// ======================================================
// DATE FILTER
// ======================================================

import dayjs from "dayjs";

// ======================================================
// PDF & EXCEL
// ======================================================

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

const { Item } = Form;
const { Text } = Typography;

const Transaction = () => {

  // ======================================================
  // FORM
  // ======================================================

  const [transactionForm] = Form.useForm();

  // ======================================================
  // STATES
  // ======================================================

  const [edit, setEdit] = useState(null);

  const [modal, setModal] = useState(false);

  const [loading, setLoading] = useState(false);

  const [transactions, setTransactions] = useState([]);

  const [search, setSearch] = useState("");

  // DATE FILTER STATES

  const [fromDate, setFromDate] =
    useState(null);

  const [toDate, setToDate] =
    useState(null);

  // PAGINATION

  const [pagination, setPagination] =
    useState({
      current: 1,
      pageSize: 5,
      total: 0,
    });

  // ======================================================
  // TABLE COLUMNS
  // ======================================================

  const columns = [

    {
      title: "Type",

      dataIndex: "transactionType",

      render: (type) => (
        <Tag
          color={
            type === "cr"
              ? "green"
              : "red"
          }
          className="!px-3 !py-1 !rounded-full"
        >
          {type === "cr"
            ? "Credit"
            : "Debit"}
        </Tag>
      ),
    },

    {
      title: "Transaction Details",

      render: (_, record) => (
        <div className="flex flex-col">

          <Text strong>
            {record.title}
          </Text>

          <Text type="secondary">
            {record.notes}
          </Text>

        </div>
      ),
    },

    {
      title: "Amount",

      dataIndex: "amount",

      render: (
        amount,
        record
      ) => (
        <span
          className={`font-bold ${
            record.transactionType ===
            "cr"
              ? "text-green-600"
              : "text-red-500"
          }`}
        >
          ₹ {amount}
        </span>
      ),
    },

    {
      title: "Payment",

      dataIndex: "paymentMethod",

      render: (method) => (
        <Tag
          color={
            method === "online"
              ? "blue"
              : "gold"
          }
        >
          {method}
        </Tag>
      ),
    },

    {
      title: "Date",

      dataIndex: "createdAt",

      render: (date) => (
        <span>
          {formDate(date)}
        </span>
      ),
    },

    {
      title: "Actions",

      render: (_, obj) => (
        <Space>

          {/* EDIT */}

          <Popconfirm
            title="Edit Transaction?"
            onConfirm={() =>
              onEditTransaction(obj)
            }
          >
            <Button
              shape="circle"
              icon={<EditOutlined />}
              className="!bg-blue-100 !text-blue-600"
            />
          </Popconfirm>

          {/* DELETE */}

          <Popconfirm
            title="Delete Transaction?"
            onConfirm={() =>
              onDelete(obj._id)
            }
          >
            <Button
              danger
              shape="circle"
              icon={
                <DeleteOutlined />
              }
            />
          </Popconfirm>

        </Space>
      ),
    },

  ];

  // ======================================================
  // FETCH TRANSACTIONS
  // ======================================================

  const fetchTransaction = async (
    page = 1,
    pageSize = 5,
    query = ""
  ) => {

    try {

      setLoading(true);

      const res = await http.get(
        `/api/transaction/get?page=${page}&limit=${pageSize}&search=${query}`
      );

      const { data, total } =
        res.data;

      setTransactions(data);

      setPagination({
        current: page,
        pageSize,
        total,
      });

    } catch (err) {

      toast.error(
        "Failed to fetch transactions"
      );

    } finally {

      setLoading(false);

    }
  };

  // ======================================================
  // FETCH ON LOAD
  // ======================================================

  useEffect(() => {

    fetchTransaction(
      pagination.current,
      pagination.pageSize,
      search
    );

  }, []);

  // ======================================================
  // SEARCH
  // ======================================================

  const onSearch = (e) => {

    setSearch(e.target.value);

  };

  // ======================================================
  // FILTER TRANSACTIONS
  // ======================================================

  const filteredTransactions =
    transactions.filter((item) => {

      // SEARCH FILTER

      const searchValue =
        search.toLowerCase();

      const matchSearch =

        item.title
          ?.toLowerCase()
          .includes(searchValue) ||

        item.notes
          ?.toLowerCase()
          .includes(searchValue);

      // DATE FILTER

      const transactionDate =
        dayjs(item.createdAt);

      const matchFromDate =

        fromDate
          ? transactionDate.isAfter(
              dayjs(fromDate).startOf(
                "day"
              )
            ) ||
            transactionDate.isSame(
              dayjs(fromDate).startOf(
                "day"
              )
            )
          : true;

      const matchToDate =

        toDate
          ? transactionDate.isBefore(
              dayjs(toDate).endOf(
                "day"
              )
            ) ||
            transactionDate.isSame(
              dayjs(toDate).endOf(
                "day"
              )
            )
          : true;

      return (
        matchSearch &&
        matchFromDate &&
        matchToDate
      );

    });

  // ======================================================
  // CREATE TRANSACTION
  // ======================================================

  const onFinish = async (
    values
  ) => {

    try {

      setLoading(true);

      await http.post(
        "/api/transaction/create",
        values
      );

      toast.success(
        "Transaction Added"
      );

      fetchTransaction(
        pagination.current,
        pagination.pageSize,
        search
      );

      setModal(false);

      transactionForm.resetFields();

    } catch (err) {

      toast.error(
        err?.response?.data
          ?.message ||
          err.message
      );

    } finally {

      setLoading(false);

    }
  };

  // ======================================================
  // UPDATE TRANSACTION
  // ======================================================

  const onUpdate = async (
    values
  ) => {

    try {

      setLoading(true);

      await http.put(
        `/api/transaction/update/${edit._id}`,
        values
      );

      toast.success(
        "Transaction Updated"
      );

      fetchTransaction(
        pagination.current,
        pagination.pageSize,
        search
      );

      setModal(false);

      setEdit(null);

      transactionForm.resetFields();

    } catch (err) {

      toast.error(
        err?.response?.data
          ?.message ||
          err.message
      );

    } finally {

      setLoading(false);

    }
  };

  // ======================================================
  // DELETE TRANSACTION
  // ======================================================

  const onDelete = async (
    id
  ) => {

    try {

      setLoading(true);

      await http.delete(
        `/api/transaction/delete/${id}`
      );

      toast.success(
        "Transaction Deleted"
      );

      fetchTransaction(
        pagination.current,
        pagination.pageSize,
        search
      );

    } catch (err) {

      toast.error(
        err?.response?.data
          ?.message ||
          err.message
      );

    } finally {

      setLoading(false);

    }
  };

  // ======================================================
  // EDIT TRANSACTION
  // ======================================================

  const onEditTransaction = (
    obj
  ) => {

    setEdit(obj);

    transactionForm.setFieldsValue(
      obj
    );

    setModal(true);

  };

  // ======================================================
  // DOWNLOAD EXCEL
  // ======================================================

  const downloadExcel = () => {

    const worksheet =
      XLSX.utils.json_to_sheet(
        filteredTransactions
      );

    const workbook =
      XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Transactions"
    );

    XLSX.writeFile(
      workbook,
      "Transactions.xlsx"
    );

    toast.success(
      "Excel Downloaded"
    );

  };

  // ======================================================
  // EXPORT PDF
  // ======================================================

  const exportPDF = () => {

    const doc = new jsPDF();

    doc.text(
      "Expense Tracker Report",
      14,
      15
    );

    const tableRows =
      filteredTransactions.map(
        (item) => [
          item.transactionType,
          item.title,
          item.amount,
          item.paymentMethod,
          formDate(
            item.createdAt
          ),
        ]
      );

    autoTable(doc, {

      head: [[
        "Type",
        "Title",
        "Amount",
        "Method",
        "Date",
      ]],

      body: tableRows,

      startY: 20,

    });

    doc.save(
      "Transactions_Report.pdf"
    );

    toast.success(
      "PDF Downloaded"
    );

  };

  return (

    <div className="p-4">

      <Card
        className="rounded-2xl shadow-lg border-0"

        title={
          <div>

            <h2 className="text-2xl font-bold">
              Transactions
            </h2>

            <p className="text-gray-500 text-sm">
              Manage all your income
              & expenses
            </p>

          </div>
        }

        extra={
          <div className="flex flex-wrap gap-2">

            {/* SEARCH */}

            <Input
              placeholder="Search transaction..."
              prefix={
                <SearchOutlined />
              }
              value={search}
              onChange={onSearch}
              allowClear
              className="w-64"
            />

            {/* FROM DATE */}

            <DatePicker
              placeholder="From Date"
              onChange={(date) =>
                setFromDate(date)
              }
            />

            {/* TO DATE */}

            <DatePicker
              placeholder="To Date"
              onChange={(date) =>
                setToDate(date)
              }
            />

            {/* PDF */}

            <Button
              icon={
                <PrinterOutlined />
              }
              onClick={exportPDF}
            >
              PDF
            </Button>

            {/* EXCEL */}

            <Button
              icon={
                <DownloadOutlined />
              }
              onClick={downloadExcel}
              className="!bg-green-600 !text-white border-none"
            >
              Excel
            </Button>

            {/* ADD */}

            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() =>
                setModal(true)
              }
            >
              Add Transaction
            </Button>

          </div>
        }
      >

        {/* TABLE */}

        <Table
          columns={columns}

          dataSource={
            filteredTransactions
          }

          rowKey="_id"

          loading={loading}

          pagination={pagination}

          onChange={(pag) => {

            fetchTransaction(
              pag.current,
              pag.pageSize,
              search
            );

          }}
        />

      </Card>

      {/* MODAL */}

      <Modal
        open={modal}
        footer={null}
        destroyOnClose
        title={
          edit
            ? "Update Transaction"
            : "Add Transaction"
        }
        onCancel={() => {

          setModal(false);

          setEdit(null);

          transactionForm.resetFields();

        }}
      >

        <Form
          layout="vertical"
          form={transactionForm}
          onFinish={
            edit
              ? onUpdate
              : onFinish
          }
        >

          <Item
            label="Transaction Type"
            name="transactionType"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              options={[
                {
                  label: "Credit",
                  value: "cr",
                },
                {
                  label: "Debit",
                  value: "dr",
                },
              ]}
            />
          </Item>

          <Item
            label="Amount"
            name="amount"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input type="number" />
          </Item>

          <Item
            label="Title"
            name="title"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Item>

          <Item
            label="Payment Method"
            name="paymentMethod"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              options={[
                {
                  label: "Cash",
                  value: "cash",
                },
                {
                  label: "Online",
                  value: "online",
                },
              ]}
            />
          </Item>

          <Item
            label="Notes"
            name="notes"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input.TextArea rows={3} />
          </Item>

          <Button
            type="primary"
            htmlType="submit"
            block
            loading={loading}
          >
            {edit
              ? "Update Transaction"
              : "Add Transaction"}
          </Button>

        </Form>

      </Modal>

    </div>
  );
};

export default Transaction;

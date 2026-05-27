import React, { useState, useEffect } from "react";

// ======================================================
// ANT DESIGN COMPONENTS
// ======================================================

import {
  Button,
  Card,
  Input,
  Table,
  Tag,
  DatePicker,
} from "antd";

// ======================================================
// ICONS
// ======================================================

import {
  EyeInvisibleOutlined,
  EyeOutlined,
  SearchOutlined,
  DownloadOutlined,
  PrinterOutlined,
} from "@ant-design/icons";

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

// ======================================================
// SWR
// ======================================================

import useSWR, { mutate } from "swr";

// ======================================================
// FETCHER
// ======================================================

import fetcher from "../../../utils/fetch";

// ======================================================
// DATE FORMAT
// ======================================================

import { formDate } from "../../../../../Backend/src/utils/date";

// ======================================================
// API
// ======================================================

import http from "../../../utils/http";

// ======================================================
// TOAST
// ======================================================

import { toast } from "react-toastify";

const Users = () => {

  // ======================================================
  // STATES
  // ======================================================

  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");

  // DATE FILTER STATES

  const [fromDate, setFromDate] = useState(null);

  const [toDate, setToDate] = useState(null);

  // ======================================================
  // FETCH USERS
  // ======================================================

  const { data, isLoading } = useSWR(
    "/api/user/get",
    fetcher
  );

  // ======================================================
  // SET USERS
  // ======================================================

  useEffect(() => {

    if (data) {

      setUsers(data);

    }

  }, [data]);

  // ======================================================
  // SEARCH + DATE FILTER
  // ======================================================

  const filteredUsers = users.filter((user) => {

    // SEARCH FILTER

    const searchValue =
      search.toLowerCase();

    const matchSearch =

      user.fullname
        ?.toLowerCase()
        .includes(searchValue) ||

      user.email
        ?.toLowerCase()
        .includes(searchValue) ||

      user.mobile
        ?.toLowerCase()
        .includes(searchValue);

    // DATE FILTER

    const userDate = dayjs(
      user.createdAt
    );

    const matchFromDate =

      fromDate
        ? userDate.isAfter(
            dayjs(fromDate).startOf("day")
          ) ||
          userDate.isSame(
            dayjs(fromDate).startOf("day")
          )
        : true;

    const matchToDate =

      toDate
        ? userDate.isBefore(
            dayjs(toDate).endOf("day")
          ) ||
          userDate.isSame(
            dayjs(toDate).endOf("day")
          )
        : true;

    return (
      matchSearch &&
      matchFromDate &&
      matchToDate
    );

  });

  // ======================================================
  // SEARCH FUNCTION
  // ======================================================

  const onSearch = (e) => {

    setSearch(e.target.value);

  };

  // ======================================================
  // EXPORT EXCEL
  // ======================================================

  const downloadExcel = () => {

    const excelData =
      filteredUsers.map((user) => ({

        Role: user.role,

        Fullname: user.fullname,

        Email: user.email,

        Mobile: user.mobile,

        Status: user.status
          ? "Active"
          : "Blocked",

        Date: formDate(
          user.createdAt
        ),

      }));

    const worksheet =
      XLSX.utils.json_to_sheet(
        excelData
      );

    const workbook =
      XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Users"
    );

    XLSX.writeFile(
      workbook,
      "Users_Report.xlsx"
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

    doc.setFontSize(18);

    doc.text(
      "Users Report",
      14,
      20
    );

    const tableRows =
      filteredUsers.map((user) => [

        user.role,

        user.fullname,

        user.email,

        user.mobile,

        user.status
          ? "Active"
          : "Blocked",

        formDate(
          user.createdAt
        ),

      ]);

    autoTable(doc, {

      startY: 30,

      head: [[
        "Role",
        "Fullname",
        "Email",
        "Mobile",
        "Status",
        "Date",
      ]],

      body: tableRows,

    });

    doc.save(
      "Users_Report.pdf"
    );

    toast.success(
      "PDF Downloaded"
    );

  };

  // ======================================================
  // UPDATE STATUS
  // ======================================================

  const onStatus = async (obj) => {

    try {

      setLoading(true);

      await http.put(
        `/api/user/status/${obj._id}`,
        {
          status: !obj.status,
        }
      );

      toast.success(
        "Status Updated"
      );

      mutate("/api/user/get");

    } catch (err) {

      toast.error(
        err?.response?.data?.message ||
        err.message
      );

    } finally {

      setLoading(false);

    }
  };

  // ======================================================
  // TABLE COLUMNS
  // ======================================================

  const columns = [

    {
      title: "Role",

      dataIndex: "role",

      render: (role) => (
        <Tag color="blue">
          {role}
        </Tag>
      ),
    },

    {
      title: "Fullname",

      dataIndex: "fullname",
    },

    {
      title: "Mobile",

      dataIndex: "mobile",
    },

    {
      title: "Email",

      dataIndex: "email",
    },

    {
      title: "Date",

      dataIndex: "createdAt",

      render: (date) =>
        formDate(date),
    },

    {
      title: "Status",

      dataIndex: "status",

      render: (status, obj) => (

        status ? (

          <Button
            shape="circle"
            icon={<EyeOutlined />}
            className="!bg-green-500 !text-white"
            onClick={() =>
              onStatus(obj)
            }
            loading={loading}
          />

        ) : (

          <Button
            shape="circle"
            icon={
              <EyeInvisibleOutlined />
            }
            className="!bg-red-500 !text-white"
            onClick={() =>
              onStatus(obj)
            }
            loading={loading}
          />

        )
      ),
    },

  ];

  return (

    <div className="p-4">

      <Card
        className="rounded-2xl shadow-lg border-0"

        title={
          <div>

            <h2 className="text-2xl font-bold">
              Users Management
            </h2>

            <p className="text-gray-500 text-sm">
              Manage all users
            </p>

          </div>
        }

        extra={
          <div className="flex flex-wrap gap-2">

            {/* SEARCH */}

            <Input
              placeholder="Search user..."
              prefix={<SearchOutlined />}
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
              icon={<PrinterOutlined />}
              onClick={exportPDF}
            >
              PDF
            </Button>

            {/* EXCEL */}

            <Button
              icon={<DownloadOutlined />}
              onClick={downloadExcel}
              className="!bg-green-600 !text-white border-none"
            >
              Excel
            </Button>

          </div>
        }
      >

        {/* TABLE */}

        <Table
          columns={columns}

          dataSource={filteredUsers}

          rowKey="_id"

          loading={
            isLoading || loading
          }

          pagination={{
            pageSize: 5,
          }}
        />

      </Card>

    </div>
  );
};

export default Users;

import { Alert, Button, Card, Col, Row, Space, Table, Tag } from "antd";
import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import { TiDeleteOutline } from "react-icons/ti";
import { CiEdit } from "react-icons/ci";
import "./quanlykhoa.scss";
import { useEffect, useState } from "react";
import { getListKhoa } from "../../../services/admin/khoa.Service";
import XoaKhoa from "./delete";
import SearchForm from "../../../helpers/search-form";


function QuanLyKhoa() {
  const [listKhoa, setListKhoa] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const permission = JSON.parse(localStorage.getItem("permission") || "[]");

  const fetchAPI = async () => {
    const res = await getListKhoa();
    if (res) {
      setListKhoa(res.khoa.reverse());
    }
  };
  useEffect(() => {
    fetchAPI();
  }, []);

  const handleReload = () => {
    fetchAPI();
  };

  const columns = [
    {
      title: "STT",
      key: "index",
      render: (text, record, index) => (currentPage - 1) * pageSize + index + 1
    },
    {
      title: "Tên Khoa",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone"
    },
    {
      title: "Tên trưởng khoa",
      dataIndex: "headDepartment",
      key: "headDepartment"
    },
    {
      title: "Ngày thành lập",
      dataIndex: "dateEstablishment",
      key: "dateEstablishment"
    },
    {
      title: "Trang thái",
      dataIndex: "status",
      key: "status",
      render: (_, { status }) => {
        const color = status ? "green" : "volcano"
        return (
          <Tag className="khoa__status" color={color} key={status}>
            {status === true ? <FaCheckCircle /> : <TiDeleteOutline />}
          </Tag>
        )
      }
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => {
        return (
          <Space>
            {permission.includes("permission_khoa_edit") ?
              <Link to={`/admin/chinh-sua-khoa/${record._id}`}>
                <Button icon={<CiEdit />} variant="outLined" className="khoa__action" color="purple"></Button>
              </Link>
              :
              <Button icon={<CiEdit />} variant="outLined" className="khoa__action" color="purple"></Button>
            }

            <XoaKhoa record={record} onReload={handleReload} />
          </Space>
        )
      }

    },
  ]
  return (
    <>
      <Alert message="quản lý khoa" type="info" className="khoa__alert" />
      <Row>
        <Col span={24} className="khoa__search">
          <SearchForm
            placeholder="Nhập tên khoa..."
            url="khoa"
            onSearchResult={data => setListKhoa(data.khoa)}
          />
        </Col>
      </Row>
      <Card
        title="Danh sách khoa"
        extra={
          <>
            {permission.includes("permission_khoa_add") ?
              <Link to="/admin/them-moi-khoa">
                <Button
                  variant="outlined"
                  color="cyan"
                  className="khoa__button-create"
                >
                  Thêm mới khoa
                </Button>
              </Link>
              :
              <Button
                variant="outlined"
                color="cyan"
                className="khoa__button-create"
              >
                Thêm mới khoa
              </Button>
            }
          </>

        }
      >
        <Table
          rowKey="_id"
          columns={columns}
          dataSource={listKhoa}
          pagination={{
            current: currentPage,
            pageSize: pageSize,
            showSizeChanger: true,
            total: listKhoa.length,
            pageSizeOptions: ['1', '10', '25', '50'],
            onChange: (page, size) => {
              setCurrentPage(page);
              setPageSize(size)
            }
          }}
        />
      </Card>
    </>
  )
};

export default QuanLyKhoa;
import { Alert, Button, Card, Col, Row, Space, Table, Tag } from "antd";
import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import { TiDeleteOutline } from "react-icons/ti";
import { CiEdit } from "react-icons/ci";
import { useEffect, useState } from "react";
import "./quanlytaikhoanadmin.scss";
import { getListAccount } from "../../../services/admin/account.service";
import XoaTaiKhoanAdmin from "./delete";
import SearchForm from "../../../helpers/search-form";


function TaiKhoanAdmin() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const permission = JSON.parse(localStorage.getItem("permission") || "[]");

  const fetchApi = async () => {
    const res = await getListAccount();
    if (res) {
      setData(res.taikhoanadmin);
    }
  };

  useEffect(() => {
    fetchApi();
  }, []);

  const handleReload = () => {
    fetchApi();
  }

  const colums = [
    {
      title: "STT",
      key: "index",
      render: (text, record, index) => (currentPage - 1) * pageSize + index + 1
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "Phân quyền",
      dataIndex: "roleName",
      key: "roleName"
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone"
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email"
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (_, { status }) => {
        let color = "green";
        if (status === false) {
          color = "volcano";
        }
        return (
          <>
            <Tag className="taikhoanadmin__status" color={color} key={status}>
              {status === true ? <FaCheckCircle /> : <TiDeleteOutline />}
            </Tag>
          </>
        )
      }
    },
    {
      title: "Hành động",
      key: "hanhdong",
      render: (_, record) => {
        return (
          <Space>
            {permission.includes("permission_accountAdmin_edit") ?
              <Link to={`/admin/chinh-sua-tai-khoan-admin/${record._id}`}>
                <Button className="taikhoanadmin__action" icon={<CiEdit />} variant="outLined" color="purple" >
                </Button>
              </Link>
              :
              <Button className="taikhoanadmin__action" icon={<CiEdit />} variant="outLined" color="purple" >
              </Button>
            }

            <XoaTaiKhoanAdmin record={record} onReload={handleReload} />

          </Space>
        )
      }
    }
  ];
  return (
    <>
      <Alert message="Quản lý tài khoản Admin" type="info" className="taikhoanadmin__alert" />
      <Row>
        <Col span={24} className="taikhoanadmin__search">
          <SearchForm
            placeholder="Nhập tên tài khoản..."
            url="tai-khoan-admin"
            onSearchResult={(data) => { setData(data.taikhoanadmin) }}
          />
        </Col>
      </Row>
      <Card
        title="Danh sách tài khoản"
        extra={
          <>
            {permission.includes("permission_accountAdmin_add") ?
              <Link to="/admin/them-moi-tai-khoan-admin">
                <Button
                  variant="outlined"
                  color="cyan"
                  className="taikhoanadmin__button-create"
                >
                  Thêm tài khoản
                </Button>
              </Link>
              :
              <Button
                variant="outlined"
                color="cyan"
                className="taikhoanadmin__button-create"
              >
                Thêm tài khoản
              </Button>
            }

          </>
        }
      >
        <Table
          rowKey="_id"
          columns={colums}
          dataSource={data}
          pagination={{
            current: currentPage,
            pageSize: pageSize,
            showSizeChanger: true,
            total: data.length,
            pageSizeOptions: ['10', '20', '50', '100'],
            onChange: (page, size) => {
              setCurrent(page);
              setPageSize(size);
            },
          }}
        />

      </Card>
    </>
  )
}
export default TaiKhoanAdmin;
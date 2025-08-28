import { Alert, Button, Card, Col, Image, Row, Space, Table, Tag } from "antd";
import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import { TiDeleteOutline } from "react-icons/ti";
import { CiEdit } from "react-icons/ci";
import { useEffect, useState } from "react";
import { getListTrangThietBi } from "../../../services/admin/TrangThietBi";
import "./quanlytrangthietbi.scss";
import XoaThietBi from "./delete";
import SearchForm from "../../../helpers/search-form";

function QuanLyTrangThietBi() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const permission = JSON.parse(localStorage.getItem("permission") || "[]");


  const fetchAPI = async () => {
    const res = await getListTrangThietBi();
    if (res) {
      setData(res.thietbi);
    }
  };
  useEffect(() => {
    fetchAPI();
  }, []);

  const handleReload = () => {
    fetchAPI();
  }

  const columns = [
    {
      title: "STT",
      key: "index",
      render: (text, record, index) => (currentPage - 1) * pageSize + index + 1
    },
    {
      title: "Ảnh",
      key: "image",
      dataIndex: "image",
      render: (_, record) => {
        return <Image width={100} src={record.image} />
      }
    },
    {
      title: "Tên thiết bị",
      key: "title",
      dataIndex: "title"
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
            <Tag className="thietbi__status" color={color} key={status}>
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
            {permission.includes("permission_thietbi_edit") ?
              <Link to={`/admin/chinh-sua-thiet-bi/${record._id}`}>
                <Button className="thietbi__action" icon={<CiEdit />} variant="outLined" color="purple" >
                </Button>
              </Link>
              :
              <Button className="thietbi__action" icon={<CiEdit />} variant="outLined" color="purple" >
              </Button>
            }

            <XoaThietBi record={record} onReload={handleReload} />

          </Space>
        )
      }
    }
  ]
  return (
    <>
      <Alert message="Quản lý trang thiết bị" type="info" className="thietbi__alert" />
      <Row>
        <Col span={24} className="thietbi__search">
          <SearchForm
            placeholder="Nhập tên thiết bị..."
            url="trang-thiet-bi"
            onSearchResult={data => setData(data.thietbi)}
          />
        </Col>
      </Row>
      <Card
        title="Danh sách trang thiết bị"
        extra={
          <>
            {permission.includes("permission_thietbi_add") ?
              <Link to="/admin/them-moi-thiet-bi">
                <Button
                  variant="outlined"
                  color="cyan"
                  className="thietbi__button-create"
                >
                  Thêm thiết bị
                </Button>
              </Link>
              :
              <Button
                variant="outlined"
                color="cyan"
                className="thietbi__button-create"
              >
                Thêm thiết bị
              </Button>
            }

          </>
        }
      >
        <Table
          rowKey="_id"
          columns={columns}
          dataSource={data}
          pagination={{
            current: currentPage,
            pageSize: pageSize,
            showSizeChanger: true,
            total: data.length,
            pageSizeOptions: ['10', '25', '50'],
            onChange: (page, size) => {
              setCurrentPage(page)
              setPageSize(size)
            }
          }}
        />

      </Card>
    </>
  )
}
export default QuanLyTrangThietBi;
import { Alert, Button, Card, Col, Image, Row, Space, Table, Tag } from "antd";
import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import { TiDeleteOutline } from "react-icons/ti";
import { CiEdit } from "react-icons/ci";
import "./tintuc.scss";
import { useEffect, useState } from "react";
import SearchForm from "../../../helpers/search-form";
import { getListTinTuc } from "../../../services/admin/tintuc.service";
import XoaTinTuc from "./delete";


function QuanLyTinTuc() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const permission = JSON.parse(localStorage.getItem("permission") || "[]");

  const fetchAPI = async () => {
    const res = await getListTinTuc();
    if (res) {
      setData(res.tintuc.reverse());
    }
  }
  useEffect(() => {
    fetchAPI();
  }, []);
  const handleReload = () => {
    fetchAPI();
  };


  const colums = [
    {
      title: "STT",
      key: "index",
      render: (text, record, index) => (currentPage - 1) * pageSize + index + 1
    },
    {
      title: "Ảnh",
      dataIndex: "image",
      key: "image",
      render: (_, record) => {
        return <Image width={130} src={record.image} />
      }
    },
    {
      title: "Tiêu đề",
      dataIndex: "title",
      key: "title"
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
            <Tag className="tintuc__status" color={color} key={status}>
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
            {permission.includes("permission_tintuc_edit") ?
              <Link to={`/admin/chinh-sua-tin-tuc-su-kien/${record._id}`}>
                <Button className="tintuc__action" icon={<CiEdit />} variant="outLined" color="purple" >
                </Button>
              </Link>
              :
              <Button className="tintuc__action" icon={<CiEdit />} variant="outLined" color="purple" >
              </Button>
            }

            <XoaTinTuc record={record} onReload={handleReload} />

          </Space>
        )
      }
    }
  ];
  return (
    <>
      <Alert message="QUẢN LÝ TIN TỨC & SỰ KIỆN" type="info" className="tintuc__alert" />
      <Row>
        <Col span={24} className="tintuc__search">
          <SearchForm
            placeholder="Nhập tiêu đề..."
            url="tin-tuc-su-kien"
            onSearchResult={(data) => { setData(data.tintuc) }}
          />
        </Col>
      </Row>
      <Card
        title="Danh sách tin túc & sự kiện"
        extra={
          <>
            {permission.includes("permission_tintuc_add") ?
              <Link to="/admin/them-moi-tin-tuc-su-kien">
                <Button
                  variant="outlined"
                  color="cyan"
                  className="tintuc__button-create"
                >
                  Thêm tin tức sự kiên
                </Button>
              </Link>
              :
              <Button
                variant="outlined"
                color="cyan"
                className="tintuc__button-create"
              >
                Thêm tin tức sự kiên
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
              setCurrentPage(page);
              setPageSize(size);
            },
          }}
        />

      </Card>
    </>
  )
}
export default QuanLyTinTuc;
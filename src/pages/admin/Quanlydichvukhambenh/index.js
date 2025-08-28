import { Alert, Card, Col, Image, Row, Space, Table, Tag } from "antd";
import { FaCheckCircle } from "react-icons/fa";
import { TiDeleteOutline } from "react-icons/ti";
import "./dichvu.scss";
import { useEffect, useState } from "react";
import SearchForm from "../../../helpers/search-form";
import { getListDichVu } from "../../../services/admin/dichvu.service";
import ThemMoiDichVuKhamBenh from "./create";

import ChinhSuaDichVuKhamBenh from "./edit";
import XoaDichVu from "./delete";


function QuanLyDichVuKhamBenh() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const fetchAPI = async () => {
    const res = await getListDichVu();
    if (res) {
      setData(res.dichvu.reverse());
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
      title: "Icon",
      dataIndex: "image",
      key: "image",
      render: (_, record) => {
        return <Image width={80} src={record.image} />
      }
    },
    {
      title: "Tiêu đề",
      dataIndex: "title",
      key: "title"
    },
    
    {
      title: "Nội dung",
      dataIndex: "content",
      key: "content"
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
            <Tag className="dichvu__status" color={color} key={status}>
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
            <ChinhSuaDichVuKhamBenh dichvu_id={record._id} onReload={handleReload}/>
            <XoaDichVu record={record} onReload={handleReload} />

          </Space>
        )
      }
    }
  ];
  return (
    <>
      <Alert message="QUẢN LÝ DỊCH VỤ KHÁM BỆNH" type="info" className="dichvu__alert" />
      <Row>
        <Col span={24} className="dichvu__search">
          <SearchForm
            placeholder="Nhập tiêu đề..."
            url="dich-vu-kham-benh"
            onSearchResult={(data) => { setData(data.dichvu) }}
          />
        </Col>
      </Row>
      <Card
        title="Danh sách dịch vụ khám bệnh "
        extra={
          <>
            <ThemMoiDichVuKhamBenh onReload={handleReload}/>
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
export default QuanLyDichVuKhamBenh;
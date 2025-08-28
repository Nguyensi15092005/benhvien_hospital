import { Alert, Button, Card, Col, Row, Space, Table, Tag } from "antd";
import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import { TiDeleteOutline } from "react-icons/ti";
import { CiEdit } from "react-icons/ci";

import { useEffect, useState } from "react";
import { getDSbacsi } from "../../../services/admin/BacSi.Service";
import XoaBacSi from "./delete";
import SearchForm from "../../../helpers/search-form";


function QuanLyBacSi() {
  const [databs, setDatabs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const permission = JSON.parse(localStorage.getItem("permission") || "[]");
  const fetchAPI = async () => {
    const res = await getDSbacsi();
    if (res) {
      setDatabs(res.bacsi.reverse());
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
      title: "Mã",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Tên bác sĩ",
      dataIndex: "fullName",
      key: "fullName"
    },
    {
      title: "Khoa",
      dataIndex: "nameKhoa",
      key: "nameKhoa"
    },
    {
      title: "Học vị",
      dataIndex: "degree",
      key: "degree"
    },
    {
      title: "Giới tính",
      dataIndex: "sex",
      key: "sex"
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
            <Tag className="nhomquyen__status" color={color} key={status}>
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
            {permission.includes("permission_bacsi_edit") ?
              <Link to={`/admin/chinh-sua-bac-si/${record._id}`}>
                <Button className="bacsi__action" icon={<CiEdit />} variant="outLined" color="purple" >
                </Button>
              </Link>
              :
              <Button className="bacsi__action" icon={<CiEdit />} variant="outLined" color="purple" >
              </Button>
            }
            
            <XoaBacSi record={record} onReload={handleReload} />

          </Space>
        )
      }
    }
  ];
  return (
    <>
      <Alert message="QUẢN LÝ BÁC SĨ" type="info" className="bacsi__alert" />
      <Row>
        <Col span={24} className="bacsi__search">
          <SearchForm
            placeholder="Nhập mã bác sĩ..."
            url="bac-si"
            onSearchResult={(data) => { setDatabs(data.bacsi) }}
          />
        </Col>
      </Row>
      <Card
        title="Danh sách Bác Sĩ"
        extra={
          <>
            {permission.includes("permission_bacsi_add") ?
              <Link to="/admin/them-moi-bac-si">
                <Button
                  variant="outlined"
                  color="cyan"
                  className="bacsi__button-create"
                >
                  Thêm Bác Sĩ
                </Button>
              </Link>
              :
              <Button
                variant="outlined"
                color="cyan"
                className="bacsi__button-create"
              >
                Thêm Bác Sĩ
              </Button>
            }

          </>
        }
      >
        <Table
          rowKey="_id"
          columns={colums}
          dataSource={databs}
          pagination={{
            current: currentPage,
            pageSize: pageSize,
            showSizeChanger: true,
            total: databs.length,
            pageSizeOptions: ['10', '20', '50', '100'],
            onChange: (page, size) => {
              setCurrentPage(page);
              setPageSize(size);
            },
          }}
        />

      </Card >
    </>
  )
}
export default QuanLyBacSi;
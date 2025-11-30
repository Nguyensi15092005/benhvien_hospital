import { Alert, Button, Card, Col, message, Row, Space, Table, Tag } from "antd";
import { Link } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
import "./lichkham.scss";
import { useEffect, useState } from "react";
import SearchForm from "../../../helpers/search-form";
import { getLishLichKham, pacthStatus } from "../../../services/admin/lichkham.service";
import dayjs from "dayjs";
import HuyLichKham from "./delete";
import TraLoiLichKham from "./reply";


function LichKham() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [messageApi, contextHolder] = message.useMessage();
  const permission = JSON.parse(localStorage.getItem("permission") || "[]");

  const fetchAPI = async () => {
    const res = await getLishLichKham();
    if (res) {
      setData(res.lichkham.reverse());
    }
  }
  useEffect(() => {
    fetchAPI();
  }, []);

  const handleReload = () => {
    fetchAPI();
  };

  const handleChanStatus = async (id, status) => {
    const res = await pacthStatus(id, status);
    console.log(id, status)
    if (res.code === 200) {
      fetchAPI();
      messageApi.success("Thay đổi trạng thái thành công");
    }
    else {
      messageApi.error("Thất bại");
    }
  }


  const colums = [
    {
      title: "STT",
      key: "index",
      render: (text, record, index) => (currentPage - 1) * pageSize + index + 1
    },
    {
      title: "Tên người khám",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone"
    },
    {
      title: "Khoa Khám",
      dataIndex: "nameKhoa",
      key: "nameKhoa"
    },
    {
      title: "Bác sĩ khám",
      dataIndex: "nameBacsi",
      key: "nameBacsi"
    },
    {
      title: "Ngày giờ khám",
      dataIndex: "examination_date",
      key: "examination_date",
      render: (_, { examination_date }) => {
        return dayjs(examination_date).format("HH:mm DD/MM/YYYY");
      }
    },
    {
      title: "Loại dịch vụ",
      dataIndex: "service",
      key: "service",
      render: (_, { service }) => {
        let color = "green";
        if (service === "thuong") {
          color = "blue";
        }
        return (
          <>
            <Tag className="lichkham__status" color={color} key={service}>
              {service === "vip" ? "VIP" : "Thường"}
            </Tag>
          </>
        )
      }
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (_, record) => {
        let color = "green";
        if (record.status === false) {
          color = "volcano";
        }
        return (
          <>
            {permission.includes("permission_lichkham_edit") ?
              <Tag className="lichkham__status" color={color} key={record.status} onClick={() => handleChanStatus(record._id, record.status)}>
                {record.status === true ? "Đã duyệt" : "Chưa duyệt"}
              </Tag>
              :
              <Tag className="lichkham__status" color={color} key={record.status} >
                {record.status === true ? "Đã duyệt" : "Chưa duyệt"}
              </Tag>
            }

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
            <TraLoiLichKham record={record}/>
            {permission.includes("permission_lichkham_edit") ?
              <Link to={`/admin/chinh-sua-lich-kham/${record._id}`}>
                <Button className="lichkham__action" icon={<CiEdit />} variant="outLined" color="purple" >
                </Button>
              </Link>
              :
              <Button className="lichkham__action" icon={<CiEdit />} variant="outLined" color="purple" >
              </Button>
            }
            <HuyLichKham record={record} onReload={handleReload}/>
          </Space>
        )
      }
    }
  ];
  return (
    <>
      {contextHolder}
      <Alert message="QUẢN LÝ LỊCH KHÁM" type="info" className="lichkham__alert" />
      <Row>
        <Col span={24} className="lichkham__search">
          <SearchForm
            placeholder="Nhập tên người khám..."
            url="lich-kham"
            onSearchResult={(data) => { setData(data.lichkham) }}
          />
        </Col>
      </Row>
      <Card
        title="Danh sách lịch khám"
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
export default LichKham;
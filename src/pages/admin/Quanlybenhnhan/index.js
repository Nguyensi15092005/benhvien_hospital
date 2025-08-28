import { Alert, Button, Card, Space, Table, Tag } from "antd";
import { Link } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
import { useEffect, useState } from "react";
import "./quanlybenhnhan.scss";
import { getListBenhNhan } from "../../../services/admin/BenhNhan.Service";
import XoaBenhNhan from "./delete";
import SearchForm from "../../../helpers/search-form";



function QuanLyBenhNhan() {
  const [databenhnhan, setBenhnhan] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const fetchAPI = async () => {
    const res = await getListBenhNhan();
    if (res) {
      setBenhnhan(res.benhnhan.reverse());
    }
  };
  useEffect(() => {
    fetchAPI();
  }, [])
  const handleReload = () => {
    fetchAPI();
  }

  const columns = [
    {
      title: "STT",
      key: "index",
      render: (text, record, index) => (currentPage-1)*pageSize + index + 1
    },
    {
      title: "Tên",
      dataIndex: "fullName",
      key: "fullName"
    },
    {
      title: "Ngày sinh",
      dataIndex: "dateBirth",
      key: "dateBirth"
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone"
    },
    {
      title: "Mã Cccd",
      dataIndex: "cccd",
      key: "cccd"
    },
    {
      title: "Mã Bhyt",
      dataIndex: "bhyt",
      key: "bhyt"
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
        let color = "";
        if (status === "active") {
          color = "blue";
        }
        else if (status === "inactive") {
          color = "orange"
        }
        else if (status === "discharged") {
          color = "green"
        }
        else if (status === "referred") {
          color = "magenta"
        }
        else if (status === "deceased") {
          color = "red"
        }

        return (
          <>
            <Tag className="benhnhan__status" color={color} key={status}>
              {status === "active"
                ? "Đang điều trị"
                : status === "inactive"
                  ? "Chờ tiếp nhận"
                  : status === "discharged"
                    ? "Xuất viện"
                    : status === "referred"
                      ? "Chuyển viện"
                      : status === "deceased"
                        ? "Tử vong"
                        : "Không rõ"}
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
            <Link to={`/admin/chinh-sua-benh-nhan/${record._id}`}>
              <Button className="benhnhan__action" icon={<CiEdit />} variant="outLined" color="purple" >
              </Button>
            </Link>
            <XoaBenhNhan record={record} onReload={handleReload} />
          </Space>
        )
      }
    }
  ]
  return (
    <>
      <Alert message="Quản Lý Bệnh nhân" type="info" className="benhnhan__alert" />
      <Card
        title="Danh sách bệnh nhân"
        extra={
          <SearchForm 
            placeholder="Nhập tên bênh nhân..."
            url="benh-nhan"
            onSearchResult={data => setBenhnhan(data.benhnhan)}
          />
        }
      >
        <Table 
          rowKey="_id" 
          columns={columns} 
          dataSource={databenhnhan} 
          pagination={{
            current: currentPage,
            pageSize: pageSize,
            showSizeChanger: true,
            total: databenhnhan.length,
            pageSizeOptions: ['10', '25', '50', '100'],
            onChange: (page, size) =>{
              setCurrentPage(page);
              setPageSize(size);
            }
          }}
        />


      </Card>
    </>
  )
}
export default QuanLyBenhNhan;
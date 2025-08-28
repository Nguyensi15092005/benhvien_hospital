import { Alert, Button, Card, Col, Row, Space, Table, Tag } from "antd";
import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import { TiDeleteOutline } from "react-icons/ti";
import { CiEdit } from "react-icons/ci";
import { useEffect, useState } from "react";
import { getListNhomQuyen } from "../../../services/admin/NhomQuyen.service";
import "./nhomquyen.scss";
import XoaNhomQuyen from "./delete";

function NhomQuyen() {
  const [data, setData] = useState([]);
  const permission = JSON.parse(localStorage.getItem("permission") || "[]");

  const fetchApi = async () => {
    const res = await getListNhomQuyen();
    if (res) {
      setData(res.role);
    }
  };
  useEffect(() => {
    fetchApi();
  }, [])

  const handleReload = () => {
    fetchApi();
  }

  const colums = [
    {
      title: "STT",
      key: "index",
      render: (text, record, index) => index + 1
    },
    {
      title: "Tên nhóm quyền",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description"
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
            {permission.includes("permission_role_edit") ?
              <Link to={`/admin/chinh-sua-nhom-quyen/${record._id}`}>
                <Button className="nhomquyen__action" icon={<CiEdit />} variant="outLined" color="purple" >
                </Button>
              </Link>
              :
              <Button className="nhomquyen__action" icon={<CiEdit />} variant="outLined" color="purple" >
              </Button>
            }

            <XoaNhomQuyen record={record} onReload={handleReload} />

          </Space>
        )
      }
    }
  ];
  return (
    <>
      <Alert message="Quản lý nhóm quyền" type="info" className="nhomquyen__alert" />
      <Row>
        <Col span={24} className="nhomquyen__search">
          {/* <SearchForm
            placeholder="Nhập mã bác sĩ..."
            url="bac-si"
            onSearchResult={(data) => { setDatabs(data.bacsi) }}
          /> */}
        </Col>
      </Row>
      <Card
        title="Danh sách tài khoản"
        extra={
          <>
            {permission.includes("permission_role_add") ?
              <Link to="/admin/them-nhom-quyen">
                <Button
                  variant="outlined"
                  color="cyan"
                  className="nhomquyen__button-create"
                >
                  Thêm nhóm quyền
                </Button>
              </Link>
              :
              <Button
                variant="outlined"
                color="cyan"
                className="nhomquyen__button-create"
              >
                Thêm nhóm quyền
              </Button>
            }

          </>
        }
      >
        <Table
          rowKey="_id"
          columns={colums}
          dataSource={data}
        // pagination={{
        //   current: currentPage,
        //   pageSize: pageSize,
        //   showSizeChanger: true,
        //   total: databs.length,
        //   pageSizeOptions: ['10', '20', '50', '100'],
        //   onChange: (page, size) => {
        //     setCurrentPage(page);
        //     setPageSize(size);
        //   },
        // }}
        />

      </Card>
    </>
  )
};
export default NhomQuyen;
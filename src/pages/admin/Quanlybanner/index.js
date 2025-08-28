import { Alert, Card, Image, Space, Table, Tag } from "antd";
import { FaCheckCircle } from "react-icons/fa";
import { TiDeleteOutline } from "react-icons/ti";
import { useEffect, useState } from "react";
import "./banner.scss";
import { getListBanner } from "../../../services/admin/banner.service";
import ThemMoiBanner from "./create";
import ChinhSuaBanner from "./edit";
import XoaBanner from "./delete";



function QuanLyBanner () {
  const [data, setData] = useState([]);

  const fetchAPI = async () =>{
    const res = await getListBanner();
    if(res){
      setData(res.banner);
    }
  };
  useEffect(()=>{
    fetchAPI();
  },[]);

  const handleReload = () => {
    fetchAPI();
  }

  const columns = [
    {
      title: "STT",
      key: "index",
      render: (text, record, index) =>  index + 1
    },
    {
      title: "Ảnh",
      key: "image",
      dataIndex: "image",
      render: (_, record) => {
        return <Image width={150} src={record.image} />
      }
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
            <Tag className="banner__status" color={color} key={status}>
              {status === true ? <FaCheckCircle /> : <TiDeleteOutline /> }
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
            <ChinhSuaBanner banner_id={record._id} onReload={handleReload}/>
            <XoaBanner record={record} onReload={handleReload} />
            
          </Space>
        )
      }
    }
  ]
  return (
    <>
      <Alert message="Quản lý Banner" type="info" className="banner__alert"/>
      <Card
        title="Danh sách banner"
        extra = {
          <>
            <ThemMoiBanner onReload={handleReload}/>
          </>
        }
      >
        <Table
          rowKey="_id"
          columns={columns}
          dataSource={data}
        />

      </Card>
    </>
  )
}
export default QuanLyBanner;
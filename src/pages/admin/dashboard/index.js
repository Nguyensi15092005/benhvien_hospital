import { Card, Col, Row, Table, Tag } from "antd";
import "./dashboard.scss";
import { FaUserDoctor, FaRegRectangleList } from "react-icons/fa6";
import { LuCalendarPlus2 } from "react-icons/lu";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getLichHen, getLichkhamgannhat, getlistDashboard, getThongKeBieuDo } from "../../../services/admin/dashboard.service";
import { Area } from '@ant-design/plots';
import dayjs from "dayjs";

function HomeAdmin() {
  const [dataCount, setdataCount] = useState();
  const [dataBieudo, setDataBieuDo] = useState([]);
  const [dataLichhen, setDataLichhen] = useState([]);
  const [dataGannhat, setDataGannhat] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const res = await getlistDashboard();
      if (res) {
        setdataCount(res);
      };
      const resbieudo = await getThongKeBieuDo();
      if (resbieudo) {
        setDataBieuDo(resbieudo);
      };
      const resLichhen = await getLichHen();
      if(resLichhen){
        setDataLichhen(resLichhen.reverse());
      };
      const resGannhat = await getLichkhamgannhat();
      if(resGannhat){
        setDataGannhat(resGannhat);
      }
    };
    fetchApi();
  }, []);

  const columns = [
    {
      title: "Bác Sĩ",
      dataIndex: "nameBacsi",
      key: "nameBacsi"
    },
    {
      title: "Bệnh nhân",
      dataIndex: "fullName",
      key: "fullName"
    },
    {
      title: "Thời gian khám",
      dataIndex: "examination_date",
      key: "examination_date",
      render: (_, { examination_date }) => {
        return dayjs(examination_date).format("HH:mm DD/MM/YYYY");
      }
    },
    {
      title: "Trạng thái",
      dataIndex: "deleted",
      key: "deleted",
      render: (_, record) => {
        let color = "green";
        if(record.deleted === true){
          color = "red"
        };
        return (
          <>
            <Tag className="" color={color} key={record.deleted}>
              {record.deleted? "Đã hủy": "Hoàn thành" }
            </Tag>
          </>
        )
      }
    }
  ];

  const config = {
    data: dataBieudo ? dataBieudo : [],
    xField: "date",
    yField: "quantity",
    shapeField: 'smooth',
    point: {
      sizeField: 4,
      style: {
        stroke: 'blue',
        fill: '#fff',
      },
    },
    style: {
      fill: "#0b58dc57",
    },
    line: {
      style: {
        stroke: 'blue',
        lineWidth: 2,
      },
    },
  };

  return (
    <>
      <Row gutter={[30, 30]} className="dashboard">
        <Col span={8}>
          <Link to="/admin/quan-ly-bac-si" className="dashboard__item">
            <FaUserDoctor className="dashboard__icon dashboard__icon--bacsi" />
            <div className="dashboard__item--count dashboard__item--count-bacsi">
              <h2>{dataCount ? dataCount.countbacsi : ""}</h2>
              <h3>Bác sĩ</h3>
            </div>
          </Link>
        </Col>
        <Col span={8}>
          <Link to="/admin/lich-kham" className="dashboard__item">
            <LuCalendarPlus2 className="dashboard__icon dashboard__icon--lichkham" />
            <div className="dashboard__item--count dashboard__item--count-lichkham">
              <h2>{dataCount ? dataCount.countlichkham : ""}</h2>
              <h3>Lịch khám</h3>
            </div>
          </Link>
        </Col>
        <Col span={8}>
          <Link to="/admin/quan-ly-khoa" className="dashboard__item">
            <FaRegRectangleList className="dashboard__icon dashboard__icon--khoa" />
            <div className="dashboard__item--count dashboard__item--count-khoa">
              <h2>{dataCount ? dataCount.countkhoa : ""}</h2>
              <h3>Khoa</h3>
            </div>
          </Link>
        </Col>
      </Row>
      <Row gutter={[30, 30]}>
        <Col span={16} >
          <Card
            className="dashboard__cardBieudo"
            title="Thống kê lịch khám theo tháng"
          >
            <div className="dashboard__bieudo">
              <Area {...config} />
            </div>
          </Card>
        </Col>
        <Col span={8} >
          <Card
            className="dashboard__cardBieudo"
            title="Lịch hẹn sắp tới"
          >
            <div className="dashboard__bieudo">
              <ul>
                {dataLichhen?.map(item=> (
                  <li key={item._id}>
                    <div className="time">
                      {dayjs(item.examination_date).format("HH:mm")}
                    </div>
                    <div className="name">{item.fullName}</div>
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Card
            className="dashboard__gannhat"
            title="Lịch khám gần nhất"
          >
            <Table
              columns={columns}
              dataSource={dataGannhat}
              pagination={false}
            />
            
            
          </Card>
        </Col>
      </Row>
    </>
  )
}
export default HomeAdmin
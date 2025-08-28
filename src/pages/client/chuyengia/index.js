import { useEffect, useState } from "react";
import "./chuyengia.scss";
import { getSetting } from "../../../services/client/setting.service";
import { getPagiBS } from "../../../services/client/bacsi.sevice";
import { Col, Pagination, Row } from "antd";
import { useSearchParams } from "react-router-dom";

function ChuyenGia() {
  const [searchParams, setSearch] = useSearchParams();
  const [chuyengiaImagePage, setImage] = useState();
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    const fetchApi = async () => {
      const resImage = await getSetting();
      if (resImage) {
        setImage(resImage.setting.chuyengiaImagePage);
      }

    };
    fetchApi();
  }, []);

  useEffect(() => {
    const fetchApi = async () => {
      const res = await getPagiBS(page);
      if (res) {
        setData(res.bacsi);
        setTotal(res.totalCount)
      }
    };
    fetchApi();
  }, [page]);

  useEffect(() => {
    const pageParam = parseInt(searchParams.get("page")) || 1;
    setPage(pageParam);
  }, [searchParams]);
  return (
    <>
      <div className="chuyengia">
        {chuyengiaImagePage ? <img src={chuyengiaImagePage} className="chuyengia__image-page" alt="chuyengiaPageImage" /> : <></>}
        <div className="chuyengia__title">
          Chuyên gia-bác sĩ
        </div>
        <div className="chuyengia__not">
          <span></span>
        </div>
        <Row justify="space-around" gutter={[0, 25]}>
          {data?.map(item => {
            return (
              <Col xl={7} lg={11} md={24} key={item.slug}>
                <div className="chuyengia__box">
                  <div className="chuyengia__box--image">
                    <img src={item.image} alt="avatar" />
                  </div>
                  <h2>
                    {item.degree} {item.fullName}
                  </h2>
                </div>
              </Col>
            )
          })}
        </Row>

        <div className="chuyengia__pagi">
          <Pagination
            align="center"
            current={page}
            pageSize={pageSize}
            total={total}
            onChange={(page, pageSize) => {
              setPage(page);
              setPageSize(pageSize);
              setSearch({ page: page });
            }}
          />
        </div>
      </div>
    </>
  )
}
export default ChuyenGia;
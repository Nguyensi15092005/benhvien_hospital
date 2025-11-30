import { useEffect, useState } from 'react';
import { Select } from 'antd';
import { getListKhoa } from '../services/client/khoa.service';
import { getListNhomQuyen } from '../services/admin/NhomQuyen.service';
import { getListBSKhoaId } from '../services/client/bacsi.sevice';


export const SelectKhoaId = ({ value, onChange }) => {
  const [khoa, setKhoa] = useState();
  useEffect(() => {
    const fetchAPI = async () => {
      const res = await getListKhoa();
      if (res) {
        setKhoa(res);
      }
    }
    fetchAPI();
  }, [])
  const options = khoa?.map(item => ({
    value: item._id,
    label: item.name
  }))
  return (
    <Select
      value={value}
      onChange={onChange}
      showSearch
      style={{ width: '100%' }}

      placeholder="-- Chọn Khoa --"
      optionFilterProp="label"
      filterSort={(optionA, optionB) => {
        var _a, _b;
        return (
          (_a = optionA === null || optionA === void 0 ? void 0 : optionA.label) !== null &&
            _a !== void 0
            ? _a
            : ''
        )
          .toLowerCase()
          .localeCompare(
            ((_b = optionB === null || optionB === void 0 ? void 0 : optionB.label) !== null &&
              _b !== void 0
              ? _b
              : ''
            ).toLowerCase(),
          );
      }}
      options={options}

    />
  )
};

export const SelectBacSiId = ({ value, onChange, khoaId }) => {
  const [bacsi, setBacsi] = useState([]);
  useEffect(() => {
    const fetchAPI = async () => {
      if (!khoaId) {
        setBacsi([]);
        return;
      }
      const res = await getListBSKhoaId(khoaId);
      if (res) setBacsi(res);
    }
    fetchAPI();
  }, [khoaId])
  const options = bacsi?.map(item => ({
    value: item._id,
    label: item.fullName
  }))
  return (
    <Select
      value={value}
      onChange={onChange}
      showSearch
      style={{ width: '100%' }}

      placeholder="-- Chọn bác sĩ --"
      optionFilterProp="label"
      filterSort={(optionA, optionB) => {
        var _a, _b;
        return (
          (_a = optionA === null || optionA === void 0 ? void 0 : optionA.label) !== null &&
            _a !== void 0
            ? _a
            : ''
        )
          .toLowerCase()
          .localeCompare(
            ((_b = optionB === null || optionB === void 0 ? void 0 : optionB.label) !== null &&
              _b !== void 0
              ? _b
              : ''
            ).toLowerCase(),
          );
      }}
      options={options}

    />
  )
};


export const SelectStatusBenhNhan = ({ value, onChange }) => {
  const options = [
    {
      value: "active", 
      label: "Đang điều trị"
    },
    {
      value: "inactive", 
      label: "Chờ tiếp nhận"
    },
    {
      value: "discharged", 
      label: "Xuất viện"
    },
    {
      value: "referred", 
      label: "Chuyển viện"
    },
    {
      value: "deceased", 
      label: "Tử vong"
    },
  ]
  return (
    <Select
      value={value}
      onChange={onChange}
      showSearch
      style={{ width: 200 }}

      placeholder="-- Chọn Khoa --"
      optionFilterProp="label"
      filterSort={(optionA, optionB) => {
        var _a, _b;
        return (
          (_a = optionA === null || optionA === void 0 ? void 0 : optionA.label) !== null &&
            _a !== void 0
            ? _a
            : ''
        )
          .toLowerCase()
          .localeCompare(
            ((_b = optionB === null || optionB === void 0 ? void 0 : optionB.label) !== null &&
              _b !== void 0
              ? _b
              : ''
            ).toLowerCase(),
          );
      }}
      options={options}

    />
  )
};


export const SelectRoleId = ({ value, onChange }) => {
  const [role, setRole] = useState();
  useEffect(() => {
    const fetchAPI = async () => {
      const res = await getListNhomQuyen();
      if (res) {
        setRole(res.role);
      }
    }
    fetchAPI();
  }, [])
  const options = role?.map(item => ({
    value: item._id,
    label: item.name
  }))
  return (
    <Select
      value={value}
      onChange={onChange}
      showSearch
      style={{ width: 200 }}

      placeholder="-- Chọn nhóm quyền --"
      optionFilterProp="label"
      filterSort={(optionA, optionB) => {
        var _a, _b;
        return (
          (_a = optionA === null || optionA === void 0 ? void 0 : optionA.label) !== null &&
            _a !== void 0
            ? _a
            : ''
        )
          .toLowerCase()
          .localeCompare(
            ((_b = optionB === null || optionB === void 0 ? void 0 : optionB.label) !== null &&
              _b !== void 0
              ? _b
              : ''
            ).toLowerCase(),
          );
      }}
      options={options}

    />
  )
};


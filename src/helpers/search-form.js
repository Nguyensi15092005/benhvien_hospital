import { Input, Space } from "antd";
import { useState } from "react";

const { Search } = Input;

function SearchForm({ 
    onSearchResult,
    url,
    placeholder,

  }) {
  const [loading, setLoading] = useState(false);

  const handleSearch = async (value) => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:3006/api/admin/${url}?keyword=${value}`);
      const data = await res.json();
      if (onSearchResult){
        onSearchResult(data);
      } 
    } catch (error) {
      console.error("Search error: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Space>
      <Search
        placeholder={placeholder}
        allowClear
        enterButton="Search"
        size="large"
        onSearch={handleSearch}
        loading={loading} 
      />
    </Space>
  );
}
export default SearchForm;

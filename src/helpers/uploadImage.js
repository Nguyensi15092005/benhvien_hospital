import React, { useState } from "react";
import { Upload, message, Modal } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const CLOUD_NAME = "diwwddgyc"; // Cloud name của bạn
const UPLOAD_PRESET = "upload_Cloud"; // Preset name của bạn

// function UploadImage({ onUploaded }) {
//   const [fileList, setFileList] = useState([]);
//   const [previewVisible, setPreviewVisible] = useState(false);
//   const [previewImage, setPreviewImage] = useState("");
//   const [previewTitle, setPreviewTitle] = useState("");

//   const handleUpload = async (file) => {
//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("upload_preset", UPLOAD_PRESET);

//     try {
//       const response = await fetch(
//         `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
//         {
//           method: "POST",
//           body: formData,
//         }
//       );
//       const data = await response.json();

//       if (response.ok) {
//         message.success("Tải ảnh thành công");
//         if (onUploaded) onUploaded(data.secure_url);
//         return data.secure_url;
//       } else {
//         message.error("Lỗi upload ảnh");
//         console.error("Upload error:", data);
//         return null;
//       }
//     } catch (error) {
//       message.error("Lỗi kết nối đến Cloudinary");
//       console.error("Error:", error);
//       return null;
//     }
//   };

//   const customRequest = async ({ file, onSuccess, onError }) => {
//     const url = await handleUpload(file);
//     if (url) {
//       const newFile = {
//         uid: file.uid,
//         name: file.name,
//         status: "done",
//         url,
//       };
//       setFileList([newFile]);
//       onSuccess();
//     } else {
//       onError(new Error("Upload failed"));
//     }
//   };

//   const handlePreview = async (file) => {
//     setPreviewImage(file.url || file.thumbUrl);
//     setPreviewVisible(true);
//     setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf("/") + 1));
//   };

//   const handleCancel = () => setPreviewVisible(false);

//   return (
//     <>
//       <Upload
//         customRequest={customRequest}
//         fileList={fileList}
//         listType="picture-card"
//         maxCount={1}
//         onRemove={() => setFileList([])}
//         onPreview={handlePreview}
//       >
//         {fileList.length >= 1 ? null : (
//           <div>
//             <UploadOutlined />
//             <div style={{ marginTop: 8 }}>Tải ảnh lên</div>
//           </div>
//         )}
//       </Upload>

//       <Modal
//         open={previewVisible}
//         title={previewTitle}
//         footer={null}
//         onCancel={handleCancel}
//       >
//         <img alt="Ảnh xem trước" style={{ width: "100%" }} src={previewImage} />
//       </Modal>
//     </>
//   );
// }

// export default UploadImage;
function UploadImage({ value, onUploaded }) {
  const [fileList, setFileList] = useState([]);

  // Load ảnh từ props `value` khi mở form edit
  React.useEffect(() => {
    if (value) {
      setFileList([
        {
          uid: "-1",
          name: "image.png",
          status: "done",
          url: value,
        },
      ]);
    }
  }, [value]);

  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");

  const handleUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();

      if (response.ok) {
        message.success("Tải ảnh thành công");
        if (onUploaded) onUploaded(data.secure_url);
        return data.secure_url;
      } else {
        message.error("Lỗi upload ảnh");
        console.error("Upload error:", data);
        return null;
      }
    } catch (error) {
      message.error("Lỗi kết nối đến Cloudinary");
      console.error("Error:", error);
      return null;
    }
  };

  const customRequest = async ({ file, onSuccess, onError }) => {
    const url = await handleUpload(file);
    if (url) {
      const newFile = {
        uid: file.uid,
        name: file.name,
        status: "done",
        url,
      };
      setFileList([newFile]);
      onUploaded?.(url); // Trả URL ra cho Form
      onSuccess();
    } else {
      onError(new Error("Upload failed"));
    }
  };

  const handlePreview = async (file) => {
    setPreviewImage(file.url || file.thumbUrl);
    setPreviewVisible(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf("/") + 1));
  };

  const handleCancel = () => setPreviewVisible(false);

  return (
    <>
      <Upload
        customRequest={customRequest}
        fileList={fileList}
        listType="picture-card"
        maxCount={1}
        onRemove={() => setFileList([])}
        onPreview={handlePreview}
      >
        {fileList.length >= 1 ? null : (
          <div>
            <UploadOutlined />
            <div style={{ marginTop: 8 }}>Tải ảnh lên</div>
          </div>
        )}
      </Upload>

      <Modal
        open={previewVisible}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="Ảnh xem trước" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </>
  );
}

export default UploadImage;


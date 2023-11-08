import SideBar from "../layouts/SideBar";
import { getUsersList } from "../services/user-service";
import { useEffect } from "react";
import Popup from "../components/shared/Popup";

export function Dashboard() {
  return (
    <>
      <SideBar>
        <p>dashboard</p>
      </SideBar>
    </>
  );
}

// import React, { useState } from "react";
// import axios from "axios";
//
// export function Dashboard() {
//   const [selectedFile, setSelectedFile] = useState<any>(null);
//
//   const handleFileChange = (event: any) => {
//     setSelectedFile(event.target.files[0]);
//   };
//
//   const handleUpload = () => {
//     const formData = new FormData();
//     formData.append("file", selectedFile);
//     axios
//       .post("http://localhost:1221/upload/s3", formData)
//       .then((response) => {
//         console.log("File uploaded successfully:", response.data);
//       })
//       .catch((error) => {
//         console.error("Error uploading file:", error);
//       });
//   };
//
//   return (
//     <div>
//       <input type="file" onChange={handleFileChange} />
//       <button onClick={handleUpload}>Upload</button>
//     </div>
//   );
// }

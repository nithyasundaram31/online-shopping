// import { useState } from "react";

// function ImageUpload() {
//   const [file, setFile] = useState(null);
//   const [preview, setPreview] = useState("");
//   const [uploadedUrl, setUploadedUrl] = useState("");

//   const handleFileChange = (e) => {
//     const selected = e.target.files[0];
//     setFile(selected);
//     setPreview(URL.createObjectURL(selected)); // show preview before upload
//   };

//   const handleUpload = async () => {
//     if (!file) return alert("Please choose an image!");
        
//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       const res = await fetch("https://api.escuelajs.co/api/v1/files/upload", {
//         method: "POST",
//         body: formData,
//       });

//       const data = await res.json();
//       console.log(data);
//       setUploadedUrl(data.location); // uploaded image link
//     } catch (error) {
//       console.error("Upload failed:", error);
//     }
//   };

//   return (
//     <div className="p-6 max-w-md mx-auto bg-white shadow-lg rounded-xl">
//       <h2 className="text-xl font-bold mb-4">🛍️ Image Upload Practice</h2>

//       <input
//         type="file"
//         accept="image/*"
//         onChange={handleFileChange}
//         className="mb-4"
//       />

//       {preview && (
//         <img
//           src={preview}
//           alt="preview"
//           className="w-48 h-48 object-cover rounded-lg mb-4"
//         />
//       )}

//       <button
//         onClick={handleUpload}
//         className="bg-blue-600 text-white px-4 py-2 rounded-lg"
//       >
//         Upload Image
//       </button>

//       {uploadedUrl && (
//         <div className="mt-4">
//           <p>✅ Uploaded Successfully!</p>
//           <img
//             src={uploadedUrl}
//             alt="uploaded"
//             className="w-48 h-48 object-cover rounded-lg mt-2"
//           />
//         </div>
//       )}
//     </div>
//   );
// }

// export default ImageUpload;

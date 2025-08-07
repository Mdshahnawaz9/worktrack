import { useEffect, useState } from "react";
import Layout from "../components/Layout";

const AdminMyDocuments = () => {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const storedDocuments = JSON.parse(localStorage.getItem("documents")) || [];
    setDocuments(storedDocuments);
  }, []);

  const downloadFile = (base64, filename) => {
    const link = document.createElement("a");
    link.href = base64;
    link.download = filename;
    link.click();
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4 text-center">All Users' Documents</h1>
      {documents.length === 0 ? (
        <p className="text-center text-gray-500">No documents uploaded.</p>
      ) : (
        <div className="grid gap-4">
          {documents.map((doc, index) => (
            <div key={index} className="p-4 border rounded shadow">
              <p><strong>User:</strong> {doc.username}</p>
              <p><strong>File Name:</strong> {doc.name}</p>
              <p><strong>Type:</strong> {doc.type}</p>
              {doc.type.startsWith("image/") && (
                <img
                  src={doc.base64}
                  alt={doc.name}
                  className="w-48 h-32 object-cover mt-2 border"
                />
              )}
              <button
                onClick={() => downloadFile(doc.base64, doc.name)}
                className="mt-2 bg-blue-600 text-white px-3 py-1 rounded"
              >
                Download
              </button>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
};

export default AdminMyDocuments;

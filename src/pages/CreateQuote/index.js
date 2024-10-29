import React, { useState } from "react";
import FloatingPill from "../../components/FloatingPill";
import Modal from "../../components/Modal";
import { createNewQuote, uploadImage } from "../../utils/appApi";

const CreateQuote = () => {
  const [openModal, setOpenModal] = useState(false);
  const [quote, setQuote] = useState("");
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setImage(URL.createObjectURL(selectedFile));
      setFile(selectedFile);
    }
  };

  const handleQuoteChange = (e) => {
    setQuote(e.target.value);
  };

  const handleCreateQuote = () => {
    if (!file || !quote) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    uploadImage(formData)
      .then(({ data }) => {
        console.log(data);
        const params = {
          text: quote,
          mediaUrl: data[0]?.url,
        };
        return createNewQuote(params);
      })
      .then((res) => {
        // todo: update the notification that user has successfully created the api
        console.log(res);
      })
      .finally(() => {
        setLoading(false);
        setOpenModal(false);
      });
  };

  return (
    <div>
      {" "}
      <FloatingPill openModal={openModal} setOpenModal={setOpenModal} />
      <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
        <div className="text-2xl font-semibold mb-4 text-gray-800">
          Create Your Own Quote
        </div>
        <div className="max-w-lg mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
          <div className="text-gray-800">
            {/* Image Upload Section */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Upload Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
              />
            </div>

            {/* Quote Input Section */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Enter Quote
              </label>
              <textarea
                value={quote}
                onChange={handleQuoteChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows="3"
                placeholder="Write your quote here..."
              />
            </div>

            {/* Preview Section */}
            {image && (
              <div className="mb-4">
                <div className="text-sm font-semibold mb-2">Preview</div>
                <div className="relative bg-white p-4 border rounded-lg shadow-lg">
                  <img
                    src={image}
                    alt="Uploaded"
                    className="max-h-64 mx-auto mb-4 rounded-lg"
                  />
                  <div className="text-center text-lg font-semibold text-gray-700">
                    {quote || "Your quote will appear here!"}
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="flex align-center justify-center">
            <button
              className={`${
                quote && image
                  ? "bg-purple-500 shadow-lg "
                  : " bg-slate-500/20 text-black/50"
              } p-2 w-full  rounded-lg `}
              disabled={(!quote && !image) || loading}
              onClick={handleCreateQuote}>
              submit
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CreateQuote;

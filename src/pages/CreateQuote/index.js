import "./styles.css";
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
  const [notification, setNotification] = useState({
    message: null,
    showMessage: false,
  });

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
        const params = {
          text: quote,
          mediaUrl: data[0]?.url,
        };
        return createNewQuote(params);
      })
      .then(() => {
        setNotification({
          message: "Quotes created successfully",
          showMessage: true,
        });
      })
      .finally(() => {
        setTimeout(() => {
          handleCloseModal();
        }, 1000);
      });
  };

  const handleCloseModal = () => {
    setLoading(false);
    setOpenModal(false);
    setQuote("");
    setImage(null);
    setNotification({
      message: null,
      showMessage: false,
    });
  };

  return (
    <div>
      <FloatingPill openModal={openModal} setOpenModal={setOpenModal} />
      <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
        <div className="modal-title">Create Your Own Quote</div>
        <div className="max-w-lg mx-auto p-6 bg-gray-500/10 rounded-lg shadow-md">
          {notification.showMessage && (
            <div className="bg-green-400 p-2 mb-2 rounded-lg flex justify-between">
              {notification.message}
              <button
                onClick={() => {
                  setNotification({ showMessage: false });
                }}>
                &#10005;
              </button>
            </div>
          )}
          <div className="text-gray-800">
            {/* Image Upload Section */}
            <div className="mb-4">
              <label className="input-label">Upload Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="upload-file-input"
              />
            </div>

            {/* Quote Input Section */}
            <div className="mb-4">
              <label className="input-label">Enter Quote</label>
              <textarea
                value={quote}
                onChange={handleQuoteChange}
                className="quote-textarea"
                rows="3"
                placeholder="Write your quote here..."
              />
            </div>

            {/* Preview Section */}
            {image && (
              <div className="mb-4">
                <div className="preview-title">Preview</div>
                <div className="relative bg-white border rounded-lg shadow-lg">
                  <img
                    src={image}
                    alt="Uploaded"
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 border flex justify-center items-center bg-black/65 text-center text-lg font-semibold text-white rounded-lg">
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

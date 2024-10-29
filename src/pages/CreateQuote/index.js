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
    type: null,
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
      .then((res) => {
        if (res) {
        }
        setNotification({
          message: "Quotes created successfully",
          showMessage: true,
          type: "success",
        });
      })
      .catch((err) => {
        setNotification({
          message: "Something went wrong",
          showMessage: true,
          type: "error",
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
            <div
              className={`notification ${
                notification.type === "error" ? "bg-red-400" : "bg-green-400"
              } `}>
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
                <div className="preview-wrapper">
                  <img src={image} alt="Uploaded" className="preview-image" />
                  <div className="preview-text-wrapper">
                    {quote || "Your quote will appear here!"}
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="flex items-center justify-center">
            <button
              className={`${
                quote && image && !loading
                  ? "bg-purple-500 shadow-lg focus:bg-purple-600 duration-150"
                  : " bg-slate-500/20 text-black/50"
              } p-2 w-full  rounded-lg `}
              disabled={(!quote && !image) || loading}
              onClick={handleCreateQuote}>
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CreateQuote;

"use client";
import { Zoom, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ToastifyProvider = () => {
  return (
    <ToastContainer
      position="bottom-right"
      autoClose={1000}
      closeOnClick
      theme="light"
      transition={Zoom}
      draggable={false}
      limit={2}
      pauseOnFocusLoss={false}
      style={{ fontSize: "14px" }}
    />
  );
};
export default ToastifyProvider;

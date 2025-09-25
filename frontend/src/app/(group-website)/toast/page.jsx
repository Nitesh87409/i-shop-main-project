"use client";
import React from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function TestToast() {
  return (
    <div>
      <button onClick={() => toast.success("Test Toast!")}>
        Show Toast
      </button>
      <ToastContainer />
    </div>
  );
}
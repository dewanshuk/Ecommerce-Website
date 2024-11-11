import React from "react";
import { Link } from "react-router-dom";
function UnAuthorized() {
  return (
    <div className="w-screen h-screen bg-gray-200 p-4">
      <h1 className="text-lg italic">
        User not Authorized to View this page. Please login first.
      </h1>
      <Link to="/signin" className="text-blue-600">
        Back to Sign In
      </Link>
    </div>
  );
}

export default UnAuthorized;

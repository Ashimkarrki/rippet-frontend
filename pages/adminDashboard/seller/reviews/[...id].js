import React from "react";
import AdminReviewAndQnaComponent from "../../../../components/Admin Components/AdminReviewAndQnaComponent";
import IsAuth from "../../../../utils/IsAuth";
const Reviews = () => {
  return <AdminReviewAndQnaComponent who={"sellers"} what={"reviews"} />;
};

export default IsAuth(Reviews);

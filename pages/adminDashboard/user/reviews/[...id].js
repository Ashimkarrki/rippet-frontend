import React from "react";
import AdminReviewAndQnaComponent from "../../../../components/Admin Components/AdminReviewAndQnaComponent";
import IsAuth from "../../../../utils/IsAuth";
const Reviews = () => {
  return <AdminReviewAndQnaComponent what={"reviews"} who={"users"} />;
};

export default IsAuth(Reviews);

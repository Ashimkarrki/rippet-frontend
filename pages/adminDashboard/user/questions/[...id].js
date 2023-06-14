import React from "react";
import AdminReviewAndQnaComponent from "../../../../components/Admin Components/AdminReviewAndQnaComponent";
import IsAuth from "../../../../utils/IsAuth";
const Questions = () => {
  return <AdminReviewAndQnaComponent what={"asks"} who={"users"} />;
};

export default IsAuth(Questions);

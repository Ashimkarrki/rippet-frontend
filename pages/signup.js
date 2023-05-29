import { SignUpComponent } from "../components/SignUpComponent";
import IsAuth from "../utils/IsAuth";

const SignUp = () => {
  return <SignUpComponent />;
};

export default IsAuth(SignUp);

import logo from "../../assets/images/brand-y.png";
import { FcGoogle } from "react-icons/fc";
import { Button, Form, Input } from "antd";
import "./style.scss";
import { Link } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { useSelector } from "react-redux";
import { login } from "../../store/user/userSlice";
import { auth, provider } from "../../firebase";
import { RootState, useAppDispatch } from "../../store/store";

const Login = () => {
  const dispatch = useAppDispatch()
  const { loading } = useSelector((state:RootState) => state.user);

  const handleSignInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((data) => {
        console.log("data", data);
        dispatch(
          login({
            email: data.user?.email,
            token: (data.user as any).accessToken,
            withEmail: true,
            web: true,
          })
        );
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const onFinish = (values: { phone: string; password: string; }) => {
    dispatch(
      login({
        phone: values.phone,
        password: values.password,
        withEmail: false,
        web: true,
      })
    );
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <div className="login-field">
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>

        <p className="sign-in-title">Sign In</p>
        <Form
          name="login-form"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          style={{
            width: "100%",
          }}
        >
          <Form.Item
            name="phone"
            rules={[
              {
                required: true,
                message: "Phone is required.",
              },
            ]}
          >
            <Input placeholder="Phone" className="custom-input" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Password is required.",
              },
            ]}
          >
            <Input
              placeholder="Password"
              type="password"
              className="custom-input"
            />
          </Form.Item>
          <div className="forgot-password">
            <Link to="/forgot-password" id="link">
              Forgot Password
            </Link>
          </div>
          <Form.Item>
            <Button
              block
              type="primary"
              className="login-button"
              htmlType="submit"
              loading={loading}
            >
              SIGN IN
            </Button>
          </Form.Item>
        </Form>
        <span id="alternative-signin">Or</span>
        <Button
          block
          type="default"
          className="google-button"
          onClick={handleSignInWithGoogle}
        >
          <FcGoogle size={20} />
          Sign in with Google
        </Button>
      </div>
    </>
  );
};

export default Login;

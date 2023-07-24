import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading";
import { register } from "../../actions/userActions";
import MainScreen from "../../components/MainScreen";
import "./RegisterScreen.css";
import { ToastContainer, toast } from 'react-toastify/dist/react-toastify.js'
import 'react-toastify/dist/ReactToastify.css'
function RegisterScreen({ history }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [pic, setPic] = useState(
    
    "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  );
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [picMessage, setPicMessage] = useState(null);

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const postDetails = (pics) => {
    if (
      pics ===
      "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
    ) {
      return setPicMessage("Please Select an Image");
    }
    setPicMessage(null);
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "notezipper");
      data.append("cloud_name", "piyushproj");
      fetch("https://api.cloudinary.com/v1_1/piyushproj/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
        })
        .catch((err) => {
          console.log(err);
        });
    } if(picMessage){
      toast.warning('Phải là file đuôi hình ảnh', {
        position: toast.POSITION.TOP_RIGHT
    });
    }
     else {
      return setPicMessage("Hãy chọn ảnh đại diện");
    }
  };

  useEffect(() => {
    if (userInfo) {
      history.push("/");
    }
  }, [history, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmpassword) {
      toast.error('Mật khẩu không trùng khớp !', {
        position: toast.POSITION.TOP_RIGHT
    });
    } else dispatch(register(name, email, password, pic));
  };

  return (
    <MainScreen title="Đăng ký">
      <div className="loginContainer">
        {error && <ToastContainer />}
        {loading && <Loading />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Họ và tên</Form.Label>
            <Form.Control
              type="name"
              value={name}
              placeholder="Điền họ và tên"
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              placeholder="Điền địa chỉ email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="phone">
            <Form.Label>Số điện thoại</Form.Label>
            <Form.Control
              type="number"
              value={phone}
              placeholder="Điền số hay liên lạc"
              onChange={(e) => setPhone(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Mật khẩu</Form.Label>
            <Form.Control
              type="password"
              value={password}
              placeholder="Điền mật khẩu"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="confirmPassword">
            <Form.Label>Xác nhận lại mật khẩu</Form.Label>
            <Form.Control
              type="password"
              value={confirmpassword}
              placeholder="Xác nhận lại mật khẩu"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>

          {picMessage && <ToastContainer />}
          <Form.Group controlId="pic">
            <Form.Label>Ảnh đại diện</Form.Label>
            <Form.File
              onChange={(e) => postDetails(e.target.files[0])}
              id="custom-file"
              type="image/png"
              label="Tải ảnh lên"
              custom
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Đăng ký
          </Button>
        </Form>
        <Row className="py-3">
          <Col>
            Bạn có tài khoản chưa ? <Link to="/login">Đăng nhập</Link>
          </Col>
        </Row>
      </div>
    </MainScreen>
  );
}

export default RegisterScreen;

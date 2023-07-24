import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import MainScreen from "../../components/MainScreen";
import "./ProfileScreen.css";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../actions/userActions";
import Loading from "../../components/Loading";
import { ToastContainer, toast } from 'react-toastify/dist/react-toastify.js'
import 'react-toastify/dist/ReactToastify.css'
const ProfileScreen = ({ location, history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [pic, setPic] = useState();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [picMessage, setPicMessage] = useState();

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdate = useSelector((state) => state.userUpdate);
  const { loading, error, success } = userUpdate;

  useEffect(() => {
    if (!userInfo) {
      history.push("/");
    } else {
      setName(userInfo.name);
      setEmail(userInfo.email);
      setPhone(userInfo.phone);
      setPic(userInfo.pic);
    }
  }, [history, userInfo]);

  const postDetails = (pics) => {
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
          console.log(pic);
        })
        .catch((err) => {
          console.log(err);
        });
      } if(picMessage){
        toast.error('Phải là file đuôi hình ảnh', {
          position: toast.POSITION.TOP_RIGHT
      });
      } else {
      return setPicMessage("Hãy chọn hình ảnh");
    }
  };

  const submitHandler = (e) => {
    if(error){
      toast.warning('Không cập nhật vì bị lỗi hệ thống', {
        position: toast.POSITION.TOP_RIGHT
    });
    if(success){
      toast.success('Cập nhật thành công', {
        position: toast.POSITION.TOP_LEFT
    });
    }
    }
    e.preventDefault();
    dispatch(updateProfile({ name, email, password, pic,phone }));
  };

  return (
    <MainScreen title="Thông tin tài khoản">
      <div>
        <Row className="profileContainer">
          <Col md={6}>
            <Form onSubmit={submitHandler}>
              {loading && <Loading />}
              {success && <ToastContainer/>}
              {error && <ToastContainer />}
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
              value={confirmPassword}
              placeholder="Xác nhận lại mật khẩu"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>{" "}
              {picMessage && <ToastContainer />}
              <Form.Group controlId="pic">
                <Form.Label>Change Profile Picture</Form.Label>
                <Form.File
                  onChange={(e) => postDetails(e.target.files[0])}
                  id="custom-file"
                  type="image/png"
                  label="Tải ảnh lên"
                  custom
                />
              </Form.Group>
              <Button type="submit" varient="primary">
                Cập nhật
              </Button>
            </Form>
          </Col>
          <Col
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img src={pic} alt={name} className="profilePic" />
          </Col>
        </Row>
      </div>
    </MainScreen>
  );
};

export default ProfileScreen;

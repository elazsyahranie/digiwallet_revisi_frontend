import Image from "next/image";
import React, { useState } from "react";
import styles from "/styles/profile.module.css";
import { Container, Row, Col, Button, Form, Alert } from "react-bootstrap";
import Cookies from "js-cookie";
import Layout from "/components/Layout";
import NavBar from "/components/module/NavBar";
import Footer from "/components/module/Footer";
import { authPage } from "middleware/authorizationPage";
import router from "next/router";
import axiosApiIntances from "/utils/axios";
import { connect } from "react-redux";
import {
  getUserbyId,
  getUserbyKeyword,
  updateUser,
  updateUserImage,
} from "/redux/actions/user";
import dashboardIcon from "/public/grid_grey.png";
import transferIcon from "/public/arrow-up.png";
import topUpIcon from "/public/plus.png";
import profileIcon from "/public/group40.png";
import noProfilePicture from "/public/img-not-found.png";
import logOutIcon from "/public/log-out.png";
import arrowLeft from "/public/arrow-left.png";
import pencil from "/public/Vector (2).png";

export async function getServerSideProps(context) {
  const data = await authPage(context);
  const userIdParsed = parseInt(data.userId);
  const userData = await axiosApiIntances
    .get(`user/${userIdParsed}`)
    .then((res) => {
      const allResult = {
        userResult: res.data.data.result,
      };
      return allResult;
    })
    .catch((err) => {
      console.log(err);
    });
  return { props: { userData: userData } };
}

function Profile(props) {
  const [showForm, setShowForm] = useState(false);
  const [updateSuccessAlert, setUpdateSuccessAlert] = useState(false);
  const [userProfileData, setUserProfileData] = useState({
    userEmail: props.userData.userResult[0].user_email,
    userPhone: props.userData.userResult[0].user_phone,
    userName: props.userData.userResult[0].user_name,
    userImage: props.userData.userResult[0].user_image,
  });
  const [userImage, setUserImage] = useState("");

  const showUpdateProfile = () => {
    setShowForm(true);
  };

  const hideUpdateProfile = () => {
    setShowForm(false);
  };

  const handleImage = (event) => {
    setUserImage(event.target.files[0]);
  };

  const updateImage = () => {
    console.log(userImage);
    const fd = new FormData();
    fd.append("image", userImage);
    props
      .updateUserImage(props.userData.userResult[0].user_id, fd)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpdateProfile = (event) => {
    event.preventDefault();
    setUserProfileData({
      ...userProfileData,
      [event.target.name]: event.target.value,
    });
  };

  const submitUpdateProfile = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      props
        .updateUser(props.userData.userResult[0].user_id, userProfileData)
        .then((res) => {
          console.log(res);
          setUpdateSuccessAlert(true);
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  // console.log(props.userData.userResult[0]);
  // console.log(userProfileData);
  const goToDashboard = () => {
    router.push("/dashboard");
  };

  const goToTransfer = () => {
    router.push("/search");
  };

  const goToProfile = () => {
    router.push("/profile");
  };

  const logOut = (event) => {
    event.preventDefault();
    Cookies.remove("user_id");
    Cookies.remove("user_email");
    Cookies.remove("token");
    router.push("/login");
  };

  const personalInformation = () => {
    router.push("/personal-info");
  };

  const changePassword = () => {
    router.push("/change-password");
  };

  const changePIN = (event) => {
    event.preventDefault();
    console.log("Change PIN!");
  };

  const { user_name, user_phone } = props.userData.userResult[0];

  return (
    <>
      <Layout title="Digiwallet | Profile">
        <NavBar data={props.userData} />
        <div className={styles.greyBackground}>
          <Container fluid="sm" className="py-4">
            <Row className={styles.entireRow}>
              {/* LEFT MENU */}
              <Col lg={3} md={4} className="d-none d-md-block">
                <div className={`${styles.whiteBackground} h-100`}>
                  <div className={`py-5 position-relative h-100`}>
                    <Button
                      className={styles.leftMenuButton}
                      onClick={() => goToDashboard()}
                    >
                      <Image
                        src={dashboardIcon}
                        alt=""
                        className={`img-fluid ${styles.leftMenuButtonIcon}`}
                      ></Image>
                      <span className={`${styles.leftMenuExplaination}`}>
                        Dashboard
                      </span>
                    </Button>
                    <Button
                      className={styles.leftMenuButton}
                      onClick={() => goToTransfer()}
                    >
                      <Image
                        src={transferIcon}
                        alt=""
                        className={`img-fluid ${styles.leftMenuButtonIcon}`}
                      ></Image>
                      <span className={`${styles.leftMenuExplaination}`}>
                        Transfer
                      </span>
                    </Button>
                    <Button className={styles.leftMenuButton}>
                      <Image
                        src={topUpIcon}
                        alt=""
                        className={`img-fluid ${styles.leftMenuButtonIcon}`}
                      ></Image>
                      <span className={`${styles.leftMenuExplaination}`}>
                        Top Up
                      </span>
                    </Button>
                    <Button
                      className={styles.leftMenuButtonSelected}
                      onClick={() => goToProfile()}
                    >
                      <Image
                        src={profileIcon}
                        alt=""
                        className={`img-fluid ${styles.leftMenuButtonIcon}`}
                      ></Image>
                      <span className={`${styles.leftMenuExplaination}`}>
                        Profile
                      </span>
                    </Button>
                    <Button
                      className={styles.logOutButton}
                      onClick={(event) => logOut(event)}
                    >
                      <Image
                        src={logOutIcon}
                        alt=""
                        className={`img-fluid ${styles.leftMenuButtonIcon}`}
                      ></Image>
                      <span className={`${styles.leftMenuExplaination}`}>
                        Log Out
                      </span>
                    </Button>
                  </div>
                </div>
              </Col>
              {/* RIGHT MENU */}
              <Col
                lg={8}
                md={7}
                sm={12}
                xs={12}
                className={`p-4 ${styles.whiteBackground}`}
              >
                <div className="d-flex justify-content-center mt-4 mb-2">
                  <div className="position-relative">
                    <Form.Group className={styles.formGroupUploadImage}>
                      {!userProfileData.userImage ? (
                        <Image
                          src={noProfilePicture}
                          width="70"
                          height="70"
                          className={styles.imgProfile}
                        />
                      ) : (
                        <img
                          src={`${process.env.IMAGE_URL}/${userProfileData.userImage}`}
                          className={styles.profilePicture}
                        ></img>
                      )}
                      <Form.Label
                        htmlFor="formFile"
                        className={styles.boxUpdateImage}
                      >
                        Jangan di hapus !
                      </Form.Label>
                      <input
                        type="file"
                        id="formFile"
                        onChange={(event) => handleImage(event)}
                        className={styles.updateImage}
                      ></input>
                    </Form.Group>
                  </div>
                </div>
                <div></div>
                <div className="d-flex justify-content-center mb-2">
                  <Button
                    variant="outline-dark"
                    onClick={(event) => updateImage(event)}
                  >
                    Upload image
                  </Button>
                </div>
                <div className="d-flex justify-content-center mb-3">
                  <div
                    className={styles.editMenuContainer}
                    onClick={
                      !showForm
                        ? () => showUpdateProfile()
                        : () => hideUpdateProfile()
                    }
                  >
                    <div>
                      <Image src={pencil} />
                    </div>
                    <span>Edit</span>
                  </div>
                </div>
                {showForm ? (
                  <Form className={styles.editForm}>
                    <Form.Control
                      type="text"
                      name="userName"
                      placeholder={userProfileData.userName}
                      className={`${styles.editFormItem} mb-3`}
                      onChange={(event) => handleUpdateProfile(event)}
                      onKeyDown={(event) => submitUpdateProfile(event)}
                    />
                    <Form.Control
                      type="text"
                      name="userPhone"
                      placeholder={userProfileData.userPhone}
                      className={`${styles.editFormItem} mb-3`}
                      onChange={(event) => handleUpdateProfile(event)}
                      onKeyDown={(event) => submitUpdateProfile(event)}
                    />
                  </Form>
                ) : (
                  <>
                    <div className="d-flex justify-content-center mb-1">
                      <h5 className="fw-bold text-center">{user_name}</h5>
                    </div>
                    <div className="d-flex justify-content-center mb-4">
                      <span className="text-center">{user_phone}</span>
                    </div>
                  </>
                )}
                {updateSuccessAlert && (
                  <div className="d-flex justify-content-center">
                    <Alert
                      className={`mb-4 ${styles.updateSuccessAlert}`}
                      variant="success"
                    >
                      <span className="d-block text-center">
                        User succesfully updated
                      </span>
                    </Alert>
                  </div>
                )}
                <div
                  className={`${styles.profileMenu}`}
                  onClick={() => personalInformation()}
                >
                  <div className={styles.profileMenuContent}>
                    <span className={styles.profileMenuName}>
                      Personal Information
                    </span>
                    <Image src={arrowLeft} className="img-fluid" />
                  </div>
                </div>
                <div
                  className={`${styles.profileMenu}`}
                  onClick={() => changePassword()}
                >
                  <div className={styles.profileMenuContent}>
                    <span className={styles.profileMenuName}>
                      Change Password
                    </span>
                    <Image src={arrowLeft} className="img-fluid" />
                  </div>
                </div>
                <div
                  className={`${styles.profileMenu}`}
                  onClick={(event) => changePIN(event)}
                >
                  <div className={styles.profileMenuContent}>
                    <span className={styles.profileMenuName}>Change PIN</span>
                    <Image src={arrowLeft} className="img-fluid" />
                  </div>
                </div>
                <div
                  className={`${styles.profileMenu}`}
                  onClick={(event) => logOut(event)}
                >
                  <div className={styles.profileMenuContentLogOut}>
                    <span className={styles.profileMenuName}>Log Out</span>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        <Footer />
      </Layout>
    </>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  user: state.user,
});

const mapDispatchtoProps = {
  getUserbyId,
  getUserbyKeyword,
  updateUser,
  updateUserImage,
};

export default connect(mapStateToProps, mapDispatchtoProps)(Profile);

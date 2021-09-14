import Image from "next/image";
import React, { useState } from "react";
import styles from "/styles/changePassword.module.css";
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
  updateUserPassword,
} from "/redux/actions/user";
import dashboardIcon from "/public/grid_grey.png";
import transferIcon from "/public/arrow-up.png";
import topUpIcon from "/public/plus.png";
import profileIcon from "/public/group40.png";
import logOutIcon from "/public/log-out.png";

export async function getServerSideProps(context) {
  const data = await authPage(context);
  const userIdParsed = parseInt(data.userId);
  const userData = await axiosApiIntances
    .get(`user/${userIdParsed}`)
    .then((res) => {
      const allResult = {
        userResult: res.data.data.result,
        balanceResult: res.data.data.resultBalance,
        transactionResult: res.data.data.resultTransactionHistory,
      };
      return allResult;
    })
    .catch((err) => {
      console.log(err);
    });
  return { props: { userData: userData } };
}

function changePassword(props) {
  const [passwordsDontMatch, setPasswordsDontMatch] = useState(false);
  const [changePasswordSuccess, setPasswordSuccess] = useState(false);
  const [changePasswordForm, setChangePasswordForm] = useState({
    password: "",
    newPassword: "",
    newPasswordRepeat: "",
  });

  const handleForm = (event) => {
    setChangePasswordForm({
      ...changePasswordForm,
      [event.target.name]: event.target.value,
    });
  };

  const submitForm = (event) => {
    event.preventDefault();
    const userPassword = changePasswordForm.password;
    const userNewPassword = changePasswordForm.newPassword;
    if (
      changePasswordForm.newPassword !== changePasswordForm.newPasswordRepeat
    ) {
      setPasswordsDontMatch(true);
      setPasswordSuccess(false);
    } else {
      props
        .updateUserPassword(props.userData.userResult[0].user_id, {
          userPassword,
          userNewPassword,
        })
        .then((res) => {
          console.log(res);
          setPasswordsDontMatch(false);
          setPasswordSuccess(true);
        })
        .catch((err) => {
          console.log(err);
        });
      console.log(changePasswordForm);
    }
  };

  // NAVIGATION HANDLING
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

  // console.log(props.userData.userResult[0].user_id);

  return (
    <>
      <Layout title="Digiwallet | Change Password">
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
                    <Button
                      className={styles.leftMenuButton}
                      onClick={() => goToDashboard()}
                    >
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
                <div className="p-2">
                  <div className="mb-4">
                    <h6>Change Password</h6>
                    <p className={styles.personalInformationDesc}>
                      You must enter your current password and then type your
                      new password twice.
                    </p>
                  </div>
                  <div className="d-flex justify-content-center pt-5 mb-4">
                    <Form className={`${styles.newPasswordForm} mt-2`}>
                      <Form.Group className="mb-4">
                        <Form.Control
                          type="password"
                          name="password"
                          onChange={(event) => handleForm(event)}
                          className={styles.newPasswordFormControl}
                          placeholder="Current password"
                        />
                      </Form.Group>
                      <Form.Group className="mb-4">
                        <Form.Control
                          type="password"
                          name="newPassword"
                          onChange={(event) => handleForm(event)}
                          className={styles.newPasswordFormControl}
                          placeholder="New password"
                        />
                      </Form.Group>
                      <Form.Group className="mb-4">
                        <Form.Control
                          type="password"
                          name="newPasswordRepeat"
                          onChange={(event) => handleForm(event)}
                          className={styles.newPasswordFormControl}
                          placeholder="Repeat new password"
                        />
                      </Form.Group>
                      <Button
                        type="submit"
                        onClick={(change) => submitForm(event)}
                        className={styles.changePasswordButton}
                      >
                        Change Password
                      </Button>
                    </Form>
                  </div>
                  {passwordsDontMatch && (
                    <div className={styles.alertContainer}>
                      <Alert variant="danger" className={styles.alert}>
                        Passwords don't match!
                      </Alert>
                    </div>
                  )}
                  {changePasswordSuccess && (
                    <div className={styles.alertContainer}>
                      <Alert variant="success" className={styles.alert}>
                        Change password succesful!
                      </Alert>
                    </div>
                  )}
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
  updateUserPassword,
};

export default connect(mapStateToProps, mapDispatchtoProps)(changePassword);

import Image from "next/image";
import React, { useState } from "react";
import styles from "/styles/changePin.module.css";
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
  insertPin,
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

function changePin(props) {
  const [form, setForm] = useState("");
  const [pinBlank, setPinBlank] = useState(false);
  const [pinLess, setPinLess] = useState(false);
  const [insertPinSuccess, setInsertPinSuccess] = useState(false);

  const changeText = (event) => {
    event.preventDefault();
    if (event.target.value) {
      const nextSibling = document.getElementById(
        `pin-${parseInt(event.target.name, 10) + 1}`
      );

      if (nextSibling !== null) {
        nextSibling.focus();
      }
    }
    setForm({ ...form, [`pin${event.target.name}`]: event.target.value });
    setPinBlank(false);
    setPinLess(false);
    setInsertPinSuccess(false);
  };

  const postPin = (event) => {
    event.preventDefault();
    const userPin =
      form.pin1 + form.pin2 + form.pin3 + form.pin4 + form.pin5 + form.pin6;
    if (!userPin) {
      setPinBlank(true);
    } else {
      props
        .insertPin(props.userData.userResult[0].user_id, { userPin })
        .then((res) => {
          console.log(res);
          setInsertPinSuccess(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

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
      <Layout title="Digiwallet | Change Pin">
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
                    <h6>Change PIN</h6>
                    <p className={styles.personalInformationDesc}>
                      Enter your current 6 digits Zwallet PIN below to continue
                      to the next steps.
                    </p>
                  </div>
                  <div className="d-flex justify-content-center pt-5 mb-4">
                    <div className={styles.insertPinForm}>
                      <div
                        className={`mb-5`}
                        style={{
                          width: "100%",
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <input
                          type="password"
                          id="pin-1"
                          name="1"
                          onChange={(event) => changeText(event)}
                          maxLength="1"
                          style={{ width: "10%" }}
                        />
                        <input
                          type="password"
                          id="pin-2"
                          name="2"
                          onChange={(event) => changeText(event)}
                          maxLength="1"
                          style={{ width: "10%" }}
                        />
                        <input
                          type="password"
                          id="pin-3"
                          name="3"
                          onChange={(event) => changeText(event)}
                          maxLength="1"
                          style={{ width: "10%" }}
                        />
                        <input
                          type="password"
                          id="pin-4"
                          name="4"
                          onChange={(event) => changeText(event)}
                          maxLength="1"
                          style={{ width: "10%" }}
                        />
                        <input
                          type="password"
                          id="pin-5"
                          name="5"
                          onChange={(event) => changeText(event)}
                          maxLength="1"
                          style={{ width: "10%" }}
                        />
                        <input
                          type="password"
                          id="pin-6"
                          name="6"
                          onChange={(event) => changeText(event)}
                          maxLength="1"
                          style={{ width: "10%" }}
                        />
                      </div>
                      <div>
                        <Button
                          onClick={(event) => postPin(event)}
                          className={`mt-2 w-100`}
                        >
                          Continue
                        </Button>
                      </div>
                    </div>
                  </div>
                  {pinBlank && (
                    <div className="mt-3">
                      <Alert variant="danger">You need to enter PIN! </Alert>
                    </div>
                  )}
                  {pinLess && (
                    <div className="mt-3">
                      <Alert variant="danger">
                        PIN should not be shorter than 6!{" "}
                      </Alert>
                    </div>
                  )}
                  {insertPinSuccess && (
                    <div className="mt-3">
                      <Alert variant="success">Change PIN success!</Alert>
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
  insertPin,
};

export default connect(mapStateToProps, mapDispatchtoProps)(changePin);

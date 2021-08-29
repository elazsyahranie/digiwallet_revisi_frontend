import Image from "next/image";
import React, { useState } from "react";
import styles from "/styles/personalInfo.module.css";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import Cookies from "js-cookie";
import Layout from "/components/Layout";
import NavBar from "/components/module/NavBar";
import Footer from "/components/module/Footer";
import { authPage } from "middleware/authorizationPage";
import router from "next/router";
import axiosApiIntances from "/utils/axios";
import { connect } from "react-redux";
import { getUserbyId, getUserbyKeyword } from "/redux/actions/user";
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

function personalInfo(props) {
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

  const changePassword = (event) => {
    event.preventDefault();
    console.log("Change password!");
  };

  const changePIN = (event) => {
    event.preventDefault();
    console.log("Change PIN!");
  };

  return (
    <>
      <Layout title="Digiwallet | Personal Info">
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
                <div className="p-2">
                  <div className="mb-2">
                    <h6>Personal Information</h6>
                    <p className={styles.personalInformationDesc}>
                      We got your personal information from the sign up
                      proccess. If you want to make changes on your information,
                      contact our support.
                    </p>
                  </div>
                  <div className={`${styles.profileData} mb-2`}>
                    <div className={`pt-3 pb-3 ${styles.profileDataContent}`}>
                      <h6 className="fw-normal">First Name</h6>
                      <h5>Robert</h5>
                    </div>
                  </div>
                  <div className={`${styles.profileData} mb-2`}>
                    <div className={`pt-3 pb-3 ${styles.profileDataContent}`}>
                      <h6 className="fw-normal">Last Name</h6>
                      <h5>Chandler</h5>
                    </div>
                  </div>
                  <div className={`${styles.profileData} mb-2`}>
                    <div className={`pt-3 pb-3 ${styles.profileDataContent}`}>
                      <h6 className="fw-normal">Verified Email</h6>
                      <h5>pewdiepie1@gmail.com</h5>
                    </div>
                  </div>
                  <div className={`${styles.profileData} mb-2`}>
                    <div
                      className={`pt-3 pb-3 ${styles.profileDataContentPhoneNumber}`}
                    >
                      <div>
                        <h6 className="fw-normal">Phone Number</h6>
                        <h5>+62 187986960689</h5>
                      </div>
                      <div>
                        <span>Manage</span>
                      </div>
                    </div>
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

const mapDispatchtoProps = { getUserbyId, getUserbyKeyword };

export default connect(mapStateToProps, mapDispatchtoProps)(personalInfo);

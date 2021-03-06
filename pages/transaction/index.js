import Image from "next/image";
import React from "react";
import styles from "/styles/transaction.module.css";
import { Container, Row, Col, Button } from "react-bootstrap";
import Cookies from "js-cookie";
import Layout from "/components/Layout";
import NavBar from "/components/module/NavBar";
import Footer from "/components/module/Footer";
import { authPage } from "middleware/authorizationPage";
import router from "next/router";
import axiosApiIntances from "/utils/axios";
import { connect } from "react-redux";
import { getUserbyId, getUserbyKeyword } from "/redux/actions/user";
import samuelSuhi from "/public/samuelSuhi.png";
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
      };
      return allResult;
    })
    .catch((err) => {
      console.log(err);
    });

  const userTransactionHistory = await axiosApiIntances
    .get(`transaction/get-transaction/${data.userId}?limit=4`)
    .then((res) => {
      return res.data.data;
    })
    .catch((err) => {
      console.log(err);
    });
  return {
    props: { userData: userData, transactionHistory: userTransactionHistory },
  };
}

function transactionHistory(props) {
  const userId = props.userData.userResult[0].user_id;

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

  return (
    <>
      <Layout title="Digiwallet | Transaction History">
        <NavBar data={props.userData} />
        <div className={styles.greyBackground}>
          <Container fluid="sm" className="py-4">
            <Row className={styles.entireRow}>
              {/* LEFT MENU */}
              <Col lg={3} md={4} className="d-none d-md-block">
                <div className={`${styles.whiteBackground} h-100`}>
                  <div className={`py-5 position-relative h-100`}>
                    <Button
                      className={styles.leftMenuButtonSelected}
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
                      className={styles.leftMenuButton}
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
                    <h6>Transaction History</h6>
                  </div>
                  <div className="mb-4">
                    <span>This Week</span>
                  </div>
                  {props.transactionHistory
                    .slice(0, 2)
                    .map((element, index) => {
                      return (
                        <Row className={`mb-4`} key={index}>
                          <Col
                            lg={2}
                            md={2}
                            sm={2}
                            xs={2}
                            className="d-flex align-items-center justify-content-center"
                          >
                            <div>
                              <Image
                                src={samuelSuhi}
                                alt=""
                                className="img-fluid my-auto"
                              ></Image>
                            </div>
                          </Col>
                          <Col
                            lg={8}
                            md={8}
                            sm={8}
                            xs={8}
                            className="d-flex align-items-center"
                          >
                            <Row>
                              <span className="d-block fw-bold">
                                {element.user_name}
                              </span>
                              {element.transaction_sender_id === userId ? (
                                <span className="d-block">Transfer</span>
                              ) : (
                                <span className="d-block">Receipent</span>
                              )}
                            </Row>
                          </Col>
                          <Col
                            lg={2}
                            md={2}
                            sm={2}
                            xs={2}
                            className="d-flex align-items-center justify-content-center"
                          >
                            {element.transaction_sender_id === userId ? (
                              <span
                                className={`d-block ${styles.sentTransfer}`}
                              >
                                -{element.transaction_amount.toLocaleString()}
                              </span>
                            ) : (
                              <span
                                className={`d-block ${styles.receivedTransfer}`}
                              >
                                +{element.transaction_amount.toLocaleString()}
                              </span>
                            )}
                          </Col>
                        </Row>
                      );
                    })}
                  <div className="mb-4">
                    <span>This Month</span>
                  </div>
                  {props.transactionHistory
                    .slice(2, 4)
                    .map((element, index) => {
                      return (
                        <Row className={`mb-4`} key={index}>
                          <Col
                            lg={2}
                            md={2}
                            sm={2}
                            xs={2}
                            className="d-flex align-items-center justify-content-center"
                          >
                            <div>
                              <Image
                                src={samuelSuhi}
                                alt=""
                                className="img-fluid my-auto"
                              ></Image>
                            </div>
                          </Col>
                          <Col
                            lg={8}
                            md={8}
                            sm={8}
                            xs={8}
                            className="d-flex align-items-center"
                          >
                            <Row>
                              <span className="d-block fw-bold">
                                {element.user_name}
                              </span>
                              {element.transaction_sender_id === userId ? (
                                <span className="d-block">Transfer</span>
                              ) : (
                                <span className="d-block">Receipent</span>
                              )}
                            </Row>
                          </Col>
                          <Col
                            lg={2}
                            md={2}
                            sm={2}
                            xs={2}
                            className="d-flex align-items-center justify-content-center"
                          >
                            {element.transaction_sender_id === userId ? (
                              <span
                                className={`d-block ${styles.sentTransfer}`}
                              >
                                -{element.transaction_amount.toLocaleString()}
                              </span>
                            ) : (
                              <span
                                className={`d-block ${styles.receivedTransfer}`}
                              >
                                +{element.transaction_amount.toLocaleString()}
                              </span>
                            )}
                          </Col>
                        </Row>
                      );
                    })}
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

export default connect(mapStateToProps, mapDispatchtoProps)(transactionHistory);

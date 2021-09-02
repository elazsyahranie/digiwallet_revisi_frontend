import Image from "next/image";
import styles from "/styles/dashboard.module.css";
import {
  Container,
  Row,
  Col,
  Button,
  Modal,
  Form,
  Alert,
} from "react-bootstrap";
import Cookies from "js-cookie";
import Layout from "/components/Layout";
import NavBar from "/components/module/NavBar";
import Footer from "/components/module/Footer";
import { authPage } from "middleware/authorizationPage";
import { useState } from "react";
import axiosApiIntances from "/utils/axios";
import router from "next/router";
import { connect } from "react-redux";
import { getUserbyId } from "/redux/actions/user";
import { topUpBalance } from "/redux/actions/balance";
import samuelSuhi from "/public/samuelSuhi.png";
import dashboardIcon from "/public/grid_grey.png";
import transferIcon from "/public/arrow-up.png";
import topUpIcon from "/public/plus.png";
import greenTopUpIcon from "/public/in2.png";
import redIcon from "/public/out2.png";
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
    props: {
      userData: userData,
      transactionHistory: userTransactionHistory,
    },
  };
}

function Dashboard(props) {
  const userId = props.userData.userResult[0].user_id;
  // TOP UP MODAL HANDLING
  const [topUpModal, setTopUpModal] = useState(false);

  const closeTopUpModal = () => setTopUpModal(false);
  const showTopUpModal = () => setTopUpModal(true);

  // TOP UP AMOUNT HANDLING
  const [topUpAmount, setTopUpAmount] = useState({ balanceTopUp: "" });

  // TOP UP ALERT HANDLING
  const [topUpAmountNull, setTopUpAmountNull] = useState(false);
  const [topUpFailed, setTopUpAmountFailed] = useState(false);
  const [topUpSuccess, setTopUpSuccess] = useState(false);

  const handleTopUpAmount = (event) => {
    event.preventDefault();
    setTopUpAmount({
      ...topUpAmount,
      [event.target.name]: event.target.value,
    });
    setTopUpAmountNull(false);
    setTopUpSuccess(false);
  };

  const { balanceTopUp } = topUpAmount;

  const submitTopUp = (event) => {
    event.preventDefault();
    if (!topUpAmount.balanceTopUp) {
      setTopUpAmountNull(true);
    } else {
      props
        .topUpBalance(userId, { balanceTopUp })
        .then((res) => {
          console.log(res);
          setTopUpSuccess(true);
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        })
        .catch((err) => {
          console.log(err);
        });
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

  // TO TRANSACTION HISTORY
  const goToTransactionHistory = () => {
    router.push("/transaction-history");
  };

  return (
    <>
      <Modal show={topUpModal} onHide={closeTopUpModal}>
        <Modal.Header closeButton>
          <Modal.Title>Top Up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Input how much amount would you like to add to your wallet
          <Form>
            <Form.Control
              type="number"
              name="balanceTopUp"
              onChange={(event) => handleTopUpAmount(event)}
            />
          </Form>
          {topUpAmountNull && (
            <div>
              <Alert className="mt-4" variant="danger">
                Please enter the amount!
              </Alert>
            </div>
          )}
          {topUpSuccess && (
            <div>
              <Alert className="mt-4" variant="success">
                Top up success!
              </Alert>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeTopUpModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={(event) => submitTopUp(event)}>
            Top Up
          </Button>
        </Modal.Footer>
      </Modal>
      <Layout title="Digiwallet | Dashboard">
        <NavBar data={props.userData} />
        <div className={styles.greyBackground}>
          <Container fluid="sm" className="py-4">
            <Row>
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
              <Col lg={8} md={7} sm={12} xs={12}>
                <Row
                  className={`p-4 mb-3 ${styles.blueBackground} ${styles.whiteText}`}
                >
                  <Col lg={9} md={9} sm={7} xs={7}>
                    <span className="d-block">Balance</span>
                    {props.userData.balanceResult[0].balance ? (
                      <h2>
                        Rp
                        {props.userData.balanceResult[0].balance.toLocaleString()}
                      </h2>
                    ) : (
                      <h2>Rp.0,00</h2>
                    )}
                    <span className="d-block">+62 813-9387-7946</span>
                  </Col>
                  <Col
                    lg={3}
                    md={3}
                    sm={5}
                    xs={5}
                    className="position-relative"
                  >
                    <Button
                      className={`${styles.rightMenuButtonUp} ${styles.rightMenuButtonUpTransfer}`}
                      onClick={() => goToTransfer()}
                    >
                      Transfer
                    </Button>
                    <Button
                      className={`${styles.rightMenuButtonUp} ${styles.rightMenuButtonUpTopUp}`}
                      onClick={() => showTopUpModal()}
                    >
                      Top Up
                    </Button>
                  </Col>
                </Row>
                {/* RIGHT MENU BOTTOM */}
                <Row className="justify-content-between">
                  <Col
                    xl={6}
                    lg={12}
                    md={12}
                    sm={12}
                    xs={12}
                    className={`p-4 h-100 mb-2 ${styles.whiteBackground}`}
                  >
                    <Row>
                      <Col lg={8} md={8} sm={6} xs={6}>
                        <Row>
                          <div>
                            <Image
                              src={greenTopUpIcon}
                              alt=""
                              className="img-fluid"
                            ></Image>
                          </div>
                          <span className="d-block">Income</span>
                          <h5>Rp2.120.000</h5>
                        </Row>
                      </Col>
                      <Col lg={4} md={4} sm={6} xs={6}>
                        <Row>
                          <div>
                            <Image
                              src={redIcon}
                              alt=""
                              className="img-fluid"
                            ></Image>
                          </div>
                          <span className="d-block">Expense</span>
                          <h5>Rp1.560.000</h5>
                        </Row>
                      </Col>
                    </Row>
                    <Row style={{ minHeight: "120px" }}>
                      <h6 className="text-center my-auto">Unavailable</h6>
                    </Row>
                  </Col>
                  <Col
                    xl={5}
                    lg={12}
                    md={12}
                    sm={12}
                    xs={12}
                    className={`p-4 ${styles.whiteBackground}`}
                  >
                    <Row className={`mb-4`}>
                      <Col lg={8} md={8} sm={8} xs={8}>
                        <span className="fw-bold">Transaction History</span>
                      </Col>
                      <Col lg={4} md={4} sm={4} xs={4}>
                        <span
                          onClick={() => goToTransactionHistory()}
                          style={{ cursor: "pointer" }}
                        >
                          See all
                        </span>
                      </Col>
                    </Row>
                    {props.transactionHistory.map((element, index) => {
                      return (
                        <Row className={`mb-4`} key={index}>
                          <Col
                            lg={3}
                            md={3}
                            sm={3}
                            xs={3}
                            className="d-flex align-items-center"
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
                            lg={5}
                            md={5}
                            sm={5}
                            xs={5}
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
                            lg={3}
                            md={3}
                            sm={3}
                            xs={3}
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
                  </Col>
                </Row>
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
  balance: state.balance,
});

const mapDispatchtoProps = { getUserbyId, topUpBalance };

export default connect(mapStateToProps, mapDispatchtoProps)(Dashboard);

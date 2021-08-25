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

function Dashboard(props) {
  // console.log(props.userData.userResult[0]);
  const userId = props.userData.userResult[0].user_id;
  // console.log(userId);
  // TOOP UP MODAL HANDLING
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
      // console.log(topUpAmount.balanceTopUp);
      // console.log(typeof topUpAmount.balanceTopUp);
      props
        .topUpBalance(userId, { balanceTopUp })
        .then((res) => {
          console.log(res);
          setTopUpSuccess(true);
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
                  <div className={`py-5`}>
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
                      <span
                        className={`${styles.leftMenuExplaination}`}
                        onClick={() => goToTransfer()}
                      >
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
                    <Button className={styles.leftMenuButton}>
                      <Image
                        src={profileIcon}
                        alt=""
                        className={`img-fluid ${styles.leftMenuButtonIcon}`}
                      ></Image>
                      <span className={`${styles.leftMenuExplaination}`}>
                        Profile
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
                  <Col lg={9} md={9} sm={9} xs={9}>
                    <span className="d-block">Balance</span>
                    {props.userData.balanceResult[0].balance ? (
                      <h2>{props.userData.balanceResult[0].balance}</h2>
                    ) : (
                      <h2>0</h2>
                    )}
                    <span className="d-block">+62 813-9387-7946</span>
                  </Col>
                  <Col lg={3} md={3} sm={3} xs={3}>
                    <Button
                      className={styles.rightMenuButtonUp}
                      onClick={() => goToTransfer()}
                    >
                      Transfer
                    </Button>
                    <Button
                      className={styles.rightMenuButtonUp}
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
                        <span>See all</span>
                      </Col>
                    </Row>
                    <Row className={`mb-4`}>
                      <Col lg={3} md={3} sm={3} xs={3}>
                        <div className="d-flex align-items-center">
                          <Image
                            src={samuelSuhi}
                            alt=""
                            className="img-fluid"
                          ></Image>
                        </div>
                      </Col>
                      <Col lg={5} md={5} sm={5} xs={5}>
                        <Row>
                          <span className="d-block fw-bold">Samuel Suhi</span>
                          <span className="d-block">Transfer</span>
                        </Row>
                      </Col>
                      <Col
                        lg={3}
                        md={3}
                        sm={3}
                        xs={3}
                        className="d-flex align-items-center"
                      >
                        <span>See all</span>
                      </Col>
                    </Row>
                    <Row className={`mb-4`}>
                      <Col lg={3} md={3} sm={3} xs={3}>
                        <div className="d-flex align-items-center">
                          <Image
                            src={samuelSuhi}
                            alt=""
                            className="img-fluid"
                          ></Image>
                        </div>
                      </Col>
                      <Col lg={5} md={5} sm={5} xs={5}>
                        <Row>
                          <span className="d-block fw-bold">Samuel Suhi</span>
                          <span className="d-block">Transfer</span>
                        </Row>
                      </Col>
                      <Col
                        lg={3}
                        md={3}
                        sm={3}
                        xs={3}
                        className="d-flex align-items-center"
                      >
                        <span>See all</span>
                      </Col>
                    </Row>
                    <Row className={`mb-4`}>
                      <Col lg={3} md={3} sm={3} xs={3}>
                        <div className="d-flex align-items-center">
                          <Image
                            src={samuelSuhi}
                            alt=""
                            className="img-fluid"
                          ></Image>
                        </div>
                      </Col>
                      <Col lg={5} md={5} sm={5} xs={5}>
                        <Row>
                          <span className="d-block fw-bold">Samuel Suhi</span>
                          <span className="d-block">Transfer</span>
                        </Row>
                      </Col>
                      <Col
                        lg={3}
                        md={3}
                        sm={3}
                        xs={3}
                        className="d-flex align-items-center"
                      >
                        <span>See all</span>
                      </Col>
                    </Row>
                    <Row className={`mb-4`}>
                      <Col lg={3} md={3} sm={3} xs={3}>
                        <div className="d-flex align-items-center">
                          <Image
                            src={samuelSuhi}
                            alt=""
                            className="img-fluid"
                          ></Image>
                        </div>
                      </Col>
                      <Col lg={5} md={5} sm={5} xs={5}>
                        <Row>
                          <span className="d-block fw-bold">Samuel Suhi</span>
                          <span className="d-block">Transfer</span>
                        </Row>
                      </Col>
                      <Col
                        lg={3}
                        md={3}
                        sm={3}
                        xs={3}
                        className="d-flex align-items-center"
                      >
                        <span>See all</span>
                      </Col>
                    </Row>
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

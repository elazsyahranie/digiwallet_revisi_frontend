import Head from "next/head";
import Image from "next/image";
import styles from "/styles/input.module.css";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  Modal,
  Alert,
} from "react-bootstrap";
import Layout from "/components/Layout";
import { useState } from "react";
import NavBar from "/components/module/NavBar";
import Footer from "/components/module/Footer";
import { authPage } from "middleware/authorizationPage";
import axiosApiIntances from "/utils/axios";
import { connect } from "react-redux";
import router from "next/router";
import { getUserbyId } from "/redux/actions/user";
import { makeTransaction } from "/redux/actions/transaction";
import dashboardIcon from "/public/grid_grey.png";
import transferIcon from "/public/arrow-up.png";
import topUpIcon from "/public/plus.png";
import profileIcon from "/public/group40.png";
import logOutIcon from "/public/log-out.png";
import samuelSuhi from "/public/samuelSuhi.png";

export async function getServerSideProps(context) {
  const data = await authPage(context);
  const { id } = context.query; // ID in query. ID of receiver user
  const receiverId = id;
  const userIdParsed = parseInt(data.userId);
  const userData = await axiosApiIntances
    .get(`user/${userIdParsed}`)
    .then((res) => {
      // console.log(res.data);
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
  const userReceiver = await axiosApiIntances
    .get(`user/${receiverId}`)
    .then((res) => {
      const allReceiverResult = {
        userResult: res.data.data.result,
        balanceResult: res.data.data.resultBalance,
        transactionResult: res.data.data.resultTransactionHistory,
      };
      return allReceiverResult;
    })
    .catch((err) => {
      console.log(err);
    });
  return { props: { userData: userData, userReceiver: userReceiver } };
}

function Input(props) {
  // TRANSACTION ERROR HANDLER
  const [noTransactionValue, setNoTransactionValue] = useState(false);

  // TRANSACION SUCCESS HANDLER
  const [transactionSuccess, setTransactionSuccess] = useState(false);

  // SENDER PIN HANDLER
  const [userPin, setUserPin] = useState("");

  // TRANSACTION
  const [transaction, setTransaction] = useState({
    senderId: props.userData.userResult[0].user_id,
    receiverId: props.userReceiver.userResult[0].user_id,
    transactionValue: "",
    transactionNotes: "",
  });

  // MODAL
  const [transactionModal, setTransactionModal] = useState(false);
  const [wrongPin, setWrongPin] = useState(false);
  const closeTransactionModal = () => {
    setTransactionModal(false);
    setWrongPin(false);
  };
  const showTransactionModal = () => {
    if (!transaction.transactionValue) {
      setNoTransactionValue(true);
    } else {
      setTransactionModal(true);
      setNoTransactionValue(false);
    }
  };

  // ========= //
  const handleTransfer = (event) => {
    event.preventDefault();
    setTransaction({ ...transaction, [event.target.name]: event.target.value });
  };

  const handlePin = (event) => {
    event.preventDefault();
    if (event.target.value) {
      const nextSibling = document.getElementById(
        `pin-${parseInt(event.target.name, 10) + 1}`
      );

      if (nextSibling !== null) {
        nextSibling.focus();
      }
    }
    setUserPin({
      ...userPin,
      [`pin${event.target.name}`]: event.target.value,
    });
    setWrongPin(false);
  };

  const submitTransfer = (event) => {
    event.preventDefault();
    const senderPin =
      userPin.pin1 +
      userPin.pin2 +
      userPin.pin3 +
      userPin.pin4 +
      userPin.pin5 +
      userPin.pin6;
    const { senderId, receiverId, transactionValue, transactionNotes } =
      transaction;
    const transactionData = {
      senderId,
      senderPin,
      receiverId,
      transactionValue,
      transactionNotes,
    };
    props
      .makeTransaction({ ...transactionData })
      .then((res) => {
        console.log(res);
        setTransactionSuccess(true);
        closeTransactionModal(true);
        setWrongPin(false);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .catch(() => {
        setWrongPin(true);
      });
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

  const { balance } = props.userData.balanceResult[0];
  const { user_name } = props.userReceiver.userResult[0];

  return (
    <>
      <Layout title="Digiwallet | Input">
        <Modal show={transactionModal} onHide={closeTransactionModal}>
          <Modal.Header closeButton>
            <Modal.Title>Enter PIN to transfer</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              Enter your 6 digits PIN for confirmation to continue transferring
              money.
            </p>
            <div
              className={`mb-3`}
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
                onChange={(event) => handlePin(event)}
                maxLength="1"
                style={{ width: "10%" }}
              />
              <input
                type="password"
                id="pin-2"
                name="2"
                onChange={(event) => handlePin(event)}
                maxLength="1"
                style={{ width: "10%" }}
              />
              <input
                type="password"
                id="pin-3"
                name="3"
                onChange={(event) => handlePin(event)}
                maxLength="1"
                style={{ width: "10%" }}
              />
              <input
                type="password"
                id="pin-4"
                name="4"
                onChange={(event) => handlePin(event)}
                maxLength="1"
                style={{ width: "10%" }}
              />
              <input
                type="password"
                id="pin-5"
                name="5"
                onChange={(event) => handlePin(event)}
                maxLength="1"
                style={{ width: "10%" }}
              />
              <input
                type="password"
                id="pin-6"
                name="6"
                onChange={(event) => handlePin(event)}
                maxLength="1"
                style={{ width: "10%" }}
              />
            </div>
            {wrongPin && (
              <div>
                <Alert variant="danger">Wrong PIN!</Alert>
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeTransactionModal}>
              Close
            </Button>
            <Button variant="primary" onClick={submitTransfer}>
              Continue
            </Button>
          </Modal.Footer>
        </Modal>
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
                      className={styles.leftMenuButtonSelected}
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
                <h5 className="pb-1">Transfer Money</h5>
                <div className={`p-3 d-flex ${styles.dropShadowBox} mb-3`}>
                  <Image src={samuelSuhi} alt="" className="img-fluid"></Image>
                  <Row className="mx-2">
                    <span className="d-block fw-bold">{user_name}</span>
                    <span className="d-block">+62 813 08790890</span>
                  </Row>
                </div>
                <div className={`p-3`}>
                  <div className={styles.littleParagraph}>
                    <p>
                      Type the amount you want to transfer and then press
                      continue to the next steps.
                    </p>
                  </div>
                  <Form className={styles.nominalInputForm}>
                    <Form.Control
                      className={styles.nominalInput}
                      type="number"
                      name="transactionValue"
                      onChange={(event) => handleTransfer(event)}
                    />
                  </Form>
                  <div className={styles.nominalAvailableContainer}>
                    <h6 className="text-center fw-bold">
                      Rp{balance.toLocaleString()} available
                    </h6>
                  </div>
                  <Form className={`mt-5 ${styles.someNotesForm}`}>
                    <Form.Control
                      className={styles.someNotes}
                      placeholder="Some notes"
                      name="transactionNotes"
                      onChange={(event) => handleTransfer(event)}
                    />
                  </Form>
                  {noTransactionValue && (
                    <Alert className="mt-5" variant="danger">
                      Please insert transaction value!
                    </Alert>
                  )}
                  {transactionSuccess && (
                    <Alert className="mt-5" variant="success">
                      Transaction success
                    </Alert>
                  )}
                  <div className="mt-5 mb-3 d-flex justify-content-end">
                    <Button
                      className={styles.continueButton}
                      onClick={showTransactionModal}
                    >
                      Continue
                    </Button>
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
  transaction: state.transaction,
});

const mapDispatchtoProps = { getUserbyId, makeTransaction };

export default connect(mapStateToProps, mapDispatchtoProps)(Input);

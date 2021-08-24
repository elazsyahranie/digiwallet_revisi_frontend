import Head from "next/head";
import Image from "next/image";
import styles from "/styles/input.module.css";
import { Container, Row, Col, Button, Form, Modal } from "react-bootstrap";
import Layout from "/components/Layout";
import { useState } from "react";
import NavBar from "/components/module/NavBar";
import Footer from "/components/module/Footer";
import { authPage } from "middleware/authorizationPage";
import axiosApiIntances from "/utils/axios";
import { connect } from "react-redux";
import router from "next/router";
import { getUserbyId } from "/redux/actions/user";
import dashboardIcon from "/public/grid_grey.png";
import transferIcon from "/public/arrow-up.png";
import topUpIcon from "/public/plus.png";
import profileIcon from "/public/group40.png";
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
  const [transactionModal, setTransactionModal] = useState(false);
  const closeTransactionModal = () => setTransactionModal(false);
  const showTransactionModal = () => setTransactionModal(true);
  const [transaction, setTransaction] = useState({
    senderId: props.userData.userResult[0].user_id,
    senderPin: "",
    receiverId: props.userReceiver.userResult[0].user_id,
    transactionValue: "",
    transactionNotes: "",
  });

  const handleTransfer = (event) => {
    event.preventDefault();
    setTransaction({ ...transaction, [event.target.name]: event.target.value });
  };

  const submitTransfer = (event) => {
    event.preventDefault();
    console.log(transaction);
  };

  const goToDashboard = () => {
    router.push("/dashboard");
  };

  const goToTransfer = () => {
    router.push("/search");
  };

  // console.log(props.userReceiver.userResult[0].user_id);
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
              money.{" "}
            </p>
            <Form>
              <Form.Control
                name="senderPin"
                onChange={(event) => handleTransfer(event)}
              />
            </Form>
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
            <Row>
              {/* LEFT MENU */}
              <Col lg={3} md={4} className="d-none d-md-block">
                <div className={`${styles.whiteBackground} h-100`}>
                  <div className={`py-5`}>
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
                    <h6 className="text-center fw-bold">Rp120.000 available</h6>
                  </div>
                  <Form className={`mt-5 ${styles.someNotesForm}`}>
                    <Form.Control
                      className={styles.someNotes}
                      placeholder="Some notes"
                      name="transactionNotes"
                      onChange={(event) => handleTransfer(event)}
                    />
                  </Form>
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
});

const mapDispatchtoProps = { getUserbyId };

export default connect(mapStateToProps, mapDispatchtoProps)(Input);

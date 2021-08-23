import Image from "next/image";
import React, { useState } from "react";
import styles from "/styles/search.module.css";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
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

export async function getServerSideProps(context) {
  const data = await authPage(context);
  const userIdParsed = parseInt(data.userId);
  const userData = await axiosApiIntances
    .get(`user/${userIdParsed}`)
    .then((res) => {
      console.log(res.data);
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

function Transfer(props) {
  const [searchForm, setSearchForm] = useState({ keyword: "" });

  const handleSearchBar = (event) => {
    event.preventDefault();
    setSearchForm({ ...searchForm, [event.target.name]: event.target.value });
  };

  const sendKeyword = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      props
        .getUserbyKeyword(searchForm.keyword)
        .then((res) => {
          console.log(res);
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
  return (
    <>
      <Layout title="Digiwallet | Search">
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
                <h5 className="pb-1">Search receiver</h5>
                <Form>
                  <Form.Group className="mb-3" controlId="formBasicSearch">
                    <Form.Control
                      type="text"
                      placeholder="Enter receiver"
                      name="keyword"
                      onChange={(event) => handleSearchBar(event)}
                      onKeyDown={(event) => sendKeyword(event)}
                      required
                    />
                  </Form.Group>
                </Form>
                <div className={`p-2 d-flex ${styles.userSearchResultBox}`}>
                  <div className={`pe-4`}>
                    <Image
                      src={noProfilePicture}
                      width={50}
                      height={50}
                      alt=""
                      className={`img-fluid ${styles.noProfilePictureAvailable}`}
                    />
                  </div>
                  <Row>
                    <span className="fw-bold">Samuel Suhi</span>
                    <span className="fst-italic">Phone Number Unavailable</span>
                  </Row>
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

export default connect(mapStateToProps, mapDispatchtoProps)(Transfer);

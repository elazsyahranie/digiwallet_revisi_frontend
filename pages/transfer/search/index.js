import Image from "next/image";
import React, { useState } from "react";
import styles from "/styles/search.module.css";
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
import ReactPaginate from "react-paginate";

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

function Transfer(props) {
  const [searchForm, setSearchForm] = useState({ keyword: "" });
  const [searchResult, setSearchResult] = useState([]);

  const [totalPage, setTotalPage] = useState("");
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("user_name ASC");
  const [searchUsername, setSearchUsername] = useState({ search: "" });

  const handleSearchBar = (event) => {
    event.preventDefault();
    setSearchUsername({
      ...searchUsername,
      [event.target.name]: event.target.value,
    });
  };

  const sendKeyword = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      // console.log(search);
      props
        .getUserbyKeyword(page, sort, searchUsername.search)
        .then((res) => {
          setSearchResult(res.value.data.data);
          setTotalPage(res.value.data.pagination.totalPage);
          // console.log(page);
          console.log("Total Page");
          console.log(totalPage);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const goToInputPage = (user_id) => {
    router.push(`/transfer/input/${user_id}`);
  };

  const goToDashboard = () => {
    router.push("/dashboard");
  };

  const goToTransfer = () => {
    router.push("/search");
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
      <Layout title="Digiwallet | Search">
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
                className={`${styles.whiteBackground}`}
              >
                <div className={`p-4`}>
                  <h5 className="pb-1">Search receiver</h5>
                  <Form>
                    <Form.Group className="mb-3" controlId="formBasicSearch">
                      <Form.Control
                        type="text"
                        placeholder="Enter receiver"
                        name="search"
                        onChange={(event) => handleSearchBar(event)}
                        onKeyDown={(event) => sendKeyword(event)}
                        required
                      />
                    </Form.Group>
                  </Form>
                  {searchResult.length < 0
                    ? null
                    : searchResult.map((item, index) => {
                        return (
                          <div
                            className={`p-2 d-flex ${styles.userSearchResultBox}`}
                            onClick={() => goToInputPage(item.user_id)}
                            key={index}
                          >
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
                              <span className="fw-bold">{item.user_name}</span>
                              <span className="fst-italic">
                                Phone Number Unavailable
                              </span>
                            </Row>
                          </div>
                        );
                      })}
                  {searchResult.length > 0 ? (
                    <div className={styles.myPaginationContainer}>
                      <ReactPaginate
                        previousLabel={"<<"}
                        nextLabel={">>"}
                        breakLabel={"..."}
                        breakClassName={"break-me"}
                        pageCount={totalPage}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={1}
                        containerClassName={styles.pagination}
                        subContainerClassName={`${styles.pages} ${styles.pagination}`}
                        activeClassName={styles.active}
                      />
                    </div>
                  ) : null}
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

import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import Layout from "../components/Layout";
import NavBar from "../components/module/NavBar";
import Footer from "../components/module/Footer";
import { authPage } from "middleware/authorizationPage";
import axiosApiIntances from "/utils/axios";
import Cookie from "js-cookie";
import { connect } from "react-redux";
import { getUserbyId } from "/redux/actions/user";
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
      return res.data.data[0];
    })
    .catch((err) => {
      console.log(err);
    });
  return { props: { userInfo: userData } };
}

function Home(props) {
  console.log(props);
  return (
    <>
      <Layout title="Digiwallet | Dashboard">
        <NavBar data={props.userInfo} />
        <div className={styles.greyBackground}>
          <Container fluid="sm" className="py-4">
            <Row>
              {/* LEFT MENU */}
              <Col lg={3} md={4} className="d-none d-md-block">
                <div className={styles.whiteBackground}>
                  <div className={`pt-5`}>
                    <Button className={styles.leftMenuButtonSelected}>
                      <Image
                        src={dashboardIcon}
                        alt=""
                        className={`img-fluid ${styles.leftMenuButtonIcon}`}
                      ></Image>
                      <span className={`${styles.leftMenuExplaination}`}>
                        Dashboard
                      </span>
                    </Button>
                    <Button className={styles.leftMenuButton}>
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
              <Col lg={8} md={7} sm={12} xs={12}>
                <Row
                  className={`p-4 mb-3 ${styles.blueBackground} ${styles.whiteText}`}
                >
                  <Col lg={9} md={9} sm={9} xs={9}>
                    <span className="d-block">Balance</span>
                    <h2>Rp120.000</h2>
                    <span className="d-block">+62 813-9387-7946</span>
                  </Col>
                  <Col lg={3} md={3} sm={3} xs={3}>
                    <Button className={styles.rightMenuButtonUp}>
                      Transfer
                    </Button>
                    <Button className={styles.rightMenuButtonUp}>Top Up</Button>
                  </Col>
                </Row>
                {/* RIGHT MENU BOTTOM */}
                <Row className={`p-4 ${styles.whiteBackground}`}>
                  <Col lg={9} md={9} sm={7} xs={7}>
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
                  <Col lg={3} md={3} sm={5} xs={5}>
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

export default connect(mapStateToProps, mapDispatchtoProps)(Home);

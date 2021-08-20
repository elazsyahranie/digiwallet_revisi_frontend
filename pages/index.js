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
          <Container fluid="lg" className="py-4">
            <Row>
              {/* LEFT MENU */}
              <Col lg={3} md={4} sm={1} xs={1}>
                <div className={styles.whiteBackground}>
                  <div className={`pt-5`}>
                    <div className={styles.leftMenu}>
                      <Button className={styles.leftMenuButtonSelected}>
                        <Image
                          src={dashboardIcon}
                          alt=""
                          className={`img-fluid ${styles.leftMenuButtonIcon}`}
                        ></Image>
                      </Button>
                      <Button className={styles.leftMenuExplaination}>
                        <span>Dashboard</span>
                      </Button>
                    </div>
                    <Button className={styles.leftMenuButton}>
                      <Image
                        src={transferIcon}
                        alt=""
                        className={`img-fluid ${styles.leftMenuButtonIcon}`}
                      ></Image>
                      <span className={`mx-4 ${styles.menuExplaination}`}>
                        Transfer
                      </span>
                    </Button>
                    <Button className={styles.leftMenuButton}>
                      <Image
                        src={topUpIcon}
                        alt=""
                        className={`img-fluid ${styles.leftMenuButtonIcon}`}
                      ></Image>
                      <span className={`mx-4 ${styles.menuExplaination}`}>
                        Top Up
                      </span>
                    </Button>
                    <Button className={styles.leftMenuButton}>
                      <Image
                        src={profileIcon}
                        alt=""
                        className={`img-fluid ${styles.leftMenuButtonIcon}`}
                      ></Image>
                      <span className={`mx-4 ${styles.menuExplaination}`}>
                        Profile
                      </span>
                    </Button>
                  </div>
                </div>
              </Col>
              {/* RIGHT MENU */}
              <Col lg={8} md={7} sm={11} xs={11}>
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
                  <Col lg={6} md={6} sm={6} xs={6}>
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
                  <Col lg={6} md={6} sm={6} xs={6}>
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

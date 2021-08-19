import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import Layout from "../components/Layout";
import NavBar from "../components/module/NavBar";
import Footer from "../components/module/Footer";
import { authPage } from "middleware/authorizationPage";
import { connect } from "react-redux";
import { getUserbyId } from "/redux/actions/user";
import dashboardIcon from "/public/grid_grey.png";
import transferIcon from "/public/arrow-up.png";
import topUpIcon from "/public/plus.png";
import profileIcon from "/public/group40.png";

export async function getServerSideProps(context) {
  const data = await authPage(context);
  console.log(data);
  // getUserbyId(data.id)
  //   .then((res) => {
  //     console.log(res);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  return { props: {} }; // untuk halaman yang ga perlu login
}

function Home(props) {
  return (
    <>
      <Layout title="Home">
        <NavBar />
        <div className={styles.greyBackground}>
          <Container className="py-4">
            <Row>
              {/* LEFT MENU */}
              <Col lg={3} md={3} sm={12} xs={12}>
                <div className={styles.whiteBackground}>
                  <div className="pt-5">
                    <Button className={styles.leftMenuButton}>
                      <Image
                        src={dashboardIcon}
                        alt=""
                        className={`img-fluid ${styles.leftMenuButtonIcon}`}
                      ></Image>
                      <span className="mx-4">Dashboard</span>
                    </Button>
                    <Button className={styles.leftMenuButton}>
                      <Image
                        src={transferIcon}
                        alt=""
                        className={`img-fluid ${styles.leftMenuButtonIcon}`}
                      ></Image>
                      <span className="mx-4">Transfer</span>
                    </Button>
                    <Button className={styles.leftMenuButton}>
                      <Image
                        src={topUpIcon}
                        alt=""
                        className={`img-fluid ${styles.leftMenuButtonIcon}`}
                      ></Image>
                      <span className="mx-4">Top Up</span>
                    </Button>
                    <Button className={styles.leftMenuButton}>
                      <Image
                        src={profileIcon}
                        alt=""
                        className={`img-fluid ${styles.leftMenuButtonIcon}`}
                      ></Image>
                      <span className="mx-4">Profile</span>
                    </Button>
                  </div>
                </div>
              </Col>
              {/* RIGHT MENU */}
              <Col lg={8} md={8} sm={12} xs={12}>
                <Row
                  className={`p-4 ${styles.blueBackground} ${styles.whiteText}`}
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
                <Col>Hey!</Col>
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

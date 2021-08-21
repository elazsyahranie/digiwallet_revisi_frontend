import Head from "next/head";
import Image from "next/image";
import styles from "/styles/input.module.css";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import Layout from "/components/Layout";
import NavBar from "/components/module/NavBar";
import Footer from "/components/module/Footer";
import { authPage } from "middleware/authorizationPage";
import axiosApiIntances from "/utils/axios";
import { connect } from "react-redux";
import { getUserbyId } from "/redux/actions/user";
import dashboardIcon from "/public/grid_grey.png";
import transferIcon from "/public/arrow-up.png";
import topUpIcon from "/public/plus.png";
import profileIcon from "/public/group40.png";
import samuelSuhi from "/public/samuelSuhi.png";

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

function Input(props) {
  return (
    <>
      <Layout title="Digiwallet | Input">
        <NavBar data={props.userInfo} />
        <div className={styles.greyBackground}>
          <Container fluid="sm" className="py-4">
            <Row>
              {/* LEFT MENU */}
              <Col lg={3} md={4} className="d-none d-md-block">
                <div className={`${styles.whiteBackground} h-100`}>
                  <div className={`py-5`}>
                    <Button className={styles.leftMenuButton}>
                      <Image
                        src={dashboardIcon}
                        alt=""
                        className={`img-fluid ${styles.leftMenuButtonIcon}`}
                      ></Image>
                      <span className={`${styles.leftMenuExplaination}`}>
                        Dashboard
                      </span>
                    </Button>
                    <Button className={styles.leftMenuButtonSelected}>
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
                    <span className="d-block fw-bold">Samuel Suhi</span>
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
                    <Form.Control className={styles.nominalInput} type="text" />
                  </Form>
                  <div className={styles.nominalAvailableContainer}>
                    <h6 className="text-center fw-bold">Rp120.000 available</h6>
                  </div>
                  <Form className={`mt-5 ${styles.someNotesForm}`}>
                    <Form.Control
                      className={styles.someNotes}
                      placeholder="Some notes"
                    />
                  </Form>
                  <div className="mt-5 mb-3 d-flex justify-content-end">
                    <Button className={styles.continueButton}>Continue</Button>
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

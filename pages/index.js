import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { Container, Row, Col, Button } from "react-bootstrap";
import Layout from "../components/Layout";
import NavBar from "../components/module/NavBar";
import Footer from "../components/module/Footer";
import { authPage } from "middleware/authorizationPage";
import dashboardIcon from "/public/grid_grey.png";

export default function Home() {
  return (
    <>
      <Layout title="Home">
        <NavBar />
        <div className={styles.greyBackground}>
          <Container className="py-4">
            <Row>
              <Col lg={3} md={3} sm={12} xs={12}>
                <div className={styles.whiteBackground}>
                  <div className="pt-5">
                    <div className={styles.leftMenuButton}>
                      <Image
                        src={dashboardIcon}
                        alt=""
                        className="img-fluid"
                      ></Image>
                      <span>Dashboard</span>
                    </div>
                    <div className={styles.leftMenuButton}>Transfer</div>
                    <div className={styles.leftMenuButton}>Top Up</div>
                    <div className={styles.leftMenuButton}>Profile</div>
                  </div>
                </div>
              </Col>
              <Col lg={8} md={8} sm={12} xs={12}>
                Menu Here!
              </Col>
            </Row>
          </Container>
        </div>
        <Footer />
      </Layout>
    </>
  );
}

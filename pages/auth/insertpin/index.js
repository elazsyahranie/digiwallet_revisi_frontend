import Image from "next/image";
import Layout from "/components/Layout";
import { useState } from "react";
import { Container, Row, Form, Button, Alert } from "react-bootstrap";
import style from "/styles/login.module.css";
import logo from "/public/login/Zwallet.png";
import Group57 from "/public/login/Group57.png";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import Cookies from "js-cookie";
import { insertPin } from "/redux/actions/user";
import { authPage } from "/middleware/authorizationPage";

export async function getServerSideProps(context) {
  const data = await authPage(context);
  const userIdParsed = parseInt(data.userId);
  console.log(userIdParsed);
  return { props: { userId: userIdParsed } };
}

function insertpin(props) {
  const router = useRouter();
  const [form, setForm] = useState("");
  const [pinBlank, setPinBlank] = useState(false);
  const [pinLess, setPinLess] = useState(false);
  const [insertPinSuccess, setInsertPinSuccess] = useState(false);

  const changeText = (event) => {
    event.preventDefault();
    if (event.target.value) {
      const nextSibling = document.getElementById(
        `pin-${parseInt(event.target.name, 10) + 1}`
      );

      if (nextSibling !== null) {
        nextSibling.focus();
      }
    }
    setForm({ ...form, [`pin${event.target.name}`]: event.target.value });
    setPinBlank(false);
    setPinLess(false);
    setInsertPinSuccess(false);
  };

  const postPin = (event) => {
    event.preventDefault();
    const userPin =
      form.pin1 + form.pin2 + form.pin3 + form.pin4 + form.pin5 + form.pin6;
    if (!userPin) {
      setPinBlank(true);
    } else {
      props
        .insertPin(props.userId, { userPin })
        .then((res) => {
          console.log(res);
          setInsertPinSuccess(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <>
      <Layout title="Digiwallet | Insert Pin">
        <Container fluid>
          <Row>
            <div
              className={`col-lg-6 col-md-6 d-none d-md-block ${style.leftCol}`}
            >
              <Row className="pt-5">
                <div className="mx-5 position-relative">
                  <Image src={logo} className="img-fluid"></Image>
                </div>
              </Row>
              <div className={style.group57}>
                <Image src={Group57} className={`img-fluid`}></Image>
              </div>
              <div className="mx-5">
                <h4 className={`fw-bold pb-2 ${style.descriptionHeader}`}>
                  App that covering banking needs
                </h4>
                <p className={style.description}>
                  Digiwallet is an app that focusing in banking needs or all
                  users in the world. Always updated and always following world
                  trends. 5000+ users registered in Digiwallet everyday with
                  worldwide coverage usage.
                </p>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <Row className="p-5">
                <div className="pt-5 px-5">
                  <h4 className={`fw-bold ${style.lineHeight2dot5}`}>
                    Start Accessing Bank Needs With All Devices and All
                    Platforms With +30.000 Users
                  </h4>
                  <p className={style.lineHeight2}>
                    Create 6 digits pin to secure all your money and your data
                    in Zwallet app. Keep it secret and don’t tell anyone about
                    your Zwallet account password and the PIN.
                  </p>
                  <div>
                    <span>Insert PIN</span>
                  </div>
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
                      onChange={(event) => changeText(event)}
                      maxLength="1"
                      style={{ width: "10%" }}
                    />
                    <input
                      type="password"
                      id="pin-2"
                      name="2"
                      onChange={(event) => changeText(event)}
                      maxLength="1"
                      style={{ width: "10%" }}
                    />
                    <input
                      type="password"
                      id="pin-3"
                      name="3"
                      onChange={(event) => changeText(event)}
                      maxLength="1"
                      style={{ width: "10%" }}
                    />
                    <input
                      type="password"
                      id="pin-4"
                      name="4"
                      onChange={(event) => changeText(event)}
                      maxLength="1"
                      style={{ width: "10%" }}
                    />
                    <input
                      type="password"
                      id="pin-5"
                      name="5"
                      onChange={(event) => changeText(event)}
                      maxLength="1"
                      style={{ width: "10%" }}
                    />
                    <input
                      type="password"
                      id="pin-6"
                      name="6"
                      onChange={(event) => changeText(event)}
                      maxLength="1"
                      style={{ width: "10%" }}
                    />
                  </div>
                  <Button
                    variant="primary"
                    type="submit"
                    onClick={(event) => postPin(event)}
                  >
                    Confirm
                  </Button>
                  {pinBlank && (
                    <div className="mt-3">
                      <Alert variant="danger">You need to enter PIN! </Alert>
                    </div>
                  )}
                  {pinLess && (
                    <div className="mt-3">
                      <Alert variant="danger">
                        PIN should not be shorter than 6!{" "}
                      </Alert>
                    </div>
                  )}
                  {insertPinSuccess && (
                    <div className="mt-3">
                      <Alert variant="success">Insert PIN success!</Alert>
                    </div>
                  )}
                </div>
              </Row>
            </div>
          </Row>
        </Container>
      </Layout>
    </>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  user: state.user,
});

const mapDispatchtoProps = { insertPin };

export default connect(mapStateToProps, mapDispatchtoProps)(insertpin);

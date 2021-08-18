import Image from "next/image";
import Layout from "/components/Layout";
import { useState } from "react";
import { Container, Row, Form, Button } from "react-bootstrap";
import style from "../../../styles/login.module.css";
import logo from "../../../public/login/Zwallet.png";
import Group57 from "../../../public/login/Group57.png";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();
  const [form, setForm] = useState({ userEmail: "", userPassword: "" });

  const changeText = (event) => {
    event.preventDefault();
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const postLogin = () => {
    event.preventDefault();
    console.log(form);
    console.log(`Testing the Log In submit button!`);
  };

  return (
    <>
      <Layout title="Digiwallet | Login">
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
                    Transfering money is eassier than ever, you can access
                    Zwallet wherever you are. Desktop, laptop, mobile phone? We
                    cover all of that for you!
                  </p>
                  <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Email address</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter email"
                        name="userEmail"
                        onChange={(event) => changeText(event)}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Password"
                        name="userPassword"
                        onChange={(event) => changeText(event)}
                        required
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                      <Form.Check type="checkbox" label="Check me out" />
                    </Form.Group>
                    <Button
                      variant="primary"
                      type="submit"
                      onClick={(event) => postLogin(event)}
                    >
                      Login
                    </Button>
                  </Form>
                </div>
              </Row>
            </div>
          </Row>
        </Container>
      </Layout>
    </>
  );
}

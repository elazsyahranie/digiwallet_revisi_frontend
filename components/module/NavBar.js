import { Navbar, Nav, Container, Button, Row } from "react-bootstrap";
import Image from "next/image";
import ZwalletLogo from "/public/ZwalletLogoColor.png";
import TempImgProfile from "/public/Rectangle 25.png";
import style from "/styles/navbar.module.css";

function NavBar() {
  return (
    <>
      <Navbar expand="lg" className={style.navbarHeight}>
        <Container>
          {/* <Navbar.Brand href="#home">
            <Image src={ZwalletLogo} alt="" className="img-fluid"></Image>
          </Navbar.Brand> */}
          <Navbar.Brand href="#home">
            <Image src={ZwalletLogo} className="d-inline-block align-top" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav
              className={`justify-content-between me-auto ${style.leftNav}`}
              style={{ width: "16rem" }}
            >
              <Nav.Item>
                <Nav.Link href="/landing-page">Home</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link>Payment</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link onClick={(event) => toGoToEditProfile(event)}>
                  Profile
                </Nav.Link>
              </Nav.Item>
            </Nav>
            <Nav
              className={`justify-content-between`}
              style={{ width: "15rem" }}
            >
              <Nav.Item>
                <Nav.Link>
                  <Image
                    src={TempImgProfile}
                    alt=""
                    className="img-fluid"
                  ></Image>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Row>
                  <span className="d-block fw-bold">Robert Chandler</span>
                  <span className="d-block">+62 8139 3877 7946</span>
                </Row>
              </Nav.Item>
              <Nav.Item>
                <Button
                  variant="danger"
                  onClick={(event) => toHandleLogOut(event)}
                >
                  Log Out
                </Button>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;

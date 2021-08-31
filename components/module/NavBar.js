import { Navbar, Nav, Container, Button, Row } from "react-bootstrap";
import Image from "next/image";
import ZwalletLogo from "/public/ZwalletLogoColor.png";
import noProfilePicture from "/public/img-not-found.png";
import BellLogo from "/public/bell_icon.png";
import style from "/styles/navbar.module.css";

function NavBar(props) {
  return (
    <>
      <Navbar expand="lg" className={style.navbarHeight}>
        <Container>
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
              style={{ minWidth: "260px" }}
            >
              <Nav.Item>
                {!props.data.userResult[0].user_image ? (
                  <Image
                    src={noProfilePicture}
                    alt=""
                    height={52}
                    width={52}
                    className={`img-fluid my-auto`}
                  />
                ) : (
                  <img
                    src={`${process.env.IMAGE_URL}/${props.data.userResult[0].user_image}`}
                    className={style.profilePicture}
                  ></img>
                )}
              </Nav.Item>
              <Nav.Item>
                <div className={style.namePhoneNumber}>
                  <span className="d-block fw-bold">
                    {props.data.userResult[0].user_name}
                  </span>
                  <span className="d-block">+62 8139 3877 7946</span>
                </div>
              </Nav.Item>
              <Nav.Item>
                <Image src={BellLogo} alt="" className={`img-fluid`}></Image>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;

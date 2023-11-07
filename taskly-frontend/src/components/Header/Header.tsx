import { Row, Col } from "reactstrap";
import Logo from "../../assets/images/logo.png";
const Header = () => {
  return (
    <>
      <Row style={{ marginTop: 15 }}>
        <Col xs={8}>
          <img alt="todoli" style={{ height: "7vh" }} src={Logo}></img>
        </Col>

        <Col></Col>
      </Row>

      <hr />
    </>
  );
};

export default Header;

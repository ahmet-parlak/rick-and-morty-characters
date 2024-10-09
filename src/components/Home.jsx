import { Row, Col } from "antd";

import Header from "./Header";
import Filters from "./Filters";
import Characters from "./Characters/index";
import Footer from "./Footer";

function App() {
  console.log("rendered");
  
  return (
    <>
      <Header />
      <Row>
        <Col span={4}>
          <Filters />
        </Col>
        <Col span={17}>
          <Characters />
        </Col>
      </Row>
      <Footer />
    </>
  );
}

export default App;

import React, { Component } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";

class SerachComponent extends Component {
  state = {};
  render() {
    const { handleChange, handleSearch } = this.props;
    return (
      <Container className="p-3">
        <Row className="justify-content-md-center">
          <Col className="col-sm-9 col-md-6">
            <input type="text" name="search" style={{width:"100%"}} onChange={handleChange} />
          </Col>
          <Col className="col-sm-3 col-md-3">
            <Button style={{backgroundColor:"#1DA1F2", borderColor:"#1DA1F2", borderRadius:"0px",width:"100%"}} onClick={handleSearch} size="sm">
              SEARCH
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default SerachComponent;

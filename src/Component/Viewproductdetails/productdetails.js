/** @format */

import React, { useState } from "react";
import { Form, Label, Row } from "reactstrap";
import { Card, CardBody, Col, FormGroup } from "reactstrap";
import { useLocation, useNavigate } from "react-router-dom";

export default function Productdetails() {
  const location = useLocation();
  const navigate = useNavigate("");

  let productdetail = location.state.DATA;

  return (
    <div>
      <h3 className="productheader">Productdetails</h3>

      <Form className="addproduct">
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "65vh" }}
        >
          <Card className="" style={{ width: "50%" }}>
            <CardBody>
              <Row>
                <Col sm="6">
                  <FormGroup className="mb-3">
                    <Label>Price</Label>
                    <input
                      className="form-control"
                      style={{ borderColor: "black" }}
                      type="text"
                      name="price"
                      placeholder="price*"
                      defaultValue={productdetail?.price}
                      disabled
                    />
                  </FormGroup>
                </Col>

                <Col sm="3">
                  <FormGroup className="mb-3">
                    <Label>count</Label>
                    <input
                      className="form-control"
                      style={{ borderColor: "black" }}
                      type="text"
                      name="count"
                      placeholder="Count*"
                      defaultValue={productdetail?.rating?.count}
                      disabled
                    />
                  </FormGroup>
                </Col>

                <Col sm="3">
                  <FormGroup className="mb-3">
                    <Label>rate</Label>
                    <input
                      className="form-control"
                      style={{ borderColor: "black" }}
                      type="text"
                      name="rate"
                      placeholder="Rate*"
                      defaultValue={productdetail?.rating?.rate}
                      disabled
                    />
                  </FormGroup>
                </Col>
              </Row>

              <Row>
                <Col sm="6">
                  <FormGroup className="mb-3">
                    <Label>Category</Label>
                    <input
                      className="form-control"
                      style={{ borderColor: "black" }}
                      type="text"
                      name="category"
                      placeholder="category*"
                      defaultValue={productdetail?.category}
                      disabled
                    />
                  </FormGroup>
                </Col>

                <Col sm="6">
                  <FormGroup className="mb-3 d-grid">
                    <Label>Product image </Label>
                    <img
                      height={78}
                      src={productdetail?.image}
                      alt="productimage"
                      disabled
                    />
                  </FormGroup>
                </Col>
                <Col sm="12">
                  <FormGroup className="mb-3">
                    <Label>Title </Label>
                    <textarea
                      className="form-control"
                      style={{ borderColor: "black" }}
                      type="text"
                      name="title"
                      placeholder="Title*"
                      defaultValue={productdetail?.title}
                      disabled
                    />
                  </FormGroup>
                </Col>
                <Col sm="12">
                  <FormGroup className="mb-3">
                    <Label>Description </Label>
                    <textarea
                      className="form-control"
                      style={{ borderColor: "black" }}
                      type="text"
                      name="description"
                      placeholder="Description*"
                      defaultValue={productdetail?.description}
                      disabled
                    />
                  </FormGroup>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </div>
      </Form>
    </div>
  );
}

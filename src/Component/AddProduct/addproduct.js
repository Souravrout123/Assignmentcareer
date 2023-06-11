/** @format */

import React, {  useState } from "react";
import {  Form, Label, Row } from "reactstrap";
import { Card, CardBody, Col, FormGroup } from "reactstrap";
import axios from "axios";
import URLS from "../../Utils/apiurl";

import { useNavigate } from "react-router-dom";
import { errorPopup, successPopup } from "../../Utils/toastermessage";

export default function Addproduct() {
  const navigate = useNavigate("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setdescription] = useState("");
  const [category, setCategory] = useState("");
  const [selectedFileName, setSelectedFileName] = useState("Choose file");

  const handleFileInputChange = (file) => {
    if (file) {
      setSelectedFileName(file.name);
    } else {
      setSelectedFileName("Choose file");
    }
  };

  const ProductAdd = (e) => {
    e.preventDefault();

    axios
      .post(
        `${URLS.addproduct}`,
        {
          title: title,
          price: price,
          description: description,
          image: selectedFileName,
          category: category,
        },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        }
      )
      .then((res) => {
        navigate(`/`);
        successPopup("Product add sucessfully");
      })
      .catch((err) => {
        errorPopup("Try again");
      });
  };

  const Cancel = (e) => {
    e.preventDefault();
    setTitle("");
    setPrice("");
    setdescription("");
    setCategory("");
  };
  return (
    <div>
      <h3 className="productheader">Add product </h3>

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
                    <Label>Title </Label>
                    <input
                      className="form-control"
                      style={{ borderColor: "black" }}
                      type="text"
                      name="title"
                      placeholder="Title*"
                      onChange={(e) => setTitle(e.target.value)}
                      value={title}
                      required
                    />
                  </FormGroup>
                </Col>
                <Col sm="6">
                  <FormGroup className="mb-3">
                    <Label>Price</Label>
                    <input
                      className="form-control"
                      style={{ borderColor: "black" }}
                      type="number"
                      name="price"
                      placeholder="price*"
                      onChange={(e) => setPrice(e.target.value)}
                      value={price}
                      required
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
                      onChange={(e) => setCategory(e.target.value)}
                      value={category}
                      required
                    />
                  </FormGroup>
                </Col>
                <Col sm="6">
                  <FormGroup className="mb-3">
                    <Label htmlFor="fileInput">Product image</Label>
                    <div className="custom-file">
                      <input
                        type="file"
                        className="custom-file-input"
                        id="fileInput"
                        onChange={(e) =>
                          handleFileInputChange(e.target.files[0])
                        }
                        required
                      />
                      <label className="custom-file-label" htmlFor="fileInput">
                        {selectedFileName}
                      </label>
                    </div>
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
                      onChange={(e) => setdescription(e.target.value)}
                      value={description}
                      required
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col className="">
                  <div className="mb-0 d-flex justify-content-center">
                    <button
                      className="btn btn-primary float-end mr-2"
                      onClick={Cancel}
                    >
                      Cancel
                    </button>
                    <button
                      className="btn btn-primary float-end"
                      onClick={ProductAdd}
                    >
                      Add
                    </button>
                  </div>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </div>
      </Form>
    </div>
  );
}

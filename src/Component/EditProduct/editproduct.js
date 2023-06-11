/** @format */

import React, { useState } from "react";
import { Button, Form, Label, Row } from "reactstrap";
import URLS from "../../Utils/apiurl";
import { Card, CardBody, Col, FormGroup } from "reactstrap";

import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { errorPopup, successPopup } from "../../Utils/toastermessage";

export default function EditProduct() {
  const location = useLocation();
  const navigate = useNavigate("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [selectedFileName, setSelectedFileName] = useState("Choose file");

  const handleFileInputChange = (file) => {
    if (file) {
      setSelectedFileName(file.name);
    } else {
      setSelectedFileName("Choose file");
    }
  };

  let Editproductdetail = location.state.DATA;
  const [id, setid] = useState(Editproductdetail?.id);

  const EditProduct = (e) => {
    e.preventDefault();

    axios
      .put(
        `${URLS.editproduct}/${id}`,
        {
          title: title !== "" ? title : Editproductdetail?.title,
          price: price !== "" ? price : Editproductdetail?.price,
          description:
            description !== "" ? description : Editproductdetail?.description,
          image:
            selectedFileName !== ""
              ? selectedFileName
              : Editproductdetail?.image,
          category: category !== "" ? category : Editproductdetail?.category,
        },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        }
      )
      .then((res) => {
        console.log(res);
        navigate(`/`);
        successPopup("Product updated successfully");
      })
      .catch((err) => {
        errorPopup("An error occurred. Please try again");
      });
  };

  return (
    <div>
      <h3 className="productheader">Edit product </h3>

      <Form className="addproduct">
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "65vh" }}
        >
          <Card className="" style={{ width: "50%" }}>
            <CardBody>
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
                        placeholder="Price*"
                        defaultValue={Editproductdetail?.price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                      />
                    </FormGroup>
                  </Col>

                  <Col sm="6">
                    <FormGroup className="mb-3">
                      <Label>Category</Label>
                      <input
                        className="form-control"
                        style={{ borderColor: "black" }}
                        type="text"
                        name="category"
                        placeholder="Category*"
                        defaultValue={Editproductdetail?.category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                      />
                    </FormGroup>
                  </Col>
                </Row>

                <Row>
                  <Col sm="6">
                    <FormGroup className="mb-3">
                      <Label>Title </Label>
                      <textarea
                        className="form-control"
                        style={{ borderColor: "black" }}
                        type="text"
                        name="title"
                        placeholder="Title*"
                        defaultValue={Editproductdetail?.title}
                        onChange={(e) => setTitle(e.target.value)}
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
                        <label
                          className="custom-file-label"
                          htmlFor="fileInput"
                        >
                          {selectedFileName}
                        </label>
                      </div>
                    </FormGroup>
                  </Col>
                </Row>

                <Row>
                  <Col sm="12">
                    <FormGroup className="mb-3">
                      <Label>Description </Label>
                      <textarea
                        className="form-control"
                        style={{ borderColor: "black" }}
                        type="text"
                        name="description"
                        placeholder="Description*"
                        defaultValue={Editproductdetail?.description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                      />
                    </FormGroup>
                  </Col>
                </Row>

                <Row>
                  <Col className="">
                    <div className="mb-0 d-flex justify-content-center">
                      <Button
                        color="primary"
                        className="float-end"
                        onClick={EditProduct}
                      >
                        Edit
                      </Button>
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </CardBody>
          </Card>
        </div>
      </Form>
    </div>
  );
}

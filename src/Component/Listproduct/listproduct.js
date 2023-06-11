/** @format */

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../Component/Product.css";
import axios from "axios";
import URLS from "../../Utils/apiurl";
import DataTable from "react-data-table-component";
import { Modal, Button } from "react-bootstrap";
import { successPopup } from "../../Utils/toastermessage";

function Listproduct() {
  const navigate = useNavigate("");
  const [productdata, setproductdata] = useState([]);
  const [filterdata, setfilterdata] = useState([]);
  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState("");

  async function Addproduct() {
    navigate(`/addproduct`);
  }

  async function EditProductdetails(row) {
    navigate(`/editproduct`, {
      state: { DATA: row },
    });
  }

  async function ViewProductdetails(row) {
    navigate(`viewdetails`, {
      state: { DATA: row },
    });
  }

  const Productdata = async () => {
    try {
      const response = await axios.get(`${URLS.productlist}`, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      });
      console.log(response.data);
      setproductdata(response?.data);
      setfilterdata(response?.data);
    } catch (error) {}
  };

  const columns = [
    {
      name: "Product Title",
      selector: (row) => row?.title,
    },

    {
      name: "Product Price",
      selector: (row) => row?.price,
    },
    {
      name: "Product Category",
      selector: (row) => row?.category,
    },
    {
      name: "Rate",
      selector: (row) => row?.rating?.rate,
    },
    {
      name: "Count",
      selector: (row) => row?.rating?.count,
    },
    {
      name: "Action",
      selector: (row) => (
        <div className="d-flex align-item-center">
          <p>
            <i
              className="material-icons"
              style={{
                color: "#6362e7",
                fontSize: "18px",
                marginRight: "5px",
                cursor: "pointer",
              }}
              title="Edit"
              onClick={() => {
                EditProductdetails(row);
              }}
            >
              edit
            </i>
          </p>
          <p>
            <i
              className="material-icons"
              style={{
                color: "black",
                fontSize: "18px",
                marginRight: "5px",
                cursor: "pointer",
              }}
              title="View"
              onClick={() => {
                console.log(row);
                ViewProductdetails(row);
              }}
            >
              visibility
            </i>
          </p>
          <p>
            <span
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#usermodal"
            >
              <i
                className="material-icons"
                style={{
                  color: "red",
                  fontSize: "18px",
                  marginRight: "5px",
                  cursor: "pointer",
                }}
                title="Delete"
                onClick={() => {
                  setProductIdToDelete(row.id);
                  setShowModal(true);
                }}
              >
                delete
              </i>
            </span>
          </p>
        </div>
      ),
    },
  ];

  const handleClose = () => {
    setShowModal(false);
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `${URLS.removeproduct}/${productIdToDelete}`,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        }
      );

      Productdata();
      console.log(response.data);
      handleClose();
      successPopup("product remove sucessfully");
    } catch (error) {
      console.log("Error deleting product:", error);
    }
  };

  useEffect(() => {
    Productdata();
  }, []);

  useEffect(() => {
    if (search) {
      let filterddata = productdata.filter((mapping) => {
        return (
          String(mapping?.title).toLowerCase().includes(search.toLowerCase()) ||
          String(mapping?.price).toLowerCase().includes(search.toLowerCase()) ||
          String(mapping?.category)
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          String(mapping?.rating?.rate)
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          String(mapping?.rating?.count)
            .toLowerCase()
            .includes(search.toLowerCase())
        );
      });
      setfilterdata(filterddata);
    } else {
      setfilterdata(productdata);
    }
  }, [search]);

  return (
    <div>
      <h3 className="productheader">Product list</h3>
      <button
        type="button"
        className="btn btn-primary"
        style={{ color: "white", float: "right" }}
        onClick={Addproduct}
      >
        Add product
      </button>
      <div className="productlist">
        <DataTable
          columns={columns}
          data={filterdata}
          pagination
          fixedHeader
          fixedHeaderScrollHeight="400px"
          highlightOnHover
          subHeader
          subHeaderComponent={
            <input
              type="text"
              placeholder="Search here..."
              className="w-25 form-control"
              onChange={(e) => setSearch(e.target.value)}
            />
          }
        />

        <Modal show={showModal} onHide={handleClose}>
          <Modal.Body>
            <p>Are you sure you want to delete this item?</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default Listproduct;

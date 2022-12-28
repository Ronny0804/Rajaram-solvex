import React from "react";
import { useState, useEffect } from "react";
import { API_URL } from "../global";
import { AiFillEdit } from "react-icons/ai";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import Header from "../components/Header";
import { useSelector } from "react-redux";
import axios from "axios";
const Shareholder = () => {
  const [finalData, setFinalData] = useState([]);
  const [userName, setUserName] = useState("");
  const [shareAmount, setShareAmount] = useState("");
  const [cashDeposit, setCashDeposit] = useState("");
  const [total, setTotal] = useState("");
  const [newShares, setNewShares] = useState("");
  const [netTotal, setNetTotal] = useState("");
  const [id, setId] = useState(0);
  const [filtername, setFilterName] = useState([]);

  const fetchSupplierList = () => {
    let url = API_URL;
    const query = `SELECT * FROM shareholder ORDER BY shareholder_name ASC`;
    let data = { crossDomain: true, crossOrigin: true, query: query };
    axios
      .post(url, data)
      .then((res) => {
        console.log("shareholder data: ", res.data);
        setFinalData(res.data);
      })
      .catch((err) => {
        console.log("id + name fetch error: ", err);
      });
  };

  const deleteData = (id) => {
    let url = API_URL;
    console.log(id);
    const query = `DELETE FROM shareholder WHERE id='${id}';`;

    let data = { crossDomain: true, crossOrigin: true, query: query };
    axios
      .post(url, data)
      .then((res) => {
        console.log("success");
        fetchSupplierList()
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  const addData = () => {
    let url = API_URL;

    const query = `INSERT INTO shareholder(shareholder_name, share_amount,cash_deposit, total,new_shares,nettotal) VALUES
    ('${userName}','${shareAmount}','${cashDeposit}','${total}','${newShares}','${netTotal}');`;

    let data = { crossDomain: true, crossOrigin: true, query: query };
    axios
      .post(url, data)
      .then((res) => {
        console.log("success");
      })
      .catch((err) => {
        console.log("id + name fetch error: ", err);
      });
    setUserName("");
    setShareAmount("");
    setCashDeposit("");
    setTotal("");
    setNewShares("");
    setNetTotal("");
  };
  useEffect(() => {
    fetchSupplierList();
  }, []);

  const updateData = () => {
    let url = API_URL;
    console.log(id);
    const query = `UPDATE shareholder SET shareholder_name='${userName}',share_amount='${shareAmount}',cash_deposit='${cashDeposit}',total='${total}',new_shares='${newShares}'
    ,nettotal='${netTotal}' WHERE id='${id}' ;`;

    let data = { crossDomain: true, crossOrigin: true, query: query };
    axios
      .post(url, data)
      .then((res) => {
        console.log("success");
      })
      .catch((err) => {
        console.log("id + name fetch error: ", err);
      });
    setUserName("");
    setShareAmount("");
    setCashDeposit("");
    setTotal("");
    setNewShares("");
    setNetTotal("");
    fetchSupplierList();
  };

  const filterName = () => {
    let url = API_URL;
    const query = `SELECT DISTINCT shareholder_name FROM shareholder;`;
    let data = { crossDomain: true, crossOrigin: true, query: query };
    axios
      .post(url, data)
      .then((res) => {
        console.log("res", res);
        setFilterName(res);
      })
      .catch((err) => {
        console.log("id + name fetch error: ", err);
      });
  };
  return (
    <>
      <Header />
      <div className="container mt-5">
        <ReactHTMLTableToExcel
          id="test-table-xls-button"
          className="download-table-xls-button btn btn-success my-5"
          table="table-to-xls"
          filename="tablexls"
          sheet="tablexls"
          buttonText="Download as XLS"
        />
        {/* add  new entry section starts here */}
        <button
          className="btn btn-primary ms-3"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal2"
          onClick={() => {}}
        >
          <AiFillEdit color="black" size="20" />
          ADD NEW ENTRY
        </button>
        <div
          class="modal fade"
          id="exampleModal2"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <div className="mb-3">
                  <label for="exampleInputEmail1" class="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    defaultValue=""
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label for="exampleInputEmail1" class="form-label">
                    Share Amount
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    defaultValue=""
                    value={shareAmount}
                    onChange={(e) => setShareAmount(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label for="exampleInputEmail1" class="form-label">
                    Cash Deposit
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    defaultValue=""
                    value={cashDeposit}
                    onChange={(e) => setCashDeposit(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label for="exampleInputEmail1" class="form-label">
                    Total
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    defaultValue=""
                    value={total}
                    onChange={(e) => setTotal(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label for="exampleInputEmail1" class="form-label">
                    New Shares
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    defaultValue=""
                    value={newShares}
                    onChange={(e) => setNewShares(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label for="exampleInputEmail1" class="form-label">
                    Net Total
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    defaultValue=""
                    value={netTotal}
                    onChange={(e) => setNetTotal(e.target.value)}
                  />
                </div>
              </div>

              <div class="modal-footer d-flex justify-content-center align-items-center">
                <button type="button" class="btn btn-warning" onClick={addData}>
                  ADD DATA
                </button>

                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* add  new entry section ends here */}

        <table id="table-to-xls" className="table table-bordered">
          <thead>
            <tr className="table-primary">
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">SHARE AMOUNT</th>
              <th scope="col">CASH DEPOSIT</th>
              <th scope="col">TOTAL</th>
              <th scope="col">NEW_SHARES</th>
              <th scope="col">NET TOTAL</th>
            </tr>
          </thead>
          <tbody>
            {finalData.map((data, id) => {
              return (
                <>
                  <tr>
                    <th scope="row">{data.id}</th>
                    <td>{data.shareholder_name}</td>
                    <td>{data.share_amount}</td>
                    <td>{data.cash_deposit}</td>
                    <td>{parseInt(data.share_amount) + parseInt(data.cash_deposit)}</td>
                    <td>{data.new_shares}</td>
                    <td>{parseInt(data.share_amount) + parseInt(data.cash_deposit) + parseInt(data.new_shares)}</td>

                    <td className="d-flex justify-content-evenly align-items-center">
                      <button
                        className="btn btn-warning"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        onClick={() => {
                          setId(data.id);
                          setUserName(data.shareholder_name);
                          setShareAmount(data.share_amount);
                          setCashDeposit(data.cash_deposit);
                          setTotal(data.total);
                          setNewShares(data.new_shares);
                          setNetTotal(data.nettotal);
                        }}
                      >
                        <AiFillEdit color="black" size="20" />
                        SHOW DETAILS
                      </button>
                      <button
                        type="button"
                        class="btn btn-danger"
                        onClick={() => {
                          deleteData(data.id);
                        }}
                      >
                        DELETE
                      </button>
                      <div
                        class="modal fade"
                        id="exampleModal"
                        tabindex="-1"
                        aria-labelledby="exampleModalLabel"
                        aria-hidden="true"
                      >
                        <div class="modal-dialog">
                          <div class="modal-content">
                            <div class="modal-header">
                              <h5 class="modal-title" id="exampleModalLabel">
                                DETAILS OF EACH USER
                              </h5>
                              <button
                                type="button"
                                class="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                              ></button>
                            </div>
                            <div class="modal-body">
                            <div className="mb-3">
                                <label
                                  for="exampleInputEmail1"
                                  class="form-label"
                                >
                                  Name
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="exampleInputEmail1"
                                  aria-describedby="emailHelp"
                                  defaultValue=""
                                  value={userName}
                                  onChange={(e) => setUserName(e.target.value)}
                                />
                              </div>
                              <div className="mb-3">
                              <label
                                for="exampleInputEmail1"
                                class="form-label"
                              >
                                Share Amount
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="exampleInputEmail1"
                                aria-describedby="emailHelp"
                                defaultValue=""
                                value={shareAmount}
                                onChange={(e) => setShareAmount(e.target.value)}
                              />
                              </div>
                              <div className="mb-3">
                              <label
                                for="exampleInputEmail1"
                                class="form-label"
                              >
                                Cash Deposit
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="exampleInputEmail1"
                                aria-describedby="emailHelp"
                                defaultValue=""
                                value={cashDeposit}
                                onChange={(e) => setCashDeposit(e.target.value)}
                              />
                            </div>

                            

                            <div className="mb-3">
                              <label
                                for="exampleInputEmail1"
                                class="form-label"
                              >
                                Total
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="exampleInputEmail1"
                                aria-describedby="emailHelp"
                                defaultValue=""
                                value={total}
                                onChange={(e) => setTotal(e.target.value)}
                              />
                            </div>
                            <div className="mb-3">
                              <label
                                for="exampleInputEmail1"
                                class="form-label"
                              >
                                New Shares
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="exampleInputEmail1"
                                aria-describedby="emailHelp"
                                defaultValue=""
                                value={newShares}
                                onChange={(e) => setNewShares(e.target.value)}
                              />
                            </div>
                            <div className="mb-3">
                              <label
                                for="exampleInputEmail1"
                                class="form-label"
                              >
                                Net Total
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="exampleInputEmail1"
                                aria-describedby="emailHelp"
                                defaultValue=""
                                value={netTotal}
                                onChange={(e) => setNetTotal(e.target.value)}
                              />
                            </div>

                            </div>
                            <div class="modal-footer">
                              <button
                                type="button"
                                class="btn btn-secondary"
                                data-bs-dismiss="modal"
                              >
                                Close
                              </button>
                              <button type="button" class="btn btn-primary" onClick={() => {
                                  updateData();
                                }}>
                                Save changes
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Shareholder;

import React from "react";
import { useState, useEffect } from "react";
import { API_URL } from "../global";
import { AiFillEdit } from "react-icons/ai";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate,Link } from "react-router-dom";
import { logout } from "../actions/auth";
import Payment from "../components/Payment";
import axios from "axios";
const Admin = () => {
  const [finalData, setFinalData] = useState([]);
  const [userName, setUserName] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [balance, setBalance] = useState("");
  const [deduction, setDeduction] = useState("");
  const [interest, setInterest] = useState("");
  const [install, setInstall] = useState("");
  const [id, setId] = useState(0);
  const [filterusersname, setFilterUsersName] = useState([])
  const [userId,setUserId]=useState("")
  const [adminPassword,setAdminPassword]=useState("")  
  const [adminuser,setShowAdmin]=useState(false)
  const navigate = useNavigate()
  const user = useSelector(state=>state?.user?.user)

  const [selectusersname, setSelectUsersName] = useState("")
  console.log(selectusersname)
 const dispatch= useDispatch()
  const fetchSupplierList = () => {
    let url = API_URL;
    const query = `SELECT * FROM sheet1 ORDER BY name,year,STR_TO_DATE(CONCAT('0001', month, '01'), '%Y %M %d') ASC`;
    let data = { crossDomain: true, crossOrigin: true, query: query };
    axios
      .post(url, data)
      .then((res) => {
        console.log("supplier data: ", res.data);
        setFinalData(res.data);
      })
      .catch((err) => {
        console.log("id + name fetch error: ", err);
      });
  };

  const deleteData = (id) => {
    let url = API_URL;
    console.log(id);
    const query = `DELETE FROM sheet1 WHERE id='${id}';`;

    let data = { crossDomain: true, crossOrigin: true, query: query };
    axios
      .post(url, data)
      .then((res) => {
        console.log("supplier data: ", res.data);
        fetchSupplierList()
      })
      .catch((err) => {
        console.log("id + name fetch error: ", err);
      });
  };

  const addData = () => {
    let url = API_URL;

    const query = `INSERT INTO sheet1(name, month, year, balance, deduction, interest, install) VALUES
    ('${userName}','${month}','${year}','${balance}','${deduction}','${interest}','${install}');`;

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
    setMonth("");
    setBalance("");
    setDeduction("");
    setInterest("");
    setInstall("");
    fetchSupplierList()
  };
  useEffect(() => {
    fetchSupplierList();
    filterName();
  }, []);

  const updateData = () => {
    let url = API_URL;
    console.log(id);
    const query = `UPDATE sheet1 SET name='${userName}',month='${month}',year='${year}',balance='${balance}',deduction='${deduction}'
    ,interest='${interest}',install='${install}' WHERE id='${id}' ;`;

    let data = { crossDomain: true, crossOrigin: true, query: query };
    axios
      .post(url, data)
      .then((res) => {
        console.log("success");
        fetchSupplierList()
      })
      .catch((err) => {
        console.log("id + name fetch error: ", err);
      });
    setUserName("");
    setMonth("");
    setBalance("");
    setDeduction("");
    setInterest("");
    setInstall("");
  };

 

  const filterName=()=>{
    let url = API_URL;
    const query = `SELECT DISTINCT name FROM sheet1;`
    let data = { crossDomain: true, crossOrigin: true, query: query };
    axios
      .post(url, data)
      .then((res) => {
        console.log("filtered Names", res.data);
        setFilterUsersName(res.data)
      })
      .catch((err) => {
        console.log("id + name fetch error: ", err);
      });
  }
  const searchFilterName=()=>{
    let url = API_URL;
    console.log("search",selectusersname)
    const query = `SELECT * FROM sheet1 WHERE name='${selectusersname}';`
    let data = { crossDomain: true, crossOrigin: true, query: query };
    axios
      .post(url, data)
      .then((res) => {
        console.log("filtered Names", res.data);
        setFinalData(res.data)
      })
      .catch((err) => {
        console.log("id + name fetch error: ", err);
      });
  }

  const onSubmit=(e)=>{
    e.preventDefault()
   if(userId==="admin@123"&&adminPassword==="admin@123")  setShowAdmin(true)
   
  }

  const handleAddNewEntry=()=>{
    setUserName("");
    setMonth("");
    setBalance("");
    setDeduction("");
    setInterest("");
    setInstall("");
    setYear("")
  }
  
  return (
    <>
    <Header />
    {!adminuser?(<div className="signup-page" >
        <div className="signup">
         <form onSubmit={onSubmit}>
         <input type={"text"} onChange={(e)=>setUserId(e.target.value)} placeholder="Enter user name"/>
         <input type={"password"} onChange={(e)=>setAdminPassword(e.target.value)} placeholder="Password" style={{marginTop:"20px"}}/>
         <button type="submit">Signin</button>
         </form>
         <div className="img">
            <img src="https://img.freepik.com/free-vector/flat-design-illustration-customer-support_23-2148887720.jpg?w=740&t=st=1669439022~exp=1669439622~hmac=c387348bfdcbd80051a83b5057c0307886b769d5bb09c0d3fd464de99f0a5ad1"/>
         </div>
        </div>
    </div>):(
      <div className="container" style={{marginTop:"7rem"}}>
        <div className="my-5 d-flex justify-content-start align-items-between">
        <ReactHTMLTableToExcel
          id="test-table-xls-button"
          className="download-table-xls-button btn btn-success my-5"
          table="table-to-xls"
          filename="tablexls"
          sheet="tablexls"
          buttonText="Download as XLS"
          onClick={()=>console.log("clicked")}
        />
  <Payment />
  
  <div style={{marginTop:"-2rem",marginLeft:"10px",display:"flex", alignItems:"center",justifyContet:"center"}}>
        <button onClick={()=>{
          dispatch(logout())
           navigate("/")
          }}>logout</button>
        {/* add  new entry section starts here */}
        <button
          className=" ms-3"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal2"
          styles={{width: '200px', height: '50px'}}
          onClick={handleAddNewEntry}
        >
          <AiFillEdit color="black" size="20" />
          ADD NEW ENTR
        </button>
        </div>
        <div className=" ms-5 d-flex flex-row justify-content-center align-items-center">
        <label for="usernamelist" class="form-label">
                    USERS : &nbsp;
                  </label>
                  <select
                    name="usernames"
                    id="usernamelist"
                    defaultValue=""
                    value={selectusersname}
                    onChange={(e) => setSelectUsersName(e.target.value)}
                  >
                    {filterusersname.map((val,key)=>{
                      return (
                        <>
                        <option value={val.name}>{val.name}</option>
                        
                        </>
                      )
                    })}
                    
                  </select>
                  <button className="btn btn-primary ms-3" onClick={searchFilterName}>SEARCH</button>
        </div>
        </div>
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
                  <label for="monthlist" class="form-label">
                    Month
                  </label>
                  <select
                    name="months"
                    id="monthlist"
                    defaultValue=""
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                  >
                    <option value="January">January</option>
                    <option value="February">February</option>
                    <option value="March">March</option>
                    <option value="April">April</option>
                    <option value="May">May</option>
                    <option value="June">June</option>
                    <option value="July">July</option>
                    <option value="August">August</option>
                    <option value="September">September</option>
                    <option value="October">October</option>
                    <option value="Novermber">Novermber</option>
                    <option value="December">December</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label for="exampleInputEmail1" class="form-label">
                    Year
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    defaultValue=""
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label for="exampleInputEmail1" class="form-label">
                    Balance
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    defaultValue=""
                    value={balance}
                    onChange={(e) => setBalance(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label for="exampleInputEmail1" class="form-label">
                    Deduction
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    defaultValue=""
                    value={deduction}
                    onChange={(e) => setDeduction(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label for="exampleInputEmail1" class="form-label">
                    INTEREST
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    defaultValue=""
                    value={interest}
                    onChange={(e) => setInterest(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label for="exampleInputEmail1" class="form-label">
                    INSTALL
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    defaultValue=""
                    value={install}
                    onChange={(e) => setInstall(e.target.value)}
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
        <Link className="btn btn-primary my-2" to='/admin/shareholder'>Shareholder</Link>
        <table id="table-to-xls" className="table table-bordered">
          <thead>
            <tr className="table-primary">
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Month</th>
              <th scope="col">Year</th>
              <th scope="col">Balance</th>
              <th scope="col">Deduction</th>
              <th scope="col">Interest</th>
              <th scope="col">Install</th>
            </tr>
          </thead>
          <tbody>
            {finalData.map((data, id) => {
              return (
                <>
                  <tr>
                    <th scope="row">{data.id}</th>
                    <td>{data.name}</td>
                    <td>{data.month}</td>
                    <td>{data.year}</td>
                    <td>{data.balance}</td>
                    <td>{data.deduction}</td>
                    <td>{data.interest}</td>
                    <td>{data.install}</td>

                    <td className="d-flex justify-content-evenly align-items-center">
                      <button
                        className="btn btn-warning"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        onClick={() => {
                          setId(data.id)
                          setUserName(data.name);
                          setMonth(data.month);
                          setYear(data.year);
                          setBalance(data.balance);
                          setDeduction(data.deduction);
                          setInterest(data.interest);
                          setInstall(data.install);
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
                                  Month
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="exampleInputEmail1"
                                  aria-describedby="emailHelp"
                                  defaultValue=""
                                  value={month}
                                  onChange={(e) => setMonth(e.target.value)}
                                />
                              </div>
                              <div className="mb-3">
                                <label
                                  for="exampleInputEmail1"
                                  class="form-label"
                                >
                                  Year
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="exampleInputEmail1"
                                  aria-describedby="emailHelp"
                                  defaultValue=""
                                  value={year}
                                  onChange={(e) => setYear(e.target.value)}
                                />
                              </div>
                              <div className="mb-3">
                                <label
                                  for="exampleInputEmail1"
                                  class="form-label"
                                >
                                  Balance
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="exampleInputEmail1"
                                  aria-describedby="emailHelp"
                                  defaultValue=""
                                  value={balance}
                                  onChange={(e) => setBalance(e.target.value)}
                                />
                              </div>
                              <div className="mb-3">
                                <label
                                  for="exampleInputEmail1"
                                  class="form-label"
                                >
                                  Deduction
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="exampleInputEmail1"
                                  aria-describedby="emailHelp"
                                  defaultValue=""
                                  value={deduction}
                                  onChange={(e) => setDeduction(e.target.value)}
                                />
                              </div>
                              <div className="mb-3">
                                <label
                                  for="exampleInputEmail1"
                                  class="form-label"
                                >
                                  INTEREST
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="exampleInputEmail1"
                                  aria-describedby="emailHelp"
                                  defaultValue=""
                                  value={interest}
                                  onChange={(e) => setInterest(e.target.value)}
                                />
                              </div>

                              <div className="mb-3">
                                <label
                                  for="exampleInputEmail1"
                                  class="form-label"
                                >
                                  INSTALL
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="exampleInputEmail1"
                                  aria-describedby="emailHelp"
                                  defaultValue=""
                                  value={install}
                                  onChange={(e) => setInstall(e.target.value)}
                                />
                              </div>
                            </div>
                            <div class="modal-footer d-flex justify-content-center align-items-center">
                              <button
                                type="button"
                                class="btn btn-warning"
                                onClick={() => {
                                  updateData();
                                }}
                              >
                                UPDATE DATA
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
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </div>
)}
    </>
  );
};

export default Admin
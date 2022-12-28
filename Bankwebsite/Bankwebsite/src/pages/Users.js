import React from "react";
import { useState, useEffect } from "react";
import { API_URL } from "../global";
import { AiFillEdit } from "react-icons/ai";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../actions/auth";
import axios from "axios";
import Message from "../components/Message";
const Users = () => {
  const [finalData, setFinalData] = useState([]);
  const [userName, setUserName] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [balance, setBalance] = useState("");
  const [deduction, setDeduction] = useState("");
  const [interest, setInterest] = useState("");
  const [install, setInstall] = useState("");
  const [id, setId] = useState(0);
  
  const[aadhaar,setAadhar] = useState("")
  const[aadharMsg,setAadharMsg] = useState("")
  const [showModal,setShowModal]=useState(false)
  const navigate = useNavigate()
  const user = useSelector(state=>state?.user?.user)
  const [filterusersname, setFilterUsersName] = useState()

  const [selectusersname, setSelectUsersName] = useState(user?.name)
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
        setFilterUsersName()
      })
      .catch((err) => {
        console.log("id + name fetch error: ", err);
      });
  }
  const searchFilterName=()=>{
   
  }

  useEffect(()=>{
    if(user){
    let url = API_URL;
    console.log("search",selectusersname)
    const query = `SELECT * FROM sheet1 WHERE name='${user?.name}';`
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
  },[selectusersname,user])

  const encodedParams = new URLSearchParams();
    encodedParams.append("clientid", "111");
encodedParams.append("captchaTxnId", "yXtIGGqKoOai");
encodedParams.append("txn_id", "4545533");
encodedParams.append("consent", "Y");
encodedParams.append("captchaValue", "0u2KyH");
encodedParams.append("method", "emailnmobile");
encodedParams.append("uidnumber", aadhaar);

const options = {
  method: 'POST',
 
  data: encodedParams
};
    
    function aadharVerify(){
      const options = {
        method: 'POST',
        url: 'https://pan-card-verification1.p.rapidapi.com/v3/tasks/sync/verify_with_source/ind_pan',
        headers: {
          'content-type': 'application/json',
          'X-RapidAPI-Key': '007c1fdcb9mshf98488941b6af3ep14593bjsn5e57616cebd8',
          'X-RapidAPI-Host': 'pan-card-verification1.p.rapidapi.com'
        },
        data: `{"task_id":"74f4c926-250c-43ca-9c53-453e87ceacd1","group_id":"8e16424a-58fc-4ba4-ab20-5bc8e7c3c41e","data":{"id_number":"${aadhaar}"}}`
      };

      axios.request(options).then(function (response) {
       setAadharMsg(response.data.status)
       setShowModal(true)
      }).catch(function (error) {
        console.error(error);
        setAadharMsg("failed")
        setShowModal(true)
      });
    }
  return (
    <>
    <Header />
      {user!==null?(<div className="container"  style={{marginTop:"7rem"}}>
        <div className="my-5 d-flex justify-content-between align-items-center">
        <ReactHTMLTableToExcel
          id="test-table-xls-button"
          className="download-table-xls-button btn btn-success my-5"
          table="table-to-xls"
          filename="tablexls"
          sheet="tablexls"
          buttonText="Download as XLS"
        />


        

        <button onClick={()=>{
          dispatch(logout())
           navigate("/")
          }} style={{marginLeft:"10px"}}>logout</button>
        {/* add  new entry section starts here */}
        {/* <button
          className=" ms-3"
        disabled
          data-bs-toggle="modal"
          data-bs-target="#exampleModal2"
          styles={{width: '200px', height: '50px'}}
          onClick={() => {}}
        >
          <AiFillEdit color="black" size="20" />
          ADD NEW ENTRY
        </button> */}
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
                    
                        <option value={user?.name}>{user?.name}</option>
                    
                    
                  </select>
                  <button className="btn btn-primary ms-3" onClick={searchFilterName}>SEARCH</button>
        </div>
        <input style={{margin:"0px 10px"}} type="text" class="form-control" aria-label="Dollar amount (with dot and two decimal places)" onChange={(e)=>{setAadhar(e.target.value)}}/>
        <button  className="btn btn-success my-5 " style={{width: '300px', height: '50px'}} onClick={aadharVerify}>Verify PAN</button>
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
      </div>):(
        <h1 style={{marginTop:"10rem",textAlign:"center"}}>Please Login first <Link to="/login">Login</Link></h1>
      )}

      {showModal&&<Message msg={aadharMsg} showModal={showModal} type={"success"} closeModal={setShowModal} />}
    </>
  );
};

export default Users
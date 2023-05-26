import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Swal from 'sweetalert2'
let BASE_URL = 'https://todolist-esgo.onrender.com'
export const FormData = () => {
  const [name, setname] = useState("");
  const [salary, setsalary] = useState("");

  async function insertdata() {
    let data = {name, salary}
    fetch(`${BASE_URL}/insert/data`,{
      method:"POST",
      headers: {
        "Content-type": "application/json",
        'Accept': "application/json",
      },
      body:JSON.stringify(data)
    })
    let timerInterval
    Swal.fire({
      title: 'Record added successfully',
      html: 'I will close in <b></b> milliseconds.',
      timer: 1000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading()
        const b = Swal.getHtmlContainer().querySelector('b')
        timerInterval = setInterval(() => {
          b.textContent = Swal.getTimerLeft()
        }, 100)
      },
      willClose: () => {
        clearInterval(timerInterval)
      }
    }).then((result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
        // console.log('Record Delete successfull...')
      }
    })
  }
  return (
    <>
      <div style={{ float: "left", marginLeft: "10%",marginTop:"2%",marginRight:"20%"}}>
        <form>
          <div className="form-group">
            <label style={{ float: "left" }}>Name</label>
            <input
              id="Name"
              value={name}
              onChange={(e) => setname(e.target.value)}
              type="text"
              className="form-control"
              placeholder="Enter Name"
            />
          </div>
          <div className="form-group mt-2">
            <label style={{ float: "left" }}>Salary</label>
            <input
              id="Salry"
              value={salary}
              onChange={(e) => setsalary(e.target.value)}
              type="text"
              className="form-control"
              placeholder="Enter Salary"
            />
          </div>
          <button
            onClick={insertdata}
            style={{ float: "left" ,marginBottom:"10%"}}
            type="submit"
            className="btn btn-primary mt-2"
            
          >
            Submit 
          </button>
          
        </form>
        
      </div>
      
    </>
  );
};

export default function Table() {
  const [data, setData] = useState([]);
  const[name,setName] = useState("");
  const[salary,setSalary] = useState("");
  const [id,setId] = useState(null)

  const [show, setShow] = useState(false);

  useEffect(() => {
   getuser();
  }, []);

  function getuser(){
    fetch(`${BASE_URL}/display/data`).then((result) => {
      result.json().then((res) => {
        console.warn("result", res);
        setData(res.response);
        setId(res.response.id);
        setName(res.response.name);
        setSalary(res.response.salary);
      });
    });
  }

  function deletedata(id){
    let timerInterval
    Swal.fire({
      title: 'Record deleted successfully',
      html: 'I will close in <b></b> milliseconds.',
      timer: 1000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading()
        const b = Swal.getHtmlContainer().querySelector('b')
        timerInterval = setInterval(() => {
          b.textContent = Swal.getTimerLeft()
        }, 100)
      },
      willClose: () => {
        clearInterval(timerInterval)
      }
    }).then((result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
        // console.log('Record Delete successfull...')
      }
    })
    fetch(`${BASE_URL}/delete/data/${id}`,{
      method:"DELETE"
    }).then((result)=>{
      result.json().then((res)=>{
        console.warn(res);
        getuser();
      })
    })
  }

  const handleShow = (id) => {
    const index = data.findIndex(item => item.id === id)
    setId(data[index].id);
    setName(data[index].name);
    setSalary(data[index].salary);
    setShow(true)
  }

  function handleClose(){
    let timerInterval;
    Swal.fire({
      title: 'Record updated successfully',
      html: 'I will close in <b></b> milliseconds.',
      timer: 1000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading()
        const b = Swal.getHtmlContainer().querySelector('b')
        timerInterval = setInterval(() => {
          b.textContent = Swal.getTimerLeft()
        }, 100)
      },
      willClose: () => {
        clearInterval(timerInterval)
      }
    }).then((result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
        // console.log('Record Delete successfull...')
      }
    })
    let item = {name, salary}
    fetch(`${BASE_URL}/update/data/${id}`,{
      method:"put",
      headers: {
        "Content-type": "application/json",
        'Accept': "application/json",
      },
      body:JSON.stringify(item)
    }).then((result)=>{
      result.json().then((res)=>{
        console.warn(res);
        getuser();
        setShow(false)
      })
    })
  }
  return (<>
    <div style={{width:"370px",display:"flex",marginTop:"5%",marginLeft:"5%"}}>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th className="table-dark">id</th>
            <th className="table-dark">Name</th>
            <th className="table-dark">Salary</th>
            <th className="table-dark">Action</th>
            <th className="table-dark">Action</th>

          </tr>
        </thead>
        {data.map((items,i) => (
          <tbody key={i+1}>
          
            <tr >
              <td className="table-success">{i}</td>
              <td className="table-primary">{items.name}</td>
              <td className="table-danger">{items.salary}</td>
              <td className="table-warning"><button onClick={()=>deletedata(items.id)}>Delete</button></td>
              <td className="table-warning"><button onClick={()=>handleShow(items.id)}>Update</button></td>
            </tr>
          </tbody>
        ))}
      </table>
     
    </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control
              value={name} onChange={(e)=>setName(e.target.value)}
                type="text"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Salary</Form.Label>
              <Form.Control
              value={salary} onChange={(e)=>setSalary(e.target.value)}
                type="text"
                autoFocus
              />
            </Form.Group>
          
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
     </>
  );
}

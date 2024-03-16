  import Button from "react-bootstrap/Button";
  import Form from "react-bootstrap/Form";
  import React, { useState } from "react";
  import axios from "axios";
  import { ApiUrl2 } from "./ApiUrl.jsx";
  import { toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  export default function AddUser({ userCall }) {
    const [name, setName] = useState("");
    const [roll, setRoll] = useState("");
    const [validationError,setValidationError]=useState("");
    const handleSubmit = async () => {
      if(name===""&&roll===""){
        setValidationError("Please Enter Your Name and Roll!")
        return;
      }
      else if(name===""){
        setValidationError("Please Enter Your Name!")
        return;
      }
      else if(roll===""){
        setValidationError("Please Enter Your Roll!")
        return;
      }
      else{
        setValidationError("")
      }
      try{
      await axios.post(ApiUrl2 + "/user", {
        name,
        roll,
      });
      toast.success("Success bro");
      setName("");
      setRoll("");
      userCall();
    }catch(e){
      toast.error('Failed bro');
    }
    };
    return (
      <div>
        <h2>ADD USER</h2>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Name</Form.Label>
            <input
              type="text"
              name="name"
              onChange={(e) => {
                setName(e.target.value);
              }}
              value={name}
              className="form-control"
            />
            
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Roll</Form.Label>
            <input
              type="text"
              name="roll"
              onChange={(e) => {
                setRoll(e.target.value);
              }}
              value={roll}
              className="form-control"
            />
          </Form.Group>
          <Button variant="primary" onClick={handleSubmit} type="button">
            Submit
          </Button>
        </Form>
        <br/>
        {validationError&&(
        <div className="alert alert-danger" role="alert">
            {validationError}
          </div>)}
      </div>
    );
  }

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import ToastService from "../common/toastService";

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));





const Home = () => {
  const navigate = useNavigate();
  const [textInput, setInputText] = useState("");
  const [cookies, removeCookie] = useCookies([]);
  let username = localStorage.getItem("getTheUerName") 
  let UserID = localStorage.getItem("getTheUserId")
  const [getTheValue, setGetTheValue] = useState([]);
  const [editButton, setEditButton] = useState(false);
  const [getTheId, setGetTheId] = useState("");

  console.log(localStorage.getItem("getTheUerName"),"usernameHome")

  const Logout = () => {
    removeCookie("token");
    navigate("/signup");
  };
  const handleOnclike = (e) => {    
    console.log(e.target.value,"value")
    setInputText(e.target.value)

  }

  const getTheTextValueApi = async () => {
    try {
     
      const { data } = await axios.get(
        `http://localhost:8080/getInputValue/${UserID}`
        
        
      );
      
      const { success, message } = data;
      if (success) { 
        console.log(data?.data,"data?.data")
        setGetTheValue(data?.data);       
      } else {
        ToastService.errormsg(message);
      }
    } catch (error) {
      ToastService.errormsg("get api an error occurred!");
    }
  }

  useEffect(() => {
    getTheTextValueApi();
    console.log(getTheValue.map((val) => val?.inputText),"getTheValue")
  },[UserID])


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      let sendTheData = {
        textInput:textInput,
        UserID:UserID
      }

      let sendTheEditData = {
        textInput:textInput,
        id:getTheId
      }

      console.log(sendTheEditData,"sendTheEditData")

      if(!editButton){

        const { data } = await axios.post("http://localhost:8080/saveInput",{ sendTheData } );  
        
        const { success, message } = data;
        if (success) { 
          
          setInputText("")   

          ToastService.successmsg(message);        
         
        } else {
          
          ToastService.errormsg(message);

        }

      }else{

        const { data } = await axios.put(`http://localhost:8080/updateInputValue/${getTheId}`, sendTheEditData);  
        
        const { success, message } = data;

        if (success) { 

          setInputText("") ;

          getTheTextValueApi();

          setEditButton(false);

          ToastService.successmsg(message);        
         
        } else {

          ToastService.errormsg(message);
          
        }
      }

      
    } catch (error) {
      ToastService.errormsg("An error occurred!");
    }
   
  }; 

 

  const handleEditButton = (row) => {  
    if(row){
      setEditButton(true);
      setInputText(row?.inputText);
      setGetTheId(row?._id)
    }
  }

  const handleDeleteButton = async (id) => {

    if(id){

      try {       
  
          const { data } = await axios.delete(`http://localhost:8080/deleteInputValue/${id}`);  
          
          const { success, message } = data;
          if (success) {        
  
            ToastService.successmsg(message);  
            
            getTheTextValueApi();
           
          } else {
            
            ToastService.errormsg(message);
  
          }   
  
        
      } catch (error) {
        ToastService.errormsg("Delete Data error occurred!");
      }

    }else{
      console.log("Erorr")
    }    

  }

  return (
    <>
      <div className="home_page">
        <h4 style={{color:"black"}}>
          {" "}
          Welcome <span>{username}</span>
        </h4>
        <button onClick={Logout}>LOGOUT</button>
        <form onSubmit={handleSubmit}>
        <div>
          <input className="input-new" name="textBox" type="text" value={textInput} onChange={handleOnclike} placeholder="Enter Your Text"/> <button type="submit" className="button-new">{ !editButton ? "Save" : "Update" }</button>
        </div>
        </form>
      </div>
      <div style={{display:"flex",flexDirection:"row",justifyContent:"center"}}>
      <TableContainer  sx={{display:"flex",justifyContent:"center",marginTop:"-10px",paddingTop:"0px",paddingRight:"0px",paddingLeft:"0px"}}>
      <Table sx={{width:"50%"}} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>UserText</StyledTableCell>
            <StyledTableCell align="right">Action</StyledTableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {
          getTheValue.length > 0 ?
          (getTheValue.map((row,index) => (
            <StyledTableRow key={index}>
              <StyledTableCell component="th" scope="row">
                {row?.inputText}
              </StyledTableCell>
              <StyledTableCell align="right">
                <button style={{padding:5,backgroundColor:"goldenrod",border:"0px",fontSize:"14px",borderRadius:"5px",width:"70px",color:"white"}} onClick={()=>{handleEditButton(row)}}>Edit</button>
                <button style={{marginLeft:"10px",padding:5,backgroundColor:"red",border:"0px",fontSize:"14px",borderRadius:"5px",width:"70px",color:"white"}} onClick={() => {handleDeleteButton(row?._id)}}>Delete</button>
                </StyledTableCell>
              
              
            </StyledTableRow>
          ))) : (
            <StyledTableCell component="th" scope="row" colSpan={2}>
                Data Not available
              </StyledTableCell>
          )}
        </TableBody>
      </Table>
    </TableContainer>
      <ToastContainer />
      </div>
    </>
  );
};

export default Home;
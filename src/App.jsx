import React, { useRef, useState } from 'react'
import './App.css'




function App() {
  const [link,setLink] =useState("")

  // declearing empty object
let data = {
  name: "",
  email: "",
  phone: "",
}  
const [inputdata, setInputdata] = useState(data)

// set data in Inputdata variable
const handleData = (e) =>{

  setInputdata({...inputdata, [e.target.name]: e.target.value});
  console.log(inputdata.name);
}; 



let allValues = (`Name = ${inputdata.name}, Email = ${inputdata.email}, Contact Number = ${inputdata.phone}`);

//  main function works on  button click
const submit = async function(){
  
  loader.style.display ="block";
  qrimg.src ="";
  btn2.style.display = "none";

  
  if (inputdata.name.length == 0 || inputdata.email.length == 0 || inputdata.phone.length == 0) {
    alert("Enter Valid credentials !!!!!");
    loader.style.display ="none";

    
  }
  else
  {
    const qr = async (values)=>{
      let imgSource = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${values}`;
      let data = await fetch(imgSource);     // blob = binary large object contains image, audio and other files
      console.log("data => ",data);
     
      let response = await data.blob();
      // console.log(response);

      let url = URL.createObjectURL(response);
      console.log(url);
      loader.style.display ="none";
      btn2.style.display = "block";
      return url;
      
    }
    let QRimgUrl = await qr(allValues);
    setLink(QRimgUrl) 
  }
};

//  Download function

const download =()=>{
  btn2.href =link;
  btn2.download = "QRimg";
  
}


  return (
    <div id="main">
      <div id="form">
          <h2>QR Code Generator</h2>
          <input id="name" type="text" placeholder="Enter your Name" onChange={handleData} name='name'/>
          <input id="email" type="email" placeholder="Enter your Email " onChange={handleData} name='email'/>
          <input id="phoneNumber" type="number" placeholder="Enter your Phone Number" onChange={handleData} name='phone'/>
          <button id="btn" type="submit" onClick={submit}>Generate QR Cde</button>
          
      </div>
      <div id="qr">
          <h2>Your QR Code</h2>
          <div id="loader"></div>
          <img  id="qrimg" src={link}/>
          <a href="" id='btn2' onClick={download}>Download</a>
          
          
      </div>
      
    
  </div>

  )
}

export default App
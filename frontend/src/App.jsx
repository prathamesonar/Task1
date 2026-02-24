import React,{useEffect,useState} from "react";
function App(){
  const [students, setstudents] =useState([]);
  const [name, setname] =useState("");
  const [age, setage] =useState("");

  useEffect(()=>{loadstudents();},[]);
  function loadstudents(){
    fetch("http://localhost:5071/api/students").then(res=>res.json()).then(data=>setstudents(data));
  }

  function addstudent(){
    if(name==="" || age==="") return;
    fetch("http://localhost:5071/api/students",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({name,age:Number(age)})
    }).then(()=>{
      setname("");
      setage("");
      loadstudents();
    });
  }

  function deletestudent(id){
    fetch(`http://localhost:5071/api/students/${id}`,{
      method:"DELETE"
    }).then(()=>loadstudents());
  }
  
  function updatestudent(id){
    if(name ==="" ||age==="") return;
    fetch(`http://localhost:5071/api/students/${id}`,{
      method:"PUT",
      headers:{"Content-Type":"application/json"},
      body: JSON.stringify({name,age:Number(age)})
    }).then(()=>{
      setname("");
      setage("");
      loadstudents();
    });
  }

  return (
    <div>
      <h2>student management system</h2>
      <input placeholder="student name" value={name} onChange={(e)=>setname(e.target.value)}/>
      <input placeholder="age" value={age} onChange={(e)=>setage(e.target.value)}/>
      <button onClick={addstudent}>add</button>
      {students.map(student=>(
        <div key={student.id}>
          {student.name}  {student.age}
          <button onClick={()=>deletestudent(student.id)}> delete</button>
          <button onClick={()=>updatestudent(student.id)}>update</button>
        </div>
      ))}
    </div>
  );
}
export default App;
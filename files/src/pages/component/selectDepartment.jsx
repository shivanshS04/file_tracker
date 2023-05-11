import React from 'react';
import './selectDepartment.css'

const data=  [
    'Purchase',
    'President',
    'Pro President',
    'Registrar',
    'Deputy Registrar',
    'HR',
    'Finance',
    'Admission',
    'Training & Placement',
    'Atal Incubation Center',
    'Outline Digital Learning',
    'Mechanical',
    'Automobiles',
    'Civil',
    'Electronics',
    'Electronics & Communications',
    'Mass Communication',
    'Arts',
    'Economics',
    'Maths',
    'Physics',
    'Bioscience',
    'Chemistry',
    'Mechatronics'
  ];
  

function SelectDepartment({setDepartment}){
    return (
    <div className="selectDepartment">
            <select value='' onChange={(e) => setDepartment(e.target.value)} >
            <option value='' >--select-department--</option>
            {data.map((item,index)=>{
              return <option value={item.replace(' ', '_')} key={index}>{item}</option>
            })}
          </select>
        </div>
    )
}


export default SelectDepartment
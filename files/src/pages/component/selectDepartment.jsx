import React from 'react';
import './selectDepartment.css'
import {SimpleDropdown} from 'react-js-dropdavn'
import 'react-js-dropdavn/dist/index.css'
const data=  [
    {value: 'Purchase', label:'Purchase'},
    {value: 'President', label:'President'},
    {value: 'Pro_President', label:'Pro President'},
    {value: 'Registrar', label:'Registrar'},
    {value: 'Deputy_Registrar', label:'Deputy Registrar'},
    {value: 'HR', label:'HR'},
    {value: 'Finance', label:'Finance'},
    {value: 'Admission', label:'Admission'},
    {value: 'Training_and_placement', label:'Training & Placement'},
    {value: 'Atal_incubation_center', label:'Atal Incubation Center'},
    {value:'Outline_digital_learning' , label:'Outline Digital Learning'},
    {value: 'Mechanical', label:'Mechanical'},
    {value: 'Automobiles', label:'Automobiles'},
    {value: 'Civil', label:'Civil'},
    {value: 'Electronics', label:'Electronics'},
    {value: 'Electronics_and_communications', label:'Electronics & Communications'},
    {value: 'Mass_communication', label:'Mass Communication'},
    {value: 'Arts', label:'Arts'},
    {value: 'Economics', label:'Economics'},
    {value: 'Maths', label:'Maths'},
    {value: 'Physics', label:'Physics'},
    {value: 'Bioscience', label:'Bioscience'},
    {value: 'Chemistry', label:'Chemistry'},
    {value: 'Mechatronics', label:'Mechatronics'}
]; 



function SelectDepartment({props}){
    return (
    <div className="selectDepartment">
            <SimpleDropdown
                className='dropdown'
                labels={{
                    notFoundSearch : 'Not found',   
                    notSelected : 'Select Department',                    
                    selectedPrefix : 'Your Choice :',                    
                    search : 'Search area',                    
                    seachInputPlaceholder : 'Search Department' 
                }}
                options={data}
                clearable
                searchable 
                onChange={(e) => props()}
            />
        </div>
    )
}


export default SelectDepartment
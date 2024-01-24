import axios from 'axios';
import React, { useEffect, useState } from 'react';

function AjaxAxiosGetDB(props) {
    const [datax, setData] = useState([{ name: 'Prameela', branch: 'Mech', rno: 301 }]);
    useEffect(()=>{
        axios.get("http://localhost:8086/showdata")
        .then(res=>{
            setData(res.data)
        })
        .catch(err=>{
            console.log(`Error while fetching data from DB :${err}`)
        })
    },[]);
    return (
        <div className="center-container">
            <h1>This Data from MongoDB Cluster through AjaxGet</h1>
            <center>
            <table border={1}>
                <thead>
                    <tr>
                        <th>S.No.</th>
                        <th>Name</th>
                        <th>Branch</th>
                        <th>Roll.No.</th>
                    </tr>
                </thead>
                <tbody>
                    {datax.map((item, index) => (
                        <tr key={index}>
                            <td>{index+1}</td>
                            <td>{item.name}</td>
                            <td>{item.branch}</td>
                            <td>{item.rno}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </center>
        </div>
    );
}

export default AjaxAxiosGetDB;

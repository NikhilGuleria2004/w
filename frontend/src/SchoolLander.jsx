import {useState, useEffect} from 'react';

function Navbar(){
    return(
        <div>
            <nav style={{display:'flex', gap:'20px'}}>
                <h1>School Page</h1>
            </nav>
        </div>
    )
}

export default function SchoolLander(){
    return(
        <Navbar />
    )
}
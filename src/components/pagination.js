import React from 'react'
// import { BirdsStock } from './layers/layers_2_birdstock';
import Pagination from 'react-bootstrap/Pagination'
import { Nav, ListGroup } from "react-bootstrap";
import '../App.css'

function Paginate({recordsPerPage, totalRecords, paginate}) {
    const pageNumbers=[];
    let active = 1;


    for(let i=1; i<= Math.ceil(totalRecords/recordsPerPage); i++){
        pageNumbers.push(i)
        // console.log(i)
        // pageNumbers.push(
        //     <Pagination.Item key={i} active={i === active}>
        //       {i}
        //     </Pagination.Item>,
        //   );
    }

  return (



    // <Nav defaultActiveKey="/home" as="ul" >
    // {pageNumbers.map(number=>(
    // <Nav.Item as="li" key={number}>
    //     <Nav.Link onClick={()=> paginate(number)} >{number}</Nav.Link>
    // </Nav.Item>
    // ))}
    // </Nav>


    <nav>
        <ul className="pagination" >
        {pageNumbers.map(number=>(
        <li key={number} className="page-item" >
        <a onClick={()=> paginate(number)} className="page-link">{number}</a>

        </li>
    
        ))}

        </ul>

        {/* <Pagination>{pageNumbers}</Pagination> */}

    </nav>
  )
}

export default Paginate
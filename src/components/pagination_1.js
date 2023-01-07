import React from 'react'
// import { BirdsStock } from './layers/layers_2_birdstock';
import {  OverlayTrigger,Tooltip} from "react-bootstrap";
import Pagination from 'react-bootstrap/Pagination'
// import { Pagination,PaginationItem, Avatar, TablePagination} from '@mui/material';
import { Nav, ListGroup } from "react-bootstrap";
import '../App.css'
import { FirstPage } from '@mui/icons-material';

function Paginate_1({recordsPerPage, totalRecords,firstPage,lastPage, prevPage, nextPage, activePage, active, totalPages,currentPage}) {
    const pageNumbers=[];
    // let active = 1;

    // for(let i=1; i<= Math.ceil(totalRecords/recordsPerPage); i++){
    for(let i=1; i<= totalPages; i++){
        pageNumbers.push(i)
        // console.log(i)
        // pageNumbers.push(
        //     <Pagination.Item key={i} active={i === active}  onClick={()=> paginate(i)}>
        //       {i}
        //     </Pagination.Item>,
        //   );
    }
    // console.log(totalRecords)
    // console.log(totalPages)
    console.log(currentPage)
    console.log(totalPages)



    // const totalPages=Math.ceil(totalRecords/recordsPerPage)
    // console.log(totalPages)


  return (

    // <Pagination>
    //   <Pagination.First onClick={()=> {paginate(1);activePage(1)}}/>
    //   <Pagination.Prev onClick={()=> prevPage()} />
    //   <Pagination.Item onClick={()=> paginate(1)}  >{1}</Pagination.Item>
    //   <Pagination.Ellipsis />
    //   {pageNumbers.map(number=>(
    //     <Pagination.Item key={number} active={number === active} onClick={()=> {paginate(number);activePage(number)}} >{number}</Pagination.Item>
    //     ))}
    //   <Pagination.Ellipsis />
    //   <Pagination.Item onClick={()=> paginate(totalPages)}>{totalPages}</Pagination.Item>
    //   <Pagination.Next onClick={()=> nextPage()}/>
    //   <Pagination.Item onClick={()=> activePage(active)} >{active} of {totalPages}</Pagination.Item>
    //   <Pagination.Last onClick={()=> {paginate(totalPages);activePage(totalPages)}} />
    // </Pagination>
    
    <Pagination>
      {/* <Pagination.First onClick={()=> {paginate(totalPages===0?0:1);activePage(totalPages-(totalPages-1))}}/> */}
      <Pagination.First onClick={()=> firstPage()}/>
      <Pagination.Prev onClick={()=> prevPage()} />
      <Pagination.Item>{currentPage>totalPages?totalPages===0?0:1:currentPage} of {totalPages}</Pagination.Item>
      <Pagination.Next onClick={()=> nextPage()}/>
      <Pagination.Last onClick={()=> lastPage()} />

    </Pagination>


    // <TablePagination
    // rowsPerPageOptions={[10, 25, 100]}
    // component="div"
    // count={totalPages}
    // rowsPerPage={rowsPerPage}
    // page={page}
    // onChangePage={handleChangePage}
    // onChangeRowsPerPage={handleChangeRowsPerPage}
    // />





  //<Pagination count={10} variant="outlined" shape="rounded" color="secondary" size="small" showFirstButton showLastButton/>


    // <Pagination>{pageNumbers}</Pagination>


    // <nav>
    //     <ul className="pagination" >
    //     {pageNumbers.map(number=>(
    //     <li key={number} className="page-item" >
    //     <a onClick={()=> paginate(number)} className="page-link">{number}</a>

    //     </li>
    
    //     ))}

    //     </ul>

    //     {/* <Pagination>{pageNumbers}</Pagination> */}

    // </nav> 
  )
}

export default Paginate_1
import React, { useState } from 'react';
import { Pagination, DropdownButton, Dropdown } from 'react-bootstrap';


import '../styling/productgrid.scss'
import Cards from '../cards/Cards';

const ProductGrid = ({ products }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(products.length / itemsPerPage);

  const handleSelect = (e) => {
    setItemsPerPage(Number(e));
    setCurrentPage(1); 
  };

  return (
    <div  className="paginated-container">
        
      <Cards products={currentItems} />
      <div style={{width:'40%', float:'right', textAlign:'right'}}>
        <p style={{float:'left'}}>Items per page</p>
        <div style={{float:'left'}}>
          <DropdownButton
            id="dropdown-basic-button"
            title={itemsPerPage}
            onSelect={handleSelect}
          > 
            <Dropdown.Item eventKey="8">8</Dropdown.Item>
            <Dropdown.Item eventKey="12">12</Dropdown.Item>
            <Dropdown.Item eventKey="16">16</Dropdown.Item>
          </DropdownButton>
        </div>
        <div  style={{float:'left'}}>
          {`Showing ${indexOfFirstItem + 1}-${indexOfLastItem} of ${products.length} items`}
        </div>      
        <Pagination  style={{float:'left'}} className="pagination-controls">
          {/* <Pagination.First onClick={() => setCurrentPage(1)} disabled={currentPage === 1} /> */}
          <Pagination.Prev onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} />
          {/* {[...Array(totalPages).keys()].map(number => (
              <Pagination.Item key={number + 1} active={number + 1 === currentPage} onClick={() => setCurrentPage(number + 1)}>
              {number + 1}
              </Pagination.Item>
          ))} */}
          <Pagination.Next onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages} />
          {/* <Pagination.Last onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages} /> */}
        </Pagination>
      </div>
    </div>
  );
};

export default ProductGrid;
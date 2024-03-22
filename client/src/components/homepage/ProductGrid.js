import React, { useState } from 'react';
import { Pagination, DropdownButton, Dropdown, Row, Col } from 'react-bootstrap';


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
      <div style={{ textAlign:'right', paddingTop:'2%'}}>
        <Row>
          <Col md={4}></Col>
          <Col md={2}><p>Items per page</p></Col>
          <Col md={1}>
            <div>
              <DropdownButton
                id="dropdown-basic-button"
                title={itemsPerPage}
                onSelect={handleSelect}
                style={{padding:0,}}
              > 
                <Dropdown.Item eventKey="8">8</Dropdown.Item>
                <Dropdown.Item eventKey="12">12</Dropdown.Item>
                <Dropdown.Item eventKey="16">16</Dropdown.Item>
              </DropdownButton>
            </div>
          </Col>
          <Col md={2}>
            <div >
              {`Showing ${indexOfFirstItem + 1}-${indexOfLastItem} of ${products.length} items`}
            </div>
          </Col>      
          <Col md={3}>
            <Pagination   className="pagination-controls">
              <Pagination.First onClick={() => setCurrentPage(1)} disabled={currentPage === 1} />
              <Pagination.Prev onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} />
              {[...Array(totalPages).keys()].map(number => (
                  <Pagination.Item key={number + 1} active={number + 1 === currentPage} onClick={() => setCurrentPage(number + 1)}>
                  {number + 1}
                  </Pagination.Item>
              ))}
              <Pagination.Next onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages} />
              <Pagination.Last onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages} />
            </Pagination>
            </Col>
        </Row>
      </div>
    </div>
  );
};

export default ProductGrid;
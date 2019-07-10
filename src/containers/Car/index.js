import React from 'react';
import './style.css';
import { Col } from 'reactstrap';


function Car(props) {
    let colClass = 'car-col-cont-1';
    let { searchVal, name, image } = props;
    let nameStr = String(name).toLowerCase();

    //checking if searchVal match sliced name and adding new class (without borders) to colClass if true
    if (searchVal === nameStr.slice(0, searchVal.length) && searchVal) colClass = 'car-col-cont-1-hide'
    
    return (
        <>
            <Col sm="4" className={colClass}>
                <div className='card'>
                    <img className='card-img-top' src={image} alt={name} />
                    <div className="card-body">
                        <h5 className="card-title">{name}</h5>
                    </div>
                </div>
            </Col>
        </>
    )
}

export default Car;



//nameStr.slice(0, searchVal.length)


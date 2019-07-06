import React from 'react';
import './style.css';
import { Col } from 'reactstrap';


function Car(props) {
    console.log('Props from parent [APP]:', props)
    return (
        <>
            <Col sm="4" className='car-col-cont-1'>
                <div className='card'>
                    <img className='card-img-top' src={props.image} alt={props.name} />
                    <div className="card-body">
                        <h5 className="card-title">{props.name}</h5>
                    </div>

                </div>
            </Col>
        </>
    )
}


export default Car;



/*            <div className='car-div-cont card'>
 */



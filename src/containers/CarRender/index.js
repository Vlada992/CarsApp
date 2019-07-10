import React from 'react';
import './style.css';
import { Col } from 'reactstrap';
import ReactCardFlip from 'react-card-flip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faCheck } from '@fortawesome/free-solid-svg-icons';

/*
* Using reactstrap module and font-awesome
* Functional/dumb component which is rendering  bootstrap Col and cards with cars
* Built-in Props object filled with properties/methods  from parent Car  smart component but also props from main app component, App smart 
component, perfect example of unidirectional data flow in React.
 */

function CarRender(props) {
    let [{ image, name, speed, description }, { propsArr, methodArr }] = [props.eachCar, props];

    return (
        <Col sm="4" className={propsArr[0]}>
            <ReactCardFlip
                className='react-card'
                isFlipped={propsArr[2]}
                containerStyle={{ perspective: '300px' }}
                flipDirection={'horizontal'}
            >
                <div
                    className={propsArr[3] ? 'card card-2 card-3' : 'card card-3'}
                    key="front"
                    onMouseEnter={methodArr[0]}
                    onClick={methodArr[1]}
                >
                    <img
                        className='card-img-top'
                        src={image}
                        alt={name}
                    />
                    <div className="card-body">
                        <h5 className={propsArr[3] ? "card-title-1" : "card-title"}>
                            {propsArr[3] ? <span className='span-title-cont'>
                                {name} <FontAwesomeIcon className='check-class' icon={faCheck} />
                            </span> : name}
                        </h5>
                    </div>
                </div>

                <div
                    className={propsArr[3] ? 'card-1 card-2 card-3' : 'card-1 card-3'}
                    key="back"
                    onMouseLeave={methodArr[0]}
                    onClick={methodArr[1]}
                >
                    <div className='centered-text'>
                        <b> {description}</b>
                        <h5 className='h5-fa-icon'>
                            <FontAwesomeIcon icon={faTachometerAlt} /> {speed}km/h
                        </h5>
                        <h5 className={propsArr[3] ? 'h3-name-class-1' : 'h3-name-class'}>{name}</h5>
                    </div>

                    <img
                        className={propsArr[1]}
                        src={image}
                        alt={name}
                    />
                </div>
            </ReactCardFlip>
        </Col>
    )
}

export default CarRender




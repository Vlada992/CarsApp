import React from 'react';
import './style.css';
import CarRender from '../../containers/CarRender';


/**
 * [example -- handleHover React component class method description]
 * @param  {Event} e The first event
 * @event preventDefault prevent default browsers actions
 * @state @imgClass @isFlipped setting state without direct mutation  
 */


class Car extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isFlipped: false,
            imgClass: 'card-img-top',
            clicked: false
        };
    }

    handleHover = e => {
        e.preventDefault();
        this.setState({
            imgClass: "card-img-top-darken",
            isFlipped: !this.state.isFlipped
        });
    }

    handleClick = e => {

        //althought React is unidirectional, we can pass value from child to parent with parent selectedCars method here
        let [{ carsChoosen, eachCar, selectedCars }, { clicked }] = [this.props, this.state]
        let { name } = eachCar;
        if (carsChoosen.length >= 3 && !this.state.clicked) return alert('You can\'t add more than 3 cars on track')

        e.preventDefault();
        this.setState({
            cardClass: 'card card-2',
            clicked: !clicked
        })

        /*
        selectedCars is parent method, called in children with children value passes as arg so that method can see
        either to add/remove cars from selected list
        */
        clicked ? selectedCars([name, true]) : selectedCars([name, false])
    }

    render() {

        //Taking object/array props/methods with ES6 destructuring
        let colClass = 'car-col-cont-1';
        let [{ name }, { searchVal, eachCar }] = [this.props.eachCar, this.props];
        let [{ isFlipped, imgClass, clicked }, { handleHover, handleClick }] = [this.state, this];
        let propsArr = [colClass, imgClass, isFlipped, clicked], methodArr = [handleHover, handleClick];
        let nameStr = String(name).toLowerCase()
        if (searchVal === nameStr.slice(0, searchVal.length) && searchVal) colClass = 'car-col-cont-1-hide'
        return (
            <CarRender
                eachCar={eachCar}
                propsArr={propsArr}
                methodArr={methodArr}
            />
        )
    }
}

export default Car;

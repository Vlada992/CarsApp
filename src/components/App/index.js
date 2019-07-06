import React, { Component } from 'react';
import './style.css';
import axios from 'axios';
import Car from '../../containers/Car';
import { Container, Row } from 'reactstrap';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      apiData: '',
      cars: ''
    }
  }

  componentDidMount() {
    axios.get('data.json')
      .then(apiData => {
        console.log('apiData', apiData)
        this.setState({
          apiData: apiData
        })
      })
      .catch(error => {
        console.log(error);
      })
  }

  render() {
    let eachCar;
    if (this.state.apiData) {
      let { data: { cars } } = this.state.apiData;
      eachCar = cars.map(eachCar => {
        console.log('eachCar', eachCar)
        let { image, name, id } = eachCar;
        return (
          <Car image={image} name={name} key={id} />
        )
      })
    }
    return (
      <>
        <Container>
          <Row className='car-row-cont-1'>
            {eachCar}
          </Row>
        </Container>
      </>
    );
  }
}

export default App;

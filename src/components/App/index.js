import React, { Component } from 'react';
import './style.css';
import axios from 'axios';
import Car from '../../containers/Car';
import SearchInput from '../../containers/SearchInput';
import { Container, Row } from 'reactstrap';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      apiData: '',
      searchVal: '',
      colClass: 'car-col-cont-1'
    }
  }

  //Fetch json obj with axios and put data into state
  componentDidMount() {
    axios.get('data.json')
      .then(apiData => {
        this.setState({ apiData: apiData })
      })
      .catch(error => {
        console.log(error);
      })
  }

  searchCars = e => {
  }

  //add searched value into state by calling function inside children comp
  updateInputSearch = e => {
    const { value } = e.target;
    this.setState({ searchVal: String(value).toLowerCase() })
  }

  render() {
    let { apiData, searchVal, colClass } = this.state, eachCar
    if (apiData) {
      let { data: { cars } } = apiData, carsCopy = [...cars]; //take cars Arr from apiData obj and copy into new carsCopy

      //if first char of Arr name prop match searchVal first char, empty carsCopy Arr. Then (line 52) push just matched obj(s)
      if (searchVal && carsCopy.findIndex(x => x['name'][0] === searchVal[0].toUpperCase()) !== -1) {
        carsCopy.length = 0

        //loop trought cars Arr and compare Arr names props with searched value
        cars.forEach(each => {
          let { name } = each, nameStr = String(name).toLowerCase()

          //if searchVal match sliced nameStr, push that car obj to carsCopy Arr
          if (searchVal === nameStr.slice(0, searchVal.length)) carsCopy.push(each)
        })
      }

      //loop trought carsCopy Arr, which will be either with all car objects or just matched with searchVal in previous conditions
      eachCar = carsCopy.map(eachCar => {
        let { image, name, id } = eachCar;
        return (
          <Car image={image} name={name} key={id}
            colClass={colClass}
            searchVal={searchVal}
          />
        )
      })
    }

    return (
      <>
        {/* using reactstrap bootstrap module */}
        <Container>
          <Row className='input-row-cont-1'>
            <SearchInput
              searchCars={this.searchCars}
              updateInputSearch={this.updateInputSearch}
            />
          </Row>
        </Container>
        <Container>
          <Row className='car-row-cont-1'>
            {/* passing eachCar var from render body here to render */}
            {eachCar}
          </Row>
        </Container>
      </>
    );
  }
}

export default App;

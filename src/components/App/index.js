import React, { Component } from 'react';
import './style.css';
import axios from 'axios';
import Car from '../Car';
import SearchInput from '../../containers/SearchInput';
import { Container, Row } from 'reactstrap';


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      apiData: '',
      searchVal: '',
      carsChoosen: []
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

  //add searched value into state by calling function inside children comp
  updateInputSearch = e => {
    const { value } = e.target;
    this.setState({ searchVal: String(value).toLowerCase() })
  }

  selectedCars = car => {
    let [name, boolVal] = car
    let { carsChoosen } = this.state, carLen = carsChoosen.length + 1;

    //if 2nd passed arg is true, filtering trought previosly choosen cars and removing selected for removing
    if (boolVal) {
      let filteredArr = this.state.carsChoosen.filter(item => item !== name)
      this.setState({ carsChoosen: filteredArr })
    } else if (!boolVal && carLen <= 3)

      //adding choosen cars to state array and filtering duplicates with ES6 Set and transform Set again to array with spread 
      this.setState({ carsChoosen: [...new Set([...this.state.carsChoosen, name])] })
  }

  render() {
    let [{ apiData, searchVal }, { updateInputSearch }] = [this.state, this], eachCar;
    if (apiData) {

      //take cars Arr from apiData obj and copy into new carsCopy
      let { data: { cars } } = apiData, carsCopy = [...cars];

      //if first char of Arr name prop match searchVal first char, empty carsCopy Arr. Then (line 52) push just matched obj(s)
      if (searchVal && carsCopy.findIndex(x => x['name'][0] === searchVal[0].toUpperCase()) !== -1) {
        carsCopy.length = 0;

        //loop trought cars Arr and compare Arr names props with searched value
        cars.forEach(each => {
          let { name } = each, nameStr = String(name).toLowerCase();

          //if searchVal match sliced nameStr, push that car obj to carsCopy Arr
          if (searchVal === nameStr.slice(0, searchVal.length)) carsCopy.push(each)
        })
      }

      //loop trought carsCopy Arr, which will be either with all car objects or just matched with searchVal in previous conditions
      eachCar = carsCopy.map(eachCar => {
        let [{ selectedCars }, { carsChoosen }] = [this, this.state];
        return (
          <Car
            eachCar={eachCar}
            key={eachCar['id']}
            searchVal={searchVal}
            selectedCars={selectedCars}
            carsCopy={carsCopy}
            carsChoosen={carsChoosen}
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
              updateInputSearch={updateInputSearch}
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

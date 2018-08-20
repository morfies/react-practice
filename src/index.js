import React from 'react';
import { Button, Modal } from 'antd';
import CityList from './components/cityList';
import SelectedArea from './components/selectedArea';

export default class CitySelector extends React.Component {
  constructor(props) {
    super(props);
    console.log('constructor');
    // check props
    let cityConf = props.data; // city data
    if (!cityConf || !Array.isArray(cityConf)) {
      throw new Error('prop data should be an Array');
    }
    cityConf = JSON.parse(JSON.stringify(cityConf));
    let selected = props.selected || []; // already selected data
    if (!Array.isArray(selected)) {
      throw new Error('prop selected should be an Array');
    }
    selected = [...selected];
    const selectCb = props.selectCb;
    if (typeof selectCb !== 'function') {
      throw new Error('prop selectCb should be a Function');
    }
    
    cityConf = this._filterConfData(selected, cityConf);
    // state
    this.state = {
      cityConf,
      selected,
      visible: false // modal visibility
    }

  }
  componentDidMount() {
    console.log('componentDidMount');
  }
  btnClickHandler = () => {
    this.setState({
      visible: true
    })
  }
  modalOkHandler = () => {
    const area = this.calcSelectedArea();
    const selected = area.map((city) => city.city);
    this.setState({
      visible: false,
      selected
    });
    // need to return selected data to parent page
    this.props.selectCb(selected);
  }
  modalCancelHandler = () => {
    const selected = this.state.selected;
    let cityConf = this.state.cityConf;
    cityConf = this._filterConfData(selected, cityConf);
    this.setState({
      visible: false,
      cityConf
    })
  }
  calcSelectedArea = () => {
    const area = [];
    for (let prov of this.state.cityConf) {
      prov.cities.map((city) => {
        if (city.selected === true) {
          area.push(city);
        }
      })
    }
    return area;
  }
  unselectHandler = (cityname) => {
    const cityConf = this.state.cityConf;
    this.setState({
      cityConf: this._getNewConfData(cityname, cityConf, false)
    })
  }
  selectHandler = (cityname) => {
    const cityConf = this.state.cityConf;
    this.setState({
      cityConf: this._getNewConfData(cityname, cityConf, true)
    })
  }
  _filterConfData = (selected, cityConf) => {
    for (let prov of cityConf) {
      prov.cities = prov.cities.map((city) => {
        if (selected.includes(city.city)) {
          city.selected = true;
        } else {
          city.selected = false;
        }
        return city;
      })
    }
    return [...cityConf];
  }
  _getNewConfData = (cityname, cityConf, flag) => {
    for (let prov of cityConf) {
      prov.cities = prov.cities.map((city) => {
        if (city.city === cityname) {
          city.selected = flag;
        }
        return city;
      });
    }
    return [...cityConf];
  }
  render() {
    return (
      <div>
        <Button
          onClick={this.btnClickHandler}
          size={this.props.size||null}
          type={this.props.btnType||null}
        >{this.props.btnText||"choose city"}</Button>
        <Modal 
          title={this.props.title} 
          width="800px" 
          bodyStyle={{height:"500px",overflow:"auto"}}
          visible={this.state.visible}
          onOk={this.modalOkHandler}
          onCancel={this.modalCancelHandler}
          >
          <SelectedArea selarea={this.calcSelectedArea()} unselectHandler={this.unselectHandler}></SelectedArea>
          <CityList data={this.state.cityConf} selectHandler={this.selectHandler}></CityList>
        </Modal>
      </div>
    );
  }
}

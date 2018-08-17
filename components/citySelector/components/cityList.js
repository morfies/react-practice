import React from 'react';
import {Button, Divider} from 'antd'

export default class CityList extends React.Component {
  constructor(props) {
    super(props);
  }

  onClickHandler = (cityname) => {
    this.props.selectHandler(cityname);
  }
  render() {
    const data = this.props.data;
    return <div>
      {
        data.map((prov) => 
          <div>
            <Divider orientation="left" dashed key={prov.id}>{prov.province}</Divider>
            {
              prov.cities.map((city) => 
                <Button 
                  key={city.id}
                  style={city.selected?{color:"#40a9ff",borderColor:"#40a9ff"}:null}
                  onClick={() => this.onClickHandler(city.city)}>{city.city}</Button>
              )
            }
          </div>
        )
      }
    </div>
  }
}
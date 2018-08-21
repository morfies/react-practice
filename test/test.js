import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
import * as antd from 'antd';

import CitySelector from 'CitySelector';

const data = [{
  province: '湖北',
  id: 'p1',
  cities: [{
    city: '武汉',
    id: 'p1c1'
  }, {
    city: '黄石',
    id: 'p1c2'
  }, {
    city: '十堰',
    id: 'p1c3'
  }, {
    city: '宜昌',
    id: 'p1c4'
  }, {
    city: '襄阳',
    id: 'p1c5'
  }]
}, {
  province: '湖南',
  id: 'p2',
  cities: [{
    city: '长沙',
    id: 'p2c1'
  }, {
    city: '株洲',
    id: 'p2c2'
  }, {
    city: '湘潭',
    id: 'p2c3'
  }, {
    city: '衡阳',
    id: 'p2c4'
  }, {
    city: '邵阳',
    id: 'p2c5'
  }, {
    city: '岳阳',
    id: 'p2c6'
  }, {
    city: '常德',
    id: 'p2c7'
  }, {
    city: '张家界',
    id: 'p2c8'
  }, {
    city: '益阳',
    id: 'p2c9'
  }, {
    city: '郴州',
    id: 'p2c10'
  }]
}]

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: []
    };
  }

  selectCb = (cities) => {
    console.log('selected1 cities:', cities);
    this.setState({
      selected: [...cities]
    })
  }

  render() {
    return <div>
      <div className={'button'}>
        cities you selected: {this.state.selected.join(',')}
        <CitySelector key={1}
          data={data} // 必须，符合mock数据结构
          selected={this.state.selected} // 必须，页面已选数据回传给组件
          selectCb={(cities)=>this.selectCb(cities)} // 必须，选择城市完毕后用来接收数据的回调
          btnText="选择" // 可选，按钮文本
          title="合作城市选择" // 弹框的title
          btnType="" // 按钮的样式， primary|dashed|danger 或者不设
          size="small" // small|large 或者不设
        >
        </CitySelector>
      </div>
    </div>;
  }
}

ReactDOM.render(<Index  />, document.getElementById('root'));
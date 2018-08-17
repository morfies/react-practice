import React from 'react';
import CitySelector from '../citySelector'
import data from './mock';

export default class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: [],
      selected2: []
    };
  }


  selectCb = (cities) => {
    console.log('selected cities:', cities);
    this.setState({
      selected: [...cities]
    })
  }
  selectCb2 = (cities) => {
    console.log('selected cities:', cities);
    this.setState({
      selected2: [...cities]
    })
  }
  render() {
    return <div>
      <div className={'button'}>
        here is Page2, cities you selected: {this.state.selected.join(',')}
      </div>


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
      <div>
        As for selector2, you've selected: {this.state.selected2.join(',')}
      </div>
      <CitySelector key={2}
        data={data} // 必须，符合mock数据结构
        selected={this.state.selected2} // 必须，页面已选数据回传给组件
        selectCb={(cities)=>this.selectCb2(cities)} // 必须，选择城市完毕后用来接收数据的回调
        btnText="选择2" // 可选，按钮文本
        title="合作城市选择" // 弹框的title
        btnType="dashed" // 按钮的样式， primary|dashed|danger 或者不设
        size="" // small|large 或者不设
       >
      </CitySelector>
    </div>;
  }
}
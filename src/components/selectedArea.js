import React from 'react';
import {Tag} from 'antd';

export default class SelectedArea extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const area = this.props.selarea || [];
    return <div>
      {
        area.map((city) => 
          <Tag closable afterClose={() => this.props.unselectHandler(city.city)} key={city.id}>{city.city}</Tag>
        )
      }
    </div>;
  }
}
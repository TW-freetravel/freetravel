import React, {Component} from 'react';
import request from 'superagent';
import {hashHistory} from 'react-router';

export default class PersonalPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'unknown',
      userOrder: []
    }
  }

  componentWillMount() {
    request
      .get('/api/personal')
      .end((err, res) => {
        console.log(err);
        if (err) {
          if (res.statusCode === 401) {
            alert('please login!');
            return hashHistory.push('/login');
          } else {
            return alert('请先登录!');
          }
        }
        console.log("statusCode:" + res.statusCode);
        const {username} = res.body;
        this.setState({username});
      });

    request.post('/api/orders/userOrder')
      .end((err, data) => {
        this.setState({
          userOrder: data.body
        });
      });
  }

  render() {
    return <div>
      <div>Personal Page</div>
      <div>Username: {this.state.username}</div>
      <div>Greeting:</div>
      <div>userOrder:
        {this.state.userOrder.map(o =><div>
          <hr/>
            <div>Name:{o.name}</div>
            <div>Phone:{o.phone}</div>
            <div>Address:{o.address}</div>
            <div>OtherMessage:{o.otherMessage}</div>
            <div>OrderProductId:{o.orderProductId}</div>
          </div>
        )}</div>
    </div>;
  }
}

import React, {Component} from 'react';
import request from 'superagent';
import {hashHistory} from 'react-router';
import '../css/personal-page.css';

export default class PersonalPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'unknown',
      password: '',
      phone: '',
      email: '',
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
        const {username, phone, email, password} = res.body;
        this.setState({username, phone, email, password});
      });

    request.post('/api/orders/userOrder')
      .end((err, data) => {
        this.setState({
          userOrder: data.body
        });
      });

    request.get('/api/users')
      .query({username: '123'})
      .end((err, res) => {
        const userInfo = res.body;
        // alert(userInfo);
        const {name, phone, email, password} = res.body;
        this.setState({username: name, phone, email, password});
      });

  }

  render() {
    return <div className="container-fluid">


      <div className="col-md-2">
        <ul className="nav nav-pills nav-stacked ">
          <li role="presentation" className="active">
            <a href="#personalInformation" data-toggle="collapse"
               data-target="#personalInformation" aria-expanded="false"
               aria-controls="personalInformation">个人信息</a>
          </li>
          <li role="presentation">
            <a href="#userOrder" data-toggle="collapse"
               data-target="#userOrder" aria-expanded="false"
               aria-controls="userOrder">个人订单</a>
          </li>
          <li role="presentation">
            <a href="#">Messages</a>
          </li>
        </ul>
      </div>

      <div className="col-md-10">
        <div className="collapse col-md-12" id="personalInformation">
          <div className="well">
            <div>Personal Page</div>
            <div>Username: {this.state.username}</div>
            <div>Password:<input className="input" type="password" value={this.state.password}/></div>
            <div>Phone:{this.state.phone}</div>
            <div>Email:{this.state.email}</div>
          </div>
        </div>
        <div className=" ">
          <div className="well collapse col-md-12 " id="userOrder">
            {this.state.userOrder.map(o =>
              <div className="media">
                <div className="media-left  media-middle">
                  <img className="img-order" src={"../images/goods/" + o.orderImgName + ".jpg"} alt="加载失败"/>
                </div>
                <div className="media-body">
                  <hr/>
                  <div className="col-md-4">OrderProductId:{o.orderProductId}</div>
                  <div className="col-md-4">Name:{o.name}</div>
                  <div className="col-md-4">Phone:{o.phone}</div>
                  <div className="col-md-4">Address:{o.address}</div>
                  <div className="col-md-4">OtherMessage:{o.otherMessage}</div>
                  <div className="col-md-10"></div>
                  <div className="col-md-2">
                    <button type="button" className="btn btn-danger">删除</button>
                  </div>
                </div>
              </div>
            )}
            <div className="col-md-10 "></div>
            <div className="col-md-2 ">
              <button type="button" className="btn btn-success">确认付款</button>
            </div>
          </div>
        </div>

      </div>
    </div>

  }
}

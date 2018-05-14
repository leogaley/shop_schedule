import React, { Component } from 'react';
import logo from '../images/logo.svg';
import '../App.css';
import { Button, Jumbotron, Table } from 'reactstrap';

class Home extends Component {

    constructor(props){
        super(props);
        this.state = {
            data: [
                {'wo':'11638','item':'17314','desc':'Base Cabinet, Maple 24Hx48Wx16D, 1 Adjust. Shelf HPL Top','duedate':'05/07'},
                {'wo':'11639','item':'17314','desc':'Base Cabinet, Maple 24Hx48Wx16D, 1 Adjust. Shelf HPL Top','duedate':'05/07'},
                {'wo':'11640','item':'17314','desc':'Base Cabinet, Maple 24Hx48Wx16D, 1 Adjust. Shelf HPL Top','duedate':'05/07'},
                {'wo':'11641','item':'17314','desc':'Base Cabinet, Maple 24Hx48Wx16D, 1 Adjust. Shelf HPL Top','duedate':'05/07'},
                {'wo':'11642','item':'17314','desc':'Base Cabinet, Maple 24Hx48Wx16D, 1 Adjust. Shelf HPL Top','duedate':'05/07'},
                {'wo':'11643','item':'17314','desc':'Base Cabinet, Maple 24Hx48Wx16D, 1 Adjust. Shelf HPL Top','duedate':'05/07'}
            ]
        }
    }

  render() {
    return (
        <div>
            <div className="app-header">
                <div className="logo-block">
                    <img src={logo} className="main-logo" alt="logo" />
                </div>
            <h1 className="display-4">Shop Schedule</h1>
            <p>Last updated: 11:58 am</p>
            </div>
            <Table>
        <thead>
          <tr>
            <th>WO#</th>
            <th>Item</th>
            <th>Description</th>
            <th>Due Date</th>
          </tr>
        </thead>
        <tbody>
            {this.state.data.map((record, i) => (
                <tr key={i}>
                    <td>{record.wo}</td>
                    <td>{record.item}</td>
                    <td>{record.desc}</td>
                    <td>{record.duedate}</td>
                </tr>
                    ))
                }
        </tbody>
      </Table>
        </div>
    );
  }
}

export default Home;
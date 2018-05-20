import React, { Component } from 'react';
import logo from '../images/logo.svg';
import '../App.css';
import FilterableTable from 'react-filterable-table';
import ReactInterval from 'react-interval';
import Timestamp from 'react-timestamp';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
const FieldRenders = require('./FieldRenders.js');

// const woButton = function(status, click, id) {
//   if (status === "Assembly (Stock)"){
//       return (
//           <Button title="Mark Step Complete" color="warning" onClick={click}><span className="fa fa-arrow-left"></span></Button>
//       )
//   } else {
//       return "";
//   }
// };

class StockA extends Component {

    constructor(props){
        super(props);
        this.state = {
            modal: false,
            data: [],
            fields: [
                { name: 'wobutton', displayName: "", inputFilterable: false, exactFilterable: false, sortable: false, emptyDisplay: "", render: FieldRenders.wobutton },
                { name: 'wo', displayName: "WO#", inputFilterable: true, exactFilterable: false, sortable: false, emptyDisplay: "---", render: FieldRenders.wo },
                { name: 'item', displayName: "Item", inputFilterable: true, exactFilterable: true, sortable: false, emptyDisplay: "---" },
                { name: 'desc', displayName: "Description", inputFilterable: true, exactFilterable: true, sortable: false, emptyDisplay: "---" },
                { name: 'note', displayName: "", inputFilterable: true, exactFilterable: false, sortable: false, render: FieldRenders.note },
                { name: 'icons', displayName: "*SH Here?", inputFilterable: true, exactFilterable: false, sortable: false, render: FieldRenders.icon },
                { name: 'qty', displayName: "Quantity", inputFilterable: true, exactFilterable: false, sortable: false, emptyDisplay: "---" },
                { name: 'duedate', displayName: "Due Date", inputFilterable: true, exactFilterable: true, sortable: false, emptyDisplay: "---", render: FieldRenders.date },
                { name: 'bo', displayName: "BO", inputFilterable: true, exactFilterable: false, sortable: false, emptyDisplay: "---" },
                { name: 'bs', displayName: "Build Status", inputFilterable: true, exactFilterable: true, sortable: false, emptyDisplay: "---" },
                { name: 'iss', displayName: "In Shop Status", inputFilterable: true, exactFilterable: true, sortable: false, emptyDisplay: "---" },
                { name: 'so', displayName: "SO#", inputFilterable: true, exactFilterable: true, sortable: false, emptyDisplay: "---" },
                { name: 'cust', displayName: "Customer", inputFilterable: true, exactFilterable: true, sortable: false, emptyDisplay: "---" }
            ]
        };

        this.handleClick = this.handleClick.bind(this);
        this.woButton = this.woButton.bind(this);
        this.toggle = this.toggle.bind(this);
    }

    // const woBoutton = (status) {
    //   if (status === "Assembly (Stock)"){
    //       return (
    //           <Button title="Mark Step Complete" color="warning" onClick={this.toggle}><span className="fa fa-arrow-left"></span></Button>
    //       )
    //   } else {
    //       return "";
    //   }
    // }


    componentDidMount() {
        fetch("/netsuite/1314")
          .then(res => res.json())
          .then(
            (result) => {
              // console.log("test: "+JSON.stringify(result));

              let filteredDataObject = [];

              for (let i = 0; i < result.length; i++) {

                    // let cust = result[i].columns.entity.name;

                    // if (!result[i].columns.entity.name){
                    //     let cust = "";
                    // }

                    let iconCode = "";

                    if (result[i].columns.custbody162.name === "Yes"){
                        iconCode += "a";
                    }
                    if (result[i].columns.custbody32 === true){
                        iconCode += "b";
                    }
                    if (result[i].columns.custbody144 === true){
                        iconCode += "c";
                    }

                    // if (result[i].columns.custbody178.name === "Assembly (Stock)"){
                  // const wobutton = "{<Button title='Mark Step Complete' color='warning' onClick={this.toggle}><span className='fa fa-arrow-left'></span></Button>}";
                    // }
                    // if (result[i].columns.custbody178.name != "Assembly (Stock)") {
                    //     const wobutton = "";
                    // }

                  filteredDataObject.push({
                    wobutton:this.woButton(result[i].columns.custbody178.name, result[i].id, result[i].columns.tranid),
                    wo:result[i].columns.tranid,
                    item:result[i].columns.item.name,
                    desc:result[i].columns.displayname,
                    note:result[i].columns.memo,
                    icons:iconCode,
                    qty:result[i].columns.quantity,
                    duedate:result[i].columns.enddate,
                    bo:result[i].columns.quantitybackordered,
                    bs:result[i].columns.custbody34.name,
                    iss:result[i].columns.custbody178.name,
                    so:result[i].columns.tranid,
                    cust:(result[i].columns.hasOwnProperty('companyname') ? result[i].columns.companyname : "")
                  });
                
              };
              // console.log("filtered data:" + JSON.stringify(filteredDataObject));
              this.setState({
                data: filteredDataObject
              })
              
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
              console.log (error);
            }
          )
      }  

    toggle() {
      this.setState({
        modal: !this.state.modal
      });
    }

    updateWo() {
      this.setState({
        modal: !this.state.modal
      });

      
    }

    handleClick(id, wo) {
      this.setState({
        modal: !this.state.modal,
        currentWo: wo,
        currentId: id
      });

      console.log(this.state.modal);
    }

    woButton(status, id, wo) {
      if (status === "Assembly (Stock)"){

          return (
              <Button title="Mark Step Complete" color="warning" onClick={() => this.handleClick(id, wo)}><span className="fa fa-arrow-left"></span></Button>
          )
      } else {
          return "";
      }
    };

  render() {
    return (
        <div>
        <ReactInterval timeout={600000} enabled={true}
          callback={() => {
            fetch("/netsuite/1314")
          .then(res => res.json())
          .then(
            (result) => {
              // console.log("test: "+JSON.stringify(result));

              let filteredDataObject = [];

              for (let i = 0; i < result.length; i++) {

                    let iconCode = "";

                    if (result[i].columns.custbody162.name === "Yes"){
                        iconCode += "a";
                    }
                    if (result[i].columns.custbody32 === true){
                        iconCode += "b";
                    }
                    if (result[i].columns.custbody144 === true){
                        iconCode += "c";
                    }

                  filteredDataObject.push({
                    wobutton:this.woButton(result[i].columns.custbody178.name, result[i].id, result[i].columns.tranid),
                    wo:result[i].columns.tranid,
                    item:result[i].columns.item.name,
                    desc:result[i].columns.displayname,
                    note:result[i].columns.memo,
                    icons:iconCode,
                    qty:result[i].columns.quantity,
                    duedate:result[i].columns.enddate,
                    bo:result[i].columns.quantitybackordered,
                    bs:result[i].columns.custbody34.name,
                    iss:result[i].columns.custbody178.name,
                    so:result[i].columns.tranid,
                    cust:(result[i].columns.hasOwnProperty('companyname') ? result[i].columns.companyname : "")
                  });
                
              };
              // console.log("filtered data:" + JSON.stringify(filteredDataObject));
              this.setState({
                data: filteredDataObject
              })
              
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
              console.log (error);
            }
          )            
          }} />


            <div className="app-header">
                <div className="logo-block">
                    <img src={logo} className="main-logo" alt="logo" />
                </div>
            <h1 className="display-4">Shop Schedule for Stock Assembly</h1>
            <span className="fa fa-clock-o"></span><span> Last Updated: </span><Timestamp time={new Date()} format='time' />
            </div>
            <div className="report">
            <FilterableTable
                namespace="Packing"               
                data={this.state.data}
                fields={this.state.fields}
                noRecordsMessage="There are no records to display"
                noFilteredRecordsMessage="No records match your filters!"
            />
            </div>
            <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
              <ModalHeader toggle={this.toggle}>Verification</ModalHeader>
              <ModalBody>
                Are you sure you want to update status of WO# {this.state.currentWo}?
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={this.toggle}>Update Status</Button>{' '}
                <Button color="secondary" onClick={this.toggle}>Cancel</Button>
              </ModalFooter>
            </Modal>
        </div>
    );
  }
}

export default StockA;
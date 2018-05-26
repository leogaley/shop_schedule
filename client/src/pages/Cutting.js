import React, { Component } from 'react';
import axios from 'axios';
import logo from '../images/logo.svg';
import '../App.css';
import FilterableTable from 'react-filterable-table';
import ReactInterval from 'react-interval';
import Timestamp from 'react-timestamp';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
const FieldRenders = require('./FieldRenders.js');

function dataMapping(data, click, clickWO) {

    let filteredDataObject = [];

    for (let i = 0; i < data.length; i++) {

        let iconCode = "";

        if (data[i].columns.custbody162.name === "Yes"){
            iconCode += "a";
        }
        if (data[i].columns.custbody32 === true){
            iconCode += "b";
        }
        if (data[i].columns.custbody144 === true){
            iconCode += "c";
        }

        let woNumber = data[i].columns.transactionname.substring(12);

        let soNumber = (data[i].columns.hasOwnProperty('createdfrom') ? data[i].columns.createdfrom.name.substring(13) : "");

        filteredDataObject.push({
        wobutton:woButton(data[i].columns.custbody178.name, data[i].id, woNumber, click),
        wo:workOrderLink(data[i].id, woNumber, clickWO),
        item:data[i].columns.item.name,
        desc:data[i].columns.displayname,
        note:data[i].columns.memo,
        icons:iconCode,
        qty:data[i].columns.quantity,
        duedate:data[i].columns.enddate,
        bo:data[i].columns.quantitybackordered,
        bs:data[i].columns.custbody34.name,
        iss:data[i].columns.custbody178.name,
        so:soNumber,
        cust:(data[i].columns.hasOwnProperty('companyname') ? data[i].columns.companyname : "")
        });
}
return filteredDataObject;
}

function woButton(woStatus, id, wo, click) {
    if (woStatus === "Cutting/EB"){

        return (
            <Button title="Mark Step Complete" size="sm" color="warning" onClick={() => click(id, wo)}>{<span className="fa fa-arrow-left"></span>}</Button>
        )
    } else {
        return "";
    }
  };

function workOrderLink(id, wo, clickWO) {
    return (
        <Button title="View Detail" color="link" className="wolink" onClick={() => clickWO(id, wo)}>{wo}</Button>
    )
};

// function mapObject(object, callback) {
//     return Object.keys(object).map(function (key) {
//       return callback(key, object[key]);
//     });
//   }

class Cutting extends Component {

    constructor(props){
        super(props);
        this.state = {
            woDetail: [],
            modal: false,
            modal_wo: false,
            data: [],
            fields: [
                { name: 'wobutton', displayName: "", inputFilterable: false, exactFilterable: false, sortable: false, emptyDisplay: "" },
                { name: 'wo', displayName: "WO#", inputFilterable: true, exactFilterable: false, sortable: false, emptyDisplay: "---" },
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
        this.handleClickWO = this.handleClickWO.bind(this);
        // this.woButton = this.woButton.bind(this);
        this.toggle = this.toggle.bind(this);
        this.toggleWO = this.toggleWO.bind(this);
        this.updateWo = this.updateWo.bind(this);
        this.toggleWO = this.toggleWO.bind(this);
    }




    componentDidMount() {
        fetch("/netsuite/1311")
          .then(res => res.json())
          .then(
            (result) => {

              this.setState({
                data: dataMapping(result, this.handleClick, this.handleClickWO)
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

    toggleWO() {
        this.setState({
          modal_wo: !this.state.modal_wo
        });
      }

    updateWo() {
        axios({
            method: 'post',
            url: '/netsuite',
            data: {
              id: this.state.currentId,
              field: "custbody77"
            }
          })
          .then(function (response) {
            console.log(response);
            window.location.reload();
          })
          .catch(function (error) {
            console.log(error);
          }); 
       
    }

    handleClick(id, wo) {
      this.setState({
        modal: !this.state.modal,
        currentWo: wo,
        currentId: id
      });
    }

    handleClickWO(id, wo) {
        this.setState({
          modal_wo: !this.state.modal_wo,
          currentWo: wo,
          currentId: id
        });

        fetch("/netsuite/wo/" + id)
          .then(res => res.json())
          .then(
            (result) => {
                console.log("result:::"+JSON.stringify(result.data));
              this.setState({
                woDetail: result.data
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

      _renderObject(){
          console.log("woDetail: "+this.state.woDetail);
		return Object.entries(this.state.woDetail).map(([key, value], i) => {
			return (
				<div key={key}>
					Item: {value.id} ;
					Description: {value.description} ;
                    Quantity: {value.quantity} ;
                    Bin Location: {value.bin} ;
                    On Hand Quantity: {value.onhandqty}
				</div>
			)
		})
	}


  render() {
    return (
        <div>
        <ReactInterval timeout={600000} enabled={true}
          callback={() => {
            fetch("/netsuite/1311")
          .then(res => res.json())
          .then(
            (result) => {
              
              this.setState({
                data: dataMapping(result, this.handleClick, this.handleClickWO)
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
            <h1 className="display-4">Shop Schedule for Cutting</h1>
            <span className="fa fa-clock-o"></span><span> Last Updated: </span><Timestamp time={new Date()} format='time' />
            </div>
            <div className="report">
            <FilterableTable
                data={this.state.data}
                fields={this.state.fields}
                noRecordsMessage="There are no records to display"
                noFilteredRecordsMessage="No records match your filters!"
                loadingMessage="Loading Data..."
                pagersVisible={false}
                pageSize={10000}
                pageSizes={null}
            />
            </div>
            <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
              <ModalHeader toggle={this.toggle}>Verification</ModalHeader>
              <ModalBody>
                Are you sure you want to update status of WO# {this.state.currentWo}?
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={this.updateWo}>Update Status</Button>{' '}
                <Button color="secondary" onClick={this.toggle}>Cancel</Button>
              </ModalFooter>
            </Modal>
            <Modal isOpen={this.state.modal_wo} toggle={this.toggleWO} size="lg">
              <ModalHeader toggle={this.toggleWO}><span className = "wo-header">Detail for WO#{this.state.currentWo}</span></ModalHeader>
              <ModalBody>
                  <div>
                    
                            <ul className="wo-list">
                            {this.state.woDetail.map((detail,i) => ( 
                                    
                            <li key={i} className="item-list"><h5 className="item">Item: {detail.item}</h5>{detail.description}
                                <br />
                                <br />
                                <span className="detail-name">Quantity : </span>{detail.quantity}
                                <br />
                                <span className="detail-name">Bin : </span>{detail.bin}
                                <br />
                                <span className="detail-name">On Hand Quantity : </span>{detail.onhandqty}
                                <br />
                                {(detail.custom === "T" ? <span className="custom">CUSTOM</span> : <span className="stock">STOCK</span>)}
                                <br />
                                <br />
                                <br />
                            </li>
                            ))}
                            </ul>
                    </div>
              </ModalBody>
              <ModalFooter>
                <Button color="secondary" onClick={this.toggleWO}>Cancel</Button>
              </ModalFooter>
            </Modal>
        </div>
    );
  }
}

export default Cutting;
// Import dependencies
import React, { Component } from 'react';
import axios from 'axios';
import logo from '../images/logo.svg';
import '../App.css';
import FilterableTable from 'react-filterable-table';
import ReactInterval from 'react-interval';
import Timestamp from 'react-timestamp';
import { Form, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import FieldRenders from './FieldRenders.js';

// Take imported data and format it for display
function dataMapping(data, clickWO, woCheckBox) {

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
        woCheckBox:woCheckBox(data[i].columns.custbody178.name, data[i].id, woNumber,data[i].columns.item.name, data[i].columns.quantity),
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


// Create work order link for each row
function workOrderLink(id, wo, clickWO) {
    return (
        <Button title="View Detail" color="link" className="wolink" onClick={() => clickWO(id, wo)}>{wo}</Button>
    )
};


class PackingOnly extends Component {

    constructor(props){
        super(props);
        this.state = {
            reportId: "1653", // edit this to change which report populates the table
            statusField: "custbody172", // edit this to change which status gets updated
            scheduleName: "Packing ONLY", // edit this to change department name for heading
            woStatusValue: "Packing", // edit this to change the filter that determines if a checkbox shows up
            selectedIds: [],
            selectedWos: [],
            woDetail: [],
            modal: false,
            modal_wo: false,
            data: [],
            fields: [
                { name: 'woCheckBox', displayName: "", inputFilterable: false, exactFilterable: false, sortable: false, emptyDisplay: "" },
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
        this.woCheckBox = this.woCheckBox.bind(this);
        this.toggle = this.toggle.bind(this);
        this.toggleWO = this.toggleWO.bind(this);
        this.updateWo = this.updateWo.bind(this);
        this.toggleWO = this.toggleWO.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }



// Initial data pull on page load
    componentDidMount() {
        document.body.style.cursor = 'wait';
        fetch("/netsuite/" + this.state.reportId)
          .then(res => res.json())
          .then(
            (result) => {

              this.setState({
                data: dataMapping(result, this.handleClickWO, this.woCheckBox)
              })
              document.body.style.cursor = 'default';
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
              console.log (error);
            }
          )
      }
      
    getSnapshotBeforeUpdate() {
        document.body.style.cursor = 'wait';
        return null;
      
    }

    componentDidUpdate() {
      document.body.style.cursor = 'default';
    }

// Toggle method for work order update modal      
    toggle() {
      this.setState({
        modal: !this.state.modal
      });
    }

// Toggle method for work order detail modal     
    toggleWO() {
        this.setState({
          modal_wo: !this.state.modal_wo
        });
      }

// Method to update WO status
    updateWo() {
      document.body.style.cursor = 'wait';
      const woArray =[];
      for (let i = 0; i < this.state.selectedIds.length; i++) {
        const element = this.state.selectedIds[i];
        woArray.push({"id":element,"field":this.state.statusField});        
      }
        axios({
            method: 'post',
            url: '/netsuite',
            data: {"workorders": woArray}
          })
          .then(function (response) {
            console.log(response);
            window.location.reload();
          })
          .catch(function (error) {
            console.log(error);
          }); 
       
    }

// Method to handle click of update button
    handleClick(event) {
      event.preventDefault();
      this.setState({
        modal: !this.state.modal
      });
    }

//Method to handle WO link click
    handleClickWO(id, wo) {

      this.setState({
        woDetail: [""]
      })

      fetch("/netsuite/wo/" + id)
      .then(res => res.json())
      .then(
        (result) => {
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

        this.setState({
          modal_wo: !this.state.modal_wo,
          currentWo: wo,
          currentId: id
        });

      }

// Method to handle checkbox states and arrays of selected id's and wo's
      handleChange(event) {

        const newSelectedIds = this.state.selectedIds;
        const newSelectedWos = this.state.selectedWos;

        if (this.state[event.target.name] === false) {

          newSelectedIds.push(event.target.name);
          newSelectedWos.push(event.target.value);

          this.setState({SelectedIds: newSelectedIds, SelectedWos: newSelectedWos});

        } else {

          const idIndex = newSelectedIds.indexOf(event.target.name);

          if (idIndex > -1) {
            newSelectedIds.splice(idIndex, 1);
          }

          const woIndex = newSelectedWos.indexOf(event.target.value);

          if (woIndex > -1) {
            newSelectedWos.splice(woIndex, 1);
          }

          this.setState({SelectedIds: newSelectedIds, SelectedWos: newSelectedWos});

        }

        this.setState({
          [event.target.name]: !this.state[event.target.name]
        });

      }

// Method to create checkboxes for work orders that have the correct in shop status
      woCheckBox(woStatus, id, wo, item, qty) {
        if (woStatus === this.state.woStatusValue){
          this.setState({
            [id]:false
          })
            return (
              <input
                name={id}
                form='submitForm'
                value={'WO: ' + wo + ' Item: ' + item + ' Qty: ' + qty}
                type="checkbox"
                defaultChecked={this.state[id]}
                onChange={this.handleChange} />
            )
        } else {
            return "";
        }
      }




  render() {
    return (
        <div>
        {/* Reloads data every 10 minutes   */}
        <ReactInterval timeout={600000} enabled={true}
          callback={() => {
            fetch("/netsuite/" + this.state.reportId)
          .then(res => res.json())
          .then(
            (result) => {
              
              this.setState({
                data: dataMapping(result, this.handleClickWO, this.woCheckBox)
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
            <h1 className="display-4">Shop Schedule for {this.state.scheduleName}</h1>
            <Form className='updateWorkOrders' id="submitForm" onSubmit={this.handleClick} action=''>
              
              <Button autoFocus={true} type='submit' value='submit' color='warning' name='Submit' className = 'update-button' title='Mark Step Complete for Selected WO(s)'>Update Selected</Button>
            </Form>
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

            <Modal autoFocus={false} isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
              <ModalHeader toggle={this.toggle}><span className="fa fa-exclamation-circle"></span> Verification</ModalHeader>
              <ModalBody>
                <p className="wo-warning">Are you sure you want to update status of these work orders?</p>
                <ul className="wo-selected">
                {this.state.selectedWos.map((detail,i) => ( 
                  <li key={i}>{detail}</li>
                ))}
                </ul>
              </ModalBody>
              <ModalFooter>
                <Form id="finalSubmit" onSubmit={this.updateWo}>
                  <Button type="submit" autoFocus={true} color="primary" onClick={this.updateWo}>Update Status</Button>{' '}
                  <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                </Form>
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
                <Button color="secondary" onClick={this.toggleWO}>Close</Button>
              </ModalFooter>
            </Modal>

        </div>
    );
  }
}

export default PackingOnly;
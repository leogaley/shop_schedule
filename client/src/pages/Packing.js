import React, { Component } from 'react';
import logo from '../images/logo.svg';
import '../App.css';
import FilterableTable from 'react-filterable-table';
import ReactInterval from 'react-interval';
import Timestamp from 'react-timestamp';



class Packing extends Component {

    constructor(props){
        super(props);
        this.state = {
            data: [],
            fields: [
                { name: 'wo', displayName: "WO#", inputFilterable: true, exactFilterable: true, sortable: true, emptyDisplay: "---" },
                { name: 'item', displayName: "Item", inputFilterable: true, exactFilterable: true, sortable: true, emptyDisplay: "---" },
                { name: 'desc', displayName: "Description", inputFilterable: true, exactFilterable: true, sortable: true, emptyDisplay: "---" },
                { name: 'qty', displayName: "Quantity", inputFilterable: true, exactFilterable: true, sortable: true, emptyDisplay: "---" },
                { name: 'duedate', displayName: "Due Date", inputFilterable: true, exactFilterable: true, sortable: true, emptyDisplay: "---" },
                { name: 'bo', displayName: "BO", inputFilterable: true, exactFilterable: true, sortable: true, emptyDisplay: "---" },
                { name: 'bs', displayName: "Build Status", inputFilterable: true, exactFilterable: true, sortable: true, emptyDisplay: "---" },
                { name: 'iss', displayName: "In Shop Status", inputFilterable: true, exactFilterable: true, sortable: true, emptyDisplay: "---" },
                { name: 'so', displayName: "SO#", inputFilterable: true, exactFilterable: true, sortable: true, emptyDisplay: "---" }
            ]
        }
    }

    componentDidMount() {
        fetch("/netsuite")
          .then(res => res.json())
          .then(
            (result) => {
              // console.log("test: "+JSON.stringify(result));

              let filteredDataObject = [];

              for (let i = 0; i < result.length; i++) {
                  filteredDataObject.push({
                      wo:result[i].id,
                      item:result[i].columns.item.name,
                      desc:result[i].columns.displayname,
                      qty:result[i].columns.quantity,
                      duedate:result[i].columns.enddate,
                      bo:result[i].columns.quantitybackordered,
                      bs:result[i].columns.custbody34.name,
                      iss:result[i].columns.custbody178.name,
                      so:result[i].columns.tranid
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

  render() {
    return (
        <div>
        <ReactInterval timeout={600000} enabled={true}
          callback={() => {
            fetch("/netsuite")
          .then(res => res.json())
          .then(
            (result) => {
              // console.log("test: "+JSON.stringify(result));

              let filteredDataObject = [];

              for (let i = 0; i < result.length; i++) {
                  filteredDataObject.push({
                      wo:result[i].id,
                      item:result[i].columns.item.name,
                      desc:result[i].columns.displayname,
                      qty:result[i].columns.quantity,
                      duedate:result[i].columns.enddate,
                      bo:result[i].columns.quantitybackordered,
                      bs:result[i].columns.custbody34.name,
                      iss:result[i].columns.custbody178.name,
                      so:result[i].columns.tranid
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
            <h1 className="display-4">Shop Schedule</h1>
            <span>Last Updated: </span><Timestamp time={new Date()} format='time' />
            </div>
            <div className="report">
            <FilterableTable
                namespace="Cutting"
                initialSort="id"                
                data={this.state.data}
                fields={this.state.fields}
                noRecordsMessage="There are no records to display"
                noFilteredRecordsMessage="No records match your filters!"
            />
            </div>
        </div>
    );
  }
}

export default Packing;
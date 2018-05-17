import React, { Component } from 'react';
import logo from '../images/logo.svg';
import '../App.css';
import example from '../data/responseExample';
import FilterableTable from 'react-filterable-table';

function filteredData(data) {
    console.log(data);
    let filteredDataObject = [];
    for (let i = 0; i < data.length; i++) {
        filteredDataObject.push({
            wo:data[i].id,
            item:data[i].columns.item.name,
            desc:data[i].columns.displayname,
            qty:data[i].columns.quantity,
            duedate:data[i].columns.enddate,
            bo:data[i].columns.quantitybackordered,
            bs:data[i].columns.custbody34.name,
            iss:data[i].columns.custbody178.name,
            so:data[i].columns.tranid
            // customer:example[i].columns.entity.name
        });
        // filteredDataObject[i].wo = example[i].id;
        // filteredDataObject[i].item = example[i].item.name;
        // filteredDataObject[i].desc = example[i].columns.displayname;
        // filteredDataObject[i].qty = example[i].columns.qty;
        // filteredDataObject[i].duedate = example[i].columns.enddate;
        // filteredDataObject[i].bo = example[i].columns.quantitybackordered;
        // filteredDataObject[i].bs = example[i].columns.custbody34.name;
        // filteredDataObject[i].iss = example[i].columns.custbody178.name;
        // filteredDataObject[i].soc = example[i].columns.tranid + " : " +example[i].columns.entity.name;
    }
    console.log (filteredDataObject);
    return filteredDataObject;
}

class Cutting extends Component {

    constructor(props){
        super(props);
        this.state = {
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
              this.setState({
                isLoaded: true,
                items: result.items
              });
              console.log("test: "+result.items);
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
              this.setState({
                isLoaded: true,
                error
              });
            }
          )
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
            <div className="report">
            <FilterableTable
                namespace="Cutting"
                initialSort="id"                
                dataEndpoint="/netsuite"
                onDataReceived={filteredData}
                fields={this.state.fields}
                noRecordsMessage="There are no records to display"
                noFilteredRecordsMessage="No records match your filters!"
            />
            </div>
        </div>
    );
  }
}

export default Cutting;
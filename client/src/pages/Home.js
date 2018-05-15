import React, { Component } from 'react';
import logo from '../images/logo.svg';
import '../App.css';
import { Table } from 'reactstrap';
import axios from 'axios';

class Home extends Component {

    constructor(props){
        super(props);
        this.state = {
            data: [
                {
                    "id": "4600347",
                    "recordtype": "workorder",
                    "columns": {
                        "tranid": "5255985",
                        "item": {
                            "name": "CF23688",
                            "internalid": "23688"
                        },
                        "displayname": "Slatwall Front Service Counter-Revised D",
                        "built": 0,
                        "quantity": 1,
                        "formulanumeric": 0,
                        "entity": {
                            "name": "200978 CARTER-WATERS LLC",
                            "internalid": "49238"
                        },
                        "quantitybackordered": 1,
                        "custbody34": {
                            "name": "In Shop",
                            "internalid": "1"
                        },
                        "startdate": "4/23/2018",
                        "enddate": "5/7/2018",
                        "shipmethod": {
                            "name": "Our Truck",
                            "internalid": "141"
                        },
                        "custbody145": true,
                        "custbody162": {
                            "name": "Yes",
                            "internalid": "1"
                        },
                        "itemid": "CF23688",
                        "altname": "CARTER-WATERS LLC",
                        "companyname": "CARTER-WATERS LLC",
                        "internalid": {
                            "name": "4600347",
                            "internalid": "4600347"
                        },
                        "custbody32": false,
                        "custbody77": true,
                        "custbody178": {
                            "name": "Assembly (CF)",
                            "internalid": "4"
                        },
                        "custbody197": true,
                        "custbody144": false
                    }
                },
                {
                    "id": "4605888",
                    "recordtype": "workorder",
                    "columns": {
                        "tranid": "11456",
                        "item": {
                            "name": "17304",
                            "internalid": "5787"
                        },
                        "displayname": "Base Cabinet, Black 24Hx48Wx16D, 1 Adjust. Shelf HPL Top",
                        "built": 3,
                        "quantity": 4,
                        "formulanumeric": 3,
                        "custbody34": {
                            "name": "In Shop",
                            "internalid": "1"
                        },
                        "startdate": "4/30/2018",
                        "enddate": "5/7/2018",
                        "custbody145": true,
                        "custbody162": {
                            "name": "N/A",
                            "internalid": "3"
                        },
                        "itemid": "17304",
                        "internalid": {
                            "name": "4605888",
                            "internalid": "4605888"
                        },
                        "custbody32": false,
                        "custbody77": true,
                        "memo": "Put 3 on 1- 40x48 skid for so 5262631",
                        "custbody178": {
                            "name": "Packing",
                            "internalid": "5"
                        },
                        "custbody197": false,
                        "custbody144": false
                    }
                },
                {
                    "id": "4649512",
                    "recordtype": "workorder",
                    "columns": {
                        "tranid": "11638",
                        "item": {
                            "name": "17314",
                            "internalid": "8162"
                        },
                        "displayname": "Base Cabinet, Maple 24Hx48Wx16D, 1 Adjust. Shelf HPL Top",
                        "built": 3,
                        "quantity": 4,
                        "formulanumeric": 3,
                        "custbody34": {
                            "name": "In Shop",
                            "internalid": "1"
                        },
                        "startdate": "4/30/2018",
                        "enddate": "5/7/2018",
                        "custbody145": true,
                        "custbody162": {
                            "name": "N/A",
                            "internalid": "3"
                        },
                        "itemid": "17314",
                        "internalid": {
                            "name": "4649512",
                            "internalid": "4649512"
                        },
                        "custbody32": false,
                        "custbody77": true,
                        "memo": "Put 3 on 1- 40x48 skid for so 5262631",
                        "custbody178": {
                            "name": "Packing",
                            "internalid": "5"
                        },
                        "custbody197": false,
                        "custbody144": false
                    }
                },
                {
                    "id": "4698029",
                    "recordtype": "workorder",
                    "columns": {
                        "tranid": "5264552",
                        "item": {
                            "name": "CF24148",
                            "internalid": "24148"
                        },
                        "displayname": "Paint metal bar white",
                        "built": 0,
                        "quantity": 1,
                        "formulanumeric": 0,
                        "entity": {
                            "name": "10014350 Beauty Brands",
                            "internalid": "1003740"
                        },
                        "quantitybackordered": 1,
                        "custbody34": {
                            "name": "Metal Shop ",
                            "internalid": "9"
                        },
                        "startdate": "5/10/2018",
                        "enddate": "5/11/2018",
                        "shipmethod": {
                            "name": "Our Truck",
                            "internalid": "141"
                        },
                        "custbody145": false,
                        "custbody162": {
                            "name": "N/A",
                            "internalid": "3"
                        },
                        "itemid": "CF24148",
                        "altname": "Beauty Brands",
                        "companyname": "Beauty Brands",
                        "internalid": {
                            "name": "4698029",
                            "internalid": "4698029"
                        },
                        "custbody32": true,
                        "custbody77": false,
                        "custbody178": {
                            "name": "Ready for Shop",
                            "internalid": "14"
                        },
                        "custbody197": false,
                        "custbody144": false
                    }
                },
                {
                    "id": "4649510",
                    "recordtype": "workorder",
                    "columns": {
                        "tranid": "11636",
                        "item": {
                            "name": "17225-C",
                            "internalid": "16342"
                        },
                        "displayname": "Crating For 17225 16\"X 24\"X 29\"",
                        "built": 1,
                        "quantity": 4,
                        "formulanumeric": 1,
                        "quantitybackordered": 3,
                        "custbody34": {
                            "name": "In Shop",
                            "internalid": "1"
                        },
                        "startdate": "5/7/2018",
                        "enddate": "5/11/2018",
                        "custbody145": false,
                        "custbody162": {
                            "name": "N/A",
                            "internalid": "3"
                        },
                        "itemid": "17225-C",
                        "internalid": {
                            "name": "4649510",
                            "internalid": "4649510"
                        },
                        "custbody32": true,
                        "custbody77": true,
                        "memo": "Must ship 2 on 5/11",
                        "custbody178": {
                            "name": "Packing",
                            "internalid": "5"
                        },
                        "custbody197": false,
                        "custbody144": false
                    }
                },
                {
                    "id": "4697427",
                    "recordtype": "workorder",
                    "columns": {
                        "tranid": "5251677",
                        "item": {
                            "name": "CF24147",
                            "internalid": "24147"
                        },
                        "displayname": "hang rail cuts\u0005(2) 68\" pieces\u0005(2) 63\" pi",
                        "built": 0,
                        "quantity": 6,
                        "formulanumeric": 0,
                        "entity": {
                            "name": "10034018 Joe Vazquez",
                            "internalid": "3069062"
                        },
                        "quantitybackordered": 6,
                        "custbody34": {
                            "name": "Metal Shop ",
                            "internalid": "9"
                        },
                        "startdate": "5/10/2018",
                        "enddate": "5/11/2018",
                        "shipmethod": {
                            "name": "Our Truck",
                            "internalid": "141"
                        },
                        "custbody145": false,
                        "custbody162": {
                            "name": "N/A",
                            "internalid": "3"
                        },
                        "itemid": "CF24147",
                        "altname": "Joe Vazquez",
                        "companyname": "Joe Vazquez",
                        "internalid": {
                            "name": "4697427",
                            "internalid": "4697427"
                        },
                        "custbody32": true,
                        "custbody77": false,
                        "custbody178": {
                            "name": "Ready for Shop",
                            "internalid": "14"
                        },
                        "custbody197": false,
                        "custbody144": false
                    }
                },
                {
                    "id": "4697553",
                    "recordtype": "workorder",
                    "columns": {
                        "tranid": "5251677",
                        "item": {
                            "name": "CF24146",
                            "internalid": "24146"
                        },
                        "displayname": "Fog gray melamine shelf\u00058\" deep x 36\" lo",
                        "built": 0,
                        "quantity": 6,
                        "formulanumeric": 0,
                        "entity": {
                            "name": "10034018 Joe Vazquez",
                            "internalid": "3069062"
                        },
                        "quantitybackordered": 6,
                        "custbody34": {
                            "name": "In Shop",
                            "internalid": "1"
                        },
                        "startdate": "5/10/2018",
                        "enddate": "5/11/2018",
                        "shipmethod": {
                            "name": "Our Truck",
                            "internalid": "141"
                        },
                        "custbody145": false,
                        "custbody162": {
                            "name": "Yes",
                            "internalid": "1"
                        },
                        "itemid": "CF24146",
                        "altname": "Joe Vazquez",
                        "companyname": "Joe Vazquez",
                        "internalid": {
                            "name": "4697553",
                            "internalid": "4697553"
                        },
                        "custbody32": true,
                        "custbody77": true,
                        "memo": "shrink wrap ends of shelves- no boxes",
                        "custbody178": {
                            "name": "Packing",
                            "internalid": "5"
                        },
                        "custbody197": false,
                        "custbody144": false
                    }
                },
                {
                    "id": "4697884",
                    "recordtype": "workorder",
                    "columns": {
                        "tranid": "5251677",
                        "item": {
                            "name": "CF24144",
                            "internalid": "24144"
                        },
                        "displayname": "Fog gray melamine shelf\u000512\" deep x 36\" l",
                        "built": 0,
                        "quantity": 6,
                        "formulanumeric": 0,
                        "entity": {
                            "name": "10034018 Joe Vazquez",
                            "internalid": "3069062"
                        },
                        "quantitybackordered": 6,
                        "custbody34": {
                            "name": "In Shop",
                            "internalid": "1"
                        },
                        "startdate": "5/10/2018",
                        "enddate": "5/11/2018",
                        "shipmethod": {
                            "name": "Our Truck",
                            "internalid": "141"
                        },
                        "custbody145": false,
                        "custbody162": {
                            "name": "Yes",
                            "internalid": "1"
                        },
                        "itemid": "CF24144",
                        "altname": "Joe Vazquez",
                        "companyname": "Joe Vazquez",
                        "internalid": {
                            "name": "4697884",
                            "internalid": "4697884"
                        },
                        "custbody32": true,
                        "custbody77": true,
                        "memo": "shrink wrap ends of shelves- no boxes",
                        "custbody178": {
                            "name": "Packing",
                            "internalid": "5"
                        },
                        "custbody197": false,
                        "custbody144": false
                    }
                }
            ]
        }
    }

    componentDidMount() {
        const URL = "https://3429264.restlets.api.netsuite.com/app/site/hosting/restlet.nl?script=356&amp;deploy=1"
        const AuthStr = 'OAuth realm="3429264",oauth_consumer_key="82bf5f7084dcff6e790390a3021a5b0fa0dac8c2f8c0cfaf7a30eb26c1236060",oauth_token="c47bd6e5486913b853ed2ceef8654cd6298ea6cbaa3dad254e0342bf1a129ac9",oauth_signature_method="HMAC-SHA1",oauth_timestamp="1526318616",oauth_nonce="0asRum",oauth_version="1.0",oauth_signature="vTa44QfAvrMt9zYCWikaNZbWsB0%3D"'

        axios.get(URL, {'headers': {'Authorization': AuthStr } })
          .then(res => {
            const data = res.data;
            console.log ("data: " + data);
            this.setState({ data });
          })
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
                    <td>{record.id}</td>
                    <td>{record.columns.item.name}</td>
                    <td>{record.columns.displayname}</td>
                    <td>{record.columns.enddate}</td>
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
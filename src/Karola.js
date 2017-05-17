/**
 * Created by karolina on 10.05.17.
 */
import React, {Component} from 'react'
import products from './data/products'
import GenericTable from './GenericTable'
import 'bootstrap/dist/css/bootstrap.css'
import './App.css'
import 'admin-lte/dist/css/AdminLTE.min.css'

import { Table } from 'react-bootstrap'

import './Karola.css';




class Karola extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchPhrase: '',
            products
        };
        fetch(
            process.env.PUBLIC_URL + '/data/products.json'
        ).then(
            response => response.json()
        ).then(
            students => this.setState({
                products: products
            })
        )
    }


    onInputChange = event => {
        this.setState({
            searchPhrase: event.target.value
        })
    }

    render() {
        return (
        <div>
            <h1>Products</h1>

            <GenericTable
                data={this.state.products}
                config={[
                    {
                        name: 'product',
                        label: 'products'
                    },
                    {
                        name: 'price',
                        label: 'price'
                    },
                    {
                        name: 'color',
                        label: 'color'
                    },
                    {
                        name: 'producer',
                        label: 'producer'
                    }
                ]}
                linked
                linkPrefix="/products"
            />


            <input type="text" onChange={this.onInputChange}/>


            <Table striped bordered condensed hover>
                <thead>
                <tr>
                    <th>Products</th>
                    <th>Price</th>
                    <th>Color</th>
                    <th>Producer</th>
                    <th>Images</th>
                </tr>
                </thead>
                <tbody>
                {
                    this.state.products.filter(
                        item => this.state.searchPhrase === '' ? true : item.product.includes(this.state.searchPhrase)
                    ).sort((a,b)=>a.price-b.price)
                        .map(
                        (dat, index) => (
                            <tr
                                key={index}
                            >
                                <td>{dat.product}</td>
                                <td>{dat.price}</td>
                                <td>{dat.color}</td>
                                <td>{dat.producer}</td>
                                <td><img className="img-responsive" width={250} height={150} src={'/img/comp.png'}/> </td>
                            </tr>
                        )
                    )
                }
                </tbody>
            </Table>
        </div>

        )
    }

}

export default Karola






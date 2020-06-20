import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import { css } from '@emotion/core';
import BeatLoader from "react-spinners/BeatLoader";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

export default class App extends Component {
  render(){
     return(
          <div>
             {/*other code*/}
             <JBake />             
          </div>
     )
  }
}

class JBake extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      JBakingGluten: 0.118,
      JAllGluten: 0.078,      
      ABakingGluten: 0.127,
      AAllGluten: 0.105,
      JBaking: '',
      JAll: '',
      Quantity: '',
      OriginalQuantity: '',
      TotalGlutenBaking: '',
      TotalGlutenAll: '',
      TotalGluten: '',
      UchidaQuantity: '',
      Difference: '',
      TotalConvertedGluten: '',
      AtotalFlowerGluten: '',
      CalculatedBflour: '',
      CalculatedAflour: '',
      Gruten: ''
    };

    this.handleChange1 = this.handleChange1.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.handleChange3 = this.handleChange3.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
 
 handleChange1(event) {
  this.setState({JBaking: event.target.value});
}
 
 handleChange2(event) {
  this.setState({JAll: event.target.value});
}

handleChange3(event) {
  this.setState({Quantity: event.target.value});
}

handleSubmit(event) {

  this.setState({loading: true});

  const originalQuantity = Number(this.state.JBaking) + Number(this.state.JAll);  
  const totalGlutenBaking = Number(this.state.JBaking)*this.state.JBakingGluten
  const totalGlutenAll = Number(this.state.JAll)*this.state.JAllGluten;
  const totalGluten = totalGlutenBaking + totalGlutenAll;
  const uchidaQuantity = Number(this.state.Quantity);
  const difference = uchidaQuantity/originalQuantity
  const totalConvertedGluten = totalGluten*difference;
  const atotalFlowerGluten = Number(uchidaQuantity)*this.state.AAllGluten;
  
  if(atotalFlowerGluten>totalConvertedGluten)return(alert("Use All Purpose: " + uchidaQuantity));
  
  this.setState({OriginalQuantity: originalQuantity});
  this.setState({TotalGlutenBaking: totalGlutenBaking});
  this.setState({TotalGlutenAll: totalGlutenAll});
  this.setState({TotalGluten: totalGluten});
  this.setState({UchidaQuantity: uchidaQuantity});
  this.setState({Difference: difference});
  this.setState({TotalConvertedGluten: totalConvertedGluten});
  this.setState({AtotalFlowerGluten: atotalFlowerGluten});

  let i = 0;
  let goalQuantity = uchidaQuantity;
  let gruten = 0;

  while (gruten<totalConvertedGluten) {
    gruten = (goalQuantity-i)*this.state.AAllGluten + i*this.state.ABakingGluten;
    i++;
  }

  this.setState({CalculatedBflour: goalQuantity-i});
  this.setState({CalculatedAflour: i});
  this.setState({Gruten: gruten});

  
  setTimeout(() => {  this.setState({loading: false}); }, 1000);
  event.preventDefault();
}

 render() {
   return( 
    <div> 
      <h1>パン算</h1>
      <Form onSubmit={this.handleSubmit}>
        <Form.Group controlId="enterFlourInfo" onSubmit={this.handleSubmit}>
          <Form.Label>日本レシピの強力粉</Form.Label>
          <Form.Control size="lg"　type="number" placeholder="grams" 
          value={this.state.JBaking}
          onChange={this.handleChange1}
          />

          <Form.Label>日本レシピの中力粉</Form.Label>
          <Form.Control size="lg" type="number" placeholder="grams" 
          value={this.state.JAll}
          onChange={this.handleChange2}
          />

          <Form.Label>アメリカ粉で今回使用したい総量</Form.Label>
          <Form.Control size="lg" type="number" placeholder="grams" 
          value={this.state.Quantity}
          onChange={this.handleChange3}
          />

          <Button size="lg" variant="primary" type="submit" className="m-3">
          計算          
          </Button>
          <BeatLoader
          css={override}
          size={15}
          color={"#123abc"}
          loading={this.state.loading}
          />
          <Form.Text className="text-muted">
          注意：すべて半角で入力する事
          </Form.Text>          
        </Form.Group>
      </Form>

      <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th>日本レシピ</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>強力粉</td>
          <td>{this.state.JBaking}g</td>
        </tr>
        <tr>
          <td>小麦粉</td>
          <td>{this.state.JAll}g</td>
        </tr>
        <tr>
          <td>総分量</td>
          <td>{this.state.OriginalQuantity}g</td>
        </tr>
        <tr>
          <td>強力粉グルテン</td>
          <td>{Math.round(this.state.TotalGlutenBaking)}g</td>
        </tr>
        <tr>
          <td>中力粉グルテン</td>
          <td>{Math.round(this.state.TotalGlutenAll)}g</td>
        </tr>
        <tr>
          <td>グルテン含有量</td>
          <td>{Math.round(this.state.TotalGluten)}g</td>
        </tr>                          
      </tbody>
    </Table>
    <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th>アメリカ・レシピ</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>総分量</td>
          <td>{this.state.UchidaQuantity}g</td>
        </tr>
        <tr>
          <td>分量差</td>
          <td>{Math.round(this.state.Difference*100)/100}倍</td>
        </tr>
        <tr>
          <td>目標グルテン</td>
          <td>{Math.round(this.state.TotalConvertedGluten)}g</td>
        </tr>
        <tr>
          <td>必要なBaking Flour分量:</td>
          <td>{this.state.CalculatedBflour}g</td>
        </tr>
        <tr>
          <td>必要なAll Purpose Flour量</td>
          <td>{this.state.CalculatedAflour}g</td>
        </tr>
        <tr>
          <td>実際のグルテン</td>
          <td>{Math.round(this.state.Gruten)}g</td>
        </tr>                                   
      </tbody>
    </Table>
    </div>
    );
 }
}
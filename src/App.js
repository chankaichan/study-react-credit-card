import React from 'react';
import Card from 'react-credit-cards';
import { Button, Form, Grid, Segment } from 'semantic-ui-react'
import './App.css';
import 'react-credit-cards/lib/styles.scss';

function PaymentCard(props) {
  return (
    <Card
      cvc={props.cvc}
      expiry={props.expiry}
      focused={props.focused}
      name={props.name}
      number={props.number}
    />
  );
}

function PaymentForm(props) {
  return (
    <Form size='large'>
      <Segment id='FormSegment' Piled textAlign='left'>
        <b>Card Number</b>
        <Form.Input fliud type="number" name="number" onChange={props.onChange} onFocus={props.onFocus} />
        <b>Card Name</b>
        <Form.Input fluid type="text" name="name" onChange={props.onChange} onFocus={props.onFocus} />
        <Grid style={{ height: '20px' }}>
          <Grid.Column width={10}>
            <b>Expiration Date</b>
          </Grid.Column>
          <Grid.Column floated='right' width={5}>
            <b>CVC</b>
          </Grid.Column>
        </Grid>
        <Grid style={{ height: '100px' }}>
          <Grid.Column width={5}>
            <Form.Input fluid type="number" name="month" placeholder="Month" onChange={props.onChange} onFocus={props.onFocus} />
          </Grid.Column>
          <Grid.Column width={5}>
            <Form.Input fluid type="number" name="year" placeholder="Year" onChange={props.onChange} onFocus={props.onFocus} />
          </Grid.Column>
          <Grid.Column floated='right' width={5}>
            <Form.Input fluid type="number" name="cvc" onChange={props.onChange} onFocus={props.onFocus} />
          </Grid.Column>
        </Grid>
        <Button color='teal' fluid size='large'>
          Submit
        </Button>
      </Segment>
    </Form>
  );
}

class PaymentApplication extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cvc: '',
      expiry: '',
      focused: '',
      name: '',
      number: '',
      year: '',
      month: '',
    };
	}
 
  handleInputFocus = (e) => {
    this.setState({ focused: e.target.name });
  }

  handleInputChange = (e) => {
    const { name, value } = e.target; 
    this.setState({ [name]: value });
    if (name === 'year') {
      this.setState({ expiry: this.state.month + '/' + value });
    } else if (name === 'month') {
      this.setState({ expiry: value + '/' + this.state.year });
    }
  }
  
  render() {
    return (
      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <div id="PaymentApplication">
            <div id="PaymentCard">  
              <PaymentCard 
                cvc={this.state.cvc}
                expiry={this.state.expiry}
                focused={this.state.focused}
                name={this.state.name}
                number={this.state.number}
              />
            </div>
            <div id="PaymentForm">
              <PaymentForm
                onChange={this.handleInputChange}
                onFocus={this.handleInputFocus}
              />
            </div>
          </div>
        </Grid.Column>
      </Grid> 
	  );
  }
}

export default PaymentApplication

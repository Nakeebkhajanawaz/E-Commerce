import React from "react";
import PaypalExpressBtn from "react-paypal-express-checkout";

export default class MyApp extends React.Component {
  render() {
    const onSuccess = payment => {
      this.props.clearCart();
      this.props.history.push("/");
      console.log("The payment was succeeded!", payment);
    };

    const onCancel = data => {
      // User pressed "cancel" or close Paypal's popup!
      console.log("The payment was cancelled!", data);
      // You can bind the "data" object's value to your state or props or whatever here, please see below for sample returned data
    };

    const onError = err => {
      // The main Paypal's script cannot be loaded or somethings block the loading of that script!
      console.log("Error!", err);
      
    };

    let env = "sandbox"; // you can set here to 'production' for production
    let currency = "USD"; // or you can set this value from your props or state
    let totals = 1; // same as above, this is the total amount (based on currency) to be paid by using Paypal express checkout
    
    const client = {
      sandbox: process.env.REACT_APP_APP_ID,
      production: "YOUR-PRODUCTION-APP-ID"
    };
    
    return (
      <PaypalExpressBtn
        env={env}
        client={client}
        currency={currency}
        total={this.props.totals}
        onError={onError}
        onSuccess={onSuccess}
        onCancel={onCancel}
      />
    );
  }
}

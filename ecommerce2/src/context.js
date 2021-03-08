import React, { Component } from 'react'
import {storeProducts, detailProduct} from './data'
import { runInThisContext } from 'vm';

const ProductContext = React.createContext();


//now export the ProductProvider to the index.js file
class ProductProvider extends Component {
  state = {
      products: [],
      detailProduct: detailProduct,
      cart: [],
      modalOpen: false,
      modalProduct: detailProduct,
      cartSubTotal: 0,
      cartTax: 0,
      cartTotal: 0
  }

  componentDidMount(){
    this.setProducts();
  }

  setProducts = () => {
    let tempProducts = [];
    storeProducts.forEach(item=> {
      const singleItem = {...item};
      tempProducts = [...tempProducts, singleItem];
    })
    this.setState(()=> {
      return {products: tempProducts};
    })
  }
    /*now we the the getitem funtion grab the data from the the product 
    with the help od id*/
  getItem = (id) => {
    const product = this.state.products.find(item=>  item.id == id);
    return product;
  }

  handleDetail = (id) => {
    const product = this.getItem(id);
    this.setState(
      ()=>{
        return {detailProduct: product};
      }
    )
  }
  //add the product to the cart by using the getitem functiom 
  addToCart = (id) => {
     let tempProducts = [...this.state.products];
     const product = this.getItem(id);
     const index = tempProducts.indexOf(product);
     product.inCart = true;
     product.count = 1;
     const price = product.price;
     product.total = price;

     this.setState(()=>{
       return {products:tempProducts, cart:[...this.state.cart, product]}
     },
     ()=>{
       this.addTotals();
     })
  }

  openModal = (id) => {
    const product = this.getItem(id);
    this.setState(()=>{
      return {modalProduct: product, modalOpen:true};
    })
  }

  closeModal = () => {
      this.setState(()=>{
          return {modalOpen: false};
      })
  }
  //increment function is used to no of products add to the cart
  increment = (id) => {
    let tempCart = [...this.state.cart];
    const selectedProduct = tempCart.find(item=>item.id === id);

    const index = tempCart.indexOf(selectedProduct);
    const product = tempCart[index];

    product.count = product.count + 1;
    product.total = product.count * product.price;
    
    this.setState(
      ()=> {
        return {cart: [...tempCart]};
      },
      ()=> {
        this.addTotals();
      }
    );
  }
   //decrement function is used to decrease  products from  the cart
  decrement = (id) => {
    let tempCart = [...this.state.cart];
    const selectedProduct = tempCart.find(item=>item.id === id);

    const index = tempCart.indexOf(selectedProduct);
    const product = tempCart[index];
    product.count = product.count -1;

    if(product.count === 0){
      this.removeItem(id);
    }else {
      product.total = product.count * product.price;
      this.setState(
        ()=>{
          return {cart: [...tempCart]};
        },
        ()=>{
          this.addTotals();
        }
      )
    }
  }
   //decrement function is used to remove  products from  the cart
  removeItem = (id) => {
    let tempProducts = [...this.state.products];
    let tempCart = [...this.state.cart];

    tempCart = tempCart.filter(item=>item.id!==id);

    const index = tempProducts.indexOf(this.getItem(id));
    let removedProduct = tempProducts[index];
    removedProduct.inCart = false;
    removedProduct.count = 0;
    removedProduct.total = 0;

    this.setState(()=>{
      return {
        cart: [...tempCart],
        products: [...tempProducts]
      }
    }, ()=>{
      this.addTotals();
    })
  }

  clearCart = () => {
    this.setState(()=>{
      return {cart:[]};
    }, ()=>{
      this.setProducts();
      this.addTotals(); 
    })
  }

  addTotals = () => {
      let subTotal = 0;
      this.state.cart.map(item => (subTotal += item.total));
      const tempTax= subTotal * 0.1;
      const tax = parseFloat(tempTax.toFixed(2));
      const total = subTotal + tax;
      this.setState(()=>{
        return {
          cartSubTotal: subTotal,
          cartTax: tax,
          cartTotal: total
        }
      })
  }

      //here we can creat a varable to provide the data
  render() {
    return (
      <ProductContext.Provider value={
          {
              ...this.state, 
              handleDetail: this.handleDetail,
              addToCart: this.addToCart,
              openModal: this.openModal,
              closeModal: this.closeModal,
              increment: this.increment,
              decrement: this.decrement,
              removeItem: this.removeItem,
              clearCart: this.clearCart
          }
      }>
          {this.props.children}
      </ProductContext.Provider>
    );
  }
}

const ProductConsumer = ProductContext.Consumer;

export {ProductProvider, ProductConsumer};
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container} from "react-bootstrap";

import Header from './components/Header'
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import RegisterScreen from "./screens/RegisterScreen";
// import LoginScreen from "./screens/LoginScreen";

const App = () => {
  return (
    <Router>
      <Header/>
     <main className="py-5" >
     <Container>
        <Route path="/" exact={true} component={HomeScreen} />
        <Route path="/products/:id" exact={true} component={ProductScreen} />
        <Route path="/cart/:id/:qty?" exact={true} component={CartScreen} />
        <Route path="/register" exact={true} component={RegisterScreen} />
        {/* <Route path="/login" exact={true} component={LoginScreen} /> */}
      </Container>
     </main>
      <footer className="container text-center">
        <p>Copyright &copy; 2020</p>
      </footer>
    </Router>
  );
};

export default App;

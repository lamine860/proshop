import React from 'react';
import {BrowserRouter as  Router, Route} from 'react-router-dom'
import {Navbar, Container} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'


import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'

const App = () => {
    return (

    <Router>
        <Navbar bg="light">
            <LinkContainer to="/">
                <Navbar.Brand>Proshop</Navbar.Brand>
            </LinkContainer>   
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
        </Navbar.Collapse>
        </Navbar>
        <Container>
            <Route path="/" exact={true} component={HomeScreen} />
            <Route path="/products/:id" exact={true} component={ProductScreen} />
            <Route path="/cart/:id/:qty?" exact={true} component={CartScreen} />
        </Container>
        <footer className="container text-center">
            <p>Copyright &copy; 2020</p>
        </footer>
    </Router>

     );
}
 
export default App;
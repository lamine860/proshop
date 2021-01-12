import React from 'react';
import {BrowserRouter as  Router, Route} from 'react-router-dom'
import {Navbar, Container} from 'react-bootstrap'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'

const App = () => {
    return (

    <Router>
        <Navbar bg="light">
            <Navbar.Brand href="/">Proshop</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
        </Navbar.Collapse>
        </Navbar>
        <Container>
            <Route path="/" exact={true} component={HomeScreen} />
            <Route path="/products/:id" exact={true} component={ProductScreen} />
        </Container>
        <footer className="container text-center">
            <p>Copyright &copy; 2020</p>
        </footer>
    </Router>

     );
}
 
export default App;
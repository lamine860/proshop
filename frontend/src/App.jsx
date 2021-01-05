import React from 'react';
import {BrowserRouter as  Router, Route, Link, Switch} from 'react-router-dom'
import {Container} from 'react-bootstrap'
import HomeScreen from './screens/HomeScreen'
import DetailScreen from './screens/DetailScreen'

const App = () => {
    return (

    <Router>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <Link className="navbar-brand" to="/">Proshop</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarColor01">
            </div>
        </nav>
        <Container>
            <Switch>
                <Route path="/" component={HomeScreen} />
                <Route path="/products/:id" component={DetailScreen} />
            </Switch>
        </Container>
        <footer className="container text-center">
            <p>Copyright &copy; 2020</p>
        </footer>
    </Router>

     );
}
 
export default App;
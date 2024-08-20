import Categories from './Categories/CategoryIndex';
import Products from './Products/ProductIndex';
import Dashboard from './Dashboard/Dashboard';
import Home from './Home/Home';
import Transactions from './Transactions/Transactions';
import NavigationBar from './Navbar/Navbar';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

const App = () => {
    return (
        <Router>
            <div className="app-container">
                <div className="navbar-container">
                    <NavigationBar />
                </div>
                <div className="content-container">
                    <Switch>
                        {/* Default route */}
                        <Route exact path="/">
                            <Redirect to="/home" />
                        </Route>

                        {/* homePage */}
                        <Route path="/home">
                            <Home />
                        </Route>

                        {/* categoriesPage */}
                        <Route path="/categories">
                            <Categories />
                        </Route>

                        {/* productsPage */}
                        <Route path="/products">
                            <Products />
                        </Route>

                        {/* dashboardPage */}
                        <Route path="/dashboard">
                            <Dashboard />
                        </Route>

                        {/* transactionsPage */}
                        <Route path="/transactions">
                            <Transactions />
                        </Route>
                        
                    </Switch>
                </div>
            </div>
        </Router>
    );
}

export default App;

import React, { Component } from 'react';
import HeaderContainer from './containers/HeaderContainer.jsx';
import RouteListContainer from './containers/RouteListContainer.jsx';
import { Route, NavLink, HashRouter } from "react-router-dom";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import { white } from 'material-ui/styles/colors';
import RouteContainer from './containers/RouteContainer.jsx';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            routes: [],
            currentRoute: {},
        }
        this.setCurrentRoute = this.setCurrentRoute.bind(this);
        this.routeItemClicked = this.routeItemClicked.bind(this);
    }
    componentDidMount() {
        this.loadRoutes();
    }

    loadRoutes() {
        fetch('/routeList', {
            method: 'GET'
        })
            .then(res => res.json())
            .then(function (routes) {
                this.setState({ routes })//indevidualRoute should be all routes, using it this way for testing purposes;
                // loadRoute(routes[0].routeName)
            }.bind(this))
            .catch(error => console.error('Error:', error))
    }

    // loadRoute(routeName) {
    //     fetch('/currentRoute', {
    //         method: 'POST'
    //     })
    //         .then(res => res.json())
    //         .then(function (route) {
    //             this.setState({ currentRoute: route })//indevidualRoute should be all routes, using it this way for testing purposes;
    //         }.bind(this))
    //         .catch(error => console.error('Error:', error))
    // }

    setCurrentRoute(id) {
        this.state.currentRoute = this.state.routes[id];
        this.setState({ currentRoute: routes[id] })
    }

    routeItemClicked(id) {
        // this.state.currentRoute = this.state.routes[id];
        console.log(this.state.currentRoute)
        const labelName = this.state.routes[id].requestMethod + ' ' + this.state.routes[id].requestUrl;
        let newState = this.state;
        newState.currentRoute.id = labelName
        this.setState({ newState })

        console.log('route id: ' + id);
    }
    render() {
        return (
            <div>
                <MuiThemeProvider>
                    <HeaderContainer />
                    <RouteListContainer routes={this.state.routes} routeItemClicked={this.routeItemClicked} />
                    <RouteContainer currentRoute={this.state.currentRoute} />
                </MuiThemeProvider>
            </div>
        )
    }
}
const graphStyle = {
    height: 100,
    width: 100,
    margin: 20,
    textAlign: 'center',
    display: 'inline-block',
    backgroundColor: 'white'
};

export default App;
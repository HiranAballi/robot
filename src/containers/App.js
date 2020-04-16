import React, { Component } from 'react';
import Cardlist from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import './App.css';
import {connect} from 'react-redux';
import {setSearchField, requestRobots} from '../actions';

const mapStateToProps = state => {
    return {
        searchField: state.searchRobots.searchField,
        robots: state.requestRobots.robots,
        isPending: state.requestRobots.isPending,
        error: state.requestRobots.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
        onRequestRobots: () => dispatch(requestRobots())
    }
}

class App extends Component {

    componentDidMount(){
        console.log("Aqui!");
        this.props.onRequestRobots();
    }

    render() {
        const {searchField, onSearchChange, robots, isPending} = this.props;
        const filteredRobots = robots.filter(robot => {
            return robot.name.toLowerCase().includes(searchField.toLowerCase());
        })

        return isPending ? <h1>Loading</h1> : (
            <div className='tc'>
                <h1 className='f2'>RoboFriends</h1>
                <SearchBox searchChange = {onSearchChange}/>
                <Scroll>
                    <Cardlist robots = {filteredRobots}/>
                </Scroll>
            </div>
        );
    }
}

/*const App2 = (props) => {
    return isPending ? <h1>Loading</h1> : (
        <div className='tc'>
            <h1 className='f2'>RoboFriends</h1>
            <SearchBox searchChange = {onSearchChange}/>
            <Scroll>
                <Cardlist robots = {filteredRobots}/>
            </Scroll>
        </div>
    );
};*/

export default connect(mapStateToProps, mapDispatchToProps)(App);
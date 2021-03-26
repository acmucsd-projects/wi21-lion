import React from 'react'
import { Link } from 'react-router-dom';
import './LandingPage.css'
import { ReactComponent as HomeSVG } from './res/home.svg';

const LandingPage = () => {
    //TODO: change to a json file 
    return (
        <div className="landing-container">
            <h2>UCSD</h2>
            <h1>Wiki</h1>
            <div className="landing-icon-container">
                <HomeSVG className="landing-svg" />
                <Link exact to="/orgs/ACM" style={{ position: 'absolute', top: '0%', right: '60%' }}>ACM</Link>
                <Link exact to="/orgs/WIC" style={{ position: 'absolute', top: '20%', right: '70%' }}>WIC</Link>
                <Link exact to="/orgs/TritonUAS" style={{ position: 'absolute', top: '40%', right: '72%' }}>TritonUAS</Link>
                <Link style={{ position: 'absolute', top: '60%', right: '70%' }}>SEDS</Link>
                <Link style={{ position: 'absolute', top: '80%', right: '60%' }}>CS foreach</Link>
                <Link exact to="/courses/CSE/CSE11" style={{ position: 'absolute', top: '0%', left: '60%' }}>CSE 11</Link>
                <Link exact to="/courses/CSE/CSE12" style={{ position: 'absolute', top: '20%', left: '70%' }}>CSE 12</Link>
                <Link style={{ position: 'absolute', top: '40%', left: '72%' }}>Math 20A</Link>
                <Link style={{ position: 'absolute', top: '60%', left: '70%' }}>ECE 45</Link>
                <Link style={{ position: 'absolute', top: '80%', left: '60%' }}>BILD 3</Link>
            </div>
        </div>
    )
}

export default LandingPage;
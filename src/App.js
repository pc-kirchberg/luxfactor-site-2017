import { h, Component } from 'preact';
import chevron from './img/icons/chevron-down.svg';
import ApplyForm from './components/ApplyForm';
import ContentRow from './components/ContentRow';
import Notifications from './components/Notifications';
import './App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <div className="masthead">
                    <h1>LUXFACTOR 2017</h1>
                    <h2>31.03.2017 19:00-22:00 Salle des Fêtes</h2>
                </div>
                <Notifications small/>
                <div class="scroll-indicator">
                    <img src={chevron}/>
                    Scroll Down For More
                </div>
                <div className="main-content">
                    <ContentRow fill>
                        For the fifth year in a row, the yearly talent show LUXFACTOR will take place in the European
                        School Luxembourg 1 Kirchberg! Students are welcome to participate either as performers, showing
                        the school their talents, or spectators, voting on the best talent. At the end of the show, the
                        performer with the most votes will win a prize.
                    </ContentRow>
                    <ContentRow bg="alt">
                        <strong>Prizes:</strong>
                        <ul>
                            <li>First place: 300€ Amazon gift card</li>
                            <li>Second place: 150€ Amazon gift card</li>
                            <li>Third place: 50€ Amazon gift card</li>
                        </ul>
                    </ContentRow>
                    <ContentRow fill>
                        If you wish to participate as a contestant, please click the button below to open the
                        application
                        form. You may be asked to log in with your school Office 365 account.
                        <ApplyForm />
                    </ContentRow>
                    <ContentRow bg="alt2">
                        We'll announce details of ticket sales soon. Keep watching this website for details!
                    </ContentRow>
                    <ContentRow fill>
                        <Notifications />
                    </ContentRow>
                    <ContentRow footer>
                        <small>Copyright 2017 &copy; Pupils' Committee ESL 1. All rights reserved.
                            Photos by Frederic Payet.
                        </small>
                    </ContentRow>
                </div>
            </div>
        );
    }
}

export default App;

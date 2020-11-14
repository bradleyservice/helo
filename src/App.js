import './App.css';
import Nav from './components/Nav/Nav';
import routes from './routes';
import {withRouter} from 'react-router';

function App(props) {
  return (
    <div className="App">
      { props.location.pathname === '/' ? null : <Nav /> }
      {routes}
    </div>
  );
}

export default withRouter(App);

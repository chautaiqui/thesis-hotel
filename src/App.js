import CurrentUser from './components/currentuser';
import RouterContainer from './pkg/router';
import './App.css';
function App() {
  return (  
    <CurrentUser >
      <RouterContainer />
    </CurrentUser>
  );
}

export default App;

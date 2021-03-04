import Home from './Components/Home/home'
import Addbook from './Components/AddBook/Addbook'
import IssueBooks from './Components/IssuedBooks/IssueBooks'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <div className='App'>
      <Router>
        <div className='App'>
          <Route path='/' component={Home} exact />
          <Route path='/addbook' component={Addbook} exact />
          <Route path='/issuebook' component={IssueBooks} exact />
        </div>
      </Router>
    </div>
  )
}

export default App

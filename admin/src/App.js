import React from 'react'
import Sidebar from './components/Sidebar'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import AddBooks from './components/AddBooks'
import ListBooks from './components/ListBooks'
import ListUsers from './components/ListUsers.js'

function App() {
  return (
    <Router>
      <div className='wrapper'>
        <Sidebar />

        <Switch>
          <Route exact path='/AddBooks' component={AddBooks}></Route>
          <Route exact path='/ListBooks' component={ListBooks}></Route>
          <Route exact path='/ListUsers' component={ListUsers}></Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App

import React from 'react'
import { Admin, Resource } from 'react-admin'
import restProvider from 'ra-data-simple-rest'
import BookList from './components/BookList'
import BookCreate from './components/BookCreate'
import BookEdit from './components/BookEdit'
import UserList from './components/UserList'

function App() {
  return (
    <Admin dataProvider={restProvider('http://localhost:3000')}>
      <Resource
        name='books'
        list={BookList}
        create={BookCreate}
        edit={BookEdit}
      />

      <Resource name='users' list={UserList} />
    </Admin>
  )
}

export default App

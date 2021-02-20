import React from 'react'
import {
  List,
  TextField,
  Datagrid,
  DataField,
  EditButton,
  DeleteButton,
} from 'react-admin'

const Booklist = (props) => {
  return (
    <List {...props}>
      <Datagrid>
        <TextField source='id' />
        <TextField source='title' />
        <TextField source='author' />
        <EditButton basePath='/books' />
        <DeleteButton basePath='/books' />
      </Datagrid>
    </List>
  )
}

export default Booklist

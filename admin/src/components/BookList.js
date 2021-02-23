import { List } from '@material-ui/core'
import React from 'react'
import {
  List,
  Datagrid,
  TextField,
  ImageField,
  EditButton,
  DeleteButton,
} from 'react-admin'

const BookList = (props) => {
  return (
    <List {...props}>
      <Datagrid>
        <TextField source='id' />
        <TextField source='title' />
        <TextField source='author' />
        <ImageField source='avatar' />
        <TextField source='ISBN' />
        <EditButton basePath='/books' />
        <DeleteButton basePath='/books' />
      </Datagrid>
    </List>
  )
}

export default BookList

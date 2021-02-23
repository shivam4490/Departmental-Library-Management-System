import React from 'react'
import { Edit, SimpleForm, TextInput, ImageInput } from 'react-admin'

const BookEdit = (props) => {
  return (
    <Edit title='Edit book details' {...props}>
      <SimpleForm>
        <TextInput disabled source='id' />
        <TextInput source='title' />
        <TextInput source='author' />
        <ImageInput source='avatar'>
          <ImageField source='avatar' />
        </ImageInput>
        <TextInput source='ISBN' />
      </SimpleForm>
    </Edit>
  )
}

export default BookEdit

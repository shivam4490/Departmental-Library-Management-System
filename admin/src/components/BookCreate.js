import React from 'react'
import {
  Create,
  ImageField,
  SimpleForm,
  TextInput,
  ImageInput,
} from 'react-admin'

const BookCreate = (props) => {
  return (
    <Create title='Add a book ' {...props}>
      <SimpleForm>
        <TextInput source='title' />
        <TextInput source='author' />
        <ImageInput source='avatar'>
          <ImageField source='avatar' />
        </ImageInput>
        <TextInput source='ISBN' />
      </SimpleForm>
    </Create>
  )
}

export default BookCreate

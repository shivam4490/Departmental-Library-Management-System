import React from 'react'

const sidebar = () => {
  return (
    <div id='sidebar-wrapper'>
      <ul className='sidebar-nav'>
        <li className='sidebar-brand'>
          <a href='#'>Admin</a>
        </li>
        <li>
          <a href='#'>Dashboard</a>
        </li>
        <li>
          <a href='#'>addBooks</a>
        </li>
        <li>
          <a href='#'>ListBooks</a>
        </li>
        <li>
          <a href='#'>ListUsers</a>
        </li>
      </ul>
    </div>
  )
}

export default sidebar

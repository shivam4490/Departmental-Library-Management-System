import React, { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap'

const Pagination = ({ showPerPage, onPaginationChange, total }) => {
  const [counter, setCounter] = useState(1)

  const [numberOfButtons, setNumberOfButtons] = useState(
    Math.ceil(total / showPerPage)
  )

  useEffect(() => {
    const value = showPerPage * counter
    onPaginationChange(value - showPerPage, value)
  }, [counter])

  const onButtonClick = (type) => {
    if (type === 'previous') {
      if (counter == 1) {
        setCounter(1)
      } else {
        setCounter(counter - 1)
      }
    } else if (type === 'next') {
      if (numberOfButtons === counter) {
        setCounter(counter)
      } else {
        setCounter(counter + 1)
      }
    }
  }
  return (
    <div>
      <nav aria-label='Page navigation example'>
        <ul class='pagination justify-content-center'>
          <li class='page-item'>
            <a
              class='page-link'
              href='#'
              onClick={() => onButtonClick('previous')}
            >
              Previous
            </a>
          </li>

          {new Array(numberOfButtons).fill('').map((element, index) => (
            <li class={`page-item ${index + 1 === counter ? 'active' : null}`}>
              <a
                class='page-link'
                href='#'
                onClick={() => setCounter(index + 1)}
              >
                {index + 1}
              </a>
            </li>
          ))}

          <li class='page-item'>
            <a class='page-link' href='#' onClick={() => onButtonClick('next')}>
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Pagination

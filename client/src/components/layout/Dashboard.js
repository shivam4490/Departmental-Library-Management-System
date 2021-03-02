import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { logoutUser } from '../../actions/authActions'
import { Card, Button } from 'react-bootstrap'

class Dashboard extends Component {
  onLogout = (e) => {
    e.preventDefault()
    this.props.logoutUser()
  }

  render() {
    const { user } = this.props.auth
    return (
      <div className='container text-center mt-15'>
        <div className='row'>
          <div className='col-sm-12'>
            <Card style={{ width: '18rem' }}>
              {/* <Card.Img variant='top' src='../../assets/image/book1.jpg' /> */}
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </Card.Text>
                <Button variant='primary'>Go somewhere</Button>
              </Card.Body>
            </Card>
            <button
              onClick={this.onLogout}
              className='btn btn-large btn-light hoverable font-weight-bold'
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    )
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

export default connect(mapStateToProps, { logoutUser })(Dashboard)

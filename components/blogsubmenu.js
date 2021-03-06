import { Nav, NavDropdown, Navbar } from 'react-bootstrap'
import React, { Component } from 'react'
import Link from 'next/link'

class CategoryNavBar extends Component {
  constructor (props) {
    super(props)
    var active_map = {
      montage: 'link',
      scitech: 'link',
      alumspace: 'link',
      openpage: 'link',
      internview: 'link',
      recent: 'link',
      'campus-pulse': 'link'
    }
    this.state = {
      category: props.category,
      active_map: active_map
    }

    active_map[props.category] = 'active-link'
  }

  render () {
    return (
      <Navbar className='navbar mb-3' expand='lg'>

        <Navbar.Toggle aria-controls='basic-navbar-nav' />

        <Navbar.Collapse id='basic-navbar-nav'>

          <Nav className='mx-auto'>

            <a className={this.state.active_map.recent} href='/blogs/recent' aria_label='Recent'> Recent </a>
            <a className={this.state.active_map.openpage} href='/blogs/openpage' aria_label='Open Page'> Open Page </a>
            <a className={this.state.active_map['campus-pulse']} href='/blogs/campus-pulse' aria_label='Campus Pulse'> Campus Pulse </a>
            <a className={this.state.active_map.montage} href='/blogs/montage' aria_label='Montage'> Montage </a>
            <a className={this.state.active_map.scitech} href='/blogs/scitech' aria_label='Scitech'> SciTech </a>
            <a className={this.state.active_map.alumspace} href='/blogs/alumspace' aria_label='Alumspace'> AlumSpace </a>
            <a className={this.state.active_map.internview} href='/blogs/internview' aria_label='Internview'> InternView </a>

          </Nav>
        </Navbar.Collapse>

      </Navbar>
    )
  }
}

export default CategoryNavBar

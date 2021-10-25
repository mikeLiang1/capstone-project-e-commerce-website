import React from 'react';
import {
  Nav,
  Navbar,
  Container,
  Image,
  Dropdown,
  NavDropdown,
  Col,
  Row,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './CustomDropdown.css';

function CustomDropdown() {
  return (
    <NavDropdown
      className='pr-2 align-text-top max-w-0'
      title='EXPLORE'
      id='nav-dropdown'
    >
      <Container className='eventsNav pt-0 mt-0'>
        <Row>
          <Col xs='12' md='6' className='text-left'>
            <Dropdown.Header>
              {'  '}
              Phones
            </Dropdown.Header>
            <Dropdown.Item>
              <Link to='/apple' className='NavigationBar-link'>
                <li>APPLE</li>
              </Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <Link to='/android' className='NavigationBar-link'>
                <li>ANDROID</li>
              </Link>
            </Dropdown.Item>

            <Dropdown.Divider />
            <Dropdown.Header>
              {'  '}
              PCs
            </Dropdown.Header>
            <Dropdown.Item>
              <Link to='/gpu' className='NavigationBar-link'>
                <li>GPU</li>
              </Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <Link to='/cpu' className='NavigationBar-link'>
                <li>CPU</li>
              </Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <Link to='/ram' className='NavigationBar-link'>
                <li>RAM</li>
              </Link>
            </Dropdown.Item>
            <Dropdown.Divider className='d-md-none' />
          </Col>

          <Col xs='12' md='6' className='text-left'>
            <Dropdown.Header>
              {'  '}
              Mice
            </Dropdown.Header>
            <Dropdown.Item>
              <Link to='/razer' className='NavigationBar-link'>
                <li>RAZER</li>
              </Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <Link to='/logitech' className='NavigationBar-link'>
                <li>LOGITECH</li>
              </Link>
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Header>
              {'  '}
              Keyboards
            </Dropdown.Header>
            <Dropdown.Item>
              <Link to='/redswitch' className='NavigationBar-link'>
                <li>RED SWITCH</li>
              </Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <Link to='/blueswitch' className='NavigationBar-link'>
                <li>BLUE SWITCH</li>
              </Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <Link to='/brownswitch' className='NavigationBar-link'>
                <li>BROWN SWITCH</li>
              </Link>
            </Dropdown.Item>
          </Col>
        </Row>
      </Container>
    </NavDropdown>
  );
}

export default CustomDropdown;

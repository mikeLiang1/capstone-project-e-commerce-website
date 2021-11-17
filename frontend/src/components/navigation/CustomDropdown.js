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
//eventsNav pt-0 mt-0
function CustomDropdown() {
  return (
    <NavDropdown
      className='pr-2 align-text-top max-w-0'
      title='EXPLORE'
      id='nav-dropdown'
    >
      <Container className='flexi'>
        <Row>
          <Col xs='12' md='6' className='text-left'>
            <Dropdown.Header>
              {'  '}
              Brand
            </Dropdown.Header>
            <Dropdown.Item>
              <Link to='/explore/apple' className='NavigationBar-link'>
                <li>APPLE</li>
              </Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <Link to='/explore/android' className='NavigationBar-link'>
                <li>ANDROID</li>
              </Link>
            </Dropdown.Item>

            <Dropdown.Divider />
            <Dropdown.Header>
              {'  '}
              PCs
            </Dropdown.Header>
            <Dropdown.Item>
              <Link to='/explore/gpu' className='NavigationBar-link'>
                <li>GPU</li>
              </Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <Link to='/explore/cpu' className='NavigationBar-link'>
                <li>CPU</li>
              </Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <Link to='/explore/ram' className='NavigationBar-link'>
                <li>RAM</li>
              </Link>
            </Dropdown.Item>
            <Dropdown.Divider className='d-md-none' />
          </Col>

          <Col xs='12' md='6' className='text-left'>
            <Dropdown.Header>
              {'  '}
              Gaming
            </Dropdown.Header>
            <Dropdown.Item>
              <Link to='/explore/razer' className='NavigationBar-link'>
                <li>RAZER</li>
              </Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <Link to='/explore/logitech' className='NavigationBar-link'>
                <li>LOGITECH</li>
              </Link>
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Header>
              {'  '}
              Keyboards
            </Dropdown.Header>
            <Dropdown.Item>
              <Link to='/explore/redswitch' className='NavigationBar-link'>
                <li>RED SWITCH</li>
              </Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <Link to='/explore/blueswitch' className='NavigationBar-link'>
                <li>BLUE SWITCH</li>
              </Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <Link to='/explore/brownswitch' className='NavigationBar-link'>
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

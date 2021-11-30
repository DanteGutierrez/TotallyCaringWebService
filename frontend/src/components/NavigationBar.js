import React from 'react';
import { Nav, Navbar, Form, FormControl } from 'react-bootstrap';
import './NavigationBar.css';

class NavigationBar extends React.Component {
    render() {
        return (
            <Navbar id="NavigationBar" className="container horizontal spaceBetween maxWidth">
                <Navbar.Brand href="/" className="item"><img src="./Eatd.png" alt="Logo"id="Logo"/></Navbar.Brand>
                <Form className="form-center container horizontal" onSubmit={this.props.onSubmit}>
                    <FormControl type="text" placeholder="Search Terms" name="term" className="item" />
                    <FormControl type="text" placeholder="Location" name="location" className="item" required={true}/>
                    <FormControl type="submit" value="Search!" className="item"/>
                </Form>
                <Navbar.Collapse id="basic-navbar-nav" className="container horiztonal spaceEvenly">
                    <Nav className="container horiztonal spaceEvenly">
                        <Nav.Item className="item"><Nav.Link href="/">Home</Nav.Link></Nav.Item>
                        <Nav.Item className="item"><Nav.Link href="/account">Account</Nav.Link></Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default NavigationBar;
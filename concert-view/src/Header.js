import { Menu, Search } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import React from 'react';

export default function Header(){
    return (
        <Menu>
            <Menu.Item as={Link} to="/">
                CONCERT VIEW
            </Menu.Item>
            <Menu.Menu position="right">
                <Menu.Item as={Link} to="/signin">
                    註冊/登入
                </Menu.Item>
            </Menu.Menu>
        </Menu>
    );
}
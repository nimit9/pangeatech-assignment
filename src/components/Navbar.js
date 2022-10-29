import React from "react";
import { Layout, Typography } from "antd";
import SearchOptions from "./SearchOptions";
const { Header } = Layout;
const { Title } = Typography;

const Navbar = () => {
    return (
        <Header className='header'>
            <h1 className='welcome-text'>Hello Jon Doe</h1>
            <SearchOptions />
        </Header>
    );
};

export default Navbar;

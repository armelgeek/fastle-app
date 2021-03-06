import { Button,Drawer } from 'antd';
import React, { Component } from 'react';
import LeftMenu from './LeftMenu'
import RightMenu from './RightMenu'
class Navbar extends Component {
  state = {
    current: 'mail',
    visible: false
  }
  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };
  onClose = () => {
    this.setState({
      visible: false,
    });
  };
  render() {
    return (
        <nav className="menuBar">
          <div className="logo">
            <a href="/">Fastle</a>
          </div>
          <div className="menuCon">
            <div className="leftMenu">
              <LeftMenu />
            </div>
            <div className="rightMenu">
                <RightMenu />
            </div>
         {/**    <Button className="barsMenu" type="primary" onClick={this.showDrawer}>
              <span className="barsBtn"></span>
            </Button>
          <Drawer
              title="Basic Drawer"
              placement="right"
              closable={false}
              onClose={this.onClose}
              visible={this.state.visible}
            >
              <LeftMenu />
            </Drawer>
        */}     
            </div>
        </nav>
    );
  }
}
export default Navbar;
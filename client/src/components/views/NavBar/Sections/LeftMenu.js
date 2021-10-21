import React from 'react'
import { Menu } from 'antd'
import { withRouter } from 'react-router-dom'
import { useSelector } from 'react-redux'
const SubMenu = Menu.SubMenu
const MenuItemGroup = Menu.ItemGroup

function LeftMenu(props) {
  const isAuthenticated = useSelector(state => state.user.userData && state.user.userData.isAuth)

  return isAuthenticated ? (
    <Menu mode={props.mode}>
      <Menu.Item key="mail">
        <a onClick={() => props.history.push('/')}>Home</a>
      </Menu.Item>
      <SubMenu title={<span>Feedbacks</span>}>
        <Menu.Item key="setting:1" onClick={() => props.history.push('/feedbacks')}>Feedbacks</Menu.Item>
        <Menu.Item key="setting:2" onClick={() => props.history.push('/feedbacks/new')}>Create a feedback</Menu.Item>
      </SubMenu>
    </Menu>
  ) : ''
}

export default withRouter(LeftMenu)
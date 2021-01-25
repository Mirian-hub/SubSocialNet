import React, { useContext } from 'react'
import { Button, Container, Menu } from 'semantic-ui-react'
import {observer} from 'mobx-react-lite'
import ActivityStore from '../../app/stores/activityStore'
import { NavLink } from 'react-router-dom'


const NavBar: React.FC = () => {
    const store =  useContext(ActivityStore);
    return (
        <Menu fixed='top' inverted>
            <Container >   
                <Menu.Item header as={NavLink} to ='/'>
                    <img src="assets/logo.png" alt="logo" />
                    Reactivities
                </Menu.Item>
                <Menu.Item name='Activity' as ={NavLink} to ='/activities'/>
                <Menu.Item as={NavLink} to='/creatActivity'> 
                    <Button positive onClick={()=> {store.setCreatMode(true)}}> Creat Actvity </Button>
                </Menu.Item>
            </Container>
        </Menu>
    )
}

export  default observer(NavBar)

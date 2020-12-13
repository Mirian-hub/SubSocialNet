import React, { useContext } from 'react'
import { Button, Container, Menu } from 'semantic-ui-react'
import {observer} from 'mobx-react-lite'
import ActivityStore from '../../app/stores/activityStore'


const NavBar: React.FC = () => {
    const store =  useContext(ActivityStore);
    return (
        <Menu fixed='top' inverted>
            <Container >   
                <Menu.Item header>
                    <img src="assets/logo.png" alt="logo" />
                    Reactivities
                </Menu.Item>
                <Menu.Item name='Activity'/>
                <Menu.Item> 
                <Button positive onClick={()=> {store.setCreatMode(true); store.selectedActivity=undefined}}> Creat Actvity </Button>
                </Menu.Item>
            </Container>
        </Menu>
    )
}

export  default observer(NavBar)

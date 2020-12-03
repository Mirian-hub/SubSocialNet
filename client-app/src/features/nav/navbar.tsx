import React from 'react'
import { Button, Container, Menu } from 'semantic-ui-react'

interface IProps {
    setCreateMode: (state: Boolean)=> void
};


export const NavBar: React.FC<IProps> = ({setCreateMode }) => {
    return (
        <Menu fixed='top' inverted>
            <Container >   
                <Menu.Item header>
                    <img src="assets/logo.png" alt="logo" />
                    Reactivities
                </Menu.Item>
                <Menu.Item name='Activity'/>
                <Menu.Item> 
                <Button positive onClick={()=> {setCreateMode(true)}}> Creat Actvity </Button>
                </Menu.Item>
            </Container>
        </Menu>
    )
}

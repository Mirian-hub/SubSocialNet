import React from 'react'
import { Button, ButtonGroup, Card, Icon, Image } from 'semantic-ui-react'
import { IActivity } from '../../../app/models/activity'

interface IProps  {
    selectedActivity: IActivity | null,
    setEditMode: (state: Boolean)=> void,
}

export const ActivityDetails: React.FC<IProps> = ({selectedActivity, setEditMode}) => {
    return (
        <Card fluid>
            <Image src= {`/assets/categoryImages/${selectedActivity?.category}.jpg`} wrapped ui={false} />
            <Card.Content>
                <Card.Header>{selectedActivity?.title}</Card.Header>
            <Card.Meta>
                 <span className='date'> {selectedActivity?.date} </span>
            </Card.Meta>
            <Card.Description>
                {selectedActivity?.description}
            </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <ButtonGroup widths={2}> 
                  <Button content="Edit" color='blue' basic onClick={()=> setEditMode(true)} />
                  <Button content="Cancel" color='brown' basic onClick={()=> setEditMode(false)}/>
              </ButtonGroup>
            </Card.Content>
        </Card>
    )
}

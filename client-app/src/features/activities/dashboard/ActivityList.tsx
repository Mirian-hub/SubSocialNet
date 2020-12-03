import React from 'react'
import { Button, Item, Label, Segment } from 'semantic-ui-react'
import { IActivity } from '../../../app/models/activity'

interface IProps {
  activities:IActivity[],
  selectActivityHandler: (id: string)=> void,
  deleteActivityhandler: (id: string)=> void
}


export const ActivityList: React.FC<IProps> = ({activities, selectActivityHandler, deleteActivityhandler}) => {
    const onViewClick = (activityId: any)=>{
          selectActivityHandler(activityId);
    }
    return (
        <Segment clearing>
            <Item.Group divided>
                {activities.map((activity)=> (
                <Item>
                    <Item.Content>
                        <Item.Header as='a'> {activity.title}  </Item.Header>
                        <Item.Meta> {activity.date} </Item.Meta>
                        <Item.Description> 
                            <div>{activity.description} </div>
                            <div>{activity.city} </div> 
                        </Item.Description>
                        <Item.Extra>
                        <Button floated='right' content='view' color='blue' onClick ={()=> onViewClick(activity.id)}/>
                        <Button floated='right' content='delete' color='red' onClick ={()=> deleteActivityhandler(activity.id)}/>
                        <Label basic content={activity.category} />
                        </Item.Extra>
                    </Item.Content>
                </Item>
                ))}         
            </Item.Group>
         </Segment>
    )
}

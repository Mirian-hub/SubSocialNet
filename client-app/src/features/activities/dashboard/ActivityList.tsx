import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import { Button, Item, Label, Segment } from 'semantic-ui-react'
import { IActivity } from '../../../app/models/activity'
import ActivityStore from '../../../app/stores/activityStore'


 const ActivityList: React.FC = () => {
       
   const store = useContext(ActivityStore);
   const {activitiesByDate, selectActivityHandler,deleteActivityhandler }= store

    return (
        <Segment clearing loading={store.loading}>
            <Item.Group divided>
                {activitiesByDate.map((activity)=> (
                <Item key={activity.id}>
                    <Item.Content>
                        <Item.Header as='a'> {activity.title}  </Item.Header>
                        <Item.Meta> {activity.date} </Item.Meta>
                        <Item.Description> 
                            <div>{activity.description} </div>
                            <div>{activity.city} </div> 
                        </Item.Description>
                        <Item.Extra>
                        <Button floated='right' content='view' color='blue' onClick = {()=> selectActivityHandler(activity.id)}  />
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

export default observer(ActivityList)
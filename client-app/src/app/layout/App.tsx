import React, { Component, Fragment, useEffect, useState } from 'react';
import './styles.css';
import axios from 'axios';
import { Container, Header, Icon, Image, List } from 'semantic-ui-react';
import { IActivity } from '../models/activity';
import { NavBar } from '../../features/nav/navbar';
import { ActivityDashboared } from '../../features/activities/dashboard/ActivityDashboared';

const App = () => {
  const [activities, setActivites] = useState<IActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(
    null
  );
  const [editMode, setEditMode] = useState<Boolean>(false);
  const [creatMode, setCreatmode] = useState<Boolean>(false);

  const selectActivityHandler = (id: string) => {
    let selectedActivy = activities.filter((a) => a.id === id)[0];
    setSelectedActivity(selectedActivy);
    setCreatmode(false);
  };

  const setEditModeHandler = (state: Boolean) => {
    setEditMode(state);
  };

  const setCreateModeHandler = (state: Boolean) => {
    setCreatmode(state);
  };

  const addActivityHandler = (activity: IActivity) => {
    setActivites([...activities, activity]);
    setSelectedActivity(activity);
  };

  const editActivityHandler = (activity: IActivity) => {
    setActivites([...activities.filter((a) => a.id !== activity.id), activity]);
    setSelectedActivity(activity);
  };

  const deleteActivityhandler = (id: string) => {
    setActivites(activities.filter(a=>a.id!== id))
  }

  useEffect(() => {
    axios
      .get<IActivity[]>('http://localhost:5000/api/activities')
      .then((response) => {
        let activities: IActivity[] = [];
        response.data.map((activity) => {
          activity.date = activity.date.split('.')[0];
          activities.push(activity);
        });
        setActivites(activities);
      });
  }, []);

  return (
    <Fragment>
      <NavBar setCreateMode={setCreateModeHandler} />
      <Container style={{ marginTop: '7em' }}>
        <ActivityDashboared
          activities={activities}
          selectActivityHandler={selectActivityHandler}
          selectedActivity={selectedActivity!}
          editMode={editMode}
          setEditMode={setEditModeHandler}
          creatMode={creatMode}
          setCreatMode={setCreateModeHandler}
          addActivityHandler={addActivityHandler}
          editActivityHandler={editActivityHandler}
          deleteActivityhandler={deleteActivityhandler}
        ></ActivityDashboared>
      </Container>
    </Fragment>
  );
};

export default App;

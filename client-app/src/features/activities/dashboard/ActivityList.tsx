import { observer } from 'mobx-react-lite';
import React, { Fragment, useContext, useEffect, useState } from 'react';

import { Button, Item, Label, Segment } from 'semantic-ui-react';
import { IActivity } from '../../../app/models/activity';
import ActivityStore from '../../../app/stores/activityStore';
import { AcitivityListItem } from './AcitivityListItem';

const ActivityList: React.FC = () => {
  const store = useContext(ActivityStore);
  const {
    activitiesByDate,
    selectActivityHandler,
    deleteActivityhandler,
  } = store;

  return (
    <Fragment>
      {activitiesByDate.map(([group, actiities]) => (
        <Fragment key={group}>
          <Label size="large" color="blue">
            {group}
          </Label>
          <Segment clearing loading={store.loading}>
            <Item.Group divided>
              {actiities.map((activity) => (
                <AcitivityListItem key={activity.id} activity={activity} />
              ))}
            </Item.Group>
          </Segment>
        </Fragment>
      ))}
    </Fragment>
  );
};

export default observer(ActivityList);

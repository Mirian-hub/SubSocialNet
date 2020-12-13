import { observable, action, makeObservable, computed, configure, runInAction } from 'mobx';
import { createContext } from 'react';
import Activities from '../api/agent';
import { IActivity } from '../models/activity';

configure({enforceActions: 'always'});


class ActivityStore {
  @observable activityRegistry = new Map();
  @observable activities: IActivity[] = [];
  @observable loading = false;
  @observable test = '';
  @observable selectedActivity: IActivity | undefined = undefined;
  @observable editMode: Boolean = false;
  @observable createMode: Boolean = false;
  @observable subbmiting = false;
  @observable deleting = false;

  @computed get activitiesByDate() {
    return Array.from(this.activityRegistry.values())
      .slice()
      .sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
  }

  @action getActivities = async () => {
    this.loading = true;
    await Activities.getList()
      .then((response) => {
          runInAction(()=> {
            response.forEach((activity) => {
                activity.date = activity.date.split('.')[0];
                this.activityRegistry.set(activity.id, activity);
              });
          })       
      } )
      .catch((error) => console.log(error))
      .finally(() => {
          runInAction(() => {
            this.loading = false;
          })
      });
  };

  @action setEditMode = (state: Boolean) => {
    this.editMode = state;
  };

  @action setCreatMode = (state: Boolean) => {
    this.createMode = state;
  };

  @action selectActivityHandler = (id: string) => {
    this.selectedActivity = this.activityRegistry.get(id);
    this.createMode = false;
  };
  @action deleteActivityhandler = (id: string) => {
    Activities.delete(id).then(() => {
      this.activityRegistry.delete(id);
      this.selectedActivity = undefined;
    });
  };

  @action addActivityHandler = (activity: IActivity) => {
    Activities.create(activity).then(() => {
      this.activityRegistry.set(activity.id, activity);
      this.selectedActivity = activity;
    });
  };

  @action editActivityHandler = (activity: IActivity) => {
    this.subbmiting = true;
    Activities.update(activity).then(() => {
      this.activityRegistry.set(activity.id, activity);
      this.selectedActivity = activity;
      this.subbmiting = false;
      this.createMode = false;
      this.editMode = false;
    });
  };

  constructor() {
    makeObservable(this);
  }
}

export default createContext(new ActivityStore());

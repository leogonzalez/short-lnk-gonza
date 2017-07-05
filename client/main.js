import { Meteor } from 'meteor/meteor';
import ReactDOM from 'react-dom';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';

import { routes, onAuthChange} from '../imports/routes/Routes.js';
import '../imports/startup/simple-schema-configuration.js';

Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId();
  onAuthChange(isAuthenticated);
});

//call tracker

// Stateless functional Component - (presentational component)

Meteor.startup(() => {
  Session.set('showVisible',true);
  ReactDOM.render(routes, document.getElementById('app'));
});

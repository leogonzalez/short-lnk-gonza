import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import shortid from 'shortid';

export const Links = new Mongo.Collection('links');

if (Meteor.isServer) {
  Meteor.publish('links', function () {
    // this.userId()
    return Links.find({userId: this.userId});
  });
}

// methods should be defined on client and server

//resource.action
//links.insert

Meteor.methods({
  'links.insert'(url){
  if (!this.userId) {
    throw new Meteor.Error('Not logged in');
  }

  new SimpleSchema({
    url:{
      type: String,
      regEx: SimpleSchema.RegEx.Url
    }
  }).validate({url});

  Links.insert({
    _id: shortid.generate(),
    url,
    userId: this.userId,
    visible: true,
    visitedCount:0,
    lastVisitedAt:null
  });

},
'links.setVisibility'(_id,visible){
  //check if logged in, throw an error if not
  if (!this.userId) {
    throw new Meteor.Error('Not logged in');
  }
  // new simple schema, _id is string len >1, visible is boolean
  new SimpleSchema({
    _id:{
      type: String,
      min:1
    },
    visible:{
      type: Boolean
    }
  }).validate({_id,visible});
  // links.update where _id is and this.userId
  Links.update({
    _id,
    userId: this.userId
  },{
    $set:{visible}
  });
  // set visible to true or false
},
'links.trackVisit'(_id){
  new SimpleSchema({
    _id:{
      type:String,
      min:1
    }
  }).validate({_id});

  Links.update({_id},{
    $set:{
      lastVisitedAt: new Date().getTime()
    },
    $inc:{
      visitedCount:1
    }
  });
}
});

//add numbers ()
// typeof === 'number'
// if one or both are not numbers, throw a new Error
//

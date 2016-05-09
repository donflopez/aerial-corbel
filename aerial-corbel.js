// Write your package code here!

// Variables exported by this module can be imported by other packages and
// applications. See aerial-composr-tests.js for an example of importing.
let CH = null,
    adminToken = null,
    path = Npm.require('path'),
    Future = Npm.require(path.join('fibers', 'future')),
    Fiber = Npm.require('fibers');

AerialRestDriver = function () {

  this.get = (coll, selector, options) => {
    let corbelDriver = this._getCorbelDriver();

    if (!corbelDriver || coll.name === 'users' || coll.name.indexOf('meteor') !== -1) {
      return;
    }

    _.each(CorbelHandler.get(corbelDriver, coll.name, { selector, options }), (doc) => {
      doc._id = doc.id;

      if (!coll.findOne(doc.id, {cpsr:true})) {
        coll.insert(doc);
      }
      else {
        let id = doc._id;
        delete doc._id;

        coll.update(id, doc);
      }
    });

    // TODO: transform here the selector for the composr query.
  };

  this.count = (coll, selector, options) => {
    let corbelDriver = this._getCorbelDriver();

    if (!corbelDriver || coll.name === 'users' || coll.name.indexOf('meteor') !== -1) {
      return;
    }

    return CorbelHandler.count(corbelDriver, coll.name, { selector, options });
  };

  this.distinct = (coll, selector, options, dist) => {
    let corbelDriver = this._getCorbelDriver();

    if (!corbelDriver || coll.name === 'users' || coll.name.indexOf('meteor') !== -1) {
      return;
    }

    return CorbelHandler.distinct(corbelDriver, coll.name, {selector, options}, dist);
  };

  this._getCorbelDriver = () => {
    let userId;

    Tracker.nonreactive(function () {
      userId = Meteor.userId();
    });

    if (!userId) {
      return;
    }

    let corbelDriver = Accounts.getCorbelDriver(userId);

    if (!corbelDriver) {
      console.log('No corbelDriver');
      throw new Meteor.Error(403, 'Authentication error');
    }

    return corbelDriver;
  };

  this.configured = true;

};

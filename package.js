Package.describe({
  name: 'bquarks:aerial-corbel',
  version: '0.0.1',

  // Brief, one-line summary of the package.
  summary: '',

  // URL to the Git repository containing the source code for this package.
  git: '',

  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md',
});

Package.onUse(function (api) {
  api.versionsFrom('1.3.1');
  api.use('ecmascript');
  api.addFiles('corbel-handler.js', ['server']);
  api.mainModule('aerial-corbel.js', ['server']);

  api.export('AerialRestDriver', ['server']);
});

Package.onTest(function (api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('aerial-corbel');
  api.mainModule('aerial-corbel-tests.js');
});

Npm.depends({
  'corbel-js': '0.4.0',
});
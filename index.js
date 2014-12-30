var shields = require('shields-lightweight');

module.exports = BadgeReporter;

function BadgeReporter(runner) {
  var passes = 0;
  var failures = 0;

  runner.on('start', function() {
  });

  runner.on('pass', function() {
    passes++;
  });

  runner.on('fail', function() {
    failures++;
  });

  runner.on('end', function() {
    
    var subject = process.env.JSHINT_BADGE_SUBJECT || 'tests';
    var okColor = process.env.JSHINT_BADGE_OK_COLOR || 'brightgreen';
    var koColor = process.env.JSHINT_BADGE_KO_COLOR || 'red';
    var style = process.env.JSHINT_BADGE_STYLE;

    var color = (failures > 0) ? koColor : okColor;
    var status = passes + '/' + (passes + failures);
    
    process.stdout.write(shields.svg(subject, status, color, style));
  });
}
import * as gulp from 'gulp';
import * as javascriptObfuscator from 'gulp-javascript-obfuscator';

gulp.task('build', () => {
  return gulp.src([
    'out/egg-example-confusion/app/*.js',
    'out/egg-example-confusion/app/*/*.js',
    'out/egg-example-confusion/config/*.js',
  ], {
    base: 'out/egg-example-confusion',
  })
    .pipe(javascriptObfuscator({
      compact: true,
      controlFlowFlattening: false,
      deadCodeInjection: false,
      debugProtection: false,
      debugProtectionInterval: false,
      disableConsoleOutput: true,
      identifierNamesGenerator: 'hexadecimal',
      rotateStringArray: true,
      selfDefending: true,
      shuffleStringArray: true,
      splitStrings: false,
      stringArray: true,
      stringArrayEncoding: false,
      stringArrayThreshold: 0.75,
      target: 'node',
    }))
    .pipe(gulp.dest('out/egg-example-confusion/'));
});

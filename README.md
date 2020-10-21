# 使用 Egg.js 打包混淆代码

## 开始

### 介绍编译参数

#### 根目录下 `gulpfile.ts`

``` javascript
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
      // 紧凑的代码输出一行。
      compact: true,
      // 此选项对性能的影响最大为运行速度降低1.5倍, 但加密效果更好
      controlFlowFlattening: false,
      // 戏剧性地增加了混淆代码的大小（最多200％），仅当混淆代码的大小无关紧要时才使用
      deadCodeInjection: false,
      // 是否禁用 debugger
      debugProtection: false,
      debugProtectionInterval: false,
      // 禁止使用使用console 下的函数如: log、info、error等
      disableConsoleOutput: true,
      // 设置标识符名称生成器。
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
```

- 常见问题见官方文档 [obfuscator](https://obfuscator.io/)

### 测试

``` bash
$ npm install
# run build 原理见Makefile文件里面的 build
$ npm run build
# 查看 egg-example-confusion/app 下的所有 js 文件都是混淆过的
$ cd out/egg-example-confusion && npm start
```

- 没有绝对的混淆代码插件，给时间下足功夫的人还是能反编译

### 要求

- Node.js 8.x
- Typescript 2.8+

module.exports = {
  root: true,
  extends: 'eslint:recommended',
  // plugins: ['eslint-plugin-prettier'],
  parserOptions: {
    // ECMAScript 版本
    ecmaVersion: 6,
    // module
    sourceType: 'module',
    // // impliedStric
    // impliedStrict: true,
    // 允许在全局作用域下使用 return 语句
    globalReturn: false,

    node: true
  },
  // add your custom rules here
  rules: {
    'space-before-function-paren': [
      'error',
      {anonymous: 'always', named: 'never', asyncArrow: 'always'}
    ],
    // 禁用未声明的变量，除非它们在 /*global */ 注释中被提到
    'no-undef': 0,
    indent: ['error', 2],
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    // 要求使用 isNaN() 检查 NaN
    'use-isnan': 2,
    // 禁止重复的 case 标签
    'no-duplicate-case': 2,
    // 禁止空语句块
    'no-empty': 2,
    // 禁止在正则表达式中使用空字符集 (/^abc[]/)
    'no-empty-character-class': 2,
    // 禁止对 catch 子句的参数重新赋值
    'no-ex-assign': 2,
    // 禁止不必要的布尔转换
    'no-extra-boolean-cast': 2,
    // 禁止不必要的括号 //(a * b) + c; //报错
    'no-extra-parens': 0,
    // 禁止不必要的分号
    'no-extra-semi': 2,
    // 强制 typeof 表达式与有效的字符串进行比较
    // typeof foo === "undefimed" 错误
    'valid-typeof': 2,
    // 定义对象的set存取器属性时，强制定义get
    'accessor-pairs': 2,
    // 强制使用有效的 JSDoc 注释
    'valid-jsdoc': 1,
    // switch 语句强制 default 分支，也可添加 // no default 注释取消此次警告
    'default-case': 2,
    // 禁止 if 语句中有 return 之后有 else
    'no-else-return': 0,
    // 禁用稀疏数组
    'no-sparse-arrays': 2,
    // 禁止在return、throw、continue 和 break语句之后出现不可达代码
    /*
      function foo() {
       return true;
       console.log("done");
      }//错误
    */
    // 禁用 console
    'no-console': 0,
    'no-unreachable': 2,
    // 禁止将 undefined 作为标识符
    'no-undefined': 0,
    // 禁止出现未使用过的变量
    'no-unused-vars': [2, {vars: 'all', args: 'none'}],
    // 禁止将变量初始化为 undefined
    'no-undef-init': 2,
    // 禁用 process.exit()
    'no-process-exit': 0,
    // 文件末尾强制换行
    'eol-last': 2,
    // 强制一行的最大长度
    'max-len': [1, 80],
    // 不允许空格和 tab 混合缩进
    'no-mixed-spaces-and-tabs': 2,
    // 不允许多个空行
    'no-multiple-empty-lines': [2, {max: 2}],
    // 禁止修改 const 声明的变量
    'no-const-assign': 2,
    // 强制模块内的 import 排序
    'sort-imports': 0,
    // 要求使用 let 或 const 而不是 var
    'no-var': 2,
    // 控制逗号前后的空格
    'comma-spacing': [2, {before: false, after: true}],
    // 要求构造函数首字母大写 （要求调用 new 操作符时有首字母大小的函数，允许调用首字母大写的函数时没有 new 操作符。）
    'new-cap': [2, {newIsCap: true, capIsNew: false}],
    // 禁止修改类声明的变量
    'no-class-assign': 2,
    // 禁止在没有类型检查操作符的情况下与 null 进行比较
    'no-eq-null': 1,
    // 禁用 eval()
    'no-eval': 2,
    // 禁止不必要的 .bind() 调用
    'no-extra-bind': 2,
    // 禁用魔术数字(3.14什么的用常量代替)
    'no-magic-numbers': [1, {ignore: [0, -1, 1]}],
    // 禁止在非赋值或条件语句中使用 new 操作符
    'no-new': 2,
    // 禁止对 Function 对象使用 new 操作符
    'no-new-func': 0,
    // 禁用 void 操作符
    'no-void': 0,
    // 要求回调函数中有容错处理
    'handle-callback-err': [2, '^(err|error)$'],
    // 要求 return 语句之前有一空行
    'newline-before-return': 0,
    // 要求方法链中每个调用都有一个换行符
    'newline-per-chained-call': 1
  }
};

// https://eslint.org/docs/user-guide/configuring

module.exports = {
    root: true,
    parserOptions: {
        parser: 'babel-eslint'
    },
    env: {
        browser: true,
    },

    // required to lint *.vue files
    plugins: [
        'vue'
    ],
    // add your custom rules here
    rules: {
        // allow async-await
        'generator-star-spacing': 'off',


        // indent
        'indent': ['error', 4, {"SwitchCase": 1}],

        // allow debugger during development
        'no-debugger':  'off',

        // spacing inside braces
        'object-curly-spacing': 'off'
    }
}

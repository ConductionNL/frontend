require('@babel/register');

module.exports = {
  root: true,
  parser: 'babel-eslint',

  settings: {
    react: { version: 'detect' },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.react.js'],
        moduleDirectory: ['node_modules', './src'],
      },
    },
  },
  extends: [
    'airbnb',
    'eslint:all',
    'plugin:react/all',
    'plugin:sonarjs/recommended',
    'plugin:testing-library/react',
    'plugin:unicorn/recommended',
    'prettier',
    'prettier/react',
  ],

  plugins: [
    'jsx-a11y',
    'prettier',
    'promise',
    'react',
    'react-hooks',
    'redux-saga',
    'sonarjs',
    'testing-library',
    'unicorn',
  ],
  env: {
    browser: true,
    es6: true,
    jest: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  globals: {
    jsdom: true,
    L: true,
  },
  overrides: [
    {
      files: ['**/*.test.js', 'src/test/utils.js'],
      rules: {
        'max-nested-callbacks': 'off',
        'no-undef': 'off',
        'require-await': 'off',
        'promise/catch-or-return': 'off', // Shall we prefer await?
        'promise/always-return': 'off',
        'promise/no-callback-in-promise': 'off',
        'no-magic-numbers': 'off',
        'no-constructor-return': 'off',
        'testing-library/prefer-find-by': 'off', // Needs some manual work
        'promise/avoid-new': 'off',
        'max-len': 'off',
      },
    },
    {
      files: ['internals/**/*'],
      rules: {
        'no-console': 'error',
      },
    },
  ],
  rules: {
    // proposed rules
    'new-cap': 'off',
    'func-names': 'off',
    'unicorn/prefer-set-has': 'off',
    'react/boolean-prop-naming': 'off',
    'require-atomic-updates': 'off',
    'no-negated-condition': 'off',
    'no-import-assign': 'off',
    'default-param-last': 'off',
    'sonarjs/no-collapsible-if': 'off',
    'id-length': 'off',
    'unicorn/no-abusive-eslint-disable': 'off',
    'unicorn/prefer-includes': 'off', // Has autofix but breaks test
    'unicorn/prefer-text-content': 'off', // Has autofix but breaks snapshots test
    'prefer-named-capture-group': 'off',
    'no-warning-comments': 'off',
    'unicorn/prefer-add-event-listener': 'off',
    'no-magic-numbers': 'off', // Except for tests
    'init-declarations': 'off',
    'sonarjs/no-duplicate-string': 'off',
    'require-unicode-regexp': 'off',
    'line-comment-position': 'off',
    'react/require-optimization': 'off',
    'sonarjs/no-small-switch': 'off',
    'no-implicit-coercion': 'off',
    'react/display-name': 'off',
    'unicorn/prevent-abbreviations': 'off',
    'unicorn/catch-error-name': 'off',
    'react/jsx-key': 'off',
    'sonarjs/no-identical-functions': 'off',
    'no-promise-executor-return': 'off',
    'prefer-regex-literals': 'off',
    'import/no-webpack-loader-syntax': 'off',
    'unicorn/no-zero-fractions': 'off', // Auto-fix available
    'max-len': 'off', // 'max-len': ['error', { code: 120, tabWidth: 2, ignoreUrls: true, comments: 140 }],
    'react/jsx-filename-extension': 'off', // This will allow to fine tune tooling like a shared lint configuration

    // rules
    'accessor-pairs': 'error',
    'array-bracket-spacing': ['error', 'never'],
    'array-callback-return': 'error',
    'arrow-body-style': ['error', 'as-needed'],
    'arrow-parens': ['error', 'as-needed'],
    'arrow-spacing': 'error',
    'block-scoped-var': 'error',
    'block-spacing': 'error',
    'comma-dangle': ['error', 'always-multiline'],
    'comma-spacing': 'error',
    'comma-style': 'error',
    'computed-property-spacing': ['error', 'never'],
    'consistent-return': 'error',
    'default-case': ['error', { commentPattern: '^no default$' }],
    'dot-location': ['error', 'property'],
    'dot-notation': 'error',
    'eol-last': 'error',
    'func-call-spacing': ['error', 'never'],
    'func-name-matching': 'error',
    'func-style': ['error', 'declaration', { allowArrowFunctions: true }],
    'generator-star-spacing': ['error', 'after'],
    'getter-return': 'error',
    'guard-for-in': 'error',
    'handle-callback-err': 'error',
    'import/extensions': 'error',
    'import/first': 'error',
    'import/no-amd': 'error',
    'jsx-a11y/alt-text': 'error',
    'jsx-a11y/anchor-has-content': 'error',
    'jsx-a11y/anchor-is-valid': ['error', { aspects: ['noHref', 'invalidHref'] }],
    'jsx-a11y/aria-activedescendant-has-tabindex': 'error',
    'jsx-a11y/aria-proptypes': 'error',
    'jsx-a11y/aria-role': ['error', { ignoreNonDOM: true }],
    'jsx-a11y/aria-unsupported-elements': 'error',
    'jsx-a11y/heading-has-content': 'error',
    'jsx-a11y/iframe-has-title': 'error',
    'jsx-a11y/img-redundant-alt': 'error',
    'jsx-a11y/no-access-key': 'error',
    'jsx-a11y/no-distracting-elements': 'error',
    'jsx-a11y/no-redundant-roles': 'error',
    'jsx-a11y/scope': 'error',
    'jsx-quotes': 'error',
    'key-spacing': ['error', { beforeColon: false }],
    'keyword-spacing': ['error', { before: true, after: true }],
    'lines-between-class-members': 'error',
    'max-depth': ['error', 5],
    'max-nested-callbacks': ['error', 4],
    'new-parens': 'error',
    'no-alert': 'error',
    'no-array-constructor': 'error',
    'no-await-in-loop': 'error',
    'no-buffer-constructor': 'error',
    'no-caller': 'error',
    'no-catch-shadow': 'error',
    'no-compare-neg-zero': 'error',
    'no-cond-assign': ['error', 'except-parens'],
    'no-const-assign': 'error',
    'no-constructor-return': 'error',
    'no-control-regex': 'error',
    'no-delete-var': 'error',
    'no-div-regex': 'error',
    'no-dupe-args': 'error',
    'no-dupe-class-members': 'error',
    'no-dupe-keys': 'error',
    'no-duplicate-case': 'error',
    'no-duplicate-imports': 'error',
    'no-else-return': 'error',
    'no-empty-character-class': 'error',
    'no-empty-pattern': 'error',
    'no-eq-null': 'error',
    'no-extra-semi': 'error',
    'no-eval': 'error',
    'no-ex-assign': 'error',
    'no-extend-native': 'error',
    'no-extra-bind': 'error',
    'no-extra-label': 'error',
    'no-extra-parens': 'error',
    'no-fallthrough': 'error',
    'no-floating-decimal': 'error',
    'no-func-assign': 'error',
    'no-implied-eval': 'error',
    'no-invalid-regexp': 'error',
    'no-iterator': 'error',
    'no-label-var': 'error',
    'no-labels': 'error',
    'no-lone-blocks': 'error',
    'no-loop-func': 'error',
    'no-mixed-operators': 'error',
    'no-mixed-requires': 'error',
    'no-multi-spaces': 'error',
    'no-multi-str': 'error',
    'no-multiple-empty-lines': 'error',
    'no-native-reassign': 'error',
    'no-negated-in-lhs': 'error',
    'no-nested-ternary': 'error',
    'no-new': 'error',
    'no-new-func': 'error',
    'no-new-object': 'error',
    'no-new-require': 'error',
    'no-new-symbol': 'error',
    'no-new-wrappers': 'error',
    'no-obj-calls': 'error',
    'no-octal': 'error',
    'no-octal-escape': 'error',
    'no-path-concat': 'error',
    'no-proto': 'error',
    'no-prototype-builtins': 'error',
    'no-regex-spaces': 'error',
    'no-restricted-modules': 'error',
    'no-restricted-properties': ['error', { object: 'require', property: 'ensure' }, { object: 'System', property: 'import' }],
    'no-return-await': 'error',
    'no-script-url': 'error',
    'no-self-assign': 'error',
    'no-self-compare': 'error',
    'no-sequences': 'error',
    'no-shadow': 'error',
    'no-shadow-restricted-names': 'error',
    'no-sparse-arrays': 'error',
    'no-tabs': 'error',
    'no-template-curly-in-string': 'error',
    'no-this-before-super': 'error',
    'no-throw-literal': 'error',
    'no-trailing-spaces': 'error',
    'no-undef': 'error',
    'no-undef-init': 'error',
    'no-unmodified-loop-condition': 'error',
    'no-unreachable': 'error',
    'no-unused-expressions': 'error',
    'no-unused-labels': 'error',
    'no-unused-vars': 'error',
    'no-useless-call': 'error',
    'no-useless-computed-key': 'error',
    'no-useless-concat': 'error',
    'no-useless-constructor': 'error',
    'no-useless-escape': 'error',
    'no-useless-rename': ['error', { ignoreDestructuring: false, ignoreImport: false, ignoreExport: false }],
    'no-useless-return': 'error',
    'no-var': 'error',
    'no-void': 'error',
    'no-whitespace-before-property': 'error',
    'no-with': 'error',
    'object-shorthand': 'error',
    'one-var': ['error', 'never'],
    'operator-assignment': ['error', 'always'],
    'padding-line-between-statements': 'error',
    'prefer-arrow-callback': 'error',
    'prefer-const': 'error',
    'prefer-promise-reject-errors': 'error',
    'prefer-rest-params': 'error',
    'promise/always-return': 'error',
    'promise/avoid-new': 'error',
    'promise/catch-or-return': 'error',
    'promise/no-callback-in-promise': 'error',
    'promise/no-nesting': 'error',
    'promise/no-new-statics': 'error',
    'promise/no-promise-in-callback': 'error',
    'promise/no-return-in-finally': 'error',
    'promise/no-return-wrap': 'error',
    'promise/param-names': 'error',
    'promise/valid-params': 'error',
    'react/button-has-type': 'error',
    'react/function-component-definition': ['error', { namedComponents: 'arrow-function', unnamedComponents: 'arrow-function' }],
    'react/jsx-curly-spacing': 'error',
    'react/jsx-no-useless-fragment': 'error',
    'react/jsx-tag-spacing': 'error',
    'react/prop-types': 'error',
    'require-await': 'error',
    'rest-spread-spacing': 'error',
    'semi-style': 'error',
    'sort-vars': 'error',
    'space-infix-ops': 'error',
    'space-before-blocks': 'error',
    'space-unary-ops': ['error', { words: true, nonwords: false }],
    'spaced-comment': ['error', 'always'],
    'symbol-description': 'error',
    'template-curly-spacing': 'error',
    'template-tag-spacing': 'error',
    'unicode-bom': ['error', 'never'],
    'unicorn/better-regex': 'error',
    'unicorn/import-index': 'error',
    'unicorn/prefer-number-properties': 'error',
    'unicorn/prefer-optional-catch-binding': 'error',
    'unicorn/prefer-spread': 'error',
    'unicorn/throw-new-error': 'error',
    'use-isnan': 'error',
    'valid-typeof': 'error',
    'vars-on-top': 'error',
    'wrap-iife': ['error', 'inside'],
    complexity: ['error', 30],
    curly: ['error', 'multi-line', 'consistent'],
    eqeqeq: ['error', 'smart'],
    quotes: ['error', 'single', { avoidEscape: true }],
    radix: 'error',
    strict: ['error', 'never'],
    yoda: ['error', 'never'],
    'import/no-unresolved': ['error', { commonjs: true }],
    indent: ['error', 2, { SwitchCase: 1, MemberExpression: 1 }],
    'jsx-a11y/aria-props': 'error',
    'jsx-a11y/label-has-associated-control': ['error', {
      /*
       * NOTE: If this error triggers, either disable it or add
       * your custom components, labels and attributes via these options
       * See https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/label-has-associated-control.md
       */
      controlComponents: ['Input'],
    }],
    'jsx-a11y/mouse-events-have-key-events': 'error',
    'jsx-a11y/role-has-required-aria-props': 'error',
    'jsx-a11y/role-supports-aria-props': 'error',
    'linebreak-style': ['error', 'unix'],
    'no-console': 'error',
    'object-curly-spacing': ['error', 'always'],
    'padded-blocks': ['error', 'never'],
    'prefer-template': 'error',
    'quote-props': ['error', 'as-needed'],
    'react-hooks/exhaustive-deps': 'error',
    'react-hooks/rules-of-hooks': 'error',
    'react/forbid-foreign-prop-types': ['error', { allowInPropTypes: true }],
    'react/jsx-closing-bracket-location': ['error', 'tag-aligned'],
    'react/jsx-first-prop-new-line': ['error', 'multiline-multiprop'],
    'react/jsx-fragments': ['error', 'element'],
    'react/jsx-indent': ['error', 2, { checkAttributes: true }],
    'react/jsx-no-comment-textnodes': 'error',
    'react/jsx-no-duplicate-props': 'error',
    'react/jsx-no-undef': 'error',
    'react/jsx-pascal-case': ['error', { allowAllCaps: true, ignore: [] }],
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    'react/no-danger-with-children': 'error',
    'react/no-deprecated': 'error',
    'react/no-direct-mutation-state': 'error',
    'react/no-is-mounted': 'error',
    'react/no-typos': 'error',
    'react/react-in-jsx-scope': 'error',
    'react/require-render-return': 'error',
    'react/style-prop-object': 'error',
    'redux-saga/no-yield-in-race': 'error',
    'redux-saga/yield-effects': 'error',
    'space-in-parens': ['error', 'never'],
    semi: 'error',

    // disabled rules
    'brace-style': 'off',
    camelcase: 'off',
    'capitalized-comments': 'off',
    'import/imports-first': 'off',
    'import/newline-after-import': 'off',
    'import/no-dynamic-require': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/no-named-as-default': 'off',
    'import/prefer-default-export': 'off', // Would be nice on react components?
    'jsx-a11y/label-has-for': 'off',
    'max-lines': 'off',
    'max-lines-per-function': 'off',
    'max-params': 'off',
    'max-statements': 'off',
    'max-statements-per-line': 'off',
    'multiline-comment-style': 'off',
    'newline-per-chained-call': 'off',
    'no-confusing-arrow': 'off',
    'no-inline-comments': 'off',
    'no-process-exit': 'off',
    'no-restricted-syntax': 'off',
    'no-ternary': 'off',
    'no-undefined': 'off',
    'no-underscore-dangle': ['off', { allow: ['_display', '_links'] }],
    'no-use-before-define': 'off', // Breaks on react hooks
    'prefer-destructuring': 'off',
    'operator-linebreak': 'off',
    'promise/no-native': 'off',
    'react/destructuring-assignment': 'off',
    'react/forbid-prop-types': 'off',
    'react/jsx-closing-tag-location': 'off',
    'react/jsx-curly-newline': 'off',
    'react/jsx-handler-names': 'off',
    'react/jsx-max-depth': 'off',
    'react/jsx-max-props-per-line': 'off',
    'react/jsx-no-literals': 'off',
    'react/jsx-no-target-blank': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-sort-default-props': 'off',
    'react/jsx-sort-props': 'off',
    'react/jsx-wrap-multilines': 'off',
    'react/no-multi-comp': 'off',
    'react/no-set-state': 'off',
    'react/require-default-props': 'off',
    'react/require-extension': 'off',
    'react/self-closing-comp': 'off',
    'react/sort-comp': 'off',
    'react/sort-prop-types': 'off',
    'require-yield': 'off',
    'sonarjs/cognitive-complexity': 'off',
    'sort-imports': 'off',
    'sort-keys': 'off',
    'unicorn/consistent-function-scoping': 'off', // Breaks on react hooks
    'unicorn/explicit-length-check': 'off',
    'unicorn/filename-case': 'off',
    'unicorn/new-for-builtins': 'off',
    'unicorn/no-fn-reference-in-iterator': 'off',
    'unicorn/no-nested-ternary': 'off',
    'unicorn/no-null': 'off',
    'unicorn/no-process-exit': 'off',
    'unicorn/no-reduce': 'off',
    'unicorn/no-useless-undefined': 'off',
    'unicorn/prefer-node-append': 'off',
    'unicorn/prefer-node-remove': 'off',
    'unicorn/prefer-query-selector': 'off',
    'unicorn/prefer-string-slice': 'off',

    // disabled rules - related code should be refactored to functional components
    'no-invalid-this': 'off',
    'class-methods-use-this': 'off',
    'react/no-did-mount-set-state': 'off',
  },
};

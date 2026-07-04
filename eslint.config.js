import pluginVue from 'eslint-plugin-vue';
import vueParser from 'vue-eslint-parser';

export default [

  ...pluginVue.configs['flat/essential'],
  
  {
    // Linting runs on files
    files: ['**/*.vue', '**/*.js'],
    languageOptions: {
      parser: vueParser,
      sourceType: 'module',
      ecmaVersion: 'latest',
    },
    rules: {
      'vue/multi-word-component-names': 'off', 
    }
  }
];
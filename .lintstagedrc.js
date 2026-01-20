module.exports = {
  // Type check TypeScript files
  '**/*.(ts|tsx)': () => 'npm run ts-check',

  // Lint & Prettify TS and JS files
  '**/*.(ts|tsx|js)': () => ['npm run lint:fix', 'npm run prettier:fix'],

  // Prettify only Markdown and JSON files
  '**/*.(md|json)': () => 'npm run prettier:fix'
};

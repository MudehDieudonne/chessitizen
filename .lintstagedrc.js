module.exports = {
  // Type check TypeScript files
  '**/*.(ts|tsx)': () => 'npm ts-check',

  // Lint & Prettify TS and JS files
  '**/*.(ts|tsx|js)': () => ['npm lint:fix', 'npm prettier:fix'],

  // Prettify only Markdown and JSON files
  '**/*.(md|json)': () => 'npm prettier:fix'
};
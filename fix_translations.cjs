const fs = require('fs');
let text = fs.readFileSync('src/data/translations.js', 'utf8');

const keysToInsert = [
  'inputWorkerMobileOrId', 'inputWorkerMobilePlaceholder',
  'inputDoctorId', 'inputDoctorIdPlaceholder',
  'inputKmcLicense', 'inputKmcPlaceholder',
  'inputOfficerId', 'inputOfficerIdPlaceholder',
  'inputAdminPin', 'inputAdminPinPlaceholder'
];

let srcObj = null;
eval('srcObj = ' + fs.readFileSync('src/pages/translations.js', 'utf8').replace('export const landingTranslations = ', ''));

['en', 'hi', 'bn', 'ml'].forEach(lang => {
  let str = '';
  keysToInsert.forEach(k => {
    str += '    ' + k + ': "' + (srcObj[lang][k] || k) + '",\n';
  });
  
  const regex = new RegExp('(footerLabour: [^\\n]+)');
  text = text.replace(regex, '$1,\n' + str);
});

fs.writeFileSync('src/data/translations.js', text, 'utf8');
console.log('Done!');

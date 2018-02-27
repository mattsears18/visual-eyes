import 'select2';
import 'select2/dist/css/select2.css';
import 'select2-bootstrap-theme/dist/select2-bootstrap.css';

Template.registerHelper(
  'json', (jsonObject) => {
    return JSON.stringify(jsonObject);
  }
);

Template.registerHelper(
  'formatNumber', (number) => {
    return number.toLocaleString('en');
  },
);

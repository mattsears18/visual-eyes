import 'select2';
import 'select2/dist/css/select2.css';
import 'select2-bootstrap-theme/dist/select2-bootstrap.css';

// Make helpers available on Templates
for (helper in helpers) {
  Template.registerHelper(
    helper, helpers[helper]
  );
}

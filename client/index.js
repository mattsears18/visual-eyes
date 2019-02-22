import 'select2';
import 'select2/dist/css/select2.css';
import 'select2-bootstrap-theme/dist/select2-bootstrap.css';
import { $ } from 'meteor/jquery';
import dataTablesBootstrap from 'datatables.net-bs';
import 'datatables.net-bs/css/dataTables.bootstrap.css';
dataTablesBootstrap(window, $);

import fontawesome from '@fortawesome/fontawesome';
import regular from '@fortawesome/fontawesome-free-regular'
import solid from '@fortawesome/fontawesome-free-solid'
import brands from '@fortawesome/fontawesome-free-brands'
window.FontAwesomeConfig = { autoReplaceSvg: false }

// Make helpers available on Templates
for (helper in helpers) {
  Template.registerHelper(
    helper, helpers[helper]
  );
}

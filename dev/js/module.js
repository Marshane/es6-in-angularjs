import 'angular';
import ngRoute from 'angular-route';
import ngSanitize from 'angular-sanitize';
import './directive/scroll.js';
import './directive/select.js';
import './directive/modal.js';
import './directive/tree-grid.js';
import './directive/loading.js';

export default angular.module('main', [
    ngSanitize,
    ngRoute,
    'perfect_scrollbar',
    'ms.modal',
    'ui.loading',
    'ui.select',
    'treeGrid'
]);

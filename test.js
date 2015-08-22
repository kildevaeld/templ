(function (fragment, element, text, comment, dynamic, createBindingClass) {
  'use strict';
  return fragment([text('Generate '), dynamic(element('input', {
    'type': 'text',
    'class': 'form-control',
    'style': 'width:60px;display:inline-block;'
  }), createBindingClass(void 0, function (context) {
    this.setAttribute('value', (this.view.ref('numItems', true, true)));
  })), text(' items: '), element('br', {}), dynamic(element('repeat', {
    'as': 'number'
  }, dynamic(text(), createBindingClass(void 0, function (context) {
    this.ref.nodeValue = this.view.ref('number', false, false);
  })), element('br', {})), createBindingClass(void 0, function (context) {
    this.setAttribute('each', (this.view.call('range', [this.view.get('numItems')])));
  }))])
})
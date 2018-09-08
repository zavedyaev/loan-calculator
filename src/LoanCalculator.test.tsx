import * as React from 'react';
import * as ReactDOM from 'react-dom';
import LoanCalculator from './LoanCalculator';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<LoanCalculator />, div);
  ReactDOM.unmountComponentAtNode(div);
});

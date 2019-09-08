import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Bootstrap from './Bootstrap';

configure({ adapter: new Adapter() });

describe('Bootstrap', () => {
  it('should be defined', () => {
    expect(Bootstrap).toBeDefined();
  });

  it('should render correctly', () => {
    const dom = shallow(<Bootstrap />);
    expect(dom).toMatchSnapshot();
  });

  // it('should update hooks', () => {
  //   wrapper.simulate('click');
  // });
});

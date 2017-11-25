import React from 'react'
// import ReactShallowRenderer from 'react-test-renderer/shallow'
import {shallow} from 'enzyme'
import Header from '../../components/Header'

test('should render Header', () => {
  // const renderer = new ReactShallowRenderer()
  // renderer.render(<Header />)
  // expect(renderer.getRenderOutput()).toMatchSnapshot()
  const wrapper = shallow(<Header/>)
  // expect(wrapper.find('h1').length).toBe(1)
  expect(wrapper).toMatchSnapshot()
})

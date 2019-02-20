import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount, render } from 'enzyme';
import toJson from 'enzyme-to-json';
import App,{Link} from './App';


describe('<App />', () => {
  const wrapper = shallow(<App/>);
  it('should contain 1 p element', () =>{
      expect(wrapper.find('p').length).toBe(3);
  });

  it('should contain className = App-header', () =>{
      expect(wrapper.find('.App-header').exists()).toBe(true);
   });

   it('should be have a list have three children', () => {
      expect(wrapper.find('ul').children().length).toBe(3);
   })

   it('should be have a list with className = list', () =>{
     expect(wrapper.find('ul').hasClass('list')).toBe(true);
   })

   it('should be anchor tag with learn text',() =>{
      expect(wrapper.find('a').text()).toBe('Learn React'); //press u to update the snapshot
   })

   it('matches the snapshot',()=>{
     const tree= shallow(<App/>);
     expect(toJson(tree)).toMatchSnapshot();
   })

   it('on button click to change p text', ()=>{
     const wrapper= shallow(<App/>)
     const button= wrapper.find('button')
     expect(wrapper.find('.button-state').text()).toBe('No!'); //test onClick 
     button.simulate('click')
     expect(wrapper.find('.button-state').text()).toBe('Yes!');
   })

   it('update the className with new state', () =>{  // test setState & it's useful for component with different state
     const wrapper = shallow(<App/>)
     expect(wrapper.find('.blue').length).toBe(1)
     expect(wrapper.find('.red').length).toBe(0)
     wrapper.setState({mainColor:'red'})
     expect(wrapper.find('.blue').length).toBe(0)
     expect(wrapper.find('.red').length).toBe(1)
   })

   it('call componentDidMount', () => {   // test lifeCycle componentDidMount
     jest.spyOn(App.prototype, 'componentDidMount')
     const wrapper = shallow(<App/>)
     expect(App.prototype.componentDidMount.mock.calls.length).toBe(1)
   })

   it('setProps call componentWillReceiveProps', () => {  // test lifeCycle componentWillReceiveProps
     jest.spyOn(App.prototype, 'componentWillReceiveProps')
     const wrapper = shallow (<App/>)
     wrapper.setProps({hide:true})
     expect(App.prototype.componentWillReceiveProps.mock.calls.length).toBe(1)
   })

   it('handleStrings function returns correctly', () =>{  // test function
     const wrapper = shallow(<App/>)
     const trueReturn = wrapper.instance().handleStrings('Hello World')  //instance function return component that we've shadowed and give access to its properties 
     const trueFalse = wrapper.instance().handleStrings('')
     expect(trueReturn).toBe(true)
     expect(trueFalse).toBe(false)
   })
})

//test props
describe('<Link/>', () =>{
  it('link component accepts address props', () => {
    const wrapper = shallow(<Link address='www.google.com'/>)
    expect(wrapper.instance().props.address).toBe('www.google.com'); // we test an instance of the component
  })

  it('a tag node renders href correctly', () =>{
    const wrapper = shallow(<Link address="www.google.com"/>)
    expect(wrapper.props().href).toBe('www.google.com'); // in this test we make sure href using correct prop value & using the props method on the wrapper itself
  })

  it('returns null with true hide prop',() =>{
    const wrapper = shallow(<Link hide={false}/>)
    expect(wrapper.find('a').length).toBe(1);
    wrapper.setProps({hide:true});  // test how component behave when the props changing
    expect(wrapper.get(0)).toBeNull();
  })
})
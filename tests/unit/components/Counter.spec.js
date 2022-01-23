import Counter from '@/components/Counter';
import { shallowMount } from '@vue/test-utils';
describe('Test in Counter component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(Counter);
  });

  it('Debe de hacer match con el snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
  it('Shot render h2', () => {
    expect(wrapper.find('h2').text()).toBe('Counter');
  });
  it('Debe de incrementar en 1 y decrementar en 2', async () => {
    const [increment, decrement] = wrapper.findAll('button');
    const counter = wrapper.find('[data-testid="counter"]');
    await increment.trigger('click'); //101

    console.log('counter :>> ', counter.text());
    expect(counter.text()).toBe('101');

    await decrement.trigger('click'); //100
    await decrement.trigger('click'); //99
    console.log('counter :>> ', counter.text());
    expect(counter.text()).toBe('99');
  });
  it('Debe de identificar si las props son correctas', () => {
    console.log('start :>> ', wrapper.props());
    const { start, title } = wrapper.props();
    const counter = wrapper.find('[data-testid="counter"]');
    expect(Number(counter.text())).toBe(start);

    expect(title).toBe(undefined);
  });
  it('Debe de mostrar la prop title', () => {
    const wrapper = shallowMount(Counter, {
      props: {
        title: 'Counter 100',
      },
    });
    expect(wrapper.find('h2').text()).toBe('Counter 100');
  });
});

import { shallowMount } from '@vue/test-utils';
import Indecision from '@/components/Indecision.vue';

describe('Test components Indecision', () => {
  let wrapper;
  let clgSpy;
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          answer: 'yes',
          forced: false,
          image: 'https://yesno.wtf/assets/yes/2.gif',
        }),
    })
  );
  beforeEach(() => {
    wrapper = shallowMount(Indecision);

    clgSpy = jest.spyOn(console, 'log');
    // clgSpy.mockClear();// clear the log
    jest.clearAllMocks(); // clear all mock
  });
  it('Debe de hacer match con el snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('Escribir no debe de disparar ninguna petición a la API', async () => {
    const getAnswerSpy = jest.spyOn(wrapper.vm, 'getAnswer');
    const input = wrapper.find('input');
    await input.setValue('Hola Roger');
    expect(clgSpy).toHaveBeenCalledTimes(1);
    expect(getAnswerSpy).toHaveBeenCalledTimes(0);
  });
  it('Solo al escribir el simbolo "?" debe de hacer la paticion a la API', async () => {
    const getAnswerSpy = jest.spyOn(wrapper.vm, 'getAnswer');
    const input = wrapper.find('input');
    await input.setValue('Hola Roger?');
    expect(clgSpy).toHaveBeenCalledTimes(1);
    expect(getAnswerSpy).toHaveBeenCalledTimes(1);
  });
  it('Prueba en gerAnswer', async () => {
    await wrapper.vm.getAnswer();
    const img = wrapper.find('img');
    console.log('wrapper.vm.image :>> ', wrapper.vm.image);
    expect(img.attributes('src')).toBe('https://yesno.wtf/assets/yes/2.gif');
    console.log('wrapper.vm.answer :>> ', wrapper.vm.answer);
    expect(wrapper.vm.answer).toBe('yes');
  });
  it('Prueba en gerAnswer - Fallos en la API', async () => {
    fetch.mockImplementationOnce(() =>
      Promise.reject(new Error('Error in API'))
    );
    await wrapper.vm.getAnswer();
    const img = wrapper.find('img');
    expect(img.exists()).toBeFalsy();
    expect(wrapper.vm.answer).toBe('Fallos de la API');
  });
});

import { Date2stringPipe } from './date2string.pipe';

describe('Date2stringPipe', () => {
  it('create an instance', () => {
    const pipe = new Date2stringPipe();
    expect(pipe).toBeTruthy();
  });
});

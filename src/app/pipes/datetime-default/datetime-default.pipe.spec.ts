import { DatetimeDefaultPipe } from './datetime-default.pipe';

describe('DatetimeDefaultPipe', () => {
  it('create an instance', () => {
    const pipe = new DatetimeDefaultPipe();
    expect(pipe).toBeTruthy();
  });
});

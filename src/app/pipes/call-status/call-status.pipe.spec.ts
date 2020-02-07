import { CallStatusPipe } from './call-status.pipe';

describe('CallStatusPipe', () => {
  it('create an instance', () => {
    const pipe = new CallStatusPipe();
    expect(pipe).toBeTruthy();
  });
});

import { MailStatusPipe } from './mail-status.pipe';

describe('MailStatusPipe', () => {
  it('create an instance', () => {
    const pipe = new MailStatusPipe();
    expect(pipe).toBeTruthy();
  });
});

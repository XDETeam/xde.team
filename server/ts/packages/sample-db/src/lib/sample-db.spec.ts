import { sampleDb } from './sample-db';

describe('sampleDb', () => {
  it('should work', () => {
    expect(sampleDb()).toEqual('sample-db');
  });
});

const grpcClientMock = {
  deleteStatus: jest.fn((opts, callback) => {
    process.nextTick(
        () => callback(null, { test: 'good' })
      );
  }),
  saveStatus: jest.fn((opts, callback) => {
    process.nextTick(
        () => callback(null, { test: 'good' })
      );
  })
};

export default grpcClientMock;

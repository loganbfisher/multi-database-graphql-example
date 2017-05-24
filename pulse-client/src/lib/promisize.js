function promisize(fnToPromisize, bindTo) {
  return (...args) => (
    new Promise((resolve, reject) => {
      function callback(err, resp) {
        if (err) {
          return reject(err);
        }

        return resolve(resp);
      }

      return fnToPromisize.call(bindTo, ...[...args, callback]);
    })
  );
}

export default promisize;

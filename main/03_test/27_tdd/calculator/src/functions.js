const checkArgsCounts = (args) => {
  if (args.length > 30) throw new Error('too many args');
}

const checkArgsEmpty = (args) => {
  if (args.length === 0) throw new Error('empty args');
}

const checkIncludesStringValues = (args) => {
  const stringCount = args.filter(arg => typeof arg === 'string').length;
  if (stringCount) throw new Error('includes string args');
}

export const add = (args) => {
  checkArgsCounts(args);
  checkArgsEmpty(args);
  checkIncludesStringValues(args);

  const result = args.reduce((prev, current) => {
    return prev + current;
  }, 0)

  if (result > 1000) return 'too big';
  return result;
}

export const subtract = (args) => {
  checkArgsCounts(args);
  checkArgsEmpty(args);
  checkIncludesStringValues(args);

  const initialValue = args[0];
  const result = args.reduce((prev, current) => {
    return prev - current;
  }, initialValue);

  if (result < 0) return 'negative number';
  return result;
}

export const multiply = (args) => {
  checkArgsCounts(args);
  checkArgsEmpty(args);
  checkIncludesStringValues(args);

  const result = args.reduce((prev, current) => {
    return prev * current
  });

  if (result > 1000) return 'big big number';
  return result;
}

export const divide = (args) => {
  checkArgsCounts(args);
  checkArgsEmpty(args);
  checkIncludesStringValues(args);

  const _result = args.reduce((prev, current) => {
    return prev / current;
  });
  const result = Math.floor(_result * 10) / 10;

  return result;
}
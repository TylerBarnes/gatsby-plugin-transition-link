export default function getPagesPromises() {
  let exitResolve;
  const exitPromise = new Promise(resolve => {
    exitResolve = resolve;
  });

  let entryResolve;
  const entryPromise = new Promise(resolve => {
    entryResolve = resolve;
  });

  return {
    triggerResolve: {
      entry: entryResolve,
      exit: exitResolve
    },
    pages: {
      exit: exitPromise,
      entry: entryPromise
    }
  };
}

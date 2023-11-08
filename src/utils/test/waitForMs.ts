export const waitForMs = async (ms = 1000) => {
  return await new Promise((ok) => {
    setTimeout(() => {
      ok(true);
    }, ms);
  });
};

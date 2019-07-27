// Helps call the next middleware
export const callNextFunc = async (data: any, payload: any, respond: any) => {
  if (data.currentFunc < data.funcs.length) {
    await data.funcs[++data.currentFunc](data, payload, respond);
  }
};

export const delay = (ms: number) => {
  return new Promise(async (r) => {
    if (ms > 0) {
      setTimeout(r, ms);
    } else {
      const channel = new MessageChannel();
      channel.port1.onmessage = r;
      channel.port2.postMessage("");
    }
  });
};

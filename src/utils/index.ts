export const fakeDelay = (ms: number = 500) =>
  new Promise((resolve) => setTimeout(resolve, ms))

export const nowDate = () => new Date().toISOString()

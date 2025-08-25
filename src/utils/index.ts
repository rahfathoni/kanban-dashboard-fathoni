export const fakeDelay = (ms: number = 500) =>
  new Promise((resolve) => setTimeout(resolve, ms))

export const nowDate = () => new Date().toISOString()

export const formatIsoToDate = (iso: string): string => {
  const date = new Date(iso);

  const day = String(date.getDate()).padStart(2, '0');
  const month = date.toLocaleString('en-US', { month: 'long' });  
  const year = date.getFullYear();
  const time = date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  return `${day} ${month} ${year} ${time}`;
};
export const generateRandomColors = (count: number) => {
  const randomColors = [];

  const getRandomColor = () =>
    `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
      Math.random() * 256
    )}, ${Math.floor(Math.random() * 256)}, 0.2)`;

  for (let i = 0; i < count; i++) {
    randomColors.push(getRandomColor());
  }

  return randomColors;
};

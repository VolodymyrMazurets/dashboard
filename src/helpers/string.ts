export const getShortName = (fullName: string) =>
  String(fullName)
    ?.split(' ')
    .map((str) => str[0])
    .join('')
    .toUpperCase();

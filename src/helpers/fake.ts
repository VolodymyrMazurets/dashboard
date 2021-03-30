export const getRandomAvatar = (
  type: 'identicon' | 'avatar' = 'identicon',
  seed?: number | string
) =>
  `https://avatars.dicebear.com/api/${type}/${
    seed || Math.floor(Math.random() * 100)
  }.svg`;

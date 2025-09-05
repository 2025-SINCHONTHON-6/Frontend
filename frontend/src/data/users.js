export const users = [
  {
    id: "u1",
    name: "김멋사님",
    email: "lion@example.com",
    photo: "https://i.pravatar.cc/160?img=1",
    achieved: 7, 
  },
  {
    id: "u2",
    name: "이지호",
    email: "ziho@example.com",
    photo: "https://i.pravatar.cc/160?img=12",
    achieved: 3,
  },
];


export const getMemberById = (id) =>
  users.find((m) => m.id === id) ?? users[0];
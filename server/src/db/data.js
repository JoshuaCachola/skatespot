const faker = require('faker');

let fakePeople = [
  {
    city: 'Roswell',
    state: 'North Carolina',
    firstName: 'Harmon',
    lastName: 'Reichel',
    username: 'Katelynn_Herman',
    email: 'Leanne_Grimes@hotmail.com',
    profilePicture: 'https://cdn.fakercloud.com/avatars/mds_128.jpg',
    password: 'abc123',
    id: 2,
    createdAt: '2021-04-07T19:27:12.454Z',
  },
  {
    city: 'Chaimton',
    state: 'South Dakota',
    firstName: 'Minnie',
    lastName: 'Schiller',
    username: 'Clark11',
    email: 'Kali_Legros92@yahoo.com',
    profilePicture: 'https://cdn.fakercloud.com/avatars/allfordesign_128.jpg',
    password: 'abc123',
    id: 3,
    createdAt: '2021-05-02T17:21:54.990Z',
  },
  {
    city: 'Kristinside',
    state: 'Montana',
    firstName: 'Brianne',
    lastName: 'Welch',
    username: 'Norris9',
    email: 'Willis.Windler@gmail.com',
    profilePicture: 'https://cdn.fakercloud.com/avatars/ipavelek_128.jpg',
    password: 'abc123',
    id: 4,
    createdAt: '2020-10-10T14:22:38.645Z',
  },
  {
    city: 'Jersey City',
    state: 'Indiana',
    firstName: 'Eunice',
    lastName: 'Weimann',
    username: 'Kayden51',
    email: 'Saige_Willms81@yahoo.com',
    profilePicture: 'https://cdn.fakercloud.com/avatars/olgary_128.jpg',
    password: 'abc123',
    id: 5,
    createdAt: '2020-10-08T17:41:02.405Z',
  },
  {
    city: 'Lake Helen',
    state: 'Oklahoma',
    firstName: 'Shaun',
    lastName: 'Carroll',
    username: 'Lempi_DuBuque57',
    email: 'Abdul_Cummerata@gmail.com',
    profilePicture: 'https://cdn.fakercloud.com/avatars/rude_128.jpg',
    password: 'abc123',
    id: 6,
    createdAt: '2020-11-26T03:46:03.195Z',
  },
  {
    city: 'Beershire',
    state: 'Maine',
    firstName: 'Rudy',
    lastName: 'Witting',
    username: 'Grayson_Yost',
    email: 'Gia_Monahan77@yahoo.com',
    profilePicture: 'https://cdn.fakercloud.com/avatars/dotgridline_128.jpg',
    password: 'abc123',
    id: 7,
    createdAt: '2020-12-22T07:22:24.241Z',
  },
  {
    city: 'New Napoleon',
    state: 'Washington',
    firstName: 'Polly',
    lastName: 'Hayes',
    username: 'Domenick.Jacobson24',
    email: 'Jimmie50@yahoo.com',
    profilePicture: 'https://cdn.fakercloud.com/avatars/catarino_128.jpg',
    password: 'abc123',
    id: 8,
    createdAt: '2021-02-01T19:05:02.227Z',
  },
  {
    city: 'Gildaville',
    state: 'Florida',
    firstName: 'Roselyn',
    lastName: 'Jones',
    username: 'Georgiana83',
    email: 'Mazie_White57@yahoo.com',
    profilePicture: 'https://cdn.fakercloud.com/avatars/slowspock_128.jpg',
    password: 'abc123',
    id: 9,
    createdAt: '2020-09-27T17:44:34.470Z',
  },
  {
    city: 'North Era',
    state: 'Oklahoma',
    firstName: 'Leonora',
    lastName: 'Dickinson',
    username: 'Arjun_Will24',
    email: 'Ashtyn.Satterfield47@hotmail.com',
    profilePicture: 'https://cdn.fakercloud.com/avatars/catarino_128.jpg',
    password: 'abc123',
    id: 10,
    createdAt: '2020-09-27T17:44:34.470Z',
  },
  {
    city: 'Haleybury',
    state: 'Indiana',
    firstName: 'Dante',
    lastName: 'Dickinson',
    username: 'Julia_Purdy16',
    email: 'Jude.Wehner@yahoo.com',
    profilePicture: 'https://cdn.fakercloud.com/avatars/eyronn_128.jpg',
    password: 'abc123',
    id: 11,
    createdAt: '2021-01-19T07:26:53.243Z',
  },
];

for (let i = 0; i < 10; i++) {
  // let fakePerson = {};
  // fakePerson['city'] = faker.address.city();
  // fakePerson.state = faker.address.state();
  // fakePerson.firstName = faker.name.firstName();
  // fakePerson.lastName = faker.name.lastName();
  // fakePerson.username = faker.internet.userName();
  // fakePerson.email = faker.internet.email();
  // fakePerson.profilePicture = faker.image.avatar();
  // fakePerson.password = 'abc123';
  // fakePerson.id = i + 2;
  // fakePeople.push(fakePerson);
  let obj = fakePeople[i];
  obj.createdAt = faker.date.past();
}

let reviews = [
  'This place is awesome. Plenty of people skate here and everyone has been nice to skate with. There is something for everyone at this place!',
  'I brought my kids to this spot and they had a blast. The skate obstacles were small enough to accommodate my kids and I can sit at under shade while having a good view of my kids.\n Would definitely recommend this place for parents with skater kids.',
  'This place is the worst. The rails are knobbed. The ledges do not slide. Seems like nobody waxes them. If you have the time to wax a ledge then definitely come here, otherwise I would look elsewhere to get a session in.',
  'Cops are always kicking my friends and I out of this spot. I would definitely try to come here early in the morning or very late at night if you really wanna hit up this spot. Be careful...',
  "This spot is the best. I came here with my friends and were able to spend the whole day filming some tricks. They have it all. Massive stair set if you're trying to pop off, manny pads and ledges for a chill sesh, tables to chill at.\n I've seen a few sponsored skaters at this spot and had a great time skating getting inspired by them just going for it. Definitely a great spot. \n PS: Please throw away your trash...",
  'I came here last year and got a bunch of clips. Would definitly recommend if you are in the area.',
  'Way too crowded. Everyone and their mom is literally here. Would definitely look elsewhere if you do not want to run into a few kids.',
];

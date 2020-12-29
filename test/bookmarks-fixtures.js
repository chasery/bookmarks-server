function makeBookmarksArray() {
  return [
    {
      id: 1,
      title: "Audizine",
      url: "http://www.audizine.com",
      rating: 4,
      description: "A forum for Audi enthusiasts",
    },
    {
      id: 2,
      title: "WoW Head",
      url: "http://www.wowhead.com",
      rating: 5,
      description: "A wealth of knowledg around World of Warcraft",
    },
    {
      id: 3,
      title: "Reddit",
      url: "https://www.reddit.com",
      rating: 4,
      description: "A fun place to experience internet culture",
    },
  ];
}

module.exports = {
  makeBookmarksArray,
};

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

function makeMaliciousBookmark() {
  const maliciousBookmark = {
    id: 911,
    rating: 4,
    title: 'Naughty naughty very naughty <script>alert("xss");</script>',
    url: "http://www.naughtyurl.com",
    description: `Bad image <img src="https://url.to.file.which/does-not.exist" onerror="alert(document.cookie);">. But not <strong>all</strong> bad.`,
  };

  const expectedBookmark = {
    ...maliciousBookmark,
    title:
      'Naughty naughty very naughty &lt;script&gt;alert("xss");&lt;/script&gt;',
    description: `Bad image <img src="https://url.to.file.which/does-not.exist">. But not <strong>all</strong> bad.`,
  };

  return {
    maliciousBookmark,
    expectedBookmark,
  };
}

module.exports = {
  makeBookmarksArray,
  makeMaliciousBookmark,
};

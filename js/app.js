const bookUrl = `https://www.googleapis.com/books/v1/volumes?q=`
const maxResults = `&maxResults=25`
const key = `&key=AIzaSyA2fp1D9TrSW7x5WJy_gOEkk5ANBF7xS6o`
const placeHldr = `<img src="https://via.placeholder.com/128">`
const $outputList = $(`#bookList`);

// List of Genre's as elements in an Array
const genre = [
  `+subject:CSS&orderBy=newest`,
  `+subject:HTML&orderBy=newest`,
  `+subject:Python&orderBy=newest`,
  `+subject:Javascript&orderBy=newest`,
  `+subject:Science_Fiction&orderBy=newest`,
  `+subject:Mystery&orderBy=newest`,
  `+subject:Action_Adventure&orderBy=newest`,
  `+subject:Fantasy&orderBy=newest`,
  `+subject:History&orderBy=newest`,
  `+subject:Biography&orderBy=newest`,
  `+subject:Crime_Thriller&orderBy=newest`,
  `+subject:Horror&orderBy=newest`,
  `+subject:Dystopian&orderBy=newest`,
  `+subject:Cooking&orderBy=newest`,
  `+subject:Law&orderBy=newest`,
  `+subject:Travel&orderBy=newest`,
  `+subject:Art&orderBy=newest`,
  `+subject:Photography&orderBy=newest`,
  `+subject:Health_Fitness&orderBy=newest`,
  `+subject:Business&orderBy=newest`,
]

// Shuffles the genre Array
const shuffle = (array) => {
  let m = array.length, t, i;
  while (m) {
    i = Math.floor(Math.random() * m--);
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }
  return array;
}

// Returns the first index position of the Shuffled Array
const shuffled = () => {
  const shuf = shuffle(genre);
  return shuf[0]
}

// On page load
$.ajax({
  url: bookUrl + shuffled(genre) + maxResults + key,
}).then(
  (data) => {
    $(`#genreH4`).html(`<h4 id="genreTitle">${data.items[0].volumeInfo.categories}</h4>`)
    console.log(data.items.length)
    const loop = (data) => {for (let i = 0; i < data.items.length; i++) {
      const bookImg = () => {
        if (data.items[i].volumeInfo.imageLinks) {
          return `<img src="${data.items[i].volumeInfo.imageLinks.thumbnail}" class="card-img" alt="...">`
        } else {
          return placeHldr;
        }
      }
      const title = data.items[i].volumeInfo.title;
      const author = data.items[i].volumeInfo.authors;
      const publisher = data.items[i].volumeInfo.publisher;
      const viewUrl = data.items[i].volumeInfo.infoLink;
      $outputList.append(`
      <td>
      <a target="_blank" href="${viewUrl}">${bookImg()}</a><br><br>
        ${title}<br>
        Author: ${author}<br>
        Publisher: ${publisher}<br>
        <a target="_blank" href="${viewUrl}">Read Book</a>
        <br><br>
      </td>
    `)
    }
  }
  loop(data)
  },
  (error) => {
    console.log('bad request', error);
  }
);

// Clicking Generate button randomly generates Books
$(document).on(`click`, `#btnGenerate`, () => {
  $.ajax({
    url: bookUrl + shuffled(genre) + maxResults + key,
  }).then(
    (data) => {
      $(`#genreH4`).html(`<h4 id="genreTitle">${data.items[0].volumeInfo.categories}</h4>`)
      $outputList.empty();
      const loop = (data) => {for (let i = 0; i < data.items.length; i++) {
        const bookImg = () => {
          if (data.items[i].volumeInfo.imageLinks) {
            return `<img src="${data.items[i].volumeInfo.imageLinks.thumbnail}" class="card-img" alt="...">`
          } else {
            return placeHldr;
          }
        }
        const title = data.items[i].volumeInfo.title;
        const author = data.items[i].volumeInfo.authors;
        const publisher = data.items[i].volumeInfo.publisher;
        const viewUrl = data.items[i].volumeInfo.infoLink;
        $outputList.append(`
          <td>
            <a target="_blank" href="${viewUrl}">${bookImg()}</a><br><br>
            ${title}<br>
            Author: ${author}<br>
            Publisher: ${publisher}<br>
            <a target="_blank" href="${viewUrl}">Read Book</a>
            <br><br>
          </td>
        `)
      }
    }
    loop(data)
    },
    (error) => {
      console.log('bad request', error);
    }
  );
})
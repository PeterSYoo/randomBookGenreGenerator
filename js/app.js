const bookUrl = `https://www.googleapis.com/books/v1/volumes?q=`
const maxResults = `&maxResults=25`
const key = `&key=AIzaSyA2fp1D9TrSW7x5WJy_gOEkk5ANBF7xS6o`
const placeHldr = `<img src="https://via.placeholder.com/128">`
const $outputList = $(`#bookList`);

const genre = [
  `+subject:CSS&orderBy=newest`,
  `+subject:HTML&orderBy=newest`,
  `+subject:Python&orderBy=newest`,
  `+subject:Javascript&orderBy=newest`,
]

const shuffle = (array) => {
  var m = array.length, t, i;
  while (m) {
    i = Math.floor(Math.random() * m--);
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }
  return array;
}

const shuffled = () => {
  const shuf = shuffle(genre);
  return shuf[0]
}

$.ajax({
  url: bookUrl + shuffled(genre) + maxResults + key,
}).then(
  (data) => {
    $(`#genreH4`).html(`<h4>${data.items[0].volumeInfo.categories}</h4>`)
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

$(document).on(`click`, `#btnGenerate`, () => {
  // let genre = `+subject:Action`
  $.ajax({
    url: bookUrl + shuffled(genre) + maxResults + key,
  }).then(
    (data) => {
      $(`#genreH4`).html(`<h4>${data.items[0].volumeInfo.categories}</h4>`)
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

// Generator button on click replaces Genre 1 section with a new random Genre and pulls data from API and lists them onto the page.
// Also changes the name of the Genre at the top of the page.
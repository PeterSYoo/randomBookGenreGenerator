const bookUrl = `https://www.googleapis.com/books/v1/volumes?q=`
const maxResults = `&maxResults=25`
// const key = `&key=AIzaSyA2fp1D9TrSW7x5WJy_gOEkk5ANBF7xS6o`
const placeHldr = `<img src="https://via.placeholder.com/128" class="center">`
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
  `+subject:True_Crime&orderBy=newest`,
  `+subject:Horror&orderBy=newest`,
  `+subject:Dystopian&orderBy=newest`,
  `+subject:Cooking&orderBy=newest`,
  `+subject:Law&orderBy=newest`,
  `+subject:Travel&orderBy=newest`,
  `+subject:Art&orderBy=newest`,
  `+subject:Photography&orderBy=newest`,
  `+subject:Health_Fitness&orderBy=newest`,
  `+subject:Business&orderBy=newest`,
  `+subject:Cats&orderBy=newest`,
  `+subject:Dogs&orderBy=newest`,
  `+subject:Birds&orderBy=newest`,
  `+subject:Turtles&orderBy=newest`,
  `+subject:Squirrels&orderBy=newest`,
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

const genreShuffled = shuffled(genre);

// Extracts only the Subject name from the array element
const sliced = genreShuffled.slice(
  genreShuffled.indexOf(`:`) + 1,
  genreShuffled.lastIndexOf(`&`),
)

// On page load
$.ajax({
  url: bookUrl + genreShuffled + maxResults,
}).then(
  (data) => {
    $(`#genreH4`).html(`<h3 id="genreTitle">${sliced.replace(`_`, ` `)}</h4>`)
    const loop = (data) => {for (let i = 0; i < data.items.length; i++) {
      const bookImg = () => {
        if (data.items[i].volumeInfo.imageLinks) {
          return `<img src="${data.items[i].volumeInfo.imageLinks.thumbnail}" class="center" alt="...">`
        } else {
          return placeHldr;
        }
      }
      const title = data.items[i].volumeInfo.title;
      const author = data.items[i].volumeInfo.authors;
      const publisher = data.items[i].volumeInfo.publisher;
      const viewUrl = data.items[i].volumeInfo.infoLink;
      $outputList.append(`
      <td width="128">
      <a target="_blank" href="${viewUrl}">${bookImg()}</a><br><br>
        "${title}"<br><br>
        Author: ${author}<br>
        Publisher: ${publisher}<br>
        <a target="_blank" href="${viewUrl}">Read Book</a>
        <br><br><br>
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
  
  const shuffled = () => {
    const shuf = shuffle(genre);
    return shuf[0]
  }
  
  const genreShuffled = shuffled(genre);
  
  const sliced = genreShuffled.slice(
    genreShuffled.indexOf(`:`) + 1,
    genreShuffled.lastIndexOf(`&`),
  )
  $.ajax({
    url: bookUrl + genreShuffled + maxResults,
  }).then(
    (data) => {
      $(`#genreH4`).html(`<h3 id="genreTitle">${sliced.replace(`_`, ` `)}</h4>`)
      $outputList.empty();
      const loop = (data) => {for (let i = 0; i < data.items.length; i++) {
        const bookImg = () => {
          if (data.items[i].volumeInfo.imageLinks) {
            return `<img src="${data.items[i].volumeInfo.imageLinks.thumbnail}" class="center" alt="...">`
          } else {
            return placeHldr;
          }
        }
        const title = data.items[i].volumeInfo.title;
        const author = data.items[i].volumeInfo.authors;
        const publisher = data.items[i].volumeInfo.publisher;
        const viewUrl = data.items[i].volumeInfo.infoLink;
        $outputList.append(`
          <td width="128">
            <a target="_blank" href="${viewUrl}">${bookImg()}</a><br><br>
            "${title}"<br><br>
            Author: ${author}<br>
            Publisher: ${publisher}<br>
            <a target="_blank" href="${viewUrl}">Read Book</a>
            <br><br><br>
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
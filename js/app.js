const bookUrl = `https://www.googleapis.com/books/v1/volumes?q=`
const maxResults = `&maxResults=25`
const placeHldr = `<img src="https://via.placeholder.com/128">`
const $outputList = $(`#bookList`);

// List of Genre's as Elements in an Array
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

// Shuffles the Genre Array
// Sample arr = [1,2,3,4,5,6,7,8]
const shuffle = (array) => {
  let m = array.length;
  let t;
  let i;
  // m = 8
  // Once m hits 0 it stops the loop since 0 returns a false boolean
  while (m) {
                                            // let's say [3]
    // returns the largest integer(of a random number from 0 to 7)
    i = Math.floor(Math.random() * m--);
    // i is now [3]
    // Loop keeps going until m-- updates the loop paramenter to 0

    // t is now [7]
    t = array[m];
    // [7] gets swapped with [3]
    array[m] = array[i];
    // [3] gets swapped wth [7]
    array[i] = t;
    // Loop keeps going until m = 0. The last index position of each iteration is left alone while the rest gets shuffled. The last index position decrements by 1 each iteration.
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
    // Removes the "_" in the subject string and replaces it with an empty space
    $(`#genreHeader`).html(`<h3 id="genreTitle">${sliced.replace(`_`, ` `)}</h4>`)
    // Loops through the length of the Object from the API
    const loop = (data) => {for (let i = 0; i < data.items.length; i++) {
      // If Book Cover image is not available, place a Placeholder image instead
      const bookImg = () => {
        if (data.items[i].volumeInfo.imageLinks) {
          return `<img src="${data.items[i].volumeInfo.imageLinks.thumbnail}">`
        } else {
          return placeHldr;
        }
      }
      // Binding Variables to Values in the Object from the API that's being iterated
      const title = data.items[i].volumeInfo.title;
      const author = data.items[i].volumeInfo.authors;
      const publisher = data.items[i].volumeInfo.publisher;
      const viewUrl = data.items[i].volumeInfo.infoLink;
      // Appends onto the DOM
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
    console.log(`bad request`, error);
  }
);

// Clicking Generate button randomly generates Books
$(document).on(`click`, `#btnGenerate`, () => {
  // Sample arr = [1,2,3,4,5,6,7,8]
  const shuffle = (array) => {
    let m = array.length;
    let t;
    let i;
    // m = 8
    // Once m hits 0 it stops the loop since 0 returns a false boolean
    while (m) {
                                              // let's say [3]
      // returns the largest integer(of a random number from 0 to 7)
      i = Math.floor(Math.random() * m--);
      // i is now [3]
      // Loop keeps going until m-- updates the loop paramenter to 0
  
      // t is now [7]
      t = array[m];
      // [7] gets swapped with [3]
      array[m] = array[i];
      // [3] gets swapped wth [7]
      array[i] = t;
      // Loop keeps going until m = 0. The last index position of each iteration is left alone while the rest gets shuffled. The last index position decrements by 1 each iteration.
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
  $.ajax({
    url: bookUrl + genreShuffled + maxResults,
  }).then(
    (data) => {
      // Removes the "_" in the subject string and replaces it with an empty space
      $(`#genreHeader`).html(`<h3 id="genreTitle">${sliced.replace(`_`, ` `)}</h4>`)
      $outputList.empty();
      // If Book Cover image is not available, place a Placeholder image instead
      const loop = (data) => {for (let i = 0; i < data.items.length; i++) {
        const bookImg = () => {
          if (data.items[i].volumeInfo.imageLinks) {
            return `<img src="${data.items[i].volumeInfo.imageLinks.thumbnail}">`
          } else {
            return placeHldr;
          }
        }
        // Binding Variables to Values in the Object from the API that's being iterated
        const title = data.items[i].volumeInfo.title;
        const author = data.items[i].volumeInfo.authors;
        const publisher = data.items[i].volumeInfo.publisher;
        const viewUrl = data.items[i].volumeInfo.infoLink;
        // Appends onto the DOM
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
      console.log(`bad request`, error);
    }
  );
})
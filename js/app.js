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
const shuffle = (array) => {
  let i = array.length;
  // sample array [`apple`, `orange`, `banana`, `lemon`, `peach`, `mango`, `grapes`, `pineapple`]
  // i = 8
  let k; // generate random index
  let temp; // swap them
  // if 7 is greater than 0 run loop
  // i decreses by 1 each loop
  while(--i > 0) {
                         // lets say 3
    // Return largest # of (0 through 7)
    k = Math.floor(Math.random() * i);
    // k = 3
    //       [3]
    temp = array[k];
    // temp is now [3]
    array[k] = array[i];
    // [3] is swapped by [7]
    // [`apple`, `orange`, `banana`, `pineapple`, `peach`, `mango`, `grapes`, `pineapple`]
    array[i] = temp;
    // [7] is swapped by [3]
    // [`apple`, `orange`, `banana`, `pineapple`, `peach`, `mango`, `grapes`, `lemon`]
  }
    // Loop 2
    // temp is now [4]
    // [4] is swapped by [6]
    // [`apple`, `orange`, `banana`, `pineapple`, `grapes`, `mango`, `grapes`, `lemon`]
    // [6] is swapped by [4]
    // [`apple`, `orange`, `banana`, `pineapple`, `peach`, `mango`, `peach`, `lemon`]

    // Loop 3
    // temp is now [2]
    // [2] is swapped by [5]
    // [`apple`, `orange`, `mango`, `pineapple`, `peach`, `mango`, `peach`, `lemon`]
    // [5] is swapped by [2]
    // [`apple`, `orange`, `mango`, `pineapple`, `peach`, `banana`, `peach`, `lemon`]

    // it does this until --i = 0 then the loop stops
  return array
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
  // Shuffles the Genre Array
  const shuffle = (array) => {
    let i = array.length;
    // sample array [`apple`, `orange`, `banana`, `lemon`, `peach`, `mango`, `grapes`, `pineapple`]
    // i = 8
    let k; // generate random index
    let temp; // swap them
    // if 7 is greater than 0 run loop
    // i decreses by 1 each loop
    while(--i > 0) {
                          // lets say 3
      // Return largest # of (0 through 7)
      k = Math.floor(Math.random() * i);
      // k = 3
      //       [3]
      temp = array[k];
      // temp is now [3]
      array[k] = array[i];
      // [3] is swapped by [7]
      // [`apple`, `orange`, `banana`, `pineapple`, `peach`, `mango`, `grapes`, `pineapple`]
      array[i] = temp;
      // [7] is swapped by [3]
      // [`apple`, `orange`, `banana`, `pineapple`, `peach`, `mango`, `grapes`, `lemon`]
    }
      // Loop 2
      // temp is now [4]
      // [4] is swapped by [6]
      // [`apple`, `orange`, `banana`, `pineapple`, `grapes`, `mango`, `grapes`, `lemon`]
      // [6] is swapped by [4]
      // [`apple`, `orange`, `banana`, `pineapple`, `peach`, `mango`, `peach`, `lemon`]

      // Loop 3
      // temp is now [2]
      // [2] is swapped by [5]
      // [`apple`, `orange`, `mango`, `pineapple`, `peach`, `mango`, `peach`, `lemon`]
      // [5] is swapped by [2]
      // [`apple`, `orange`, `mango`, `pineapple`, `peach`, `banana`, `peach`, `lemon`]
      
      // it does this until --i = 0 then the loop stops
    return array
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
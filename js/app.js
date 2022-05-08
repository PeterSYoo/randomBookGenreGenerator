const bookUrl = `https://www.googleapis.com/books/v1/volumes?q=`
let genre = `+subject:Science+Fiction&order&orderBy=newest`
const maxResults = `&maxResults=15`
const key = `&key=AIzaSyA2fp1D9TrSW7x5WJy_gOEkk5ANBF7xS6o`
const placeHldr = `<img src="https://via.placeholder.com/128">`
const $outputList = $(`#bookList`);

$.ajax({
  url: bookUrl + genre + maxResults + key,
}).then(
  (data) => {
    console.log(data.items[1].volumeInfo.imageLinks.thumbnail)
    console.log(data.items.length)
    const loop = (data) => {for (let i = 0; i < data.items.length; i++) {
      const bookImg = (data.items[i].volumeInfo.imageLinks) ? data.items[i].volumeInfo.imageLinks.thumbnail : placeHldr;
      const title = data.items[i].volumeInfo.title
      const author = data.items[i].volumeInfo.authors
      const publisher = data.items[i].volumeInfo.publisher
      const viewUrl = data.items[i].volumeInfo.infoLink
      $outputList.append(`
      <td>
      <a target="_blank" href="${viewUrl}" class="btn btn-secondary"><img src="${bookImg}" class="card-img" alt="..."></a><br><br>
        ${title}<br>
        Author: ${author}<br>
        Publisher: ${publisher}<br>
        <a target="_blank" href="${viewUrl}" class="btn btn-secondary">Read Book</a>
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
  let genre = `+subject:Action`
  $.ajax({
    url: bookUrl + genre + maxResults + key,
  }).then(
    (data) => {
      $outputList.empty()
      const loop = (data) => {for (let i = 0; i < data.items.length; i++) {
        const bookImg = (data.items[i].volumeInfo.imageLinks) ? data.items[i].volumeInfo.imageLinks.thumbnail : placeHldr;
        const title = data.items[i].volumeInfo.title;
        const author = data.items[i].volumeInfo.authors;
        const publisher = data.items[i].volumeInfo.publisher;
        const viewUrl = data.items[i].volumeInfo.infoLink;
        $outputList.append(`
          <td>
            <a target="_blank" href="${viewUrl}" class="btn btn-secondary"><img src="${bookImg}" class="card-img" alt="..."></a><br><br>
            ${title}<br>
            Author: ${author}<br>
            Publisher: ${publisher}<br>
            <a target="_blank" href="${viewUrl}" class="btn btn-secondary">Read Book</a>
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
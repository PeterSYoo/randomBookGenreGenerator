const bookUrl = `https://www.googleapis.com/books/v1/volumes?q=`
const genre = `subject:Science+Fiction`
const key = `&key=AIzaSyA2fp1D9TrSW7x5WJy_gOEkk5ANBF7xS6o`
const placeHldr = `<img src="https://via.placeholder.com/150">`

const $outputList = $(`#bookList`);

$.ajax({
  url: bookUrl + genre + key,
  dataType: `json`,
}).then(
  (data) => {
    console.log(data.items[1].volumeInfo.imageLinks.thumbnail)
    console.log(data.items.length)
    const loop = (data) => {for (let i = 0; i < data.items.length; i++) {
      const bookImg = data.items[i].volumeInfo.imageLinks.thumbnail
      const title = data.items[i].volumeInfo.title
      const author = data.items[i].volumeInfo.authors
      const publisher = data.items[i].volumeInfo.publisher
      const viewUrl = data.items[i].volumeInfo.infoLink
      $outputList.append(`
      <td>
        <img src="${bookImg}" class="card-img" alt="..."><br>
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

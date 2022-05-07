$.ajax({
  url:'https://www.googleapis.com/books/v1/volumes?q=subject:Science+Fiction&orderBy=newest&key=AIzaSyA2fp1D9TrSW7x5WJy_gOEkk5ANBF7xS6o'
}).then(
  (data) => {
   console.log(data);
  },
  (error) => {
   console.log('bad request', error);
  }
);

// key=AIzaSyA2fp1D9TrSW7x5WJy_gOEkk5ANBF7xS6o


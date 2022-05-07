$.ajax({
  url:'https://openlibrary.org/works/OL45883W.json'
}).then(
  (data) => {
   console.log(data);
  },
  (error) => {
   console.log('bad request', error);
  }
);
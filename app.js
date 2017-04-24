var express = require('express')
var app = express()
var getBook = require('./source/getBook')
var findAll = require('./source/review')


app.get('/api/v1/books/:id', function (request, response) {
  getBook(request.params.id).then(function(books){
    response.json({
      "book": {
          "id": books.id,
          "title": books.title,
          "publisher": {
            "id": books.publisher_id,
            "name": books.publisher
          },
          "author": {
            "id": books.author_id,
            "first_name": books.first_name,
            "last_name": books.last_name
          }
      }
    });
  }, function(){
    response.status(404).json({
        "error": {
          "message": "Book not found"
        }
    });
  });
});


app.get('/api/v1/reviews', function(request,response){
  findAll().then(function(reviews){
    response.json(reviews);},
    function(){
      response.status(404).json({
          "error": {
            "message": "Book not found"
          }
      });
    });

});

app.listen(3000)

var mysql = require('mysql');


function getBook(id){

  return new Promise(function(resolve, reject){

    var connection = mysql.createConnection({
      host       : 'itp460.usc.edu',
      user       : 'student',
      password   : 'ttrojan',
      database   : 'itp405-midterm'
    });
    connection.connect();
    connection.query('SELECT books.id, books.publisher_id, books.author_id, publishers.name as publisher, authors.first_name as first_name, authors.last_name as last_name FROM books INNER JOIN publishers ON books.publisher_id = publishers.id INNER JOIN authors on books.author_id = authors.id WHERE books.id = ?', [ id ], function(error, books){
      if(error){
        reject();
      }else{
        if(books.length === 0){
          reject({
            errorType: '404 HTTP',
            id: id
          });
        }
        else{
          resolve(books[0]);
        }
      }
    });
  });
}

module.exports = getBook;

$(function () {

  $('.delbook').click(function () {
    var book = this.id;
    $.ajax({
      type: "DELETE",
      url: '/api/removebook',
      data: {
        book: book.replace(/_/g,' ')
      },
      success: function () {
        $('.' + book).remove();
      }
    })
  })



})
$(function () {

  $('.delbook').click(function () {
    var book = this.id;
    $.ajax({
      type: "DELETE",
      url: '/api/removebook',
      data: {
        book: book.replace(/_/g, ' ')
      },
      success: function () {
        $('.' + book).remove();
      }
    })
  })

  $('.reqbook').click(function () {
    var book = this.id;
    var owner = $('#'+this.id).prev().children().first().html().trim();
    $.ajax({
      type: "PUT",
      url: '/api/bookrequest',
      data: {
        owner: owner,
        book: book.replace(/_/g, ' ')
      },
      success: function () {
        $("#" + book).addClass('disabled');
      }
    })

  })



})
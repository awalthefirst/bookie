$(function () {


  $('.glyphicon-ok').click(tradeAction);
  $('.glyphicon-remove').click(tradeAction);

  function tradeAction(e) {
     
       
    if (e.target.id === 'gly-ok') {
      var which = 'accepted';
    }
    else {
      var which = 'denied';
    }
    var bookname = $(this).parent().text().trim();

    $.ajax({
      type: "PUT",
      url: '/api/traderesponse',
      data: {
        owner:$("#gly-ok").siblings('.who').attr('id').trim(),
        bookname: bookname,
        action: which
      },
      success: function () {
         window.location.reload();
      }
    })


  }


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
    var owner = $('#' + this.id).prev().children().first().html().trim();
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
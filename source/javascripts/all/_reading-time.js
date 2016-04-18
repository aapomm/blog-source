$(function(){
  var count = 0,
      readingTime = null;

  $('p').each(function(){
    var length = $(this).text().split(' ').length;

    count += length;
  });

  readingTime = Math.round(count/200);

  $('.js-reading-time').text(readingTime + ' minutes');
});

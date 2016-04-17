$(function(){
  $('.qed-box').hover(function(){
    var $target = $($(this).data('target'));

    console.log($target);
    $target.toggleClass('hidden');
  });
});

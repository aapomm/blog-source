$(function(){
  $('.qed-box').hover(function(){
    var $target = $($(this).data('target'));
    $target.toggleClass('hidden');
  });
});

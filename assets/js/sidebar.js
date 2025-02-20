$(document).ready(() => {
  $(document).mouseup(function (e) {
    var container = $(".tooltipster-base");

    // if the target of the click isn't the container nor a descendant of the container
    if (!container.is(e.target) && container.has(e.target).length === 0) {
      container.remove();
    }
  });
});

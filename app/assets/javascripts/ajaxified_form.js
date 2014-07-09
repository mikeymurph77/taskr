$(function(){
  $("#new_task_form").submit(function(){
    $.post(
      "/tasks",
      $("#new_task_form").serialize()
    ).done(function(html){
      $("#tasks").prepend(html);
      $("#errors").html("");
      $("#task_title, #task_body").val("");
    }).fail(function(xhr){
      var html = xhr.responseText;
      $("#errors").html(html);
    });

    return false;
	});

  $("ul").on("click", ".completed_checkbox", completedTask);

  function completedTask(event){
    var formEl = $(event.target).parents("form");
    $.ajax({
      url: formEl.prop("action"),
      data: formEl.serialize(),
      type: "PATCH"
    }).done(function(){
      formEl.parents("li").fadeOut();
    });
  };


    $(".delete").click(function(event){
      $(event.target).hide();
      $(".options").show();

      return false;
    });

    $(".cancel").click(function(){
      $(".options").hide();
      $(".delete").show();

      return false;
    });

});
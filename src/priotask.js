const inpValue = document.getElementsByClassName("txtb");
const inpLvl = document.getElementsByClassName("priorityLevel");
let tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];

  $(".txtb").on("keyup",function(e){
    //13  means enter button
    if(e.keyCode == 13 && $(".txtb").val() != "")
    {
        var task = $("<div class='task' value=''></div>").text($(".txtb").val());
        task.attr("value", $(".txtb").val());
        var currText = task.attr("value");
        var del = $("<i class='fas fa-trash-alt'></i>").click(function(){
          var p = $(this).parent();
          
          p.fadeOut(function(){
            p.remove();
          });

          tasks = tasks.filter(t => t.title !== currText);
          localStorage.setItem('tasks', JSON.stringify(tasks));
          console.log(tasks);
        });
        
      console.log(currText);
      console.log(tasks);
      console.log(task);

      var check = $("<i class='fas fa-check'></i>").click(function(){
        var p = $(this).parent();

        p.fadeOut(function(){
          $(".comp").append(p);
          p.fadeIn();

          currTask = tasks.find(t => t.title === p.attr("value"));
          currTask.status = "checked";
          localStorage.setItem('tasks', JSON.stringify(tasks));
          //find
          //ubah status
          // update localstorage
        });
        
        $(this).remove();
      });

      task.append(del,check);
        
        // masuk ke localStorage
      const ddl = $(".priorityLevel").val(); 
      const value = $(".txtb").val();
      task.value = $(".txtb").val();
      switch (ddl){
        case "High" :
          $(".HighPrio").append(task); break;

        case "Medium" :
          $(".MedPrio").append(task); break;

        case "Low" :
          $(".LowPrio").append(task); break;
      }

      tasks.push({
        title: value,
        priority: ddl,
        status: "unchecked"
      });

      localStorage.setItem('tasks', JSON.stringify(tasks));
      //to clear the input
      $(".txtb").val("");
  }
});

function load(){
  tasks.forEach(currTask => {
    
    const prio = currTask.priority;
    const value = currTask.title;
   
    var task = $("<div class='task'></div>").text(value);
      var del = $("<i class='fas fa-trash-alt'></i>").click(function(){
        var p = $(this).parent();
        p.fadeOut(function(){
          p.remove();
        });

        tasks = tasks.filter(t => t.title !== value);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        console.log(tasks);
      });

      var check = $("<i class='fas fa-check'></i>").click(function(){
        var p = $(this).parent();
        p.fadeOut(function(){
          $(".comp").append(p);
          p.fadeIn();
        });
        currTask = tasks.find(t => t.title === value);
        currTask.status = "checked";
        localStorage.setItem('tasks', JSON.stringify(tasks));
        $(this).remove();
      });

      
      if(currTask.status == "checked") {
        $(".comp").append(task);
        task.append(del);
      }
      else{
        task.append(del, check);
        switch (prio){
          case "High" :
            $(".HighPrio").append(task); break;

          case "Medium" :
            $(".MedPrio").append(task); break;

          case "Low" :
            $(".LowPrio").append(task); break;
        }
      }
        
        //to clear the input
      $(".txtb").val("");
  });
}

load();


  



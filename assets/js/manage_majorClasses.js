(function(){

  //function to delete record by settin id on form and then submitting the form
  //sets value of grade id in hidden delete form and submits form
  //not completely ideal but wanted to take advantage of flash messages in sails
  function deleteRecord(record_id){
    $("#deleteform input[name=major_class_id]").val(record_id);
    $("#deleteform").submit();
  }

  function getMajorClass(record_id){
    return $.get("http://localhost:1337/majorClass/" + record_id, function(data){
      console.log("got majorClass");
    })
  }

  $(function(){

    //initialize variables for items in the DOM we will work with
    let manageMajorClassForm = $("#manageMajorClassForm");
    let addMajorClassButton = $("#addMajorClassButton");

    //add grade button functionality
    addMajorClassButton.click(function(){
      manageMajorClassForm[0].reset()
      manageMajorClassForm.attr("action", "/create_majorClass");
      manageMajorClassForm.dialog({
        title: "Add Record",
        width: 700,
        modal: true,
        buttons: {
          Cancel: function() {
            $( this ).dialog( "close" );
          },
          "Submit": function() {
            //function to delete record
            manageMajorClassForm.submit()
          }
        }
      });
    })

  	$("#majorClassTable").on("click", "#editButton", function(e){
      let recordId = $(this).data("majorclassid")
      manageMajorClassForm.find("input[name=major_class_id]").val(recordId);
      manageMajorClassForm.attr("action", "/update_majorClass");
      let majorClass = getMajorClass(recordId);



      //populate form when api call is done (after we get grade to edit)
      majorClass.done(function(data){
        $.each(data, function(name, val){
            var $el = $('[name="'+name+'"]'),
                type = $el.attr('type');

            switch(type){
                case 'checkbox':
                    $el.attr('checked', 'checked');
                    break;
                case 'radio':
                    $el.filter('[value="'+val+'"]').attr('checked', 'checked');
                    break;
                default:
                    $el.val(val);
            }
        });
      })

      manageMajorClassForm.dialog({
        title: "Add Record",
        width: 700,
        modal: true,
        buttons: {
          Cancel: function() {
            $( this ).dialog( "close" );
          },
          Submit: function() {
            //function to delete record
            manageMajorClassForm.submit()
          }


        }
      });
    })


    $("#majorClassTable").on("click", "#deleteButton", function(e){
      let recordId = $(this).data("majorclassid")
      console.log(recordId)
      $("#deleteConfirm").dialog({
        title: "Confirm Delete",
        modal: true,
        buttons: {
          Cancel: function() {
            $( this ).dialog( "close" );
          },
          "Delete MajorClass": function() {
            //function to delete record
            deleteRecord(recordId);
          }
        }
      });
    })


    $("#majorClassTable").DataTable({
      dom: 'Bfrtip',
      buttons: [
        'copy', 'csv', 'excel', 'pdf', 'print'
      ],
      colReorder: true,
      "scrollX": true

    })

  })

})();

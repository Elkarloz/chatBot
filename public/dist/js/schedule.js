function saveDataSchedule(){$.ajax({url:"/api/auto/schedule",method:"POST",dataType:"json",data:{key:$("#keySchedule").val(),text:$("#dataSchedule").val()},success:function(e){window.location.href="/Schedule"},error:function(e,d,a){toastr.error(a),scheduleModalEditBootsrap.hide()}})}function setDataSchedule(e,d){$("#keySchedule").val(e),$("#dataSchedule").val(d),scheduleModalEditBootsrap.show()}const scheduleModalEdit=document.getElementById("scheduleModalEdit"),scheduleModalEditBootsrap=new bootstrap.Modal(scheduleModalEdit);scheduleModalEditBootsrap._config.backdrop="static";
function getUsers(){
        $.ajax({
            type: 'POST',
            url: 'userAction.php',
            data: 'action_type=view&'+$("#userForm").serialize(),
            success:function(html){
                $('#userData').html(html);
            }
        });
    }
    function userAction(type,id){
        id = (typeof id == "undefined")?'':id;
        var statusArr = {add:"added",edit:"updated",delete:"deleted"};
        var userData = '';
        if (type == 'add') {
            userData = $("#addForm").find('.form').serialize()+'&action_type='+type+'&id='+id;
        }else if (type == 'edit'){
            userData = $("#editForm").find('.form').serialize()+'&action_type='+type;
        }else{
            userData = 'action_type='+type+'&id='+id;
        }
        $.ajax({
            type: 'POST',
            url: 'userAction.php',
            data: userData,
            success:function(msg){
                if(msg == 'ok'){
                    alert('User data has been '+statusArr[type]+' successfully.');
                    getUsers();
                    $('.form')[0].reset();
                    $('.formData').slideUp();
                }else{
                    alert('Some problem occurred, please try again.');
                }
            }
        });
    }
    function editUser(id){
        $.ajax({
            type: 'POST',
            dataType:'JSON',
            url: 'userAction.php',
            data: 'action_type=data&id='+id,
            success:function(data){
                $('#idEdit').val(data.id);
                $('#nameEdit').val(data.name);
                $('#emailEdit').val(data.email);
                $('#phoneEdit').val(data.phone);
                $('#editForm').slideDown();
            }
        });
    }
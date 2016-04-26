$(document).ready(function() {
    setDataUsers();
    enabledPass();
    SetData('Persons','json-datalistpersons');
});

$('#newPassword1').on('input', function(){
	enabledPass();
});

function enabledPass(){
	if ($('#newPassword1').val().length > 0 ){
		$('#newPassword2').removeAttr('disabled');
	}else{
		$('#newPassword2').attr('disabled', true);
	}
}

$('#save').on('click', function(){
	if (($('#newPassword1').val() === $('#newPassword2').val()) && 
		$('#newPassword1').val().length != 0 &&
		$('#newPassword2').val().length != 0) {
		window.alert("bueno");
		getUserInfo();
	}else{
		$("#error").fadeToggle(1500);
		$("#error").fadeToggle(1500);
	}
});

function SetData(input, datalist){
	var value = input.toLowerCase();
	// Get the <datalist> and <input> elements.
	var dataList = document.getElementById(datalist);
	var input = document.getElementById(input);
	// Create a new XMLHttpRequest.
	var request = new XMLHttpRequest();

  	// Handle state changes for the request.
  	request.onreadystatechange = function(response) {
    if (request.readyState === 4) {
    	if (request.status === 200) {
	        // Parse the JSON
	        var jsonOptions = JSON.parse(request.responseText);
	        // Loop over the JSON array.
	        jsonOptions.forEach(function(item) {
	        	// Create a new <option> element.
	          	var option = document.createElement('option');
				// Set the value using the item in the JSON array.
				option.text = item.id;
				option.setAttribute("data", item.id);
				option.value = item.name;
				// Add the <option> element to the <datalist>.
				dataList.appendChild(option);
	        }); 
			// Update the placeholder text.
			input.placeholder = value+"...";
      	} else {
			// An error occured :(
			input.placeholder = "No se pudo cargar la lista de opciones :(";
		}
    }
  };
  // Update the placeholder text.
  input.placeholder = "Cargando opciones...";
  // Set up and make the request.
  request.open('GET', '../Ajax/'+value+'/', true);
  request.send();
}

function setDataUsers(){
  	$.ajax({
    	method: "POST",
    	url: "../Ajax/getdataforuserstable/",
    	success: function(data){
			console.log(data);
			var jsonOptions = JSON.parse(data);
			var table = document.getElementById("table");
			while(table.rows.length > 1) {
				table.deleteRow(1);
			}

			// Loop over the JSON array.
			for($index = 0; $index < jsonOptions.length; $index++){
				var row = table.insertRow(1);
				var cell0 = row.insertCell(0);
				var cell1 = row.insertCell(1);
				var cell2 = row.insertCell(2);
				var cell3 = row.insertCell(3);
				cell0.innerHTML = jsonOptions[$index]['usuario'];
				cell1.innerHTML = jsonOptions[$index]['description'];
				cell2.innerHTML = '<a class="button EditUser" onclick="Edituser(this)"  id="EditUser" data="'+jsonOptions[$index]['id']+'"  role="button">Editar</a>';
				cell3.innerHTML = '<a class="button DeleteUser" onclick="Deleteuser(this)" id="DeleteUser" data="'+jsonOptions[$index]['id']+'" role="button">Eliminar</a>'; 
			}
		},
		error: function(e){
			console.log(e);
		}
	}); 
}

function getUserInfo(){
	var postData = {
		"name": document.getElementById("password").value
	}
	var dataString = JSON.stringify(postData);
	$.ajax({
		method: "POST",
		data: {action:dataString},
		url: "../Ajax/getusersinfo/",
		success: function(data){
			var jsonOptions = JSON.parse(data);
			console.log(data);
			console.log(jsonOptions['usuario']);
		},
		error: function(e){
		console.log(e);
		}
	}); 
}

function Deleteuser(datainput){
	var id = $(datainput).closest("tr").find(".EditUser").attr("data");
	var index = $(datainput).closest("tr").index();

	console.log(id);
	console.log(index);

	var postData = {
		"id":id
	}
	var dataString = JSON.stringify(postData);

	//make a json request to delete 1 person.
	$.ajax({
		method: "POST",
		data: {action:dataString},
		url: "../Ajax/deleteUser/",
		success: function(data){
			$("#alert").html(data);
			console.log(data);
			var index = $(datainput).closest("tr").index();
			document.getElementById("table").deleteRow(index); 
		},
		error: function(e){
			$("#alert").html(e);
			console.log(e);
		}
	});
}

$('#addUser').on('click', function(){
	Adduser();
});
$( ".EditUser" ).click(function() {
  Edituser(this);
});
$( "#CloseAddModal" ).click(function() {
   $("#openModal").css("opacity", "0");
   $("#openModal").css("pointer-events", "none");
});

function Edituser(datainput){
	$("#alert").css("display", "none");
	document.getElementById("EditPerson").text = 'Guardar cambios';
	//$("#divAddPerson").addClass("hidden");
	$('#Persons').attr('disabled', true);
	$("#AddPerson").addClass("hidden");
	$("#EditPerson").removeClass("hidden");
	document.getElementById("Name").value = "";
	document.getElementById("Profile").value = "";
	document.getElementById("Persons").value = "";
	document.getElementById("Password").value = "";
	document.getElementById("Password2").value = "";

	var index = $(datainput).closest("tr").index();
	var $ID = $(datainput).attr("data");
	console.log($ID);

	var table = document.getElementById("table");
	var $Name = table.rows[index].cells[0].innerHTML;
	var $Profile = table.rows[index].cells[1].innerHTML;

	document.getElementById("AddPerson").setAttribute("data", $ID);
	document.getElementById("AddPerson").setAttribute("index", index);
	document.getElementById("Name").value = $Name;
	document.getElementById("Profile").value = $Profile;

	$("#openModal").css("opacity", "1");
	$("#openModal").css("pointer-events", "auto");
}

$("#EditPerson").on("click", function(){
	var usuario = document.getElementById("Name").value;
	var clave = document.getElementById("Password").value;
	var clave2 = document.getElementById("Password2").value;

	if (!usuario || 0 === usuario.length) {
		$("#alert").css("display", "initial");
	    $("#alert").html("Fill in a usuario!");
	}
	else if(!clave || 0 === clave.length){
	    $("#alert").css("display", "initial");
	    $("#alert").html("Fill in a clave!");
	}
	else if(clave.length < 6){
	    $("#alert").css("display", "initial");
	    $("#alert").html("clave muy corta!");
	}
	else if(!clave2 || 0 === clave2.length){
	    $("#alert").css("display", "initial");
	    $("#alert").html("Fill in a clave2!");
	}
	else if(clave !== clave2){
	    $("#alert").css("display", "initial");
	    $("#alert").html("Contraseñas no coinciden!");
	}
	else{
		var id = $("#AddPerson").attr("data");
		var postData = {
			"id":id,
			"usuario":usuario,
			"clave":clave,
		}
		var dataString = JSON.stringify(postData);
		$.ajax({
			method: "POST",
			data: {action:dataString},
			url: "../Ajax/addUser/",
			success: function(data){
				var jsonOptions = JSON.parse(data);
				console.log(data);
				var table = document.getElementById("table");
                var row = table.insertRow(1);
				var cell0 = row.insertCell(0);
				var cell1 = row.insertCell(1);
				var cell2 = row.insertCell(2);
				var cell3 = row.insertCell(3);
				cell0.innerHTML = jsonOptions[0]['usuario'];
				cell1.innerHTML = jsonOptions[0]['description'];
				cell2.innerHTML = '<a class="button EditUser" onclick="Edituser(this)"  id="EditUser" data="'+jsonOptions[0]['id']+'"  role="button">Editar</a>';
				cell3.innerHTML = '<a class="button DeleteUser" onclick="Deleteuser(this)" id="DeleteUser" data="'+jsonOptions[0]['id']+'" role="button">Eliminar</a>'; 

				$("#openModal").css("opacity", "0");
                $("#openModal").css("pointer-events", "none");
			},
			error: function(e){
				console.log(e);
			}
		});
	}

	//INCOMPLETO
});

function Adduser(){
	$("#alert").css("display", "none");
	document.getElementById("AddPerson").text = 'Agregar usuario';

	//$("#divAddPerson").removeClass("hidden");
	$('#Persons').removeAttr('disabled');
	$("#AddPerson").removeClass("hidden");
	$("#EditPerson").addClass("hidden");
	document.getElementById("Name").value = "";
	document.getElementById("Profile").value = "";
	document.getElementById("Persons").value = "";
	document.getElementById("Password").value = "";
	document.getElementById("Password2").value = "";

	$("#openModal").css("opacity", "1");
	$("#openModal").css("pointer-events", "auto");
}

$("#AddPerson").on("click", function(){
	var usuario = document.getElementById("Name").value;
	var person = document.getElementById("Persons").value;
	var clave = document.getElementById("Password").value;
	var clave2 = document.getElementById("Password2").value;

	if (!usuario || 0 === usuario.length) {
		$("#alert").css("display", "initial");
	    $("#alert").html("Fill in a usuario!");
	}
	else if(!person || 0 === person.length){
	    $("#alert").css("display", "initial");
	    $("#alert").html("Fill in a person!");
	}
	else if(!clave || 0 === clave.length){
	    $("#alert").css("display", "initial");
	    $("#alert").html("Fill in a clave!");
	}
	else if(clave.length < 6){
	    $("#alert").css("display", "initial");
	    $("#alert").html("clave muy corta!");
	}
	else if(!clave2 || 0 === clave2.length){
	    $("#alert").css("display", "initial");
	    $("#alert").html("Fill in a clave2!");
	}
	else if(clave !== clave2){
	    $("#alert").css("display", "initial");
	    $("#alert").html("Contraseñas no coinciden!");
	}
	else{
		var person_id = $('[value="'+person+'"]').attr('data');
		var postData = {
			"usuario":usuario,
			"clave":clave,
			"person_id":person_id
		}
		var dataString = JSON.stringify(postData);
		$.ajax({
			method: "POST",
			data: {action:dataString},
			url: "../Ajax/addUser/",
			success: function(data){
				var jsonOptions = JSON.parse(data);
				console.log(data);
				var table = document.getElementById("table");
                var row = table.insertRow(1);
				var cell0 = row.insertCell(0);
				var cell1 = row.insertCell(1);
				var cell2 = row.insertCell(2);
				var cell3 = row.insertCell(3);
				cell0.innerHTML = jsonOptions[0]['usuario'];
				cell1.innerHTML = jsonOptions[0]['description'];
				cell2.innerHTML = '<a class="button EditUser" onclick="Edituser(this)"  id="EditUser" data="'+jsonOptions[0]['id']+'"  role="button">Editar</a>';
				cell3.innerHTML = '<a class="button DeleteUser" onclick="Deleteuser(this)" id="DeleteUser" data="'+jsonOptions[0]['id']+'" role="button">Eliminar</a>'; 

				$("#openModal").css("opacity", "0");
                $("#openModal").css("pointer-events", "none");
			},
			error: function(e){
				console.log(e);
			}
		});
	}

	
});
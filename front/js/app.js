function insertUsers(listElem, users){


    users.forEach( user => {

        let nickname = document.createElement('h3');
        nickname.innerText = user.nickname;
        
        var clickButton = document.createElement('button');
        clickButton.innerText = 'click';
        clickButton.classList.add('more');
        
        var deleteButton = document.createElement('button');
        deleteButton.innerText = 'delete';
        deleteButton.classList.add('delete');

        let li = document.createElement('li');
        li.dataset.nickname=user.nickname;
        //let div = document.createElement('div');

        li.appendChild(nickname);
        li.appendChild(clickButton); 
        li.appendChild(deleteButton);
        
        listElem.appendChild(li);
        //listElem.appendChild(div);
    });

}

function showDiv( user, nickname){

	var thisLi;
	//var div = document.querySelector('div');
	var li = document.querySelectorAll('li');
	for (var i = 0; i < li.length; i++) {
		if (li[i].getAttribute("data-nickname") == nickname) {
			thisLi = li[i];
			thisLi.addEventListener('click', function(e) {
		    	e.stopPropagation();
		    })
		}
	}
	
	var password = document.createElement('h5');
    password.innerText = user.password;
    
    var firstName = document.createElement('h5');
    firstName.innerText = user.firstName;
    
    var lastName = document.createElement('h5');
    lastName.innerText = user.lastName;

    var dateOfBirth = document.createElement('h5');
    dateOfBirth.innerText = user.dateOfBirth;
    
    
    //div.appendChild(author);
    //div.appendChild(isbn);
    //div.appendChild(publisher);
    //div.appendChild(type);

    thisLi.appendChild(password);
    thisLi.appendChild(firstName);
    thisLi.appendChild(lastName);
    thisLi.appendChild(dateOfBirth);
    
}


document.addEventListener("DOMContentLoaded",function(){

	var ul = document.querySelector('ul.users');
	var formDivElem = document.querySelector("div.form-group");
	
	$.ajax({
		url: "http://localhost:8080/users/",
		//url: "http://localhost:8080/users/getUsers",
		type: "GET",
		dataType: "json"
	})
	.done( users => insertUsers(ul, users) );


    $(ul).on('click', function(e){
        if(e.target.classList == 'more') {	
            var parent = e.target.parentElement;
            var nickname = parent.getAttribute("data-nickname");
            $.ajax({
            	url: "http://localhost:8080/users/" + nickname,
            	//url: "http://localhost:8080/users/getUser/" + nickname,
        		type: "GET",
        		dataType: "json"
        	})
        	.done( user => showDiv(user, nickname) );
            //$(ul).find('li').find('.more').off('click');
        } else if(e.target.classList == 'delete') {	
            var parent = e.target.parentElement;
            var nickname = parent.getAttribute("data-nickname");
            $.ajax({
            	url: "http://localhost:8080/users/" + nickname,
            	//url: "http://localhost:8080/users/deleteUser/" + nickname,
        		type: "DELETE",
        		//dataType: "json"
        	})
        	.done( function() { alert('DELETE completed'); } )
            .fail (function() { alert('DELETE failed'); } );
            //$(ul).find('li').find('btn').off('click');
        }
  
    })
    
    
    /*var submit = document.querySelector('.btn');
	$(submit).on('click', function(event) {
		if(event.target.tagName=="BUTTON"){
			event.preventDefault();
			var nickname = document.getElementById("nickname").value;
			var password = document.getElementById("password").value;
			var firstName = document.getElementById("firstName").value;
			var lastName = document.getElementById("lastName").value;
			var dateOfBirth = document.getElementById("dateOfBirth").value;
		}
		$.ajax({
    		//url: "http://localhost:8080/REST_users/users/addUser",
			url: "http://localhost:8080/users/addUser/" + nickname + "/" + password + "/" + firstName + "/" + lastName + "/" + dateOfBirth,
    		data: JSON.stringify({
                "nickname" : nickname,
                "password" : password,
                "firstName" : firstName,
                "lastName" : lastName,
                "dateOfBirth" : dateOfBirth}),
    		contentType: "application/json",
    		type: "POST",
    		dataType: "json"
    	})
    	.done (function() { alert('POST completed'); } )
		.fail (function() { alert('POST failed'); } );
	});*/
    
    
    
    
    var submit = document.querySelector('.btn');
	$(submit).on('click', function(event) {
		if(event.target.tagName=="BUTTON"){
			event.preventDefault();
			var nickname = document.getElementById("nickname").value;
			var password = document.getElementById("password").value;
			var firstName = document.getElementById("firstName").value;
			var lastName = document.getElementById("lastName").value;
			var dateOfBirth = document.getElementById("dateOfBirth").value;
		}
		$.ajax({
			url: "http://localhost:8080/users/",
			//url: "http://localhost:8080/users/addUser",
			//url: "http://localhost:8080/users/addUser/" + nickname + "/" + password + "/" + firstName + "/" + lastName + "/" + dateOfBirth,
    		data: JSON.stringify({
                "nickname" : nickname,
                "password" : password,
                "firstName" : firstName,
                "lastName" : lastName,
                "dateOfBirth" : dateOfBirth}),
    		contentType: "application/json",
    		type: "POST",
    		dataType: "json"
    	})
    	.done (function() { alert('POST completed'); } )
		.fail (function() { alert('POST failed'); } );
	});

});
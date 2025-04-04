/**
 * 
 */

function getDetails(){
	jQuery.ajax({
        url: "http://localhost:8080/book_service/rest/books/" + $("#id").val(),
        type: "GET",
        contentType: "application/json",  
        dataType:'json',
        success: function(data, textStatus, errorThrown) {
            //here is your json.
              // process it
        	  $("#title").text(data.title);
        	  $("#price").text(data.price);

        },
        error : function(jqXHR, textStatus, errorThrown) {
        		$("#title").text("Sorry! Book not found!");
        		$("#price").text("");
        },
        timeout: 120000,
    });
};

// Add a New Book
function addBook() {
    let title = $("#newTitle").val();
    let price = $("#newPrice").val();

    if (!title || isNaN(price)) {
        $("#addResponse").html("Please enter valid title and price!");
        return;
    }

    let bookData = {
        id: Math.floor(Math.random() * 1000),
        title: title,
        price: parseFloat(price)
    };

    $.ajax({
        url: "http://localhost:8080/book_service/rest/books",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(bookData),
        success: function() {
            $("#addResponse").html("Book added successfully!");
        },
        error: function() {
            $("#addResponse").html("Error adding book.");
        }
    });
}

// Delete a Book
function deleteBook() {
    let id = $("#deleteId").val();
    $.ajax({
        url: "http://localhost:8080/book_service/rest/books" + "/" + id,
        type: "DELETE",
        success: function() {
            $("#deleteResponse").html("Book deleted successfully!");
        },
        error: function() {
            $("#deleteResponse").html("Error deleting book.");
        }
    });
}
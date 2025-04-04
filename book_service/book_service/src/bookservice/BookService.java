package bookservice;

import java.util.List;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("/books")
public class BookService {
    List<Book> books;

    public BookService() {
        books = Books.getBooks();
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Book> getBooks() {
        return books;
    }

    @Path("{id}")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Book getBook(@PathParam("id") int id) {
        for (Book b : books) {
            if (b.getId() == id)
                return b;
        }
        throw new NotFoundException();
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public Response addBook(Book book) {
        Books.addBook(book);
        return Response.status(Response.Status.CREATED).build();
    }

    @Path("{id}")
    @DELETE
    public Response deleteBook(@PathParam("id") int id) {
        boolean removed = Books.removeBook(id);
        if (removed) {
            return Response.status(Response.Status.NO_CONTENT).build();
        } else {
            throw new NotFoundException();
        }
    }
}

package site.nullxweb.siteforclients.exception;

public class UserNotFoundException extends RuntimeException {
    public UserNotFoundException(String username) {
        super("User not found with username: " + username);
    }

    public UserNotFoundException(Integer id) {
        super("User not found with ID: " + id);
    }
}

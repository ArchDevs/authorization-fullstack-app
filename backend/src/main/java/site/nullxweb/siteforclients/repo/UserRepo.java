package site.nullxweb.siteforclients.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import site.nullxweb.siteforclients.model.User;

import java.util.Optional;

public interface UserRepo extends JpaRepository<User, Integer> {
    User findByUsername(String username);
    void deleteByUsername(String username);
}

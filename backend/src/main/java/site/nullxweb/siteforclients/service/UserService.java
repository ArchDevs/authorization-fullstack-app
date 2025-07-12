package site.nullxweb.siteforclients.service;

import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import site.nullxweb.siteforclients.exception.UserNotFoundException;
import site.nullxweb.siteforclients.model.User;
import site.nullxweb.siteforclients.repo.UserRepo;

@Service
@AllArgsConstructor
public class UserService {

    private UserRepo userRepo;

    private PasswordEncoder passwordEncoder;

    public void createUser(User user) {
        System.out.println("creating user");
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepo.save(user);
    }

    public void saveUser(User user) {

    }

    public void deleteUserById(int id) {
        userRepo.deleteById(id);
    }

    public void deleteUserByUsername(String username) {
        userRepo.deleteByUsername(username);
    }

    public User findUserByUsername(String username) {
        return userRepo.findByUsername(username);
    }

    public User findUserById(int id) {
        return userRepo.findById(id).orElseThrow(() -> new UserNotFoundException(id));
    }

}

package site.nullxweb.siteforclients.service;

import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import site.nullxweb.siteforclients.model.User;
import site.nullxweb.siteforclients.model.UserPrincipal;

@Service
@AllArgsConstructor
public class MyUserDetailsService implements UserDetailsService {

    private UserService userService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userService.findUserByUsername(username);

        if (user == null) throw new UsernameNotFoundException("Username " + username + " was not found in database");

        return new UserPrincipal(user);
    }
}

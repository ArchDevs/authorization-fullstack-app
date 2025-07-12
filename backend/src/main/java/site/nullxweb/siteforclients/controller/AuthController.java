package site.nullxweb.siteforclients.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import site.nullxweb.siteforclients.model.Authority;
import site.nullxweb.siteforclients.model.User;
import site.nullxweb.siteforclients.payload.request.LoginRequest;
import site.nullxweb.siteforclients.payload.request.RegisterRequest;
import site.nullxweb.siteforclients.payload.response.Response;
import site.nullxweb.siteforclients.service.JwtService;
import site.nullxweb.siteforclients.service.UserService;

import java.util.List;

@RestController
@RequestMapping("/api/v1/auth")
@AllArgsConstructor
public class AuthController {

    private UserService userService;
    private AuthenticationManager authenticationManager;
    private JwtService jwtService;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody RegisterRequest request) {
        String username = request.username();
        String password = request.password();
        String email = request.email();

        if (userService.findUserByUsername(username) != null)
            return ResponseEntity.badRequest().body(Response.error("user_exists"));

        User user = new User(username, password, email, true);

        Authority authority = new Authority();
        authority.setUsername(username);
        authority.setAuthority("ROLE_USER");
        authority.setUser(user);

        user.setAuthorities(List.of(authority));
        userService.createUser(user);

        return ResponseEntity.ok(Response.success("user_created"));
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest request) {
        String username = request.username();
        String password = request.password();

        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(username, password)
            );
            if (!authentication.isAuthenticated()) {
                return ResponseEntity.badRequest().body(Response.error("user_not_authorized"));
            }

            return ResponseEntity.ok(Response.success(jwtService.generateToken(username)));

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(Response.error("auth_failed"));
        }
    }
}

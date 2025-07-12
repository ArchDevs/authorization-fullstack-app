package site.nullxweb.siteforclients.model;

import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serializable;

@EqualsAndHashCode
@Data
public class AuthorityId implements Serializable {
    private String username;
    private String authority;

}

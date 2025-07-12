package site.nullxweb.siteforclients.payload.response;

public record Response(String status, String message) {

    public static Response success(String message) {
        return new Response("success", message);
    }

    public static Response error(String message) {
        return new Response("error", message);
    }
}

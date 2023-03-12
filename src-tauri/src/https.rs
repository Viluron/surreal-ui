use reqwest::blocking::{Client, Response};

pub fn query(
    url: &str,
    username: &str,
    password: Option<String>,
    namespace: &str,
    query: &str,
) -> Response {
    let client = Client::new();
    let res = client
        .post(url.to_owned() + "/sql")
        .body(query.to_owned())
        .basic_auth(username, password)
        .header("Accept", "application/json")
        .header("NS", namespace)
        .send()
        .unwrap();

    res
}

use reqwest::blocking::{Client, RequestBuilder};

pub fn get_request(method: &str, url: String) -> RequestBuilder {
    let client = Client::new();

    let req;

    match method {
        "get" => req = client.get(url),
        "post" => req = client.post(url),
        "put" => req = client.put(url),
        "delete" => req = client.delete(url),
        "patch" => req = client.patch(url),
        _ => req = client.get(url),
    }

    return req;
}

// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod https;

#[tauri::command]
fn query(
    url: &str,
    username: &str,
    password: Option<String>,
    namespace: &str,
    query: &str,
) -> String {
    let post_url: String = url.to_owned() + "/sql";
    let req = https::get_request("post", post_url);

    let response = req
        .body(query.to_owned())
        .basic_auth(username, password)
        .header("Accept", "application/json")
        .header("NS", namespace)
        .send()
        .unwrap();

    return format!(
        "{{\"status\": \"{}\", \"data\": {}}}",
        response.status(),
        response.text().unwrap()
    );
}

#[tauri::command]
fn http(
    url: &str,
    username: &str,
    password: Option<String>,
    namespace: &str,
    query: &str,
    method: &str,
    database: &str,
    data: &str,
) -> String {
    let post_url: String = url.to_owned() + "/key/" + query;
    let req = https::get_request(method, post_url);

    return req
        .body(data.to_owned())
        .basic_auth(username, password)
        .header("Accept", "application/json")
        .header("NS", namespace)
        .header("DB", database)
        .send()
        .unwrap()
        .text()
        .unwrap();
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![query, http])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

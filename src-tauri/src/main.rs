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
    let response = https::query(&url, &username, password.clone(), &namespace, &query);

    return format!(
        "{{\"status\": \"{}\", \"data\": {}}}",
        response.status(),
        response.text().unwrap()
    );
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![query])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

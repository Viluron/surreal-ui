// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod https;

#[tauri::command]
fn login(url: &str, username: &str, password: Option<String>, namespace: &str) -> bool {
    let response = https::query(
        &url,
        &username,
        password.clone(),
        &namespace,
        "INFO FOR KV;",
    );

    response.status().is_success()
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![login])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

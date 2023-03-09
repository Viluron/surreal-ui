// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use reqwest::blocking::Client;
use reqwest::StatusCode;

mod https;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn login(url: &str, username: &str, password: Option<String>, namespace: &str) -> bool {
    let client = Client::new();
    let res = client
        .post(url.to_owned() + "/sql")
        .body("INFO FOR KV;")
        .basic_auth(username, password)
        .header("Accept", "application/json")
        .header("NS", namespace)
        .send()
        .unwrap();

    let success = res.status() == StatusCode::OK;

    return success;
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![login, greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

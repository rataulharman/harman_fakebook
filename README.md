# Fakebook – Web Application

This project is a simplified social media page where users can create posts, upload images, and view account information in a modal popup. It is built using **HTML**, **CSS**, and **JavaScript (ES Modules)**.

## 📌 Live Demo (GitHub Pages)
👉 **https://rataulharman.github.io/harman_fakebook/**

## Features

### Post System
- Users can post **text**, **images**, or **both**.
- The **Post** button stays disabled if both fields are empty.
- Each post displays:
  - Profile picture  
  - User’s full name  
  - Date and time  
  - Text content  
  - Uploaded image (optional)

### User Account Modal
- Clicking the avatar opens a popup modal.
- Modal shows user data provided by the **getInfo()** method.
- Data includes:
  - Name  
  - Username  
  - Email  
  - Pages  
  - Groups  
  - Monetization status  


## Object-Oriented Structure

### **User Class (Base Class)**
Properties:
- `id`
- `name`
- `userName`
- `email`

Methods:
- Getter methods  
- `getInfo()` (returns user details)

### **Subscriber Class (Child Class)**
Properties:
- `pages` (array)
- `groups` (array)
- `canMonetize` (boolean)

Methods:
- Extends `User`  
- Contains its own `getInfo()` that uses the parent method  


## Technologies Used
- HTML5  
- CSS3  
- JavaScript (ES Modules)  
- Local Development Server (Live Server)


## How to Run
1. Clone or download this repository  
2. Open the folder in VS Code  
3. Right-click `index.html` → **Open with Live Server**  
4. The app runs at:

## Thanks for visiting my site!


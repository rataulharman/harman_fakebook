'use strict';

import Subscriber from "./subscriber.js";

/* ====== Utility Functions ====== */
function listen(event, selector, callback) {
  selector.addEventListener(event, callback);
}

function select(selector) {
  return document.querySelector(selector);
}

/* ====== DOM Elements ====== */
const postForm = select('#postForm');
const postText = select('#postText');
const postImage = select('#postImage');
const postBtn = select('#postBtn');
const postsSection = select('#posts');
const fileNameSpan = select('#fileName');

// Modal
const modal = select('#modal');
const avatarBtn = select('#openModalBtn');
const closeModalX = select('#closeModal');     // FIXED
const closeModalBtn = select('#closeModalBtn');

// Modal fields based on your HTML
const m_name = select('.user-name');           // FIXED
const m_username = select('.username');        // FIXED
const infoItems = document.querySelectorAll('.info-list p'); // email, job, etc.

/* ====== Global Variables ====== */
let selectedImage = null;

/* ====== Create Subscriber ====== */
const mySubscriber = new Subscriber(
  2005,
  'Harmandeep Singh',
  'rataul_harman',
  'rataulharmandeep@gmail.com',
  ['Tech Page', 'Photography'],
  ['Developers Group', 'Cricketer'],
  true
);

/* ====== File Input Handling ====== */
listen('change', postImage, () => {
  if (postImage.files && postImage.files[0]) {
    selectedImage = postImage.files[0];
    fileNameSpan.textContent = selectedImage.name;
  } else {
    selectedImage = null;
    fileNameSpan.textContent = '';
  }
  togglePostButton();
});

/* ====== Enable/Disable Post Button ====== */
function togglePostButton() {
  postBtn.disabled = !postText.value.trim() && !selectedImage;
}

/* ====== Clear Form Inputs ====== */
function clearInputs() {
  postText.value = '';
  postImage.value = '';
  selectedImage = null;
  fileNameSpan.textContent = '';
  togglePostButton();
}

/* ====== Create Post ====== */
function makePost() {
  if (!postText.value.trim() && !selectedImage) return;

  const newPost = document.createElement('div');
  newPost.classList.add('post-card');

  const now = new Date();
  const dateStr = now.toLocaleString([], {
    dateStyle: 'medium',
    timeStyle: 'short'
  });

  newPost.innerHTML = `
    <div class="post-header">
      <div class="post-user">
        <img src="./assets/media/avatar.jpg" alt="avatar">
        <div class="post-meta">
          <span class="name">${mySubscriber.name}</span>
        </div>
      </div>
      <span class="post-date">${dateStr}</span>
    </div>
    <div class="post-body">
      ${postText.value ? `<p>${postText.value}</p>` : ""}
      ${selectedImage ? `<img src="${URL.createObjectURL(selectedImage)}" class="post-image">` : ""}
    </div>
  `;

  postsSection.prepend(newPost);
  clearInputs();
}

/* ====== POST EVENT ====== */
listen('click', postBtn, (e) => {
  e.preventDefault();
  makePost();
});

/* ====== NEW: Fill Modal ====== */
function openStyledModal() {

  m_name.textContent = mySubscriber.name;
  m_username.textContent = "@" + mySubscriber.userName;

  // Your info list:
  // item 0 = email
  // item 1 = profession
  // item 2 = group
  // item 3 = monetize
  infoItems[0].innerHTML = `<i class="icon">📧</i> ${mySubscriber.email}`;
  infoItems[1].innerHTML = `<i class="icon">📄</i> ${mySubscriber.pages.join(", ")}`;
  infoItems[2].innerHTML = `<i class="icon">👥</i> ${mySubscriber.groups.join(", ")}`;
  infoItems[3].innerHTML = `<i class="icon">💰</i> Can Monetize: ${mySubscriber.canMonetize ? "Yes" : "No"}`;

  modal.classList.remove("hidden");
}

/* ====== Close Modal ====== */
function closeStyledModal() {
  modal.classList.add("hidden");
}

/* ====== Modal Listeners ====== */
avatarBtn.addEventListener("click", openStyledModal);
closeModalX.addEventListener("click", closeStyledModal);
closeModalBtn.addEventListener("click", closeStyledModal);

/* ====== Initial Setup ====== */
togglePostButton();

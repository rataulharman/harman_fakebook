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

const modal = select('#modal');
const closeModalBtn = select('#closeModal');
const avatarBtn = select('#openModalBtn');
const accountInfo = select('#accountInfo');

/* ====== Global Variables ====== */
let selectedImage = null;

/* ====== Create Subscriber ====== */
const mySubscriber = new Subscriber(
  2005,
  'Harmandeep Singh',
  'harmandeep_s',
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

/* ====== Post Button Event ====== */
listen('click', postBtn, (e) => {
  e.preventDefault();
  makePost();
});

/* ====== Modal Display ====== */
function displayUserInfo() {
  accountInfo.textContent = mySubscriber.getInfo();
}

function openModal() {
  displayUserInfo();
  modal.classList.remove('hidden');
}

function closeModal() {
  modal.classList.add('hidden');
}

/* ====== Modal Event Listeners ====== */
listen('click', avatarBtn, openModal);
listen('click', closeModalBtn, closeModal);

/* ====== Initial Setup ====== */
togglePostButton();

'use strict';

import Subscriber from "./subscriber.js";

function listen(event, selector, callback) {
  selector.addEventListener(event, callback);
}

function select(selector) {
  return document.querySelector(selector);
}

const postForm = select('#postForm');
const postText = select('#postText');
const postImage = select('#postImage');
const postBtn = select('#postBtn');
const postsSection = select('#posts');
const fileNameSpan = select('#fileName');

// Modal
const modal = select('#modal');
const avatarBtn = select('#openModalBtn');
const closeModalX = select('#closeModal');    
const closeModalBtn = select('#closeModalBtn');


const m_name = select('.user-name');           
const m_username = select('.username');        
const infoItems = document.querySelectorAll('.info-list p'); 


let selectedImage = null;


const mySubscriber = new Subscriber(
  2005,
  'Harmandeep Singh',
  'rataul_harman',
  'rataulharmandeep@gmail.com',
  ['Tech Page', 'Photography'],
  ['Developers Group', 'Cricketer'],
  true
);


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


function togglePostButton() {
  postBtn.disabled = !postText.value.trim() && !selectedImage;
}


function clearInputs() {
  postText.value = '';
  postImage.value = '';
  selectedImage = null;
  fileNameSpan.textContent = '';
  togglePostButton();
}


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

// Post Event
listen('click', postBtn, (e) => {
  e.preventDefault();
  makePost();
});


function openStyledModal() {

  m_name.textContent = mySubscriber.name;
  m_username.textContent = "@" + mySubscriber.userName;

  
  infoItems[0].innerHTML = `<i class="icon">📧</i> ${mySubscriber.email}`;
  infoItems[1].innerHTML = `<i class="icon">📄</i> ${mySubscriber.pages.join(", ")}`;
  infoItems[2].innerHTML = `<i class="icon">👥</i> ${mySubscriber.groups.join(", ")}`;
  infoItems[3].innerHTML = `<i class="icon">💰</i> Can Monetize: ${mySubscriber.canMonetize ? "Yes" : "No"}`;

  modal.classList.remove("hidden");
}


function closeStyledModal() {
  modal.classList.add("hidden");
}

// Modal Listener
avatarBtn.addEventListener("click", openStyledModal);
closeModalX.addEventListener("click", closeStyledModal);
closeModalBtn.addEventListener("click", closeStyledModal);

togglePostButton();

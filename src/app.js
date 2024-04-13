/**
 * Module import
 */
import {
    addEventOnElements,
    activeNotebook,
    makeElemEditable,
  } from "./utils.js";
  import { Tooltip } from "./components/Tooltip.js";
  import { db } from "./db.js";
  import { client } from "./client.js";
  import { NoteModal } from "./components/Modal.js";
  
  /**
   * Toggle sidebar in small screen
   */
  
  const $sidebar = document.querySelector("[data-sidebar]");
  const $sidebarTogglers = document.querySelectorAll("[data-sidebar-toggler]");
  const $overlay = document.querySelector("[data-sidebar-overlay]");
  
  addEventOnElements($sidebarTogglers, "click", function () {
    $sidebar.classList.toggle("active");
    $overlay.classList.toggle("active");
  });
  
  /**
   * Initialize tootip behavior for all DOM elements with [data-tooltip] attribute.
   */
  
  const $tooltipElems = document.querySelectorAll("[data-tooltip]");
  $tooltipElems.forEach(($elem) => Tooltip($elem));
  
  
  /**
   * Show current date on homepage
   */
  
  const $currentDateElem = document.querySelector("[data-current-date]");
  $currentDateElem.textContent = new Date().toDateString().replace(" ", ", ");
  
  /**
   * Notebook create field
   */
  
  const $sidebarList = document.querySelector("[data-sidebar-list]");
  const $addNotebookBtn = document.querySelector("[data-add-notebook]");
  
  /**
   * Shows a notebook creation field in the sidebar when the "Add Notebook" button is clicked.
   * The function dynamically adds a new notebook field element, makes it editable, and listens for the "Enter" key to create a new notebook.
   */
  
  const showNotebookField = function () {
    const $navItem = document.createElement("div");
    $navItem.classList.add("nav-item");
    $navItem.innerHTML = `
          <span class="text text-label-large" data-notebook-field></span>
          <div class="state-layer"></div>
      `;
    $sidebarList.appendChild($navItem);
    const $navItemField = $navItem.querySelector("[data-notebook-field]");
  
    // Active new created notebook and deactivate the previous one
    activeNotebook.call($navItem);
  
    //  Make notebook field content editable and focus
    makeElemEditable($navItemField);
  
    // when user press 'Enter' then create notebook
    $navItemField.addEventListener("keydown", createNotebook);
  };
  
  $addNotebookBtn.addEventListener("click", showNotebookField);
  
  /**
   * Create new notebook
   * Creates a new notebook when the 'Enter' key is pressed while editing a notebook name field
   * The new notebook is stored in the browser's local storage
   * @param {KeyboardEvent} event - The keyboard event that triggered notebook creation
   */
  
  const createNotebook = function (event) {
    if (event.key === "Enter") {
      // Store new created notebook in local storage
      const notebookData = db.post.notebook(this.textContent || "Untitled");
      this.parentElement.remove();
  
      // Render navItem
      client.notebook.create(notebookData);
    }
  };
  
  /**
   * Renders the existing notebook list by retrieving the data from the local storage and passing it to the client.
   */
  const renderExistedNotebook = function () {
    const notebookList = db.get.notebook();
    client.notebook.read(notebookList);
  };
  
  renderExistedNotebook();
  
  /**
   * Create new note
   *
   * Attaches event listeners to a collection of DOM elements representing "Create Note" buttons
   * When a button is clicked, it opens a modal for creating a new note and handles the submission
   * of the new note to the database and client
   */
  
  const $noteCreateBtns = document.querySelectorAll("[data-note-create-btn]");
  
  addEventOnElements($noteCreateBtns, "click", function () {
    // Create and open a new modal
    const modal = NoteModal();
    modal.open();
  
    // Handle the submission of the new note to the database and client
    modal.onSubmit((noteObj) => {
      const activeNotebookId = document.querySelector("[data-notebook].active").dataset.notebook;
      const noteData = db.post.note(activeNotebookId, noteObj);
      client.note.create(noteData);
      modal.close();
    });
  });
  
  /**
   * Render existing notes in the active notebook
   * Retrieves note data from the database based on the active notebook's ID
   * and uses the client to display the notes
   */
  
  const renderExistedNote = function () {
    const activeNotebookId = document.querySelector("[data-notebook].active")?.dataset.notebook;
  
    if (activeNotebookId) {
      const noteList = db.get.note(activeNotebookId);
  
      // Display existing note
      client.note.read(noteList);
    }
  };
  
  renderExistedNote();
  
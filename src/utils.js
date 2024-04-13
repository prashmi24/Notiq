/**
 * Attaches an event listener to a collection of DOM elements
 * @param {Array<HTMLElement>} $elements - An array of DOM elements to attach the event listener to
 * @param {string} eventType - The type of event to listen for (e.g., click, mouseover, etc.)
 * @param {Function} callback - The callback function to execute when the event occurs
 */
function addEventOnElements($elements, eventType, callback) {
    $elements.forEach($element => $element.addEventListener(eventType, callback));
  }
  
  
  let $lastActiveNavItem;
  
  /**
   * Activates a navigation item by adding the 'active' class and deactivates the previously active item.
   */
  function activeNotebook() {
    $lastActiveNavItem?.classList.remove("active");
    this.classList.add("active");
    $lastActiveNavItem = this;
  }
  
  /**
   * Makes a DOM element editable by setting the 'contenteditable' attribute to true and focusing on the element.
   * @param {HTMLElement} $element - The DOM element to make editable
   */
  function makeElemEditable($element) {
    $element.setAttribute("contenteditable", true);
    $element.focus();
  }
  
  /**
   * Generates a unique ID based on the current timestamp
   * @returns {string} A string representation of the current timestamp
   */
  function generateID() {
    return new Date().getTime().toString();
  }
  
  /**
   * Finds a notebook in the database by its ID
   * @param {Object} db - The database containing the notebooks.
   * @param {string} notebookId - The ID of the notebook to find
   * @returns {Object | undefined} The found notebook object, or undefined if not found
   */
  function findNotebook(db, notebookId) {
    return db.notebooks.find(notebook => notebook.id === notebookId);
  }
  
  /**
   * Finds the index of a notebook in an array of notebooks based on its ID.
   * @param {Object} db - The object containing an array of notebooks.
   * @param {string} notebookId - The ID of the notebook to find.
   * @returns {number} - The index of the found notebook, or -1 if not found
   */
  function findNotebookIndex(db, notebookId) {
    return db.notebooks.findIndex(item => item.id === notebookId);
  }
  
  /**
   * Convert a timestamp in milliseconds to a human-readable relative time string
   * @param {number} milliseconds - The timestamp in millisecond to convert.
   * @returns {string} - A string representing the relative time ( e.g. , " just now", "5 min ago", "3 hours ago", "2 days ago").
   */
  function getRelativeTime(milliseconds) {
    const currentTime = new Date().getTime();
    const minute = Math.floor((currentTime - milliseconds) / 1000 / 60);
    const hour = Math.floor(minute / 60);
    const day = Math.floor(hour / 24);
    return minute < 1
      ? "Just now"
      : minute < 60
      ? `${minute} min ago`
      : hour < 24
      ? `${hour} hour ago`
      : `${day} day ago`;
  }
  
  /**
   * Finds a specific note by its ID within a database of notebooks and their notes
   * @param {Object} db - The database containing notebooks and notes.
   * @param {string} noteId - The ID of the note to find
   * @returns {Object | undefined} The found note object, or undefined if not found
   */
  function findNote(db, noteId) {
    let note;
    for (const notebook of db.notebooks) {
      note = notebook.notes.find(note => note.id === noteId);
      if (note) break;
    }
    return note;
  }
  
  /**
   * Finds the index of a note in a notebook's array of notes based on its ID.
   * @param {Object} notebook - The notebook object containing an array of notes
   * @param {string} noteId - The ID of the note to find
   * @returns {number} The index of the found note, or -1 if not found
   */
  function findNoteIndex(notebook, noteId) {
    return notebook.notes.findIndex(note => note.id === noteId);
  }
  
  export {
    addEventOnElements,
    activeNotebook,
    makeElemEditable,
    generateID,
    findNotebook,
    findNotebookIndex,
    getRelativeTime,
    findNote,
    findNoteIndex,
    // $lastActiveNavItem
  };
  
  
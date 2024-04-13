/**
 * Imports necessary functions from utils.js
 */
import {
    generateID,
    findNotebook,
    findNotebookIndex,
    findNote,
    findNoteIndex,
  } from "./utils.js";
  
  // Database Object
  let notekeeperDB = {};
  
  /**
   * Initializes a local database. Loads data from local storage if available,
   * otherwise creates a new empty database structure and stores it in local storage.
   */
  const initializeDB = function () {
    const db = localStorage.getItem("notekeeperDB");
    if (db) {
      notekeeperDB = JSON.parse(db);
    } else {
      notekeeperDB.notebooks = [];
      localStorage.setItem("notekeeperDB", JSON.stringify(notekeeperDB));
    }
  };
  
  initializeDB();
  
  /**
   * Reads and loads data from local storage into the global variable `notekeeperDB`.
   */
  const readDB = function () {
    notekeeperDB = JSON.parse(localStorage.getItem("notekeeperDB"));
  };
  
  /**
   * Writes the current state of the global variable `notekeeperDB` to local storage.
   */
  const writeDB = function () {
    localStorage.setItem("notekeeperDB", JSON.stringify(notekeeperDB));
  };
  
  /**
   * Collection of functions for performing CRUD operations on the database.
   * The database state is managed using global variables and local storage.
   */
  export const db = {
    post: {
      /**
       * Adds a new notebook to the database
       * @param {string} name - The name of the new notebook
       * @returns {Object} - The newly created notebook object
       */
      notebook(name) {
        readDB();
  
        const notebookData = {
          id: generateID(),
          name,
          notes: [],
        };
        notekeeperDB.notebooks.push(notebookData);
        writeDB();
        return notebookData;
      },
  
      /**
       * Adds a new note to a specified notebook in the database
       * @param {string} notebookId - The ID of the notebook to add the note to
       * @param {Object} object - The note object to add
       * @returns {Object} - The newly created note object
       */
      note(notebookId, object) {
        readDB();
  
        const notebook = findNotebook(notekeeperDB, notebookId);
        const noteData = {
          id: generateID(),
          notebookId,
          ...object,
          postedOn: new Date().getTime(),
        };
  
        notebook.notes.unshift(noteData);
        writeDB();
        return noteData;
      },
    },
  
    get: {
      /**
       * Retrieves all notebooks from the database
       * @returns {Array} - An array of notebook objects
       */
      notebook() {
        readDB();
        return notekeeperDB.notebooks;
      },
  
      /**
       * Retrieves all notes within a specified notebook.
       * @param {string} notebookId - The ID of the notebook to retrieve notes from.
       * @return {Array<Object>} - An array of note objects
       */
      note(notebookId) {
        readDB();
  
        const notebook = findNotebook(notekeeperDB, notebookId);
        return notebook.notes;
      },
    },
    update: {
      /**
       * Updates the name of a notebook in the database
       * @param {string} notebookId - The ID of the notebook to update
       * @param {string} name - The new name for the notebook
       * @returns {Object} - The updated notebook object
       */
      notebook(notebookId, name) {
        readDB();
  
        const notebook = findNotebook(notekeeperDB, notebookId);
        notebook.name = name;
        writeDB();
        return notebook;
      },
  
      /**
       * Updates the content of a note in the database
       * @param {string} noteId - The ID of the note to update
       * @param {Object} object - The updated data for the note
       * @returns {Object} - The updated note object
       */
      note(noteId, object) {
        readDB();
  
        const oldNote = findNote(notekeeperDB, noteId);
        const newNote = Object.assign(oldNote, object);
  
        writeDB();
        return newNote;
      },
    },
    delete: {
      /**
       * Deletes a notebook from the database
       * @param {string} notebookId - The ID of the notebook to be deleted
       */
      notebook(notebookId) {
        readDB();
  
        const notebookIndex = findNotebookIndex(notekeeperDB, notebookId);
        notekeeperDB.notebooks.splice(notebookIndex, 1);
        writeDB();
      },
  
      /**
       * Deletes a note from a specified notebook in the database
       * @param {string} notebookId - The ID of the notebook containing the note to delete
       * @param {string} noteId - The ID of the note to delete
       * @returns {Array<Object>} - An array of remaining notes in the notebook
       */
      note(notebookId, noteId) {
        readDB();
  
        const notebook = findNotebook(notekeeperDB, notebookId);
        const noteIndex = findNoteIndex(notebook, noteId);
  
        notebook.notes.splice(noteIndex, 1);
  
        writeDB();
  
        return notebook.notes;
      },
    },
  };
  
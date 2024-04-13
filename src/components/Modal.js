const /**{HTMLElement} */ $overlay = document.createElement("div");
$overlay.classList.add("overlay", "modal-overlay");

/**
 * Creates a modal for adding or editing notes with title, text, and submission functionality
 * @param {string} [title='Untitled'] - The default title for the note
 * @param {string} [text='Add your note...'] - The default text for the note
 * @param {string} [time=''] - The time associated with the note
 * @returns {Object} - An object with functions to open, close, and handle note submissions
 */
const NoteModal = function (title = "", text = "", time = "") {
    const $modal = document.createElement("div");
    $modal.classList.add("modal");
  
    $modal.innerHTML = `
      <button class="icon-btn large" aria-label="Close modal" data-close-btn>
        <span class="material-symbols-rounded" aria-hidden="true">close</span>
        <div class="state-layer"></div>
      </button>
  
      <input
        type="text"
        placeholder="Untitled"
        value="${title}"
        class="modal-title text-title-medium"
        data-note-field
      />
      <textarea
        placeholder="Take a note ..."
        class="modal-text text-body-large custom-scrollbar"
        data-note-field
      >
  ${text}</textarea
      >
      <div class="modal-footer">
        <span class="time text-label-large">${time}</span>
        <button class="btn text" data-submit-btn disabled>
          <span class="text-label-large">Save</span>
          <div class="state-layer"></div>
        </button>
      </div>
    `;
  
    const $submitBtn = $modal.querySelector("[data-submit-btn]");
    const [$titleField, $textField] = $modal.querySelectorAll("[data-note-field]");
  
    const enableSubmit = function () {
      $submitBtn.disabled = !$titleField.value && !$textField.value;
    };
  
    $textField.addEventListener("keyup", enableSubmit);
    $titleField.addEventListener("keyup", enableSubmit);
  
    const open = function () {
      document.body.appendChild($modal);
      document.body.appendChild($overlay);
      $titleField.focus();
    };
  
    const close = function () {
      document.body.removeChild($modal);
      document.body.removeChild($overlay);
    };
  
    const $closeBtn = $modal.querySelector("[data-close-btn]");
    $closeBtn.addEventListener("click", close);
  
    const onSubmit = function (callback) {
      $submitBtn.addEventListener("click", function () {
        const noteData = {
          title: $titleField.value,
          text: $textField.value,
        };
  
        callback(noteData);
      });
    };
  
    return { open, close, onSubmit };
  };
  
  /**
   * Creates a modal for confirming the deletion of a notebook
   * @param {string} title - The title of the notebook to be deleted
   * @returns {Object} - An object with functions to open, close, and handle confirmation
   */
  const DeleteConfirmModal = function (title) {
    const $modal = document.createElement("div");
    $modal.classList.add("modal");
    $modal.innerHTML = `
      <h3 class="modal-title text-title-medium">
        Are you sure you want to delete <strong>${title}</strong>?
      </h3>
      <div class="modal-footer">
        <button class="btn text" data-action-btn="false">
          <span class="text-label-large">Cancel</span>
          <div class="state-layer"></div>
        </button>
        <button class="btn fill" data-action-btn="true">
          <span class="text-label-large">Delete</span>
          <div class="state-layer"></div>
        </button>
      </div>
    `;
  
    const open = function () {
      document.body.appendChild($modal);
      document.body.appendChild($overlay);
    };
  
    const close = function () {
      document.body.removeChild($modal);
      document.body.removeChild($overlay);
    };
  
    const $actionBtns = $modal.querySelectorAll("[data-action-btn]");
  
    const onSubmit = function (callback) {
      $actionBtns.forEach(($btn) =>
        $btn.addEventListener("click", function () {
          const isConfirm = this.dataset.actionBtn === "true";
          callback(isConfirm);
        })
      );
    };
  
    return { open, close, onSubmit };
  };
  
  export { DeleteConfirmModal, NoteModal };
  
export function setButtonText(
  submitBtn,
  isLoading,
  defaultText = "Save",
  loadingText = "Saving..."
) {
  if (isLoading) {
    //set the loading text
    submitBtn.textContent = loadingText;
  } else {
    //set not loading text
    submitBtn.textContent = defaultText;
  }
}

export function setDeleteText(
  cardDeleteBtn,
  isLoading,
  defaultDeleteText = "Delete",
  loadingDeleteText = "Deleting..."
) {
  if (isLoading) {
    cardDeleteBtn.textContent = loadingDeleteText;
  } else {
    cardDeleteBtn.textContent = defaultDeleteText;
  }
}

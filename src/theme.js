
/**
 * This function toggles between light and dark themes
 */
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute("data-theme") || "light";
    const newTheme = currentTheme === "light" ? "dark" : "light";
  
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  }

  function initializeTheme() {

    const storedTheme = localStorage.getItem("theme");
  
    const systemThemeIsDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
 
    const initialTheme = storedTheme || (systemThemeIsDark ? "dark" : "light");
  
    
    document.documentElement.setAttribute("data-theme", initialTheme);
  }
  
  /**
   * This function attaches the toggleTheme function to the theme button click event
   */
  window.addEventListener("DOMContentLoaded", function () {
    const themeButton = document.querySelector("[data-theme-btn]");
 
    if (themeButton) {
      themeButton.addEventListener("click", toggleTheme);
    }
  });

  initializeTheme();
  
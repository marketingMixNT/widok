//FOOTER YEAR
const footerYearSpan = document.querySelector('.footer__year')

const date = new Date()

const currentYear = date.getFullYear()


if(footerYearSpan){
    footerYearSpan.innerHTML = currentYear
}

//NAV CHANGE
const nav = document.querySelector(".desktop-nav-container");
const logo = document.querySelector('.nav--logo')

const height = 250;


window.addEventListener("scroll", () => {
    const actualPos = window.scrollY;

    if (actualPos >= height) {
        logo.style.display='block'

     

    }else{
        logo.style.display='none'

        
    }
});

//COOKIE BAR
// document.addEventListener("DOMContentLoaded", () => {
//     const cookieBox = document.querySelector("#cookieBox");
//     const acceptBtn = document.querySelector("#acceptBtn");



//     const addCookie = () => {
//         document.cookie = "Privacy Policy; max-age=" + 60 * 60 * 24 * 30;
//         checkCookie();
//         cookieBox.classList.add("hidden");
//     };

//     const checkCookie = () => {
//         if (cookieBox && document.cookie.indexOf("Privacy Policy") !== -1) {
//             cookieBox.classList.add("hidden");
//         } else if (cookieBox) {
//             cookieBox.classList.remove("hidden");
//         }
//     };

//     checkCookie();

   
//         acceptBtn.addEventListener("click", addCookie);
    

// });
document.addEventListener("DOMContentLoaded", () => {
    const cookieBox = document.querySelector("#cookieBox");
    const acceptBtn = document.querySelector("#acceptBtn");

    const addLocalStorageItem = () => {
        localStorage.setItem("userConsent", "true");
        checkLocalStorage();
        cookieBox.classList.add("hidden");
    };

    const checkLocalStorage = () => {
        if (cookieBox && localStorage.getItem("userConsent") === "true") {
            cookieBox.classList.add("hidden");
        } else if (cookieBox) {
            cookieBox.classList.remove("hidden");
        }
    };

    checkLocalStorage();

    acceptBtn.addEventListener("click", addLocalStorageItem);
});

//GALLERY 
const filterItem = document.querySelector('.items-links');
const filterImages = document.querySelectorAll('.project-img');
const filterInfo = document.querySelector('.info');

if (filterItem && filterImages.length > 0) {
    window.addEventListener('load', () => {
        const initialFilter = 'gubalowka';

        filterImages.forEach((image) => {
            let filterImageName = image.getAttribute('data-name');
            if (filterImageName === initialFilter) {
                image.style.display = "block";
            } else {
                image.style.display = "none";
            }
        });

        if (filterInfo) {
            filterInfo.querySelectorAll('[data-name]').forEach((infoItem) => {
                let infoName = infoItem.getAttribute('data-name');
                if (infoName === initialFilter) {
                    infoItem.style.display = "block";
                } else {
                    infoItem.style.display = "none";
                }
            });
        }

        filterItem.querySelector(`[data-name="${initialFilter}"]`).classList.add('menu-active');

        filterItem.addEventListener('click', (selectedItem) => {
            if (selectedItem.target.classList.contains('item-link')) {
                document.querySelector('.menu-active').classList.remove('menu-active');
                selectedItem.target.classList.add('menu-active');
                let filterName = selectedItem.target.getAttribute('data-name');

                filterImages.forEach((image) => {
                    let filterImageName = image.getAttribute('data-name');
                    if (filterImageName === filterName || filterName === 'all') {
                        image.style.display = "block";
                    } else {
                        image.style.display = "none";
                    }
                });

                if (filterInfo) {
                    filterInfo.querySelectorAll('[data-name]').forEach((infoItem) => {
                        let infoName = infoItem.getAttribute('data-name');
                        if (infoName === filterName || filterName === 'all') {
                            infoItem.style.display = "block";
                        } else {
                            infoItem.style.display = "none";
                        }
                    });
                }
            }
        });
    });
}




 // Function to fetch language data
 async function fetchLanguageData(lang) {
    const response = await fetch(`languages/${lang}.json`);
    return response.json();
  }
  
  // Function to set the language preference
  function setLanguagePreference(lang) {
    localStorage.setItem('language', lang);
    location.reload();
  }
  
  // Function to update content based on selected language
function updateContent(langData, lang) {
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      element.textContent = langData[key];
    });
  
    // Update the 'lang' attribute of the <html> element
    document.documentElement.lang = lang;

    document.querySelector('#Name').placeholder = langData['name_placeholder'];
    document.querySelector('#phone').placeholder = langData['phone_placeholder'];
    document.querySelector('#Email').placeholder = langData['email_placeholder'];
    document.querySelector('#Message').placeholder = langData['message_placeholder'];
    document.querySelector('input[type=submit]').value = langData['submit_button'];
  }
  
  // Function to change language
  async function changeLanguage(lang) {
    await setLanguagePreference(lang);
    
    const langData = await fetchLanguageData(lang);
    updateContent(langData, lang);
  }
  
  // Call updateContent() on page load
  window.addEventListener('DOMContentLoaded', async () => {
    const userPreferredLanguage = localStorage.getItem('language') || 'pl';
    const langData = await fetchLanguageData(userPreferredLanguage);
    updateContent(langData, userPreferredLanguage);
  });



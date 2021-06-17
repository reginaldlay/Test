var theme;

getCookie('theme') === '' ? theme = 'light' : theme = (getCookie('theme'));
setThemeTrans(theme);

var switcher = document.getElementById('realSwitcher');

if(theme == 'dark')
    switcher.click();

switcher.addEventListener('change', confirmCheck);
var currTheme = document.getElementById('theme');

function confirmCheck() {
    if (theme == "dark"){
        setThemeTrans('light');
        theme = "light";
    }
      
    else {
        setThemeTrans('dark');
        theme = "dark";
    }
}
//onclick event for switcher
//set cookie

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    var expires = 'expires=' + d.toUTCString();
    document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
}
  
function getCookie(cname) {
    var name = cname + '=';
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
  
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        console.log( c.substring(name.length, c.length))
        return c.substring(name.length, c.length);
      }
    }
    return '';
}

function setThemeTrans(_theme) {
    console.log(theme);
    fetch(`themes/${_theme}.css`)
      .then(response => {
        if (response.status === 200) {
          response
            .text()
            .then(css => {
              setCookie('theme', theme, 90);
              document.querySelector('#theme').setAttribute('href', `themes/${theme}.css`);
            })
            .catch(err => console.error(err));
        } else {
          console.log(`theme ${theme} is undefine`);
        }
      })
  .catch(err => console.error(err));
}
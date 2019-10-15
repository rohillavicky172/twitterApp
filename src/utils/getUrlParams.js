function getUrlVars() {
    var vars = {};
     window.location.href.replace(
      /[?&]+([^=&]+)=([^&]*)/gi,
      function(m, key, value) {
        vars[key] = value;
      }
    );
    return vars;
  }

 export const getUrlParam = (parameter, defaultvalue) => {
    var urlparameter = defaultvalue;
    if (window.location.href.indexOf(parameter) > -1) {
      urlparameter = getUrlVars()[parameter];
    }
    return urlparameter;
  }

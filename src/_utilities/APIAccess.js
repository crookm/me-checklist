class API {
  constructor(game) {
    this.apiBase = "https://me-checklist-api.azurewebsites.net/api";
    this.apiCodes = {
      writeMerge: "0HCZD/leGgCc6kXNwljTgKAJqLvRdaZXSFaSk13FBDCEC0NaskNY8g=="
    };

    this.game = game;

    this.writeMerge = this._debounce((link, data, successCB, errorCB) => {
      this._writeMerge(link, data, successCB, errorCB);
    }, 1000 * 2);
    this._writeMerge = this._writeMerge.bind(this);
  }

  _debounce(func, wait, immediate) {
    var timeout;
    return function() {
      var context = this,
        args = arguments;

      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };

      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }

  _writeMerge(link, data, successCB, errorCB) {
    window.$.ajax({
      url: `${this.apiBase}/write/merge/${this.game}/${link}?code=${
        this.apiCodes["writeMerge"]
      }`,
      type: "POST",
      contentType: "application/json",

      data: data || "{}",
      dataType: "json",

      success: data => successCB(data),
      error: err => errorCB(err)
    });
  }
}

export default API;

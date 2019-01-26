class API {
  constructor(game) {
    this.apiBase = "https://us-central1-me-checklist.cloudfunctions.net";
    this.ajaxReqs = [];
    this.game = game;

    this.writeMerge = this._debounce((link, data, successCB, errorCB) => {
      this._writeMerge(link, data, successCB, errorCB);
    }, 1000 * 2);
    this._writeMerge = this._writeMerge.bind(this);
  }

  closeAll() {
    this.ajaxReqs.forEach(req => req.abort());
    this.ajaxReqs = [];
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
    let ajaxReq = window.$.ajax({
      url: `${this.apiBase}/writemerge?game=${this.game}`,
      type: "POST",
      contentType: "application/json",

      data: JSON.stringify({ passphrase: link, data: data || {} }),

      success: data => {
        this.ajaxReqs.splice(ajaxReqIndex, 1);
        successCB(data);
      },
      error: err => {
        this.ajaxReqs.splice(ajaxReqIndex, 1);
        if (err.statusText !== "abort") {
          errorCB(err);
        } else console.info("API._writeMerge ajax call was aborted.");
      }
    });

    let ajaxReqIndex = this.ajaxReqs.push(ajaxReq).length - 1;
  }
}

export default API;

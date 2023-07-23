var net_mynthon_tipka=(function(exports){'use strict';function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
function _toPrimitive(input, hint) {
  if (typeof input !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (typeof res !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return typeof key === "symbol" ? key : String(key);
}var Positioner = /*#__PURE__*/function () {
  function Positioner() {
    _classCallCheck(this, Positioner);
  }
  _createClass(Positioner, [{
    key: "getBoundingClientRectExtended",
    value: /** Metoda zwraca odległość koordynatów elementu od koordynatów (0, 0) okna */
    function getBoundingClientRectExtended(elem) {
      var rect = elem.getBoundingClientRect();
      var vCenter = rect.top + 0.5 * rect.height;
      var hCenter = rect.left + 0.5 * rect.width;
      return Object.assign(rect, {
        vCenter: vCenter,
        hCenter: hCenter
      });
    }

    /** znajdź najlepsze dopasowanie elementu na ekranie */
  }, {
    key: "findBestFit",
    value: function findBestFit(triggerElementRect, tooltipRect, offset, windowOffset, recommendedFits) {
      var widthRadioForTopBottom = window.innerWidth / (tooltipRect.width + windowOffset + windowOffset);
      if (widthRadioForTopBottom > 1) {
        widthRadioForTopBottom = 1;
      }
      var heightRatioForTop = triggerElementRect.top / (tooltipRect.height + offset + windowOffset);
      if (heightRatioForTop > 1) {
        heightRatioForTop = 1;
      }
      var heightRatioForBottom = (window.innerHeight - triggerElementRect.bottom) / (tooltipRect.height + offset + windowOffset);
      if (heightRatioForBottom > 1) {
        heightRatioForBottom = 1;
      }
      var heightRatioForLeftRight = window.innerHeight / (tooltipRect.height + windowOffset + windowOffset);
      if (heightRatioForLeftRight > 1) {
        heightRatioForLeftRight = 1;
      }
      var widthRatioForLeft = triggerElementRect.left / (tooltipRect.width + offset + windowOffset);
      if (widthRatioForLeft > 1) {
        widthRatioForLeft = 1;
      }
      var widthRatioForRight = (window.innerWidth - triggerElementRect.right) / (tooltipRect.width + offset + windowOffset);
      if (widthRatioForRight > 1) {
        widthRatioForRight = 1;
      }
      var ratios = [];
      for (var i = 0; i < recommendedFits.length; i++) {
        var fitCode = recommendedFits[i];
        if (fitCode === 't') {
          if (widthRadioForTopBottom === 1 && heightRatioForTop === 1) {
            return fitCode;
          } else {
            ratios.push({
              'fitCode': fitCode,
              'ratio': widthRadioForTopBottom + heightRatioForTop
            });
          }
        } else if (fitCode === 'b') {
          if (widthRadioForTopBottom === 1 && heightRatioForBottom === 1) {
            return fitCode;
          } else {
            ratios.push({
              'fitCode': fitCode,
              'ratio': widthRadioForTopBottom + heightRatioForBottom
            });
          }
        } else if (fitCode === 'l') {
          if (heightRatioForLeftRight === 1 && widthRatioForLeft === 1) {
            return fitCode;
          } else {
            ratios.push({
              'fitCode': fitCode,
              'ratio': heightRatioForLeftRight + widthRatioForLeft
            });
          }
        } else if (fitCode === 'r') {
          if (heightRatioForLeftRight === 1 && widthRatioForRight === 1) {
            return fitCode;
          } else {
            ratios.push({
              'fitCode': fitCode,
              'ratio': heightRatioForLeftRight + widthRatioForRight
            });
          }
        }
      }
      ratios.sort(function (a, b) {
        return b.ratio - a.ratio;
      });
      return ratios[0].fitCode;
    }

    /** Jeśli tooltip jest na górze/dole określ najlepsze położenie w poziomie */
  }, {
    key: "calcTopBottomHorizontalPos",
    value: function calcTopBottomHorizontalPos(triggerElementRect, tooltipRect, windowOffset) {
      var tooltipInitialLeft = triggerElementRect.hCenter - 0.5 * tooltipRect.width;
      var leftSpace = triggerElementRect.hCenter - windowOffset - 0.5 * tooltipRect.width;
      var rightSpace = window.innerWidth - triggerElementRect.hCenter - windowOffset - 0.5 * tooltipRect.width;
      if (leftSpace >= 0 && rightSpace >= 0) {
        return tooltipInitialLeft;
      }
      return leftSpace < 0 ? tooltipInitialLeft - leftSpace : tooltipInitialLeft + rightSpace;
    }

    /** Jeśli tooltip jest na lewo/prawo określ najlepsze położenie w pionie */
  }, {
    key: "calcLeftRightVerticalPos",
    value: function calcLeftRightVerticalPos(triggerElementRect, tooltipRect, windowOffset) {
      var tooltipInitialTop = triggerElementRect.vCenter - 0.5 * tooltipRect.height;
      var topSpace = triggerElementRect.vCenter - windowOffset - 0.5 * tooltipRect.height;
      var bottomSpace = window.innerHeight - triggerElementRect.vCenter - windowOffset - 0.5 * tooltipRect.height;
      if (topSpace >= 0 && bottomSpace >= 0) {
        return tooltipInitialTop;
      }
      return topSpace < 0 ? tooltipInitialTop - topSpace : tooltipInitialTop + bottomSpace;
    }

    /** Zwraca obiekt z ostatecznymi koordynatami tooltipa */
  }, {
    key: "getXY",
    value: function getXY(triggerElementRect, tooltipRect, offset, windowOffset, bestFitCode) {
      if (bestFitCode === 't') {
        return {
          'x': window.scrollX + this.calcTopBottomHorizontalPos(triggerElementRect, tooltipRect, windowOffset),
          'y': window.scrollY + triggerElementRect.top - offset - tooltipRect.height
        };
      } else if (bestFitCode === 'b') {
        return {
          'x': window.scrollX + this.calcTopBottomHorizontalPos(triggerElementRect, tooltipRect, windowOffset),
          'y': window.scrollY + triggerElementRect.bottom + offset
        };
      } else if (bestFitCode === 'l') {
        return {
          'x': window.scrollX + triggerElementRect.left - offset - tooltipRect.width,
          'y': window.scrollY + this.calcLeftRightVerticalPos(triggerElementRect, tooltipRect, windowOffset)
        };
      } else if (bestFitCode === 'r') {
        return {
          'x': window.scrollX + triggerElementRect.right + offset,
          'y': window.scrollY + this.calcLeftRightVerticalPos(triggerElementRect, tooltipRect, windowOffset)
        };
      }
    }
  }, {
    key: "getTooltipParameters",
    value: function getTooltipParameters(triggerElement, tooltipElement, options) {
      var triggerElementRect = this.getBoundingClientRectExtended(triggerElement);
      var tooltipRect = this.getBoundingClientRectExtended(tooltipElement);
      var opts = Object.assign({
        'fits': ['t', 'r', 'b', 'l'],
        'offset': 10,
        'windowOffset': 5
      }, options !== null && options !== void 0 ? options : {});
      var bestFit = this.findBestFit(triggerElementRect, tooltipRect, opts.offset, opts.windowOffset, opts.fits);
      return Object.assign(this.getXY(triggerElementRect, tooltipRect, opts.offset, opts.windowOffset, bestFit), {
        bestFit: bestFit
      });
    }
  }]);
  return Positioner;
}();var TipContainer = /*#__PURE__*/function () {
  function TipContainer(options) {
    var _options$divCss;
    _classCallCheck(this, TipContainer);
    this.div = null;
    this.id = new Date().getTime() + '' + Math.round(Math.random() * 10000);
    this.divCss = Object.assign({
      background: '#f9f9f9',
      border: '1px solid #888',
      borderRadius: '3px',
      boxShadow: "#888 0px 0px 3px 0",
      left: '-100000px',
      maxHeight: '500px',
      minHeight: '20px',
      opacity: 0,
      overflow: 'auto',
      padding: "6px",
      position: 'absolute',
      top: '-100000px',
      transition: 'opacity 200ms',
      minWidth: '100px',
      maxWidth: '600px',
      zIndex: 10000
    }, (_options$divCss = options === null || options === void 0 ? void 0 : options.divCss) !== null && _options$divCss !== void 0 ? _options$divCss : {});
  }
  _createClass(TipContainer, [{
    key: "init",
    value: function init() {
      if (!document.getElementById(this.id)) {
        var div = document.createElement('div');
        div.id = this.id;
        this.setStyles(div, this.divCss);
        document.querySelector('body').appendChild(div);
        this.div = div;
      }
      return this;
    }
  }, {
    key: "setStyles",
    value: function setStyles(target) {
      var stylesObject = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      Object.keys(stylesObject).forEach(function (rule) {
        target.style[rule] = stylesObject[rule];
      });
    }
  }, {
    key: "open",
    value: function open(x, y) {
      var div = this.init().getContainer();
      div.classList.add('tipka-opened');
      this.setStyles(div, {
        left: x + 'px',
        top: y + 'px',
        opacity: 1
      });
      return this;
    }
  }, {
    key: "close",
    value: function close() {
      var div = this.init().getContainer();
      div.classList.remove('tipka-opened');
      this.setStyles(div, {
        left: '-100000px',
        top: '-100000px',
        opacity: 0
      });
      return this;
    }
  }, {
    key: "setContent",
    value: function setContent(content) {
      if (typeof content === 'string') {
        this.init().getContainer().innerHTML = content;
      } else if (content instanceof HTMLElement) {
        var container = this.init().getContainer();
        container.innerHTML = '';
        container.appendChild(content);
      }
    }
  }, {
    key: "getContainer",
    value: function getContainer() {
      return this.init().div;
    }
  }]);
  return TipContainer;
}();var Tipka = /*#__PURE__*/function () {
  /**
   *
   * @param {*} options Configuration options.
   * @param {Array} options.fits Preffered position for tooltip. Can be 't', 'r', 'b', 'l'.
   * @param {Object} options.containerCss Object with additional stylec for tooltip.
   * @param {*} options.content Content to be displayed. It can be string or HTMLElement.
   */
  function Tipka(options) {
    var _options$fits,
      _options$content,
      _options$containerCss,
      _this = this;
    _classCallCheck(this, Tipka);
    this._opts = {
      'fits': (_options$fits = options === null || options === void 0 ? void 0 : options.fits) !== null && _options$fits !== void 0 ? _options$fits : ['r', 't', 'b', 'l'],
      'content': (_options$content = options === null || options === void 0 ? void 0 : options.content) !== null && _options$content !== void 0 ? _options$content : '' // to be fixed with tooltip function
    };

    this.container = new TipContainer({
      divCss: (_options$containerCss = options === null || options === void 0 ? void 0 : options.containerCss) !== null && _options$containerCss !== void 0 ? _options$containerCss : {}
    });
    this.positioner = new Positioner();
    this._rollOutCloseDelayTimeoutId = null;
    var divContainer = this.container.init().getContainer();
    divContainer.addEventListener('mouseenter', function (e) {
      clearTimeout(_this._rollOutCloseDelayTimeoutId);
    });
    divContainer.addEventListener('mouseleave', function (e) {
      _this.close();
    });
  }

  /**
   *
   * @param {*} options Configuration options
   * @param {Array} options.fits Preffered position for tooltip. Can be 't', 'r', 'b', 'l'
   * @param {Object} options.containerCss Object with additional stylec for tooltip
   */
  _createClass(Tipka, [{
    key: "setOptions",
    value: function setOptions(options) {
      this._opts = Object.assign(this._opts, options !== null && options !== void 0 ? options : {});
      return this;
    }

    /**
     * Attaches tooltip to trigger.
     *
     * @param {*} trigger Element that triggers tooltip;
     * @param {*} options See constructor options;
     * @returns
     */
  }, {
    key: "attach",
    value: function attach(trigger, options) {
      var _this2 = this;
      // @todo: support for title attribute ahould be addes moewhere here
      trigger.addEventListener('mouseover', function (e) {
        _this2.open(trigger, options);
      });
      trigger.addEventListener('mouseout', function (e) {
        _this2.delayedClose();
      });
      return this;
    }

    /**
     * Open tooltip for trigger.
     *
     * @param {*} trigger Element that triggers tooltip;
     * @param {*} options See constructor options;
     * @returns
     */
  }, {
    key: "open",
    value: function open(trigger, options) {
      trigger.tipkaOpts = options;
      clearTimeout(this._rollOutCloseDelayTimeoutId);
      var content = this.getOpt(trigger, 'content', null);
      if (typeof content === 'function') {
        content(this, trigger);
      } else {
        this.container.setContent(content);
      }
      var xy = this.positioner.getTooltipParameters(trigger, this.container.getContainer(), {
        'fits': this.getOpt(trigger, 'fits', null)
      });
      this.container.open(xy.x, xy.y);
    }
  }, {
    key: "close",
    value: function close() {
      this.container.close();
    }
  }, {
    key: "delayedClose",
    value: function delayedClose(delayMs) {
      delayMs = typeof delayMs === 'number' && delayMs >= 0 ? delayMs : 100;
      this._rollOutCloseDelayTimeoutId = setTimeout(this.close.bind(this), delayMs);
    }
  }, {
    key: "setText",
    value: function setText(content) {
      this.container.setContent(content);
    }
  }, {
    key: "getOpt",
    value: function getOpt(trigger, option, defaultVal) {
      return trigger.tipkaOpts[option] || this._opts[option] || defaultVal;
    }
  }]);
  return Tipka;
}();exports.Tipka=Tipka;return exports;})({});
var net_mynthon=(function(exports){'use strict';function _classCallCheck(instance, Constructor) {
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
        'offset': 20,
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
    _classCallCheck(this, TipContainer);
    this.div = null;
    this.id = new Date().getTime() + '' + Math.round(Math.random() * 10000);
    this.rollOutTimeoutId = null;
  }
  _createClass(TipContainer, [{
    key: "init",
    value: function init() {
      var _this = this;
      if (!document.getElementById(this.id)) {
        var div = document.createElement('div');
        div.id = this.id;
        div.style.background = '#fff';
        div.style.border = '1px solid #bbb';
        div.style.borderRadius = '5px';
        div.style.boxShadow = "#888 0px 0px 4px 0";
        div.style.left = '-100000px';
        div.style.maxHeight = '500px';
        div.style.minHeight = '20px';
        div.style.opacity = 0;
        div.style.overflow = 'auto';
        div.style.padding = "6px";
        div.style.position = 'absolute';
        div.style.top = '-100000px';
        div.style.width = '400px';
        div.style.zIndex = 10000;
        div.addEventListener('mouseenter', function (e) {
          clearTimeout(_this.rollOutTimeoutId);
        });
        div.addEventListener('mouseleave', function (e) {
          _this.delayedClose();
        });
        document.querySelector('body').appendChild(div);
        this.div = div;
      }
      return this;
    }
  }, {
    key: "open",
    value: function open(x, y) {
      clearTimeout(this.rollOutTimeoutId);
      var div = this.init().getContainer();
      div.style.left = x + 'px';
      div.style.top = y + 'px';
      div.style.opacity = 1;
      return this;
    }
  }, {
    key: "close",
    value: function close() {
      var div = this.init().getContainer();
      div.style.left = '-100000px';
      div.style.top = '-100000px';
      div.style.opacity = 0;
      return this;
    }
  }, {
    key: "delayedClose",
    value: function delayedClose(delayMs) {
      delayMs = typeof delayMs === 'number' && delayMs >= 0 ? delayMs : 100;
      this.rollOutTimeoutId = setTimeout(this.close.bind(this), delayMs);
    }
  }, {
    key: "setText",
    value: function setText(text) {
      if (typeof text === 'string') {
        this.init().getContainer().innerHTML = text;
      } else if (text instanceof HTMLElement) {
        this.init().getContainer().appendChild(text);
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
  function Tipka() {
    _classCallCheck(this, Tipka);
    this.container = new TipContainer();
    this.positioner = new Positioner();
    this.options = {};
  }
  _createClass(Tipka, [{
    key: "setOptions",
    value: function setOptions(options) {
      this.options = Object.assign(this.options, options !== null && options !== void 0 ? options : {});
      return this;
    }
  }, {
    key: "attach",
    value: function attach(element, text, options) {
      var _this = this;
      element.addEventListener('mouseover', function (e) {
        var xy = _this.positioner.getTooltipParameters(document.getElementById('test'), _this.container.getContainer(), {
          'fits': ['l', 'r', 't', 'r', 'b', 'l']
        });
        _this.container.setText(text);
        _this.container.open(xy.x, xy.y);
      });
      element.addEventListener('mouseout', function (e) {
        _this.container.delayedClose();
      });
    }
  }]);
  return Tipka;
}();exports.Tipka=Tipka;return exports;})({});
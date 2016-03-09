/*
 * jQuery UI 1.6rc6
 *
 * Copyright (c) 2009 AUTHORS.txt (http://ui.jquery.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI
 */
(function (c) {
    var i = c.fn.remove, d = c.browser.mozilla && (parseFloat(c.browser.version) < 1.9);
    c.ui = {
        version: "1.6rc6",
        plugin: {
            add: function (k, l, n) {
                var m = c.ui[k].prototype;
                for (var j in n) {
                    m.plugins[j] = m.plugins[j] || [];
                    m.plugins[j].push([l, n[j]])
                }
            }, call: function (j, l, k) {
                var n = j.plugins[l];
                if (!n) {
                    return
                }
                for (var m = 0; m < n.length; m++) {
                    if (j.options[n[m][0]]) {
                        n[m][1].apply(j.element, k)
                    }
                }
            }
        },
        contains: function (k, j) {
            return document.compareDocumentPosition ? k.compareDocumentPosition(j) & 16 : k !== j && k.contains(j)
        },
        cssCache: {},
        css: function (j) {
            if (c.ui.cssCache[j]) {
                return c.ui.cssCache[j]
            }
            var k = c('<div class="ui-gen"></div>').addClass(j).css({
                position: "absolute",
                top: "-5000px",
                left: "-5000px",
                display: "block"
            }).appendTo("body");
            c.ui.cssCache[j] = !!((!(/auto|default/).test(k.css("cursor")) || (/^[1-9]/).test(k.css("height")) || (/^[1-9]/).test(k.css("width")) || !(/none/).test(k.css("backgroundImage")) || !(/transparent|rgba\(0, 0, 0, 0\)/).test(k.css("backgroundColor"))));
            try {
                c("body").get(0).removeChild(k.get(0))
            } catch (l) {
            }
            return c.ui.cssCache[j]
        },
        hasScroll: function (m, k) {
            if (c(m).css("overflow") == "hidden") {
                return false
            }
            var j = (k && k == "left") ? "scrollLeft" : "scrollTop", l = false;
            if (m[j] > 0) {
                return true
            }
            m[j] = 1;
            l = (m[j] > 0);
            m[j] = 0;
            return l
        },
        isOverAxis: function (k, j, l) {
            return (k > j) && (k < (j + l))
        },
        isOver: function (o, k, n, m, j, l) {
            return c.ui.isOverAxis(o, n, j) && c.ui.isOverAxis(k, m, l)
        },
        keyCode: {
            BACKSPACE: 8,
            CAPS_LOCK: 20,
            COMMA: 188,
            CONTROL: 17,
            DELETE: 46,
            DOWN: 40,
            END: 35,
            ENTER: 13,
            ESCAPE: 27,
            HOME: 36,
            INSERT: 45,
            LEFT: 37,
            NUMPAD_ADD: 107,
            NUMPAD_DECIMAL: 110,
            NUMPAD_DIVIDE: 111,
            NUMPAD_ENTER: 108,
            NUMPAD_MULTIPLY: 106,
            NUMPAD_SUBTRACT: 109,
            PAGE_DOWN: 34,
            PAGE_UP: 33,
            PERIOD: 190,
            RIGHT: 39,
            SHIFT: 16,
            SPACE: 32,
            TAB: 9,
            UP: 38
        }
    };
    if (d) {
        var f = c.attr, e = c.fn.removeAttr, h = "http://www.w3.org/2005/07/aaa", a = /^aria-/, b = /^wairole:/;
        c.attr = function (k, j, l) {
            var m = l !== undefined;
            return (j == "role" ? (m ? f.call(this, k, j, "wairole:" + l) : (f.apply(this, arguments) || "").replace(b, "")) : (a.test(j) ? (m ? k.setAttributeNS(h, j.replace(a, "aaa:"), l) : f.call(this, k, j.replace(a, "aaa:"))) : f.apply(this, arguments)))
        };
        c.fn.removeAttr = function (j) {
            return (a.test(j) ? this.each(function () {
                this.removeAttributeNS(h, j.replace(a, ""))
            }) : e.call(this, j))
        }
    }
    c.fn.extend({
        remove: function () {
            c("*", this).add(this).each(function () {
                c(this).triggerHandler("remove")
            });
            return i.apply(this, arguments)
        }, enableSelection: function () {
            return this.attr("unselectable", "off").css("MozUserSelect", "").unbind("selectstart.ui")
        }, disableSelection: function () {
            return this.attr("unselectable", "on").css("MozUserSelect", "none").bind("selectstart.ui", function () {
                return false
            })
        }, scrollParent: function () {
            var j;
            if ((c.browser.msie && (/(static|relative)/).test(this.css("position"))) || (/absolute/).test(this.css("position"))) {
                j = this.parents().filter(function () {
                    return (/(relative|absolute|fixed)/).test(c.curCSS(this, "position", 1)) && (/(auto|scroll)/).test(c.curCSS(this, "overflow", 1) + c.curCSS(this, "overflow-y", 1) + c.curCSS(this, "overflow-x", 1))
                }).eq(0)
            } else {
                j = this.parents().filter(function () {
                    return (/(auto|scroll)/).test(c.curCSS(this, "overflow", 1) + c.curCSS(this, "overflow-y", 1) + c.curCSS(this, "overflow-x", 1))
                }).eq(0)
            }
            return (/fixed/).test(this.css("position")) || !j.length ? c(document) : j
        }
    });
    c.extend(c.expr[":"], {
        data: function (l, k, j) {
            return !!c.data(l, j[3])
        }, focusable: function (k) {
            var l = k.nodeName.toLowerCase(), j = c.attr(k, "tabindex");
            return (/input|select|textarea|button|object/.test(l) ? !k.disabled : "a" == l || "area" == l ? k.href || !isNaN(j) : !isNaN(j)) && !c(k)["area" == l ? "parents" : "closest"](":hidden").length
        }, tabbable: function (k) {
            var j = c.attr(k, "tabindex");
            return (isNaN(j) || j >= 0) && c(k).is(":focusable")
        }
    });
    function g(m, n, o, l) {
        function k(q) {
            var p = c[m][n][q] || [];
            return (typeof p == "string" ? p.split(/,?\s+/) : p)
        }

        var j = k("getter");
        if (l.length == 1 && typeof l[0] == "string") {
            j = j.concat(k("getterSetter"))
        }
        return (c.inArray(o, j) != -1)
    }

    c.widget = function (k, j) {
        var l = k.split(".")[0];
        k = k.split(".")[1];
        c.fn[k] = function (p) {
            var n = (typeof p == "string"), o = Array.prototype.slice.call(arguments, 1);
            if (n && p.substring(0, 1) == "_") {
                return this
            }
            if (n && g(l, k, p, o)) {
                var m = c.data(this[0], k);
                return (m ? m[p].apply(m, o) : undefined)
            }
            return this.each(function () {
                var q = c.data(this, k);
                (!q && !n && c.data(this, k, new c[l][k](this, p))._init());
                (q && n && c.isFunction(q[p]) && q[p].apply(q, o))
            })
        };
        c[l] = c[l] || {};
        c[l][k] = function (o, n) {
            var m = this;
            this.namespace = l;
            this.widgetName = k;
            this.widgetEventPrefix = c[l][k].eventPrefix || k;
            this.widgetBaseClass = l + "-" + k;
            this.options = c.extend({}, c.widget.defaults, c[l][k].defaults, c.metadata && c.metadata.get(o)[k], n);
            this.element = c(o).bind("setData." + k, function (q, p, r) {
                if (q.target == o) {
                    return m._setData(p, r)
                }
            }).bind("getData." + k, function (q, p) {
                if (q.target == o) {
                    return m._getData(p)
                }
            }).bind("remove", function () {
                return m.destroy()
            })
        };
        c[l][k].prototype = c.extend({}, c.widget.prototype, j);
        c[l][k].getterSetter = "option"
    };
    c.widget.prototype = {
        _init: function () {
        }, destroy: function () {
            this.element.removeData(this.widgetName).removeClass(this.widgetBaseClass + "-disabled " + this.namespace + "-state-disabled").removeAttr("aria-disabled")
        }, option: function (l, m) {
            var k = l, j = this;
            if (typeof l == "string") {
                if (m === undefined) {
                    return this._getData(l)
                }
                k = {};
                k[l] = m
            }
            c.each(k, function (n, o) {
                j._setData(n, o)
            })
        }, _getData: function (j) {
            return this.options[j]
        }, _setData: function (j, k) {
            this.options[j] = k;
            if (j == "disabled") {
                this.element[k ? "addClass" : "removeClass"](this.widgetBaseClass + "-disabled " + this.namespace + "-state-disabled").attr("aria-disabled", k)
            }
        }, enable: function () {
            this._setData("disabled", false)
        }, disable: function () {
            this._setData("disabled", true)
        }, _trigger: function (l, m, n) {
            var p = this.options[l], j = (l == this.widgetEventPrefix ? l : this.widgetEventPrefix + l);
            m = c.Event(m);
            m.type = j;
            if (m.originalEvent) {
                for (var k = c.event.props.length, o; k;) {
                    o = c.event.props[--k];
                    m[o] = m.originalEvent[o]
                }
            }
            this.element.trigger(m, n);
            return !(c.isFunction(p) && p.call(this.element[0], m, n) === false || m.isDefaultPrevented())
        }
    };
    c.widget.defaults = {disabled: false};
    c.ui.mouse = {
        _mouseInit: function () {
            var j = this;
            this.element.bind("mousedown." + this.widgetName, function (k) {
                return j._mouseDown(k)
            }).bind("click." + this.widgetName, function (k) {
                if (j._preventClickEvent) {
                    j._preventClickEvent = false;
                    return false
                }
            });
            if (c.browser.msie) {
                this._mouseUnselectable = this.element.attr("unselectable");
                this.element.attr("unselectable", "on")
            }
            this.started = false
        }, _mouseDestroy: function () {
            this.element.unbind("." + this.widgetName);
            (c.browser.msie && this.element.attr("unselectable", this._mouseUnselectable))
        }, _mouseDown: function (l) {
            if (l.originalEvent.mouseHandled) {
                return
            }
            (this._mouseStarted && this._mouseUp(l));
            this._mouseDownEvent = l;
            var k = this, m = (l.which == 1), j = (typeof this.options.cancel == "string" ? c(l.target).parents().add(l.target).filter(this.options.cancel).length : false);
            if (!m || j || !this._mouseCapture(l)) {
                return true
            }
            this.mouseDelayMet = !this.options.delay;
            if (!this.mouseDelayMet) {
                this._mouseDelayTimer = setTimeout(function () {
                    k.mouseDelayMet = true
                }, this.options.delay)
            }
            if (this._mouseDistanceMet(l) && this._mouseDelayMet(l)) {
                this._mouseStarted = (this._mouseStart(l) !== false);
                if (!this._mouseStarted) {
                    l.preventDefault();
                    return true
                }
            }
            this._mouseMoveDelegate = function (n) {
                return k._mouseMove(n)
            };
            this._mouseUpDelegate = function (n) {
                return k._mouseUp(n)
            };
            c(document).bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate);
            (c.browser.safari || l.preventDefault());
            l.originalEvent.mouseHandled = true;
            return true
        }, _mouseMove: function (j) {
            if (c.browser.msie && !j.button) {
                return this._mouseUp(j)
            }
            if (this._mouseStarted) {
                this._mouseDrag(j);
                return j.preventDefault()
            }
            if (this._mouseDistanceMet(j) && this._mouseDelayMet(j)) {
                this._mouseStarted = (this._mouseStart(this._mouseDownEvent, j) !== false);
                (this._mouseStarted ? this._mouseDrag(j) : this._mouseUp(j))
            }
            return !this._mouseStarted
        }, _mouseUp: function (j) {
            c(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate);
            if (this._mouseStarted) {
                this._mouseStarted = false;
                this._preventClickEvent = true;
                this._mouseStop(j)
            }
            return false
        }, _mouseDistanceMet: function (j) {
            return (Math.max(Math.abs(this._mouseDownEvent.pageX - j.pageX), Math.abs(this._mouseDownEvent.pageY - j.pageY)) >= this.options.distance)
        }, _mouseDelayMet: function (j) {
            return this.mouseDelayMet
        }, _mouseStart: function (j) {
        }, _mouseDrag: function (j) {
        }, _mouseStop: function (j) {
        }, _mouseCapture: function (j) {
            return true
        }
    };
    c.ui.mouse.defaults = {cancel: null, distance: 1, delay: 0}
})(jQuery);
/*
 * jQuery UI Draggable 1.6rc6
 *
 * Copyright (c) 2009 AUTHORS.txt (http://ui.jquery.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Draggables
 *
 * Depends:
 *	ui.core.js
 */
(function (a) {
    a.widget("ui.draggable", a.extend({}, a.ui.mouse, {
        _init: function () {
            if (this.options.helper == "original" && !(/^(?:r|a|f)/).test(this.element.css("position"))) {
                this.element[0].style.position = "relative"
            }
            (this.options.cssNamespace && this.element.addClass(this.options.cssNamespace + "-draggable"));
            (this.options.disabled && this.element.addClass(this.options.cssNamespace + "-draggable-disabled"));
            this._mouseInit()
        }, destroy: function () {
            if (!this.element.data("draggable")) {
                return
            }
            this.element.removeData("draggable").unbind(".draggable").removeClass(this.options.cssNamespace + "-draggable " + this.options.cssNamespace + "-draggable-dragging " + this.options.cssNamespace + "-draggable-disabled");
            this._mouseDestroy()
        }, _mouseCapture: function (b) {
            var c = this.options;
            if (this.helper || c.disabled || a(b.target).is("." + this.options.cssNamespace + "-resizable-handle")) {
                return false
            }
            this.handle = this._getHandle(b);
            if (!this.handle) {
                return false
            }
            return true
        }, _mouseStart: function (b) {
            var c = this.options;
            this.helper = this._createHelper(b);
            this._cacheHelperProportions();
            if (a.ui.ddmanager) {
                a.ui.ddmanager.current = this
            }
            this._cacheMargins();
            this.cssPosition = this.helper.css("position");
            this.scrollParent = this.helper.scrollParent();
            this.offset = this.element.offset();
            this.offset = {top: this.offset.top - this.margins.top, left: this.offset.left - this.margins.left};
            a.extend(this.offset, {
                click: {left: b.pageX - this.offset.left, top: b.pageY - this.offset.top},
                parent: this._getParentOffset(),
                relative: this._getRelativeOffset()
            });
            this.originalPosition = this._generatePosition(b);
            this.originalPageX = b.pageX;
            this.originalPageY = b.pageY;
            if (c.cursorAt) {
                this._adjustOffsetFromHelper(c.cursorAt)
            }
            if (c.containment) {
                this._setContainment()
            }
            this._trigger("start", b);
            this._cacheHelperProportions();
            if (a.ui.ddmanager && !c.dropBehaviour) {
                a.ui.ddmanager.prepareOffsets(this, b)
            }
            this.helper.addClass(c.cssNamespace + "-draggable-dragging");
            this._mouseDrag(b, true);
            return true
        }, _mouseDrag: function (b, d) {
            this.position = this._generatePosition(b);
            this.positionAbs = this._convertPositionTo("absolute");
            if (!d) {
                var c = this._uiHash();
                this._trigger("drag", b, c);
                this.position = c.position
            }
            if (!this.options.axis || this.options.axis != "y") {
                this.helper[0].style.left = this.position.left + "px"
            }
            if (!this.options.axis || this.options.axis != "x") {
                this.helper[0].style.top = this.position.top + "px"
            }
            if (a.ui.ddmanager) {
                a.ui.ddmanager.drag(this, b)
            }
            return false
        }, _mouseStop: function (c) {
            var d = false;
            if (a.ui.ddmanager && !this.options.dropBehaviour) {
                d = a.ui.ddmanager.drop(this, c)
            }
            if (this.dropped) {
                d = this.dropped;
                this.dropped = false
            }
            if ((this.options.revert == "invalid" && !d) || (this.options.revert == "valid" && d) || this.options.revert === true || (a.isFunction(this.options.revert) && this.options.revert.call(this.element, d))) {
                var b = this;
                a(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function () {
                    b._trigger("stop", c);
                    b._clear()
                })
            } else {
                this._trigger("stop", c);
                this._clear()
            }
            return false
        }, _getHandle: function (b) {
            var c = !this.options.handle || !a(this.options.handle, this.element).length ? true : false;
            a(this.options.handle, this.element).find("*").andSelf().each(function () {
                if (this == b.target) {
                    c = true
                }
            });
            return c
        }, _createHelper: function (c) {
            var d = this.options;
            var b = a.isFunction(d.helper) ? a(d.helper.apply(this.element[0], [c])) : (d.helper == "clone" ? this.element.clone() : this.element);
            if (!b.parents("body").length) {
                b.appendTo((d.appendTo == "parent" ? this.element[0].parentNode : d.appendTo))
            }
            if (b[0] != this.element[0] && !(/(fixed|absolute)/).test(b.css("position"))) {
                b.css("position", "absolute")
            }
            return b
        }, _adjustOffsetFromHelper: function (b) {
            if (b.left != undefined) {
                this.offset.click.left = b.left + this.margins.left
            }
            if (b.right != undefined) {
                this.offset.click.left = this.helperProportions.width - b.right + this.margins.left
            }
            if (b.top != undefined) {
                this.offset.click.top = b.top + this.margins.top
            }
            if (b.bottom != undefined) {
                this.offset.click.top = this.helperProportions.height - b.bottom + this.margins.top
            }
        }, _getParentOffset: function () {
            this.offsetParent = this.helper.offsetParent();
            var b = this.offsetParent.offset();
            if (this.cssPosition == "absolute" && this.scrollParent[0] != document && a.ui.contains(this.scrollParent[0], this.offsetParent[0])) {
                b.left += this.scrollParent.scrollLeft();
                b.top += this.scrollParent.scrollTop()
            }
            if ((this.offsetParent[0] == document.body && a.browser.mozilla) || (this.offsetParent[0].tagName && this.offsetParent[0].tagName.toLowerCase() == "html" && a.browser.msie)) {
                b = {top: 0, left: 0}
            }
            return {
                top: b.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                left: b.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
            }
        }, _getRelativeOffset: function () {
            if (this.cssPosition == "relative") {
                var b = this.element.position();
                return {
                    top: b.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
                    left: b.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
                }
            } else {
                return {top: 0, left: 0}
            }
        }, _cacheMargins: function () {
            this.margins = {
                left: (parseInt(this.element.css("marginLeft"), 10) || 0),
                top: (parseInt(this.element.css("marginTop"), 10) || 0)
            }
        }, _cacheHelperProportions: function () {
            this.helperProportions = {width: this.helper.outerWidth(), height: this.helper.outerHeight()}
        }, _setContainment: function () {
            var e = this.options;
            if (e.containment == "parent") {
                e.containment = this.helper[0].parentNode
            }
            if (e.containment == "document" || e.containment == "window") {
                this.containment = [0 - this.offset.relative.left - this.offset.parent.left, 0 - this.offset.relative.top - this.offset.parent.top, a(e.containment == "document" ? document : window).width() - this.helperProportions.width - this.margins.left, (a(e.containment == "document" ? document : window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top]
            }
            if (!(/^(document|window|parent)$/).test(e.containment) && e.containment.constructor != Array) {
                var c = a(e.containment)[0];
                if (!c) {
                    return
                }
                var d = a(e.containment).offset();
                var b = (a(c).css("overflow") != "hidden");
                this.containment = [d.left + (parseInt(a(c).css("borderLeftWidth"), 10) || 0) + (parseInt(a(c).css("paddingLeft"), 10) || 0) - this.margins.left, d.top + (parseInt(a(c).css("borderTopWidth"), 10) || 0) + (parseInt(a(c).css("paddingTop"), 10) || 0) - this.margins.top, d.left + (b ? Math.max(c.scrollWidth, c.offsetWidth) : c.offsetWidth) - (parseInt(a(c).css("borderLeftWidth"), 10) || 0) - (parseInt(a(c).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left, d.top + (b ? Math.max(c.scrollHeight, c.offsetHeight) : c.offsetHeight) - (parseInt(a(c).css("borderTopWidth"), 10) || 0) - (parseInt(a(c).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top]
            } else {
                if (e.containment.constructor == Array) {
                    this.containment = e.containment
                }
            }
        }, _convertPositionTo: function (f, h) {
            if (!h) {
                h = this.position
            }
            var c = f == "absolute" ? 1 : -1;
            var e = this.options, b = this.cssPosition == "absolute" && !(this.scrollParent[0] != document && a.ui.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent, g = (/(html|body)/i).test(b[0].tagName);
            return {
                top: (h.top + this.offset.relative.top * c + this.offset.parent.top * c - (this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : (g ? 0 : b.scrollTop())) * c),
                left: (h.left + this.offset.relative.left * c + this.offset.parent.left * c - (this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : g ? 0 : b.scrollLeft()) * c)
            }
        }, _generatePosition: function (e) {
            var h = this.options, b = this.cssPosition == "absolute" && !(this.scrollParent[0] != document && a.ui.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent, i = (/(html|body)/i).test(b[0].tagName);
            if (this.cssPosition == "relative" && !(this.scrollParent[0] != document && this.scrollParent[0] != this.offsetParent[0])) {
                this.offset.relative = this._getRelativeOffset()
            }
            var d = e.pageX;
            var c = e.pageY;
            if (this.originalPosition) {
                if (this.containment) {
                    if (e.pageX - this.offset.click.left < this.containment[0]) {
                        d = this.containment[0] + this.offset.click.left
                    }
                    if (e.pageY - this.offset.click.top < this.containment[1]) {
                        c = this.containment[1] + this.offset.click.top
                    }
                    if (e.pageX - this.offset.click.left > this.containment[2]) {
                        d = this.containment[2] + this.offset.click.left
                    }
                    if (e.pageY - this.offset.click.top > this.containment[3]) {
                        c = this.containment[3] + this.offset.click.top
                    }
                }
                if (h.grid) {
                    var g = this.originalPageY + Math.round((c - this.originalPageY) / h.grid[1]) * h.grid[1];
                    c = this.containment ? (!(g - this.offset.click.top < this.containment[1] || g - this.offset.click.top > this.containment[3]) ? g : (!(g - this.offset.click.top < this.containment[1]) ? g - h.grid[1] : g + h.grid[1])) : g;
                    var f = this.originalPageX + Math.round((d - this.originalPageX) / h.grid[0]) * h.grid[0];
                    d = this.containment ? (!(f - this.offset.click.left < this.containment[0] || f - this.offset.click.left > this.containment[2]) ? f : (!(f - this.offset.click.left < this.containment[0]) ? f - h.grid[0] : f + h.grid[0])) : f
                }
            }
            return {
                top: (c - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + (this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : (i ? 0 : b.scrollTop()))),
                left: (d - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + (this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : i ? 0 : b.scrollLeft()))
            }
        }, _clear: function () {
            this.helper.removeClass(this.options.cssNamespace + "-draggable-dragging");
            if (this.helper[0] != this.element[0] && !this.cancelHelperRemoval) {
                this.helper.remove()
            }
            this.helper = null;
            this.cancelHelperRemoval = false
        }, _trigger: function (b, c, d) {
            d = d || this._uiHash();
            a.ui.plugin.call(this, b, [c, d]);
            if (b == "drag") {
                this.positionAbs = this._convertPositionTo("absolute")
            }
            return a.widget.prototype._trigger.call(this, b, c, d)
        }, plugins: {}, _uiHash: function (b) {
            return {
                helper: this.helper,
                position: this.position,
                absolutePosition: this.positionAbs,
                offset: this.positionAbs
            }
        }
    }));
    a.extend(a.ui.draggable, {
        version: "1.6rc6",
        eventPrefix: "drag",
        defaults: {
            appendTo: "parent",
            axis: false,
            cancel: ":input,option",
            connectToSortable: false,
            containment: false,
            cssNamespace: "ui",
            cursor: "default",
            cursorAt: false,
            delay: 0,
            distance: 1,
            grid: false,
            handle: false,
            helper: "original",
            iframeFix: false,
            opacity: false,
            refreshPositions: false,
            revert: false,
            revertDuration: 500,
            scope: "default",
            scroll: true,
            scrollSensitivity: 20,
            scrollSpeed: 20,
            snap: false,
            snapMode: "both",
            snapTolerance: 20,
            stack: false,
            zIndex: false
        }
    });
    a.ui.plugin.add("draggable", "connectToSortable", {
        start: function (b, d) {
            var c = a(this).data("draggable"), e = c.options;
            c.sortables = [];
            a(e.connectToSortable).each(function () {
                a(typeof this == "string" ? this + "" : this).each(function () {
                    if (a.data(this, "sortable")) {
                        var f = a.data(this, "sortable");
                        c.sortables.push({instance: f, shouldRevert: f.options.revert});
                        f._refreshItems();
                        f._trigger("activate", b, c)
                    }
                })
            })
        }, stop: function (b, d) {
            var c = a(this).data("draggable");
            a.each(c.sortables, function () {
                if (this.instance.isOver) {
                    this.instance.isOver = 0;
                    c.cancelHelperRemoval = true;
                    this.instance.cancelHelperRemoval = false;
                    if (this.shouldRevert) {
                        this.instance.options.revert = true
                    }
                    this.instance._mouseStop(b);
                    this.instance.options.helper = this.instance.options._helper;
                    if (c.options.helper == "original") {
                        this.instance.currentItem.css({top: "auto", left: "auto"})
                    }
                } else {
                    this.instance.cancelHelperRemoval = false;
                    this.instance._trigger("deactivate", b, c)
                }
            })
        }, drag: function (c, f) {
            var e = a(this).data("draggable"), b = this;
            var d = function (i) {
                var n = this.offset.click.top, m = this.offset.click.left;
                var g = this.positionAbs.top, k = this.positionAbs.left;
                var j = i.height, l = i.width;
                var p = i.top, h = i.left;
                return a.ui.isOver(g + n, k + m, p, h, j, l)
            };
            a.each(e.sortables, function (g) {
                if (d.call(e, this.instance.containerCache)) {
                    if (!this.instance.isOver) {
                        this.instance.isOver = 1;
                        this.instance.currentItem = a(b).clone().appendTo(this.instance.element).data("sortable-item", true);
                        this.instance.options._helper = this.instance.options.helper;
                        this.instance.options.helper = function () {
                            return f.helper[0]
                        };
                        c.target = this.instance.currentItem[0];
                        this.instance._mouseCapture(c, true);
                        this.instance._mouseStart(c, true, true);
                        this.instance.offset.click.top = e.offset.click.top;
                        this.instance.offset.click.left = e.offset.click.left;
                        this.instance.offset.parent.left -= e.offset.parent.left - this.instance.offset.parent.left;
                        this.instance.offset.parent.top -= e.offset.parent.top - this.instance.offset.parent.top;
                        e._trigger("toSortable", c);
                        e.dropped = this.instance.element;
                        this.instance.fromOutside = e
                    }
                    if (this.instance.currentItem) {
                        this.instance._mouseDrag(c)
                    }
                } else {
                    if (this.instance.isOver) {
                        this.instance.isOver = 0;
                        this.instance.cancelHelperRemoval = true;
                        this.instance.options.revert = false;
                        this.instance._mouseStop(c, true);
                        this.instance.options.helper = this.instance.options._helper;
                        this.instance.currentItem.remove();
                        if (this.instance.placeholder) {
                            this.instance.placeholder.remove()
                        }
                        e._trigger("fromSortable", c);
                        e.dropped = false
                    }
                }
            })
        }
    });
    a.ui.plugin.add("draggable", "cursor", {
        start: function (c, d) {
            var b = a("body"), e = a(this).data("draggable").options;
            if (b.css("cursor")) {
                e._cursor = b.css("cursor")
            }
            b.css("cursor", e.cursor)
        }, stop: function (b, c) {
            var d = a(this).data("draggable").options;
            if (d._cursor) {
                a("body").css("cursor", d._cursor)
            }
        }
    });
    a.ui.plugin.add("draggable", "iframeFix", {
        start: function (b, c) {
            var d = a(this).data("draggable").options;
            a(d.iframeFix === true ? "iframe" : d.iframeFix).each(function () {
                a('<div class="ui-draggable-iframeFix" style="background: #fff;"></div>').css({
                    width: this.offsetWidth + "px",
                    height: this.offsetHeight + "px",
                    position: "absolute",
                    opacity: "0.001",
                    zIndex: 1000
                }).css(a(this).offset()).appendTo("body")
            })
        }, stop: function (b, c) {
            a("div.ui-draggable-iframeFix").each(function () {
                this.parentNode.removeChild(this)
            })
        }
    });
    a.ui.plugin.add("draggable", "opacity", {
        start: function (c, d) {
            var b = a(d.helper), e = a(this).data("draggable").options;
            if (b.css("opacity")) {
                e._opacity = b.css("opacity")
            }
            b.css("opacity", e.opacity)
        }, stop: function (b, c) {
            var d = a(this).data("draggable").options;
            if (d._opacity) {
                a(c.helper).css("opacity", d._opacity)
            }
        }
    });
    a.ui.plugin.add("draggable", "scroll", {
        start: function (c, d) {
            var b = a(this).data("draggable");
            if (b.scrollParent[0] != document && b.scrollParent[0].tagName != "HTML") {
                b.overflowOffset = b.scrollParent.offset()
            }
        }, drag: function (d, e) {
            var c = a(this).data("draggable"), f = c.options, b = false;
            if (c.scrollParent[0] != document && c.scrollParent[0].tagName != "HTML") {
                if (!f.axis || f.axis != "x") {
                    if ((c.overflowOffset.top + c.scrollParent[0].offsetHeight) - d.pageY < f.scrollSensitivity) {
                        c.scrollParent[0].scrollTop = b = c.scrollParent[0].scrollTop + f.scrollSpeed
                    } else {
                        if (d.pageY - c.overflowOffset.top < f.scrollSensitivity) {
                            c.scrollParent[0].scrollTop = b = c.scrollParent[0].scrollTop - f.scrollSpeed
                        }
                    }
                }
                if (!f.axis || f.axis != "y") {
                    if ((c.overflowOffset.left + c.scrollParent[0].offsetWidth) - d.pageX < f.scrollSensitivity) {
                        c.scrollParent[0].scrollLeft = b = c.scrollParent[0].scrollLeft + f.scrollSpeed
                    } else {
                        if (d.pageX - c.overflowOffset.left < f.scrollSensitivity) {
                            c.scrollParent[0].scrollLeft = b = c.scrollParent[0].scrollLeft - f.scrollSpeed
                        }
                    }
                }
            } else {
                if (!f.axis || f.axis != "x") {
                    if (d.pageY - a(document).scrollTop() < f.scrollSensitivity) {
                        b = a(document).scrollTop(a(document).scrollTop() - f.scrollSpeed)
                    } else {
                        if (a(window).height() - (d.pageY - a(document).scrollTop()) < f.scrollSensitivity) {
                            b = a(document).scrollTop(a(document).scrollTop() + f.scrollSpeed)
                        }
                    }
                }
                if (!f.axis || f.axis != "y") {
                    if (d.pageX - a(document).scrollLeft() < f.scrollSensitivity) {
                        b = a(document).scrollLeft(a(document).scrollLeft() - f.scrollSpeed)
                    } else {
                        if (a(window).width() - (d.pageX - a(document).scrollLeft()) < f.scrollSensitivity) {
                            b = a(document).scrollLeft(a(document).scrollLeft() + f.scrollSpeed)
                        }
                    }
                }
            }
            if (b !== false && a.ui.ddmanager && !f.dropBehaviour) {
                a.ui.ddmanager.prepareOffsets(c, d)
            }
        }
    });
    a.ui.plugin.add("draggable", "snap", {
        start: function (c, d) {
            var b = a(this).data("draggable"), e = b.options;
            b.snapElements = [];
            a(e.snap.constructor != String ? (e.snap.items || ":data(draggable)") : e.snap).each(function () {
                var g = a(this);
                var f = g.offset();
                if (this != b.element[0]) {
                    b.snapElements.push({
                        item: this,
                        width: g.outerWidth(),
                        height: g.outerHeight(),
                        top: f.top,
                        left: f.left
                    })
                }
            })
        }, drag: function (u, p) {
            var g = a(this).data("draggable"), q = g.options;
            var y = q.snapTolerance;
            var x = p.absolutePosition.left, w = x + g.helperProportions.width, f = p.absolutePosition.top, e = f + g.helperProportions.height;
            for (var v = g.snapElements.length - 1; v >= 0; v--) {
                var s = g.snapElements[v].left, n = s + g.snapElements[v].width, m = g.snapElements[v].top, A = m + g.snapElements[v].height;
                if (!((s - y < x && x < n + y && m - y < f && f < A + y) || (s - y < x && x < n + y && m - y < e && e < A + y) || (s - y < w && w < n + y && m - y < f && f < A + y) || (s - y < w && w < n + y && m - y < e && e < A + y))) {
                    if (g.snapElements[v].snapping) {
                        (g.options.snap.release && g.options.snap.release.call(g.element, u, a.extend(g._uiHash(), {snapItem: g.snapElements[v].item})))
                    }
                    g.snapElements[v].snapping = false;
                    continue
                }
                if (q.snapMode != "inner") {
                    var c = Math.abs(m - e) <= y;
                    var z = Math.abs(A - f) <= y;
                    var j = Math.abs(s - w) <= y;
                    var k = Math.abs(n - x) <= y;
                    if (c) {
                        p.position.top = g._convertPositionTo("relative", {
                                top: m - g.helperProportions.height,
                                left: 0
                            }).top - g.margins.top
                    }
                    if (z) {
                        p.position.top = g._convertPositionTo("relative", {top: A, left: 0}).top - g.margins.top
                    }
                    if (j) {
                        p.position.left = g._convertPositionTo("relative", {
                                top: 0,
                                left: s - g.helperProportions.width
                            }).left - g.margins.left
                    }
                    if (k) {
                        p.position.left = g._convertPositionTo("relative", {top: 0, left: n}).left - g.margins.left
                    }
                }
                var h = (c || z || j || k);
                if (q.snapMode != "outer") {
                    var c = Math.abs(m - f) <= y;
                    var z = Math.abs(A - e) <= y;
                    var j = Math.abs(s - x) <= y;
                    var k = Math.abs(n - w) <= y;
                    if (c) {
                        p.position.top = g._convertPositionTo("relative", {top: m, left: 0}).top - g.margins.top
                    }
                    if (z) {
                        p.position.top = g._convertPositionTo("relative", {
                                top: A - g.helperProportions.height,
                                left: 0
                            }).top - g.margins.top
                    }
                    if (j) {
                        p.position.left = g._convertPositionTo("relative", {top: 0, left: s}).left - g.margins.left
                    }
                    if (k) {
                        p.position.left = g._convertPositionTo("relative", {
                                top: 0,
                                left: n - g.helperProportions.width
                            }).left - g.margins.left
                    }
                }
                if (!g.snapElements[v].snapping && (c || z || j || k || h)) {
                    (g.options.snap.snap && g.options.snap.snap.call(g.element, u, a.extend(g._uiHash(), {snapItem: g.snapElements[v].item})))
                }
                g.snapElements[v].snapping = (c || z || j || k || h)
            }
        }
    });
    a.ui.plugin.add("draggable", "stack", {
        start: function (b, c) {
            var e = a(this).data("draggable").options;
            var d = a.makeArray(a(e.stack.group)).sort(function (g, f) {
                return (parseInt(a(g).css("zIndex"), 10) || e.stack.min) - (parseInt(a(f).css("zIndex"), 10) || e.stack.min)
            });
            a(d).each(function (f) {
                this.style.zIndex = e.stack.min + f
            });
            this[0].style.zIndex = e.stack.min + d.length
        }
    });
    a.ui.plugin.add("draggable", "zIndex", {
        start: function (c, d) {
            var b = a(d.helper), e = a(this).data("draggable").options;
            if (b.css("zIndex")) {
                e._zIndex = b.css("zIndex")
            }
            b.css("zIndex", e.zIndex)
        }, stop: function (b, c) {
            var d = a(this).data("draggable").options;
            if (d._zIndex) {
                a(c.helper).css("zIndex", d._zIndex)
            }
        }
    })
})(jQuery);
/*
 * jQuery UI Droppable 1.6rc6
 *
 * Copyright (c) 2009 AUTHORS.txt (http://ui.jquery.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Droppables
 *
 * Depends:
 *	ui.core.js
 *	ui.draggable.js
 */
(function (a) {
    a.widget("ui.droppable", {
        _init: function () {
            var c = this.options, b = c.accept;
            this.isover = 0;
            this.isout = 1;
            this.options.accept = this.options.accept && a.isFunction(this.options.accept) ? this.options.accept : function (e) {
                return e.is(b)
            };
            this.proportions = {width: this.element[0].offsetWidth, height: this.element[0].offsetHeight};
            a.ui.ddmanager.droppables[this.options.scope] = a.ui.ddmanager.droppables[this.options.scope] || [];
            a.ui.ddmanager.droppables[this.options.scope].push(this);
            (this.options.cssNamespace && this.element.addClass(this.options.cssNamespace + "-droppable"))
        }, destroy: function () {
            var b = a.ui.ddmanager.droppables[this.options.scope];
            for (var c = 0; c < b.length; c++) {
                if (b[c] == this) {
                    b.splice(c, 1)
                }
            }
            this.element.removeClass(this.options.cssNamespace + "-droppable " + this.options.cssNamespace + "-droppable-disabled").removeData("droppable").unbind(".droppable")
        }, _setData: function (b, c) {
            if (b == "accept") {
                this.options.accept = c && a.isFunction(c) ? c : function (e) {
                    return e.is(accept)
                }
            } else {
                a.widget.prototype._setData.apply(this, arguments)
            }
        }, _activate: function (c) {
            var b = a.ui.ddmanager.current;
            if (this.options.activeClass) {
                this.element.addClass(this.options.activeClass)
            }
            (b && this._trigger("activate", c, this.ui(b)))
        }, _deactivate: function (c) {
            var b = a.ui.ddmanager.current;
            if (this.options.activeClass) {
                this.element.removeClass(this.options.activeClass)
            }
            (b && this._trigger("deactivate", c, this.ui(b)))
        }, _over: function (c) {
            var b = a.ui.ddmanager.current;
            if (!b || (b.currentItem || b.element)[0] == this.element[0]) {
                return
            }
            if (this.options.accept.call(this.element[0], (b.currentItem || b.element))) {
                if (this.options.hoverClass) {
                    this.element.addClass(this.options.hoverClass)
                }
                this._trigger("over", c, this.ui(b))
            }
        }, _out: function (c) {
            var b = a.ui.ddmanager.current;
            if (!b || (b.currentItem || b.element)[0] == this.element[0]) {
                return
            }
            if (this.options.accept.call(this.element[0], (b.currentItem || b.element))) {
                if (this.options.hoverClass) {
                    this.element.removeClass(this.options.hoverClass)
                }
                this._trigger("out", c, this.ui(b))
            }
        }, _drop: function (c, d) {
            var b = d || a.ui.ddmanager.current;
            if (!b || (b.currentItem || b.element)[0] == this.element[0]) {
                return false
            }
            var e = false;
            this.element.find(":data(droppable)").not("." + b.options.cssNamespace + "-draggable-dragging").each(function () {
                var f = a.data(this, "droppable");
                if (f.options.greedy && a.ui.intersect(b, a.extend(f, {offset: f.element.offset()}), f.options.tolerance)) {
                    e = true;
                    return false
                }
            });
            if (e) {
                return false
            }
            if (this.options.accept.call(this.element[0], (b.currentItem || b.element))) {
                if (this.options.activeClass) {
                    this.element.removeClass(this.options.activeClass)
                }
                if (this.options.hoverClass) {
                    this.element.removeClass(this.options.hoverClass)
                }
                this._trigger("drop", c, this.ui(b));
                return this.element
            }
            return false
        }, ui: function (b) {
            return {
                draggable: (b.currentItem || b.element),
                helper: b.helper,
                position: b.position,
                absolutePosition: b.positionAbs,
                offset: b.positionAbs
            }
        }
    });
    a.extend(a.ui.droppable, {
        version: "1.6rc6",
        eventPrefix: "drop",
        defaults: {
            accept: "*",
            activeClass: false,
            cssNamespace: "ui",
            greedy: false,
            hoverClass: false,
            scope: "default",
            tolerance: "intersect"
        }
    });
    a.ui.intersect = function (q, j, o) {
        if (!j.offset) {
            return false
        }
        var e = (q.positionAbs || q.position.absolute).left, d = e + q.helperProportions.width, n = (q.positionAbs || q.position.absolute).top, m = n + q.helperProportions.height;
        var g = j.offset.left, c = g + j.proportions.width, p = j.offset.top, k = p + j.proportions.height;
        switch (o) {
            case"fit":
                return (g < e && d < c && p < n && m < k);
                break;
            case"intersect":
                return (g < e + (q.helperProportions.width / 2) && d - (q.helperProportions.width / 2) < c && p < n + (q.helperProportions.height / 2) && m - (q.helperProportions.height / 2) < k);
                break;
            case"pointer":
                var h = ((q.positionAbs || q.position.absolute).left + (q.clickOffset || q.offset.click).left), i = ((q.positionAbs || q.position.absolute).top + (q.clickOffset || q.offset.click).top), f = a.ui.isOver(i, h, p, g, j.proportions.height, j.proportions.width);
                return f;
                break;
            case"touch":
                return ((n >= p && n <= k) || (m >= p && m <= k) || (n < p && m > k)) && ((e >= g && e <= c) || (d >= g && d <= c) || (e < g && d > c));
                break;
            default:
                return false;
                break
        }
    };
    a.ui.ddmanager = {
        current: null, droppables: {"default": []}, prepareOffsets: function (e, g) {
            var b = a.ui.ddmanager.droppables[e.options.scope];
            var f = g ? g.type : null;
            var h = (e.currentItem || e.element).find(":data(droppable)").andSelf();
            droppablesLoop:for (var d = 0; d < b.length; d++) {
                if (b[d].options.disabled || (e && !b[d].options.accept.call(b[d].element[0], (e.currentItem || e.element)))) {
                    continue
                }
                for (var c = 0; c < h.length; c++) {
                    if (h[c] == b[d].element[0]) {
                        b[d].proportions.height = 0;
                        continue droppablesLoop
                    }
                }
                b[d].visible = b[d].element.css("display") != "none";
                if (!b[d].visible) {
                    continue
                }
                b[d].offset = b[d].element.offset();
                b[d].proportions = {width: b[d].element[0].offsetWidth, height: b[d].element[0].offsetHeight};
                if (f == "mousedown") {
                    b[d]._activate.call(b[d], g)
                }
            }
        }, drop: function (b, c) {
            var d = false;
            a.each(a.ui.ddmanager.droppables[b.options.scope], function () {
                if (!this.options) {
                    return
                }
                if (!this.options.disabled && this.visible && a.ui.intersect(b, this, this.options.tolerance)) {
                    d = this._drop.call(this, c)
                }
                if (!this.options.disabled && this.visible && this.options.accept.call(this.element[0], (b.currentItem || b.element))) {
                    this.isout = 1;
                    this.isover = 0;
                    this._deactivate.call(this, c)
                }
            });
            return d
        }, drag: function (b, c) {
            if (b.options.refreshPositions) {
                a.ui.ddmanager.prepareOffsets(b, c)
            }
            a.each(a.ui.ddmanager.droppables[b.options.scope], function () {
                if (this.options.disabled || this.greedyChild || !this.visible) {
                    return
                }
                var e = a.ui.intersect(b, this, this.options.tolerance);
                var g = !e && this.isover == 1 ? "isout" : (e && this.isover == 0 ? "isover" : null);
                if (!g) {
                    return
                }
                var f;
                if (this.options.greedy) {
                    var d = this.element.parents(":data(droppable):eq(0)");
                    if (d.length) {
                        f = a.data(d[0], "droppable");
                        f.greedyChild = (g == "isover" ? 1 : 0)
                    }
                }
                if (f && g == "isover") {
                    f.isover = 0;
                    f.isout = 1;
                    f._out.call(f, c)
                }
                this[g] = 1;
                this[g == "isout" ? "isover" : "isout"] = 0;
                this[g == "isover" ? "_over" : "_out"].call(this, c);
                if (f && g == "isout") {
                    f.isout = 0;
                    f.isover = 1;
                    f._over.call(f, c)
                }
            })
        }
    }
})(jQuery);
/*
 * jQuery UI Resizable 1.6rc6
 *
 * Copyright (c) 2009 AUTHORS.txt (http://ui.jquery.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Resizables
 *
 * Depends:
 *	ui.core.js
 */
(function (b) {
    b.widget("ui.resizable", b.extend({}, b.ui.mouse, {
        _init: function () {
            var d = this, h = this.options;
            this.element.addClass("ui-resizable");
            b.extend(this, {
                _aspectRatio: !!(h.aspectRatio),
                aspectRatio: h.aspectRatio,
                originalElement: this.element,
                proportionallyResize: h.proportionallyResize ? [h.proportionallyResize] : [],
                _helper: h.helper || h.ghost || h.animate ? h.helper || "ui-resizable-helper" : null
            });
            if (this.element[0].nodeName.match(/canvas|textarea|input|select|button|img/i)) {
                if (/relative/.test(this.element.css("position")) && b.browser.opera) {
                    this.element.css({position: "relative", top: "auto", left: "auto"})
                }
                this.element.wrap(b('<div class="ui-wrapper" style="overflow: hidden;"></div>').css({
                    position: this.element.css("position"),
                    width: this.element.outerWidth(),
                    height: this.element.outerHeight(),
                    top: this.element.css("top"),
                    left: this.element.css("left")
                }));
                this.element = this.element.parent();
                this.elementIsWrapper = true;
                this.element.css({
                    marginLeft: this.originalElement.css("marginLeft"),
                    marginTop: this.originalElement.css("marginTop"),
                    marginRight: this.originalElement.css("marginRight"),
                    marginBottom: this.originalElement.css("marginBottom")
                });
                this.originalElement.css({marginLeft: 0, marginTop: 0, marginRight: 0, marginBottom: 0});
                if (b.browser.safari && h.preventDefault) {
                    this.originalElement.css("resize", "none")
                }
                this.proportionallyResize.push(this.originalElement.css({
                    position: "static",
                    zoom: 1,
                    display: "block"
                }));
                this.originalElement.css({margin: this.originalElement.css("margin")});
                this._proportionallyResize()
            }
            this.handles = h.handles || (!b(".ui-resizable-handle", this.element).length ? "e,s,se" : {
                    n: ".ui-resizable-n",
                    e: ".ui-resizable-e",
                    s: ".ui-resizable-s",
                    w: ".ui-resizable-w",
                    se: ".ui-resizable-se",
                    sw: ".ui-resizable-sw",
                    ne: ".ui-resizable-ne",
                    nw: ".ui-resizable-nw"
                });
            if (this.handles.constructor == String) {
                if (this.handles == "all") {
                    this.handles = "n,e,s,w,se,sw,ne,nw"
                }
                var j = this.handles.split(",");
                this.handles = {};
                for (var e = 0; e < j.length; e++) {
                    var g = b.trim(j[e]), c = "ui-resizable-" + g;
                    var f = b('<div class="ui-resizable-handle ' + c + '"></div>');
                    if (/sw|se|ne|nw/.test(g)) {
                        f.css({zIndex: ++h.zIndex})
                    }
                    if ("se" == g) {
                        f.addClass("ui-icon ui-icon-gripsmall-diagonal-se")
                    }
                    this.handles[g] = ".ui-resizable-" + g;
                    this.element.append(f)
                }
            }
            this._renderAxis = function (o) {
                o = o || this.element;
                for (var l in this.handles) {
                    if (this.handles[l].constructor == String) {
                        this.handles[l] = b(this.handles[l], this.element).show()
                    }
                    if (h.transparent) {
                        this.handles[l].css({opacity: 0})
                    }
                    if (this.elementIsWrapper && this.originalElement[0].nodeName.match(/textarea|input|select|button/i)) {
                        var m = b(this.handles[l], this.element), n = 0;
                        n = /sw|ne|nw|se|n|s/.test(l) ? m.outerHeight() : m.outerWidth();
                        var k = ["padding", /ne|nw|n/.test(l) ? "Top" : /se|sw|s/.test(l) ? "Bottom" : /^e$/.test(l) ? "Right" : "Left"].join("");
                        if (!h.transparent) {
                            o.css(k, n)
                        }
                        this._proportionallyResize()
                    }
                    if (!b(this.handles[l]).length) {
                        continue
                    }
                }
            };
            this._renderAxis(this.element);
            this._handles = b(".ui-resizable-handle", this.element);
            if (h.disableSelection) {
                this._handles.disableSelection()
            }
            this._handles.mouseover(function () {
                if (!d.resizing) {
                    if (this.className) {
                        var i = this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i)
                    }
                    d.axis = i && i[1] ? i[1] : "se"
                }
            });
            if (h.autoHide) {
                this._handles.hide();
                b(this.element).addClass("ui-resizable-autohide").hover(function () {
                    b(this).removeClass("ui-resizable-autohide");
                    d._handles.show()
                }, function () {
                    if (!d.resizing) {
                        b(this).addClass("ui-resizable-autohide");
                        d._handles.hide()
                    }
                })
            }
            this._mouseInit()
        }, destroy: function () {
            this._mouseDestroy();
            var c = function (d) {
                b(d).removeClass("ui-resizable ui-resizable-disabled").removeData("resizable").unbind(".resizable").find(".ui-resizable-handle").remove()
            };
            if (this.elementIsWrapper) {
                c(this.element);
                this.wrapper.parent().append(this.originalElement.css({
                    position: this.wrapper.css("position"),
                    width: this.wrapper.outerWidth(),
                    height: this.wrapper.outerHeight(),
                    top: this.wrapper.css("top"),
                    left: this.wrapper.css("left")
                })).end().remove()
            }
            c(this.originalElement)
        }, _mouseCapture: function (d) {
            var e = false;
            for (var c in this.handles) {
                if (b(this.handles[c])[0] == d.target) {
                    e = true
                }
            }
            return this.options.disabled || !!e
        }, _mouseStart: function (e) {
            var h = this.options, d = this.element.position(), c = this.element;
            this.resizing = true;
            this.documentScroll = {top: b(document).scrollTop(), left: b(document).scrollLeft()};
            if (c.is(".ui-draggable") || (/absolute/).test(c.css("position"))) {
                c.css({position: "absolute", top: d.top, left: d.left})
            }
            if (b.browser.opera && (/relative/).test(c.css("position"))) {
                c.css({position: "relative", top: "auto", left: "auto"})
            }
            this._renderProxy();
            var i = a(this.helper.css("left")), f = a(this.helper.css("top"));
            if (h.containment) {
                i += b(h.containment).scrollLeft() || 0;
                f += b(h.containment).scrollTop() || 0
            }
            this.offset = this.helper.offset();
            this.position = {left: i, top: f};
            this.size = this._helper ? {width: c.outerWidth(), height: c.outerHeight()} : {
                width: c.width(),
                height: c.height()
            };
            this.originalSize = this._helper ? {width: c.outerWidth(), height: c.outerHeight()} : {
                width: c.width(),
                height: c.height()
            };
            this.originalPosition = {left: i, top: f};
            this.sizeDiff = {width: c.outerWidth() - c.width(), height: c.outerHeight() - c.height()};
            this.originalMousePosition = {left: e.pageX, top: e.pageY};
            this.aspectRatio = (typeof h.aspectRatio == "number") ? h.aspectRatio : ((this.originalSize.width / this.originalSize.height) || 1);
            if (h.preserveCursor) {
                var g = b(".ui-resizable-" + this.axis).css("cursor");
                b("body").css("cursor", g == "auto" ? this.axis + "-resize" : g)
            }
            this._propagate("start", e);
            return true
        }, _mouseDrag: function (c) {
            var f = this.helper, e = this.options, k = {}, n = this, h = this.originalMousePosition, l = this.axis;
            var p = (c.pageX - h.left) || 0, m = (c.pageY - h.top) || 0;
            var g = this._change[l];
            if (!g) {
                return false
            }
            var j = g.apply(this, [c, p, m]), i = b.browser.msie && b.browser.version < 7, d = this.sizeDiff;
            if (this._aspectRatio || c.shiftKey) {
                j = this._updateRatio(j, c)
            }
            j = this._respectSize(j, c);
            this._propagate("resize", c);
            f.css({
                top: this.position.top + "px",
                left: this.position.left + "px",
                width: this.size.width + "px",
                height: this.size.height + "px"
            });
            if (!this._helper && this.proportionallyResize.length) {
                this._proportionallyResize()
            }
            this._updateCache(j);
            this._trigger("resize", c, this.ui());
            return false
        }, _mouseStop: function (f) {
            this.resizing = false;
            var g = this.options, k = this;
            if (this._helper) {
                var e = this.proportionallyResize, c = e.length && (/textarea/i).test(e[0].nodeName), d = c && b.ui.hasScroll(e[0], "left") ? 0 : k.sizeDiff.height, i = c ? 0 : k.sizeDiff.width;
                var l = {
                    width: (k.size.width - i),
                    height: (k.size.height - d)
                }, h = (parseInt(k.element.css("left"), 10) + (k.position.left - k.originalPosition.left)) || null, j = (parseInt(k.element.css("top"), 10) + (k.position.top - k.originalPosition.top)) || null;
                if (!g.animate) {
                    this.element.css(b.extend(l, {top: j, left: h}))
                }
                if (this._helper && !g.animate) {
                    this._proportionallyResize()
                }
            }
            if (g.preserveCursor) {
                b("body").css("cursor", "auto")
            }
            this._propagate("stop", f);
            if (this._helper) {
                this.helper.remove()
            }
            return false
        }, _updateCache: function (c) {
            var d = this.options;
            this.offset = this.helper.offset();
            if (c.left) {
                this.position.left = c.left
            }
            if (c.top) {
                this.position.top = c.top
            }
            if (c.height) {
                this.size.height = c.height
            }
            if (c.width) {
                this.size.width = c.width
            }
        }, _updateRatio: function (f, e) {
            var g = this.options, h = this.position, d = this.size, c = this.axis;
            if (f.height) {
                f.width = (d.height * this.aspectRatio)
            } else {
                if (f.width) {
                    f.height = (d.width / this.aspectRatio)
                }
            }
            if (c == "sw") {
                f.left = h.left + (d.width - f.width);
                f.top = null
            }
            if (c == "nw") {
                f.top = h.top + (d.height - f.height);
                f.left = h.left + (d.width - f.width)
            }
            return f
        }, _respectSize: function (j, e) {
            var r = function (o) {
                return !isNaN(parseInt(o, 10))
            };
            var h = this.helper, g = this.options, p = this._aspectRatio || e.shiftKey, n = this.axis, s = r(j.width) && g.maxWidth && (g.maxWidth < j.width), k = r(j.height) && g.maxHeight && (g.maxHeight < j.height), f = r(j.width) && g.minWidth && (g.minWidth > j.width), q = r(j.height) && g.minHeight && (g.minHeight > j.height);
            if (f) {
                j.width = g.minWidth
            }
            if (q) {
                j.height = g.minHeight
            }
            if (s) {
                j.width = g.maxWidth
            }
            if (k) {
                j.height = g.maxHeight
            }
            var d = this.originalPosition.left + this.originalSize.width, m = this.position.top + this.size.height;
            var i = /sw|nw|w/.test(n), c = /nw|ne|n/.test(n);
            if (f && i) {
                j.left = d - g.minWidth
            }
            if (s && i) {
                j.left = d - g.maxWidth
            }
            if (q && c) {
                j.top = m - g.minHeight
            }
            if (k && c) {
                j.top = m - g.maxHeight
            }
            var l = !j.width && !j.height;
            if (l && !j.left && j.top) {
                j.top = null
            } else {
                if (l && !j.top && j.left) {
                    j.left = null
                }
            }
            return j
        }, _proportionallyResize: function () {
            var h = this.options;
            if (!this.proportionallyResize.length) {
                return
            }
            var e = this.helper || this.element;
            for (var d = 0; d < this.proportionallyResize.length; d++) {
                var f = this.proportionallyResize[d];
                if (!this.borderDif) {
                    var c = [f.css("borderTopWidth"), f.css("borderRightWidth"), f.css("borderBottomWidth"), f.css("borderLeftWidth")], g = [f.css("paddingTop"), f.css("paddingRight"), f.css("paddingBottom"), f.css("paddingLeft")];
                    this.borderDif = b.map(c, function (j, l) {
                        var k = parseInt(j, 10) || 0, m = parseInt(g[l], 10) || 0;
                        return k + m
                    })
                }
                if (b.browser.msie && !(!(b(e).is(":hidden") || b(e).parents(":hidden").length))) {
                    continue
                }
                f.css({
                    height: (e.height() - this.borderDif[0] - this.borderDif[2]) || 0,
                    width: (e.width() - this.borderDif[1] - this.borderDif[3]) || 0
                })
            }
        }, _renderProxy: function () {
            var d = this.element, g = this.options;
            this.elementOffset = d.offset();
            if (this._helper) {
                this.helper = this.helper || b('<div style="overflow:hidden;"></div>');
                var c = b.browser.msie && b.browser.version < 7, e = (c ? 1 : 0), f = (c ? 2 : -1);
                this.helper.addClass(this._helper).css({
                    width: this.element.outerWidth() + f,
                    height: this.element.outerHeight() + f,
                    position: "absolute",
                    left: this.elementOffset.left - e + "px",
                    top: this.elementOffset.top - e + "px",
                    zIndex: ++g.zIndex
                });
                this.helper.appendTo("body");
                if (g.disableSelection) {
                    this.helper.disableSelection()
                }
            } else {
                this.helper = this.element
            }
        }, _change: {
            e: function (e, d, c) {
                return {width: this.originalSize.width + d}
            }, w: function (f, d, c) {
                var h = this.options, e = this.originalSize, g = this.originalPosition;
                return {left: g.left + d, width: e.width - d}
            }, n: function (f, d, c) {
                var h = this.options, e = this.originalSize, g = this.originalPosition;
                return {top: g.top + c, height: e.height - c}
            }, s: function (e, d, c) {
                return {height: this.originalSize.height + c}
            }, se: function (e, d, c) {
                return b.extend(this._change.s.apply(this, arguments), this._change.e.apply(this, [e, d, c]))
            }, sw: function (e, d, c) {
                return b.extend(this._change.s.apply(this, arguments), this._change.w.apply(this, [e, d, c]))
            }, ne: function (e, d, c) {
                return b.extend(this._change.n.apply(this, arguments), this._change.e.apply(this, [e, d, c]))
            }, nw: function (e, d, c) {
                return b.extend(this._change.n.apply(this, arguments), this._change.w.apply(this, [e, d, c]))
            }
        }, _propagate: function (d, c) {
            b.ui.plugin.call(this, d, [c, this.ui()]);
            (d != "resize" && this._trigger(d, c, this.ui()))
        }, plugins: {}, ui: function () {
            return {
                originalElement: this.originalElement,
                element: this.element,
                helper: this.helper,
                position: this.position,
                size: this.size,
                originalSize: this.originalSize,
                originalPosition: this.originalPosition
            }
        }
    }));
    b.extend(b.ui.resizable, {
        version: "1.6rc6",
        eventPrefix: "resize",
        defaults: {
            alsoResize: false,
            animate: false,
            animateDuration: "slow",
            animateEasing: "swing",
            aspectRatio: false,
            autoHide: false,
            cancel: ":input,option",
            containment: false,
            delay: 0,
            disableSelection: true,
            distance: 1,
            ghost: false,
            grid: false,
            handles: "e,s,se",
            helper: false,
            maxHeight: null,
            maxWidth: null,
            minHeight: 10,
            minWidth: 10,
            preserveCursor: true,
            preventDefault: true,
            proportionallyResize: false,
            transparent: false,
            zIndex: 1000
        }
    });
    b.ui.plugin.add("resizable", "alsoResize", {
        start: function (d, e) {
            var c = b(this).data("resizable"), f = c.options;
            _store = function (g) {
                b(g).each(function () {
                    b(this).data("resizable-alsoresize", {
                        width: parseInt(b(this).width(), 10),
                        height: parseInt(b(this).height(), 10),
                        left: parseInt(b(this).css("left"), 10),
                        top: parseInt(b(this).css("top"), 10)
                    })
                })
            };
            if (typeof(f.alsoResize) == "object" && !f.alsoResize.parentNode) {
                if (f.alsoResize.length) {
                    f.alsoResize = f.alsoResize[0];
                    _store(f.alsoResize)
                } else {
                    b.each(f.alsoResize, function (g, h) {
                        _store(g)
                    })
                }
            } else {
                _store(f.alsoResize)
            }
        }, resize: function (e, g) {
            var d = b(this).data("resizable"), h = d.options, f = d.originalSize, j = d.originalPosition;
            var i = {
                height: (d.size.height - f.height) || 0,
                width: (d.size.width - f.width) || 0,
                top: (d.position.top - j.top) || 0,
                left: (d.position.left - j.left) || 0
            }, c = function (k, l) {
                b(k).each(function () {
                    var o = b(this), p = b(this).data("resizable-alsoresize"), n = {}, m = l && l.length ? l : ["width", "height", "top", "left"];
                    b.each(m || ["width", "height", "top", "left"], function (q, s) {
                        var r = (p[s] || 0) + (i[s] || 0);
                        if (r && r >= 0) {
                            n[s] = r || null
                        }
                    });
                    if (/relative/.test(o.css("position")) && b.browser.opera) {
                        d._revertToRelativePosition = true;
                        o.css({position: "absolute", top: "auto", left: "auto"})
                    }
                    o.css(n)
                })
            };
            if (typeof(h.alsoResize) == "object" && !h.alsoResize.nodeType) {
                b.each(h.alsoResize, function (k, l) {
                    c(k, l)
                })
            } else {
                c(h.alsoResize)
            }
        }, stop: function (d, e) {
            var c = b(this).data("resizable");
            if (c._revertToRelativePosition && b.browser.opera) {
                c._revertToRelativePosition = false;
                el.css({position: "relative"})
            }
            b(this).removeData("resizable-alsoresize-start")
        }
    });
    b.ui.plugin.add("resizable", "animate", {
        stop: function (g, l) {
            var m = b(this).data("resizable"), h = m.options;
            var f = h.proportionallyResize, c = f && (/textarea/i).test(f.get(0).nodeName), d = c && b.ui.hasScroll(f.get(0), "left") ? 0 : m.sizeDiff.height, j = c ? 0 : m.sizeDiff.width;
            var e = {
                width: (m.size.width - j),
                height: (m.size.height - d)
            }, i = (parseInt(m.element.css("left"), 10) + (m.position.left - m.originalPosition.left)) || null, k = (parseInt(m.element.css("top"), 10) + (m.position.top - m.originalPosition.top)) || null;
            m.element.animate(b.extend(e, k && i ? {top: k, left: i} : {}), {
                duration: h.animateDuration,
                easing: h.animateEasing,
                step: function () {
                    var n = {
                        width: parseInt(m.element.css("width"), 10),
                        height: parseInt(m.element.css("height"), 10),
                        top: parseInt(m.element.css("top"), 10),
                        left: parseInt(m.element.css("left"), 10)
                    };
                    if (f) {
                        f.css({width: n.width, height: n.height})
                    }
                    m._updateCache(n);
                    m._propagate("resize", g)
                }
            })
        }
    });
    b.ui.plugin.add("resizable", "containment", {
        start: function (d, n) {
            var r = b(this).data("resizable"), h = r.options, j = r.element;
            var e = h.containment, i = (e instanceof b) ? e.get(0) : (/parent/.test(e)) ? j.parent().get(0) : e;
            if (!i) {
                return
            }
            r.containerElement = b(i);
            if (/document/.test(e) || e == document) {
                r.containerOffset = {left: 0, top: 0};
                r.containerPosition = {left: 0, top: 0};
                r.parentData = {
                    element: b(document),
                    left: 0,
                    top: 0,
                    width: b(document).width(),
                    height: b(document).height() || document.body.parentNode.scrollHeight
                }
            } else {
                var l = b(i), g = [];
                b(["Top", "Right", "Left", "Bottom"]).each(function (p, o) {
                    g[p] = a(l.css("padding" + o))
                });
                r.containerOffset = l.offset();
                r.containerPosition = l.position();
                r.containerSize = {height: (l.innerHeight() - g[3]), width: (l.innerWidth() - g[1])};
                var m = r.containerOffset, c = r.containerSize.height, k = r.containerSize.width, f = (b.ui.hasScroll(i, "left") ? i.scrollWidth : k), q = (b.ui.hasScroll(i) ? i.scrollHeight : c);
                r.parentData = {element: i, left: m.left, top: m.top, width: f, height: q}
            }
        }, resize: function (e, l) {
            var p = b(this).data("resizable"), g = p.options, d = p.containerSize, k = p.containerOffset, i = p.size, j = p.position, m = g._aspectRatio || e.shiftKey, c = {
                top: 0,
                left: 0
            }, f = p.containerElement;
            if (f[0] != document && (/static/).test(f.css("position"))) {
                c = k
            }
            if (j.left < (p._helper ? k.left : 0)) {
                p.size.width = p.size.width + (p._helper ? (p.position.left - k.left) : (p.position.left - c.left));
                if (m) {
                    p.size.height = p.size.width / g.aspectRatio
                }
                p.position.left = g.helper ? k.left : 0
            }
            if (j.top < (p._helper ? k.top : 0)) {
                p.size.height = p.size.height + (p._helper ? (p.position.top - k.top) : p.position.top);
                if (m) {
                    p.size.width = p.size.height * g.aspectRatio
                }
                p.position.top = p._helper ? k.top : 0
            }
            var h = Math.abs((p._helper ? p.offset.left - c.left : (p.offset.left - c.left)) + p.sizeDiff.width), n = Math.abs((p._helper ? p.offset.top - c.top : (p.offset.top - k.top)) + p.sizeDiff.height);
            if (h + p.size.width >= p.parentData.width) {
                p.size.width = p.parentData.width - h;
                if (m) {
                    p.size.height = p.size.width / g.aspectRatio
                }
            }
            if (n + p.size.height >= p.parentData.height) {
                p.size.height = p.parentData.height - n;
                if (m) {
                    p.size.width = p.size.height * g.aspectRatio
                }
            }
        }, stop: function (d, l) {
            var n = b(this).data("resizable"), e = n.options, j = n.position, k = n.containerOffset, c = n.containerPosition, f = n.containerElement;
            var g = b(n.helper), p = g.offset(), m = g.outerWidth() - n.sizeDiff.width, i = g.outerHeight() - n.sizeDiff.height;
            if (n._helper && !e.animate && (/relative/).test(f.css("position"))) {
                b(this).css({left: p.left - c.left - k.left, width: m, height: i})
            }
            if (n._helper && !e.animate && (/static/).test(f.css("position"))) {
                b(this).css({left: p.left - c.left - k.left, width: m, height: i})
            }
        }
    });
    b.ui.plugin.add("resizable", "ghost", {
        start: function (e, f) {
            var c = b(this).data("resizable"), g = c.options, h = g.proportionallyResize, d = c.size;
            c.ghost = c.originalElement.clone();
            c.ghost.css({
                opacity: 0.25,
                display: "block",
                position: "relative",
                height: d.height,
                width: d.width,
                margin: 0,
                left: 0,
                top: 0
            }).addClass("ui-resizable-ghost").addClass(typeof g.ghost == "string" ? g.ghost : "");
            c.ghost.appendTo(c.helper)
        }, resize: function (d, e) {
            var c = b(this).data("resizable"), f = c.options;
            if (c.ghost) {
                c.ghost.css({position: "relative", height: c.size.height, width: c.size.width})
            }
        }, stop: function (d, e) {
            var c = b(this).data("resizable"), f = c.options;
            if (c.ghost && c.helper) {
                c.helper.get(0).removeChild(c.ghost.get(0))
            }
        }
    });
    b.ui.plugin.add("resizable", "grid", {
        resize: function (c, k) {
            var m = b(this).data("resizable"), f = m.options, i = m.size, g = m.originalSize, h = m.originalPosition, l = m.axis, j = f._aspectRatio || c.shiftKey;
            f.grid = typeof f.grid == "number" ? [f.grid, f.grid] : f.grid;
            var e = Math.round((i.width - g.width) / (f.grid[0] || 1)) * (f.grid[0] || 1), d = Math.round((i.height - g.height) / (f.grid[1] || 1)) * (f.grid[1] || 1);
            if (/^(se|s|e)$/.test(l)) {
                m.size.width = g.width + e;
                m.size.height = g.height + d
            } else {
                if (/^(ne)$/.test(l)) {
                    m.size.width = g.width + e;
                    m.size.height = g.height + d;
                    m.position.top = h.top - d
                } else {
                    if (/^(sw)$/.test(l)) {
                        m.size.width = g.width + e;
                        m.size.height = g.height + d;
                        m.position.left = h.left - e
                    } else {
                        m.size.width = g.width + e;
                        m.size.height = g.height + d;
                        m.position.top = h.top - d;
                        m.position.left = h.left - e
                    }
                }
            }
        }
    });
    var a = function (c) {
        return parseInt(c, 10) || 0
    }
})(jQuery);
/*
 * jQuery UI Selectable 1.6rc6
 *
 * Copyright (c) 2009 AUTHORS.txt (http://ui.jquery.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Selectables
 *
 * Depends:
 *	ui.core.js
 */
(function (a) {
    a.widget("ui.selectable", a.extend({}, a.ui.mouse, {
        _init: function () {
            var b = this;
            this.element.addClass("ui-selectable");
            this.dragged = false;
            var c;
            this.refresh = function () {
                c = a(b.options.filter, b.element[0]);
                c.each(function () {
                    var d = a(this);
                    var e = d.offset();
                    a.data(this, "selectable-item", {
                        element: this,
                        $element: d,
                        left: e.left,
                        top: e.top,
                        right: e.left + d.outerWidth(),
                        bottom: e.top + d.outerHeight(),
                        startselected: false,
                        selected: d.hasClass("ui-selected"),
                        selecting: d.hasClass("ui-selecting"),
                        unselecting: d.hasClass("ui-unselecting")
                    })
                })
            };
            this.refresh();
            this.selectees = c.addClass("ui-selectee");
            this._mouseInit();
            this.helper = a(document.createElement("div")).css({border: "1px dotted black"}).addClass("ui-selectable-helper")
        }, destroy: function () {
            this.element.removeClass("ui-selectable ui-selectable-disabled").removeData("selectable").unbind(".selectable");
            this._mouseDestroy()
        }, _mouseStart: function (d) {
            var b = this;
            this.opos = [d.pageX, d.pageY];
            if (this.options.disabled) {
                return
            }
            var c = this.options;
            this.selectees = a(c.filter, this.element[0]);
            this._trigger("start", d);
            a("body").append(this.helper);
            this.helper.css({
                "z-index": 100,
                position: "absolute",
                left: d.clientX,
                top: d.clientY,
                width: 0,
                height: 0
            });
            if (c.autoRefresh) {
                this.refresh()
            }
            this.selectees.filter(".ui-selected").each(function () {
                var e = a.data(this, "selectable-item");
                e.startselected = true;
                if (!d.metaKey) {
                    e.$element.removeClass("ui-selected");
                    e.selected = false;
                    e.$element.addClass("ui-unselecting");
                    e.unselecting = true;
                    b._trigger("unselecting", d, {unselecting: e.element})
                }
            });
            a(d.target).parents().andSelf().each(function () {
                var e = a.data(this, "selectable-item");
                if (e) {
                    e.$element.removeClass("ui-unselecting").addClass("ui-selecting");
                    e.unselecting = false;
                    e.selecting = true;
                    e.selected = true;
                    b._trigger("selecting", d, {selecting: e.element});
                    return false
                }
            })
        }, _mouseDrag: function (i) {
            var c = this;
            this.dragged = true;
            if (this.options.disabled) {
                return
            }
            var e = this.options;
            var d = this.opos[0], h = this.opos[1], b = i.pageX, g = i.pageY;
            if (d > b) {
                var f = b;
                b = d;
                d = f
            }
            if (h > g) {
                var f = g;
                g = h;
                h = f
            }
            this.helper.css({left: d, top: h, width: b - d, height: g - h});
            this.selectees.each(function () {
                var j = a.data(this, "selectable-item");
                if (!j || j.element == c.element[0]) {
                    return
                }
                var k = false;
                if (e.tolerance == "touch") {
                    k = (!(j.left > b || j.right < d || j.top > g || j.bottom < h))
                } else {
                    if (e.tolerance == "fit") {
                        k = (j.left > d && j.right < b && j.top > h && j.bottom < g)
                    }
                }
                if (k) {
                    if (j.selected) {
                        j.$element.removeClass("ui-selected");
                        j.selected = false
                    }
                    if (j.unselecting) {
                        j.$element.removeClass("ui-unselecting");
                        j.unselecting = false
                    }
                    if (!j.selecting) {
                        j.$element.addClass("ui-selecting");
                        j.selecting = true;
                        c._trigger("selecting", i, {selecting: j.element})
                    }
                } else {
                    if (j.selecting) {
                        if (i.metaKey && j.startselected) {
                            j.$element.removeClass("ui-selecting");
                            j.selecting = false;
                            j.$element.addClass("ui-selected");
                            j.selected = true
                        } else {
                            j.$element.removeClass("ui-selecting");
                            j.selecting = false;
                            if (j.startselected) {
                                j.$element.addClass("ui-unselecting");
                                j.unselecting = true
                            }
                            c._trigger("unselecting", i, {unselecting: j.element})
                        }
                    }
                    if (j.selected) {
                        if (!i.metaKey && !j.startselected) {
                            j.$element.removeClass("ui-selected");
                            j.selected = false;
                            j.$element.addClass("ui-unselecting");
                            j.unselecting = true;
                            c._trigger("unselecting", i, {unselecting: j.element})
                        }
                    }
                }
            });
            return false
        }, _mouseStop: function (d) {
            var b = this;
            this.dragged = false;
            var c = this.options;
            a(".ui-unselecting", this.element[0]).each(function () {
                var e = a.data(this, "selectable-item");
                e.$element.removeClass("ui-unselecting");
                e.unselecting = false;
                e.startselected = false;
                b._trigger("unselected", d, {unselected: e.element})
            });
            a(".ui-selecting", this.element[0]).each(function () {
                var e = a.data(this, "selectable-item");
                e.$element.removeClass("ui-selecting").addClass("ui-selected");
                e.selecting = false;
                e.selected = true;
                e.startselected = true;
                b._trigger("selected", d, {selected: e.element})
            });
            this._trigger("stop", d);
            this.helper.remove();
            return false
        }
    }));
    a.extend(a.ui.selectable, {
        version: "1.6rc6",
        defaults: {
            appendTo: "body",
            autoRefresh: true,
            cancel: ":input,option",
            delay: 0,
            distance: 0,
            filter: "*",
            tolerance: "touch"
        }
    })
})(jQuery);
/*
 * jQuery UI Sortable 1.6rc6
 *
 * Copyright (c) 2009 AUTHORS.txt (http://ui.jquery.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Sortables
 *
 * Depends:
 *	ui.core.js
 */
(function (a) {
    a.widget("ui.sortable", a.extend({}, a.ui.mouse, {
        _init: function () {
            var b = this.options;
            this.containerCache = {};
            (this.options.cssNamespace && this.element.addClass(this.options.cssNamespace + "-sortable"));
            this.refresh();
            this.floating = this.items.length ? (/left|right/).test(this.items[0].item.css("float")) : false;
            this.offset = this.element.offset();
            this._mouseInit()
        }, destroy: function () {
            this.element.removeClass(this.options.cssNamespace + "-sortable " + this.options.cssNamespace + "-sortable-disabled").removeData("sortable").unbind(".sortable");
            this._mouseDestroy();
            for (var b = this.items.length - 1; b >= 0; b--) {
                this.items[b].item.removeData("sortable-item")
            }
        }, _mouseCapture: function (e, f) {
            if (this.reverting) {
                return false
            }
            if (this.options.disabled || this.options.type == "static") {
                return false
            }
            this._refreshItems(e);
            var d = null, c = this, b = a(e.target).parents().each(function () {
                if (a.data(this, "sortable-item") == c) {
                    d = a(this);
                    return false
                }
            });
            if (a.data(e.target, "sortable-item") == c) {
                d = a(e.target)
            }
            if (!d) {
                return false
            }
            if (this.options.handle && !f) {
                var g = false;
                a(this.options.handle, d).find("*").andSelf().each(function () {
                    if (this == e.target) {
                        g = true
                    }
                });
                if (!g) {
                    return false
                }
            }
            this.currentItem = d;
            this._removeCurrentsFromItems();
            return true
        }, _mouseStart: function (e, f, b) {
            var g = this.options, c = this;
            this.currentContainer = this;
            this.refreshPositions();
            this.helper = this._createHelper(e);
            this._cacheHelperProportions();
            this._cacheMargins();
            this.scrollParent = this.helper.scrollParent();
            this.offset = this.currentItem.offset();
            this.offset = {top: this.offset.top - this.margins.top, left: this.offset.left - this.margins.left};
            this.helper.css("position", "absolute");
            this.cssPosition = this.helper.css("position");
            a.extend(this.offset, {
                click: {left: e.pageX - this.offset.left, top: e.pageY - this.offset.top},
                parent: this._getParentOffset(),
                relative: this._getRelativeOffset()
            });
            this.originalPosition = this._generatePosition(e);
            this.originalPageX = e.pageX;
            this.originalPageY = e.pageY;
            if (g.cursorAt) {
                this._adjustOffsetFromHelper(g.cursorAt)
            }
            this.domPosition = {prev: this.currentItem.prev()[0], parent: this.currentItem.parent()[0]};
            if (this.helper[0] != this.currentItem[0]) {
                this.currentItem.hide()
            }
            this._createPlaceholder();
            if (g.containment) {
                this._setContainment()
            }
            if (g.cursor) {
                if (a("body").css("cursor")) {
                    this._storedCursor = a("body").css("cursor")
                }
                a("body").css("cursor", g.cursor)
            }
            if (g.opacity) {
                if (this.helper.css("opacity")) {
                    this._storedOpacity = this.helper.css("opacity")
                }
                this.helper.css("opacity", g.opacity)
            }
            if (g.zIndex) {
                if (this.helper.css("zIndex")) {
                    this._storedZIndex = this.helper.css("zIndex")
                }
                this.helper.css("zIndex", g.zIndex)
            }
            if (this.scrollParent[0] != document && this.scrollParent[0].tagName != "HTML") {
                this.overflowOffset = this.scrollParent.offset()
            }
            this._trigger("start", e, this._uiHash());
            if (!this._preserveHelperProportions) {
                this._cacheHelperProportions()
            }
            if (!b) {
                for (var d = this.containers.length - 1; d >= 0; d--) {
                    this.containers[d]._trigger("activate", e, c._uiHash(this))
                }
            }
            if (a.ui.ddmanager) {
                a.ui.ddmanager.current = this
            }
            if (a.ui.ddmanager && !g.dropBehaviour) {
                a.ui.ddmanager.prepareOffsets(this, e)
            }
            this.dragging = true;
            this.helper.addClass(g.cssNamespace + "-sortable-helper");
            this._mouseDrag(e);
            return true
        }, _mouseDrag: function (f) {
            this.position = this._generatePosition(f);
            this.positionAbs = this._convertPositionTo("absolute");
            if (!this.lastPositionAbs) {
                this.lastPositionAbs = this.positionAbs
            }
            if (this.options.scroll) {
                var g = this.options, b = false;
                if (this.scrollParent[0] != document && this.scrollParent[0].tagName != "HTML") {
                    if ((this.overflowOffset.top + this.scrollParent[0].offsetHeight) - f.pageY < g.scrollSensitivity) {
                        this.scrollParent[0].scrollTop = b = this.scrollParent[0].scrollTop + g.scrollSpeed
                    } else {
                        if (f.pageY - this.overflowOffset.top < g.scrollSensitivity) {
                            this.scrollParent[0].scrollTop = b = this.scrollParent[0].scrollTop - g.scrollSpeed
                        }
                    }
                    if ((this.overflowOffset.left + this.scrollParent[0].offsetWidth) - f.pageX < g.scrollSensitivity) {
                        this.scrollParent[0].scrollLeft = b = this.scrollParent[0].scrollLeft + g.scrollSpeed
                    } else {
                        if (f.pageX - this.overflowOffset.left < g.scrollSensitivity) {
                            this.scrollParent[0].scrollLeft = b = this.scrollParent[0].scrollLeft - g.scrollSpeed
                        }
                    }
                } else {
                    if (f.pageY - a(document).scrollTop() < g.scrollSensitivity) {
                        b = a(document).scrollTop(a(document).scrollTop() - g.scrollSpeed)
                    } else {
                        if (a(window).height() - (f.pageY - a(document).scrollTop()) < g.scrollSensitivity) {
                            b = a(document).scrollTop(a(document).scrollTop() + g.scrollSpeed)
                        }
                    }
                    if (f.pageX - a(document).scrollLeft() < g.scrollSensitivity) {
                        b = a(document).scrollLeft(a(document).scrollLeft() - g.scrollSpeed)
                    } else {
                        if (a(window).width() - (f.pageX - a(document).scrollLeft()) < g.scrollSensitivity) {
                            b = a(document).scrollLeft(a(document).scrollLeft() + g.scrollSpeed)
                        }
                    }
                }
                if (b !== false && a.ui.ddmanager && !g.dropBehaviour) {
                    a.ui.ddmanager.prepareOffsets(this, f)
                }
            }
            this.positionAbs = this._convertPositionTo("absolute");
            if (!this.options.axis || this.options.axis != "y") {
                this.helper[0].style.left = this.position.left + "px"
            }
            if (!this.options.axis || this.options.axis != "x") {
                this.helper[0].style.top = this.position.top + "px"
            }
            for (var d = this.items.length - 1; d >= 0; d--) {
                var e = this.items[d], c = e.item[0], h = this._intersectsWithPointer(e);
                if (!h) {
                    continue
                }
                if (c != this.currentItem[0] && this.placeholder[h == 1 ? "next" : "prev"]()[0] != c && !a.ui.contains(this.placeholder[0], c) && (this.options.type == "semi-dynamic" ? !a.ui.contains(this.element[0], c) : true)) {
                    this.direction = h == 1 ? "down" : "up";
                    if (this.options.tolerance == "pointer" || this._intersectsWithSides(e)) {
                        this.options.sortIndicator.call(this, f, e)
                    } else {
                        break
                    }
                    this._trigger("change", f, this._uiHash());
                    break
                }
            }
            this._contactContainers(f);
            if (a.ui.ddmanager) {
                a.ui.ddmanager.drag(this, f)
            }
            this._trigger("sort", f, this._uiHash());
            this.lastPositionAbs = this.positionAbs;
            return false
        }, _mouseStop: function (c, d) {
            if (!c) {
                return
            }
            if (a.ui.ddmanager && !this.options.dropBehaviour) {
                a.ui.ddmanager.drop(this, c)
            }
            if (this.options.revert) {
                var b = this;
                var e = b.placeholder.offset();
                b.reverting = true;
                a(this.helper).animate({
                    left: e.left - this.offset.parent.left - b.margins.left + (this.offsetParent[0] == document.body ? 0 : this.offsetParent[0].scrollLeft),
                    top: e.top - this.offset.parent.top - b.margins.top + (this.offsetParent[0] == document.body ? 0 : this.offsetParent[0].scrollTop)
                }, parseInt(this.options.revert, 10) || 500, function () {
                    b._clear(c)
                })
            } else {
                this._clear(c, d)
            }
            return false
        }, cancel: function () {
            var b = this;
            if (this.dragging) {
                this._mouseUp();
                if (this.options.helper == "original") {
                    this.currentItem.css(this._storedCSS).removeClass(this.options.cssNamespace + "-sortable-helper")
                } else {
                    this.currentItem.show()
                }
                for (var c = this.containers.length - 1; c >= 0; c--) {
                    this.containers[c]._trigger("deactivate", null, b._uiHash(this));
                    if (this.containers[c].containerCache.over) {
                        this.containers[c]._trigger("out", null, b._uiHash(this));
                        this.containers[c].containerCache.over = 0
                    }
                }
            }
            if (this.placeholder[0].parentNode) {
                this.placeholder[0].parentNode.removeChild(this.placeholder[0])
            }
            if (this.options.helper != "original" && this.helper && this.helper[0].parentNode) {
                this.helper.remove()
            }
            a.extend(this, {helper: null, dragging: false, reverting: false, _noFinalSort: null});
            if (this.domPosition.prev) {
                a(this.domPosition.prev).after(this.currentItem)
            } else {
                a(this.domPosition.parent).prepend(this.currentItem)
            }
            return true
        }, serialize: function (d) {
            var b = this._getItemsAsjQuery(d && d.connected);
            var c = [];
            d = d || {};
            a(b).each(function () {
                var e = (a(d.item || this).attr(d.attribute || "id") || "").match(d.expression || (/(.+)[-=_](.+)/));
                if (e) {
                    c.push((d.key || e[1] + "[]") + "=" + (d.key && d.expression ? e[1] : e[2]))
                }
            });
            return c.join("&")
        }, toArray: function (d) {
            var b = this._getItemsAsjQuery(d && d.connected);
            var c = [];
            d = d || {};
            b.each(function () {
                c.push(a(d.item || this).attr(d.attribute || "id") || "")
            });
            return c
        }, _intersectsWith: function (m) {
            var e = this.positionAbs.left, d = e + this.helperProportions.width, k = this.positionAbs.top, j = k + this.helperProportions.height;
            var f = m.left, c = f + m.width, n = m.top, i = n + m.height;
            var o = this.offset.click.top, h = this.offset.click.left;
            var g = (k + o) > n && (k + o) < i && (e + h) > f && (e + h) < c;
            if (this.options.tolerance == "pointer" || this.options.forcePointerForContainers || (this.options.tolerance != "pointer" && this.helperProportions[this.floating ? "width" : "height"] > m[this.floating ? "width" : "height"])) {
                return g
            } else {
                return (f < e + (this.helperProportions.width / 2) && d - (this.helperProportions.width / 2) < c && n < k + (this.helperProportions.height / 2) && j - (this.helperProportions.height / 2) < i)
            }
        }, _intersectsWithPointer: function (d) {
            var e = a.ui.isOverAxis(this.positionAbs.top + this.offset.click.top, d.top, d.height), c = a.ui.isOverAxis(this.positionAbs.left + this.offset.click.left, d.left, d.width), g = e && c, b = this._getDragVerticalDirection(), f = this._getDragHorizontalDirection();
            if (!g) {
                return false
            }
            return this.floating ? (((f && f == "right") || b == "down") ? 2 : 1) : (b && (b == "down" ? 2 : 1))
        }, _intersectsWithSides: function (e) {
            var c = a.ui.isOverAxis(this.positionAbs.top + this.offset.click.top, e.top + (e.height / 2), e.height), d = a.ui.isOverAxis(this.positionAbs.left + this.offset.click.left, e.left + (e.width / 2), e.width), b = this._getDragVerticalDirection(), f = this._getDragHorizontalDirection();
            if (this.floating && f) {
                return ((f == "right" && d) || (f == "left" && !d))
            } else {
                return b && ((b == "down" && c) || (b == "up" && !c))
            }
        }, _getDragVerticalDirection: function () {
            var b = this.positionAbs.top - this.lastPositionAbs.top;
            return b != 0 && (b > 0 ? "down" : "up")
        }, _getDragHorizontalDirection: function () {
            var b = this.positionAbs.left - this.lastPositionAbs.left;
            return b != 0 && (b > 0 ? "right" : "left")
        }, refresh: function (b) {
            this._refreshItems(b);
            this.refreshPositions()
        }, _getItemsAsjQuery: function (b) {
            var l = this;
            var g = [];
            var e = [];
            if (this.options.connectWith && b) {
                var h = this.options.connectWith.constructor == String ? [this.options.connectWith] : this.options.connectWith;
                for (var d = h.length - 1; d >= 0; d--) {
                    var k = a(h[d]);
                    for (var c = k.length - 1; c >= 0; c--) {
                        var f = a.data(k[c], "sortable");
                        if (f && f != this && !f.options.disabled) {
                            e.push([a.isFunction(f.options.items) ? f.options.items.call(f.element) : a(f.options.items, f.element).not("." + f.options.cssNamespace + "-sortable-helper"), f])
                        }
                    }
                }
            }
            e.push([a.isFunction(this.options.items) ? this.options.items.call(this.element, null, {
                options: this.options,
                item: this.currentItem
            }) : a(this.options.items, this.element).not("." + this.options.cssNamespace + "-sortable-helper"), this]);
            for (var d = e.length - 1; d >= 0; d--) {
                e[d][0].each(function () {
                    g.push(this)
                })
            }
            return a(g)
        }, _removeCurrentsFromItems: function () {
            var d = this.currentItem.find(":data(sortable-item)");
            for (var c = 0; c < this.items.length; c++) {
                for (var b = 0; b < d.length; b++) {
                    if (d[b] == this.items[c].item[0]) {
                        this.items.splice(c, 1)
                    }
                }
            }
        }, _refreshItems: function (b) {
            this.items = [];
            this.containers = [this];
            var h = this.items;
            var o = this;
            var f = [[a.isFunction(this.options.items) ? this.options.items.call(this.element[0], b, {item: this.currentItem}) : a(this.options.items, this.element), this]];
            if (this.options.connectWith) {
                for (var e = this.options.connectWith.length - 1; e >= 0; e--) {
                    var l = a(this.options.connectWith[e]);
                    for (var d = l.length - 1; d >= 0; d--) {
                        var g = a.data(l[d], "sortable");
                        if (g && g != this && !g.options.disabled) {
                            f.push([a.isFunction(g.options.items) ? g.options.items.call(g.element[0], b, {item: this.currentItem}) : a(g.options.items, g.element), g]);
                            this.containers.push(g)
                        }
                    }
                }
            }
            for (var e = f.length - 1; e >= 0; e--) {
                var k = f[e][1];
                var c = f[e][0];
                for (var d = 0, m = c.length; d < m; d++) {
                    var n = a(c[d]);
                    n.data("sortable-item", k);
                    h.push({item: n, instance: k, width: 0, height: 0, left: 0, top: 0})
                }
            }
        }, refreshPositions: function (b) {
            if (this.offsetParent && this.helper) {
                this.offset.parent = this._getParentOffset()
            }
            for (var d = this.items.length - 1; d >= 0; d--) {
                var e = this.items[d];
                if (e.instance != this.currentContainer && this.currentContainer && e.item[0] != this.currentItem[0]) {
                    continue
                }
                var c = this.options.toleranceElement ? a(this.options.toleranceElement, e.item) : e.item;
                if (!b) {
                    if (this.options.accurateIntersection) {
                        e.width = c.outerWidth();
                        e.height = c.outerHeight()
                    } else {
                        e.width = c[0].offsetWidth;
                        e.height = c[0].offsetHeight
                    }
                }
                var f = c.offset();
                e.left = f.left;
                e.top = f.top
            }
            if (this.options.custom && this.options.custom.refreshContainers) {
                this.options.custom.refreshContainers.call(this)
            } else {
                for (var d = this.containers.length - 1; d >= 0; d--) {
                    var f = this.containers[d].element.offset();
                    this.containers[d].containerCache.left = f.left;
                    this.containers[d].containerCache.top = f.top;
                    this.containers[d].containerCache.width = this.containers[d].element.outerWidth();
                    this.containers[d].containerCache.height = this.containers[d].element.outerHeight()
                }
            }
        }, _createPlaceholder: function (d) {
            var b = d || this, e = b.options;
            if (!e.placeholder || e.placeholder.constructor == String) {
                var c = e.placeholder;
                e.placeholder = {
                    element: function () {
                        var f = a(document.createElement(b.currentItem[0].nodeName)).addClass(c || b.currentItem[0].className + " " + b.options.cssNamespace + "-sortable-placeholder").removeClass(b.options.cssNamespace + "-sortable-helper")[0];
                        if (!c) {
                            f.style.visibility = "hidden"
                        }
                        return f
                    }, update: function (f, g) {
                        if (c && !e.forcePlaceholderSize) {
                            return
                        }
                        if (!g.height()) {
                            g.height(b.currentItem.innerHeight() - parseInt(b.currentItem.css("paddingTop") || 0, 10) - parseInt(b.currentItem.css("paddingBottom") || 0, 10))
                        }
                        if (!g.width()) {
                            g.width(b.currentItem.innerWidth() - parseInt(b.currentItem.css("paddingLeft") || 0, 10) - parseInt(b.currentItem.css("paddingRight") || 0, 10))
                        }
                    }
                }
            }
            b.placeholder = a(e.placeholder.element.call(b.element, b.currentItem));
            b.currentItem.after(b.placeholder);
            e.placeholder.update(b, b.placeholder)
        }, _contactContainers: function (d) {
            for (var c = this.containers.length - 1; c >= 0; c--) {
                if (this._intersectsWith(this.containers[c].containerCache)) {
                    if (!this.containers[c].containerCache.over) {
                        if (this.currentContainer != this.containers[c]) {
                            var h = 10000;
                            var g = null;
                            var e = this.positionAbs[this.containers[c].floating ? "left" : "top"];
                            for (var b = this.items.length - 1; b >= 0; b--) {
                                if (!a.ui.contains(this.containers[c].element[0], this.items[b].item[0])) {
                                    continue
                                }
                                var f = this.items[b][this.containers[c].floating ? "left" : "top"];
                                if (Math.abs(f - e) < h) {
                                    h = Math.abs(f - e);
                                    g = this.items[b]
                                }
                            }
                            if (!g && !this.options.dropOnEmpty) {
                                continue
                            }
                            this.currentContainer = this.containers[c];
                            g ? this.options.sortIndicator.call(this, d, g, null, true) : this.options.sortIndicator.call(this, d, null, this.containers[c].element, true);
                            this._trigger("change", d, this._uiHash());
                            this.containers[c]._trigger("change", d, this._uiHash(this));
                            this.options.placeholder.update(this.currentContainer, this.placeholder)
                        }
                        this.containers[c]._trigger("over", d, this._uiHash(this));
                        this.containers[c].containerCache.over = 1
                    }
                } else {
                    if (this.containers[c].containerCache.over) {
                        this.containers[c]._trigger("out", d, this._uiHash(this));
                        this.containers[c].containerCache.over = 0
                    }
                }
            }
        }, _createHelper: function (c) {
            var d = this.options;
            var b = a.isFunction(d.helper) ? a(d.helper.apply(this.element[0], [c, this.currentItem])) : (d.helper == "clone" ? this.currentItem.clone() : this.currentItem);
            if (!b.parents("body").length) {
                a(d.appendTo != "parent" ? d.appendTo : this.currentItem[0].parentNode)[0].appendChild(b[0])
            }
            if (b[0] == this.currentItem[0]) {
                this._storedCSS = {
                    width: this.currentItem[0].style.width,
                    height: this.currentItem[0].style.height,
                    position: this.currentItem.css("position"),
                    top: this.currentItem.css("top"),
                    left: this.currentItem.css("left")
                }
            }
            if (b[0].style.width == "" || d.forceHelperSize) {
                b.width(this.currentItem.width())
            }
            if (b[0].style.height == "" || d.forceHelperSize) {
                b.height(this.currentItem.height())
            }
            return b
        }, _adjustOffsetFromHelper: function (b) {
            if (b.left != undefined) {
                this.offset.click.left = b.left + this.margins.left
            }
            if (b.right != undefined) {
                this.offset.click.left = this.helperProportions.width - b.right + this.margins.left
            }
            if (b.top != undefined) {
                this.offset.click.top = b.top + this.margins.top
            }
            if (b.bottom != undefined) {
                this.offset.click.top = this.helperProportions.height - b.bottom + this.margins.top
            }
        }, _getParentOffset: function () {
            this.offsetParent = this.helper.offsetParent();
            var b = this.offsetParent.offset();
            if (this.cssPosition == "absolute" && this.scrollParent[0] != document && a.ui.contains(this.scrollParent[0], this.offsetParent[0])) {
                b.left += this.scrollParent.scrollLeft();
                b.top += this.scrollParent.scrollTop()
            }
            if ((this.offsetParent[0] == document.body && a.browser.mozilla) || (this.offsetParent[0].tagName && this.offsetParent[0].tagName.toLowerCase() == "html" && a.browser.msie)) {
                b = {top: 0, left: 0}
            }
            return {
                top: b.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                left: b.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
            }
        }, _getRelativeOffset: function () {
            if (this.cssPosition == "relative") {
                var b = this.currentItem.position();
                return {
                    top: b.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
                    left: b.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
                }
            } else {
                return {top: 0, left: 0}
            }
        }, _cacheMargins: function () {
            this.margins = {
                left: (parseInt(this.currentItem.css("marginLeft"), 10) || 0),
                top: (parseInt(this.currentItem.css("marginTop"), 10) || 0)
            }
        }, _cacheHelperProportions: function () {
            this.helperProportions = {width: this.helper.outerWidth(), height: this.helper.outerHeight()}
        }, _setContainment: function () {
            var e = this.options;
            if (e.containment == "parent") {
                e.containment = this.helper[0].parentNode
            }
            if (e.containment == "document" || e.containment == "window") {
                this.containment = [0 - this.offset.relative.left - this.offset.parent.left, 0 - this.offset.relative.top - this.offset.parent.top, a(e.containment == "document" ? document : window).width() - this.helperProportions.width - this.margins.left, (a(e.containment == "document" ? document : window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top]
            }
            if (!(/^(document|window|parent)$/).test(e.containment)) {
                var c = a(e.containment)[0];
                var d = a(e.containment).offset();
                var b = (a(c).css("overflow") != "hidden");
                this.containment = [d.left + (parseInt(a(c).css("borderLeftWidth"), 10) || 0) + (parseInt(a(c).css("paddingLeft"), 10) || 0) - this.margins.left, d.top + (parseInt(a(c).css("borderTopWidth"), 10) || 0) + (parseInt(a(c).css("paddingTop"), 10) || 0) - this.margins.top, d.left + (b ? Math.max(c.scrollWidth, c.offsetWidth) : c.offsetWidth) - (parseInt(a(c).css("borderLeftWidth"), 10) || 0) - (parseInt(a(c).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left, d.top + (b ? Math.max(c.scrollHeight, c.offsetHeight) : c.offsetHeight) - (parseInt(a(c).css("borderTopWidth"), 10) || 0) - (parseInt(a(c).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top]
            }
        }, _convertPositionTo: function (f, h) {
            if (!h) {
                h = this.position
            }
            var c = f == "absolute" ? 1 : -1;
            var e = this.options, b = this.cssPosition == "absolute" && !(this.scrollParent[0] != document && a.ui.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent, g = (/(html|body)/i).test(b[0].tagName);
            return {
                top: (h.top + this.offset.relative.top * c + this.offset.parent.top * c - (this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : (g ? 0 : b.scrollTop())) * c),
                left: (h.left + this.offset.relative.left * c + this.offset.parent.left * c - (this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : g ? 0 : b.scrollLeft()) * c)
            }
        }, _generatePosition: function (e) {
            var h = this.options, b = this.cssPosition == "absolute" && !(this.scrollParent[0] != document && a.ui.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent, i = (/(html|body)/i).test(b[0].tagName);
            if (this.cssPosition == "relative" && !(this.scrollParent[0] != document && this.scrollParent[0] != this.offsetParent[0])) {
                this.offset.relative = this._getRelativeOffset()
            }
            var d = e.pageX;
            var c = e.pageY;
            if (this.originalPosition) {
                if (this.containment) {
                    if (e.pageX - this.offset.click.left < this.containment[0]) {
                        d = this.containment[0] + this.offset.click.left
                    }
                    if (e.pageY - this.offset.click.top < this.containment[1]) {
                        c = this.containment[1] + this.offset.click.top
                    }
                    if (e.pageX - this.offset.click.left > this.containment[2]) {
                        d = this.containment[2] + this.offset.click.left
                    }
                    if (e.pageY - this.offset.click.top > this.containment[3]) {
                        c = this.containment[3] + this.offset.click.top
                    }
                }
                if (h.grid) {
                    var g = this.originalPageY + Math.round((c - this.originalPageY) / h.grid[1]) * h.grid[1];
                    c = this.containment ? (!(g - this.offset.click.top < this.containment[1] || g - this.offset.click.top > this.containment[3]) ? g : (!(g - this.offset.click.top < this.containment[1]) ? g - h.grid[1] : g + h.grid[1])) : g;
                    var f = this.originalPageX + Math.round((d - this.originalPageX) / h.grid[0]) * h.grid[0];
                    d = this.containment ? (!(f - this.offset.click.left < this.containment[0] || f - this.offset.click.left > this.containment[2]) ? f : (!(f - this.offset.click.left < this.containment[0]) ? f - h.grid[0] : f + h.grid[0])) : f
                }
            }
            return {
                top: (c - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + (this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : (i ? 0 : b.scrollTop()))),
                left: (d - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + (this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : i ? 0 : b.scrollLeft()))
            }
        }, _rearrange: function (g, f, c, e) {
            c ? c[0].appendChild(this.placeholder[0]) : f.item[0].parentNode.insertBefore(this.placeholder[0], (this.direction == "down" ? f.item[0] : f.item[0].nextSibling));
            this.counter = this.counter ? ++this.counter : 1;
            var d = this, b = this.counter;
            window.setTimeout(function () {
                if (b == d.counter) {
                    d.refreshPositions(!e)
                }
            }, 0)
        }, _clear: function (d, e) {
            this.reverting = false;
            var f = [], b = this;
            if (!this._noFinalSort) {
                this.placeholder.before(this.currentItem)
            }
            this._noFinalSort = null;
            if (this.helper[0] == this.currentItem[0]) {
                for (var c in this._storedCSS) {
                    if (this._storedCSS[c] == "auto" || this._storedCSS[c] == "static") {
                        this._storedCSS[c] = ""
                    }
                }
                this.currentItem.css(this._storedCSS).removeClass(this.options.cssNamespace + "-sortable-helper")
            } else {
                this.currentItem.show()
            }
            if (this.fromOutside && !e) {
                f.push(function (g) {
                    this._trigger("receive", g, this._uiHash(this.fromOutside))
                })
            }
            if ((this.fromOutside || this.domPosition.prev != this.currentItem.prev().not("." + this.options.cssNamespace + "-sortable-helper")[0] || this.domPosition.parent != this.currentItem.parent()[0]) && !e) {
                f.push(function (g) {
                    this._trigger("update", g, this._uiHash())
                })
            }
            if (!a.ui.contains(this.element[0], this.currentItem[0])) {
                if (!e) {
                    f.push(function (g) {
                        this._trigger("remove", g, this._uiHash())
                    })
                }
                for (var c = this.containers.length - 1; c >= 0; c--) {
                    if (a.ui.contains(this.containers[c].element[0], this.currentItem[0]) && !e) {
                        f.push((function (g) {
                            return function (h) {
                                g._trigger("receive", h, this._uiHash(this))
                            }
                        }).call(this, this.containers[c]));
                        f.push((function (g) {
                            return function (h) {
                                g._trigger("update", h, this._uiHash(this))
                            }
                        }).call(this, this.containers[c]))
                    }
                }
            }
            for (var c = this.containers.length - 1; c >= 0; c--) {
                if (!e) {
                    f.push((function (g) {
                        return function (h) {
                            g._trigger("deactivate", h, this._uiHash(this))
                        }
                    }).call(this, this.containers[c]))
                }
                if (this.containers[c].containerCache.over) {
                    f.push((function (g) {
                        return function (h) {
                            g._trigger("out", h, this._uiHash(this))
                        }
                    }).call(this, this.containers[c]));
                    this.containers[c].containerCache.over = 0
                }
            }
            if (this._storedCursor) {
                a("body").css("cursor", this._storedCursor)
            }
            if (this._storedOpacity) {
                this.helper.css("opacity", this._storedCursor)
            }
            if (this._storedZIndex) {
                this.helper.css("zIndex", this._storedZIndex == "auto" ? "" : this._storedZIndex)
            }
            this.dragging = false;
            if (this.cancelHelperRemoval) {
                if (!e) {
                    this._trigger("beforeStop", d, this._uiHash());
                    for (var c = 0; c < f.length; c++) {
                        f[c].call(this, d)
                    }
                    this._trigger("stop", d, this._uiHash())
                }
                return false
            }
            if (!e) {
                this._trigger("beforeStop", d, this._uiHash())
            }
            this.placeholder[0].parentNode.removeChild(this.placeholder[0]);
            if (this.helper[0] != this.currentItem[0]) {
                this.helper.remove()
            }
            this.helper = null;
            if (!e) {
                for (var c = 0; c < f.length; c++) {
                    f[c].call(this, d)
                }
                this._trigger("stop", d, this._uiHash())
            }
            this.fromOutside = false;
            return true
        }, _trigger: function () {
            if (a.widget.prototype._trigger.apply(this, arguments) === false) {
                this.cancel()
            }
        }, _uiHash: function (c) {
            var b = c || this;
            return {
                helper: b.helper,
                placeholder: b.placeholder || a([]),
                position: b.position,
                absolutePosition: b.positionAbs,
                offset: b.positionAbs,
                item: b.currentItem,
                sender: c ? c.element : null
            }
        }
    }));
    a.extend(a.ui.sortable, {
        getter: "serialize toArray",
        version: "1.6rc6",
        defaults: {
            accurateIntersection: true,
            appendTo: "parent",
            cancel: ":input,option",
            connectWith: false,
            cssNamespace: "ui",
            delay: 0,
            distance: 1,
            dropOnEmpty: true,
            forcePlaceholderSize: false,
            forceHelperSize: false,
            handle: false,
            helper: "original",
            items: "> *",
            placeholder: false,
            scope: "default",
            scroll: true,
            scrollSensitivity: 20,
            scrollSpeed: 20,
            sortIndicator: a.ui.sortable.prototype._rearrange,
            tolerance: "intersect",
            zIndex: 1000
        }
    })
})(jQuery);
/*
 * jQuery UI Accordion 1.6rc6
 *
 * Copyright (c) 2009 AUTHORS.txt (http://ui.jquery.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Accordion
 *
 * Depends:
 *	ui.core.js
 */
(function (a) {
    a.widget("ui.accordion", {
        _init: function () {
            var d = this.options, b = this;
            this.running = 0;
            if (d.navigation) {
                var c = this.element.find("a").filter(d.navigationFilter);
                if (c.length) {
                    if (c.filter(d.header).length) {
                        this.active = c
                    } else {
                        this.active = c.parent().parent().prev();
                        c.addClass("ui-accordion-content-active")
                    }
                }
            }
            this.element.addClass("ui-accordion ui-widget ui-helper-reset");
            this.headers = this.element.find(d.header).addClass("ui-accordion-header ui-helper-reset ui-state-default ui-corner-all").bind("mouseenter.accordion", function () {
                a(this).addClass("ui-state-hover")
            }).bind("mouseleave.accordion", function () {
                a(this).removeClass("ui-state-hover")
            });
            this.headers.next().addClass("ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom");
            this.active = this._findActive(this.active || d.active).toggleClass("ui-state-default").toggleClass("ui-state-active").toggleClass("ui-corner-all").toggleClass("ui-corner-top");
            this.active.next().addClass("ui-accordion-content-active");
            a("<span/>").addClass("ui-icon " + d.icons.header).prependTo(this.headers);
            this.active.find(".ui-icon").toggleClass(d.icons.header).toggleClass(d.icons.headerSelected);
            if (a.browser.msie) {
                this.element.find("a").css("zoom", "1")
            }
            this.resize();
            this.element.attr("role", "tablist");
            this.headers.attr("role", "tab").bind("keydown", function (e) {
                return b._keydown(e)
            }).next().attr("role", "tabpanel");
            this.headers.not(this.active || "").attr("aria-expanded", "false").attr("tabIndex", "-1").next().hide();
            if (!this.active.length) {
                this.headers.eq(0).attr("tabIndex", "0")
            } else {
                this.active.attr("aria-expanded", "true").attr("tabIndex", "0")
            }
            if (!a.browser.safari) {
                this.headers.find("a").attr("tabIndex", "-1")
            }
            if (d.event) {
                this.element.bind((d.event) + ".accordion", function (e) {
                    return b._clickHandler.call(b, e)
                })
            }
        }, destroy: function () {
            this.element.removeClass("ui-accordion ui-widget ui-helper-reset").removeAttr("role").unbind(".accordion").removeData("accordion");
            this.headers.unbind(".accordion").removeClass("ui-accordion-header ui-helper-reset ui-state-default ui-corner-all ui-state-active ui-corner-top").removeAttr("role").removeAttr("aria-expanded").removeAttr("tabindex");
            this.headers.find("a").removeAttr("tabindex");
            this.headers.children(".ui-icon").remove();
            this.headers.next().removeClass("ui-accordion-content ui-accordion-content-active")
        }, _keydown: function (e) {
            var g = this.options, f = a.ui.keyCode;
            if (g.disabled || e.altKey || e.ctrlKey) {
                return
            }
            var d = this.headers.length;
            var b = this.headers.index(e.target);
            var c = false;
            switch (e.keyCode) {
                case f.RIGHT:
                case f.DOWN:
                    c = this.headers[(b + 1) % d];
                    break;
                case f.LEFT:
                case f.UP:
                    c = this.headers[(b - 1 + d) % d];
                    break;
                case f.SPACE:
                case f.ENTER:
                    return this._clickHandler({target: e.target})
            }
            if (c) {
                a(e.target).attr("tabIndex", "-1");
                a(c).attr("tabIndex", "0");
                c.focus();
                return false
            }
            return true
        }, resize: function () {
            var e = this.options, d;
            if (e.fillSpace) {
                if (a.browser.msie) {
                    var b = this.element.parent().css("overflow");
                    this.element.parent().css("overflow", "hidden")
                }
                d = this.element.parent().height();
                if (a.browser.msie) {
                    this.element.parent().css("overflow", b)
                }
                this.headers.each(function () {
                    d -= a(this).outerHeight()
                });
                var c = 0;
                this.headers.next().each(function () {
                    c = Math.max(c, a(this).innerHeight() - a(this).height())
                }).height(d - c).css("overflow", "auto")
            } else {
                if (e.autoHeight) {
                    d = 0;
                    this.headers.next().each(function () {
                        d = Math.max(d, a(this).outerHeight())
                    }).height(d)
                }
            }
        }, activate: function (b) {
            this._clickHandler({target: this._findActive(b)[0]})
        }, _findActive: function (b) {
            return b ? typeof b == "number" ? this.headers.filter(":eq(" + b + ")") : this.headers.not(this.headers.not(b)) : b === false ? a([]) : this.headers.filter(":eq(0)")
        }, _clickHandler: function (f) {
            var h = this.options;
            if (h.disabled) {
                return false
            }
            if (!f.target && !h.alwaysOpen) {
                this.active.removeClass("ui-state-active ui-corner-top").addClass("ui-state-default ui-corner-all").find(".ui-icon").removeClass(h.icons.headerSelected).addClass(h.icons.header);
                this.active.next().addClass("ui-accordion-content-active");
                var c = this.active.next(), g = {
                    options: h,
                    newHeader: a([]),
                    oldHeader: h.active,
                    newContent: a([]),
                    oldContent: c
                }, b = (this.active = a([]));
                this._toggle(b, c, g);
                return false
            }
            var d = a(f.target);
            d = a(d.parents(h.header)[0] || d);
            var e = d[0] == this.active[0];
            if (this.running || (h.alwaysOpen && e)) {
                return false
            }
            if (!d.is(h.header)) {
                return
            }
            this.active.removeClass("ui-state-active ui-corner-top").addClass("ui-state-default ui-corner-all").find(".ui-icon").removeClass(h.icons.headerSelected).addClass(h.icons.header);
            this.active.next().addClass("ui-accordion-content-active");
            if (!e) {
                d.removeClass("ui-state-default ui-corner-all").addClass("ui-state-active ui-corner-top").find(".ui-icon").removeClass(h.icons.header).addClass(h.icons.headerSelected);
                d.next().addClass("ui-accordion-content-active")
            }
            var b = d.next(), c = this.active.next(), g = {
                options: h,
                newHeader: e && !h.alwaysOpen ? a([]) : d,
                oldHeader: this.active,
                newContent: e && !h.alwaysOpen ? a([]) : b.find("> *"),
                oldContent: c.find("> *")
            }, i = this.headers.index(this.active[0]) > this.headers.index(d[0]);
            this.active = e ? a([]) : d;
            this._toggle(b, c, g, e, i);
            return false
        }, _toggle: function (b, i, g, j, k) {
            var d = this.options, m = this;
            this.toShow = b;
            this.toHide = i;
            this.data = g;
            var c = function () {
                if (!m) {
                    return
                }
                return m._completed.apply(m, arguments)
            };
            this._trigger("changestart", null, this.data);
            this.running = i.size() === 0 ? b.size() : i.size();
            if (d.animated) {
                var f = {};
                if (!d.alwaysOpen && j) {
                    f = {toShow: a([]), toHide: i, complete: c, down: k, autoHeight: d.autoHeight || d.fillSpace}
                } else {
                    f = {toShow: b, toHide: i, complete: c, down: k, autoHeight: d.autoHeight || d.fillSpace}
                }
                if (!d.proxied) {
                    d.proxied = d.animated
                }
                if (!d.proxiedDuration) {
                    d.proxiedDuration = d.duration
                }
                d.animated = a.isFunction(d.proxied) ? d.proxied(f) : d.proxied;
                d.duration = a.isFunction(d.proxiedDuration) ? d.proxiedDuration(f) : d.proxiedDuration;
                var l = a.ui.accordion.animations, e = d.duration, h = d.animated;
                if (!l[h]) {
                    l[h] = function (n) {
                        this.slide(n, {easing: h, duration: e || 700})
                    }
                }
                l[h](f)
            } else {
                if (!d.alwaysOpen && j) {
                    b.toggle()
                } else {
                    i.hide();
                    b.show()
                }
                c(true)
            }
            i.prev().attr("aria-expanded", "false").attr("tabIndex", "-1");
            b.prev().attr("aria-expanded", "true").attr("tabIndex", "0").focus()
        }, _completed: function (b) {
            var c = this.options;
            this.running = b ? 0 : --this.running;
            if (this.running) {
                return
            }
            if (c.clearStyle) {
                this.toShow.add(this.toHide).css({height: "", overflow: ""})
            }
            this._trigger("change", null, this.data)
        }
    });
    a.extend(a.ui.accordion, {
        version: "1.6rc6",
        defaults: {
            active: null,
            autoHeight: true,
            alwaysOpen: true,
            animated: "slide",
            clearStyle: false,
            event: "click",
            fillSpace: false,
            header: "a",
            icons: {header: "ui-icon-triangle-1-e", headerSelected: "ui-icon-triangle-1-s"},
            navigation: false,
            navigationFilter: function () {
                return this.href.toLowerCase() == location.href.toLowerCase()
            }
        },
        animations: {
            slide: function (j, h) {
                j = a.extend({easing: "swing", duration: 300}, j, h);
                if (!j.toHide.size()) {
                    j.toShow.animate({height: "show"}, j);
                    return
                }
                var b = j.toHide.height(), i = j.toShow.height(), c = i / b, d = j.toShow.css("overflow"), e = {}, g = {}, f = ["height", "paddingTop", "paddingBottom"];
                a.each(f, function (k, l) {
                    g[l] = "hide";
                    e[l] = parseFloat(j.toShow.css(l))
                });
                j.toShow.css({height: 0, overflow: "hidden"}).show();
                j.toHide.filter(":hidden").each(j.complete).end().filter(":visible").animate(g, {
                    step: function (l, m) {
                        if (!j.toShow[0]) {
                            return
                        }
                        var k = m.start != m.end ? (m.now - m.start) / (m.end - m.start) : 0, n = k * e[m.prop];
                        if (a.browser.msie || a.browser.opera) {
                            n = Math.ceil(n)
                        }
                        j.toShow[0].style[m.prop] = n + "px"
                    }, duration: j.duration, easing: j.easing, complete: function () {
                        if (!j.autoHeight) {
                            j.toShow.css("height", "auto")
                        }
                        j.toShow.css({overflow: d});
                        j.complete()
                    }
                })
            }, bounceslide: function (b) {
                this.slide(b, {easing: b.down ? "easeOutBounce" : "swing", duration: b.down ? 1000 : 200})
            }, easeslide: function (b) {
                this.slide(b, {easing: "easeinout", duration: 700})
            }
        }
    })
})(jQuery);
/*
 * jQuery UI Dialog 1.6rc6
 *
 * Copyright (c) 2009 AUTHORS.txt (http://ui.jquery.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Dialog
 *
 * Depends:
 *	ui.core.js
 *	ui.draggable.js
 *	ui.resizable.js
 */
(function (b) {
    var a = {
        dragStart: "start.draggable",
        drag: "drag.draggable",
        dragStop: "stop.draggable",
        maxHeight: "maxHeight.resizable",
        minHeight: "minHeight.resizable",
        maxWidth: "maxWidth.resizable",
        minWidth: "minWidth.resizable",
        resizeStart: "start.resizable",
        resize: "drag.resizable",
        resizeStop: "stop.resizable"
    };
    b.widget("ui.dialog", {
        _init: function () {
            this.originalTitle = this.element.attr("title");
            var k = this, l = this.options, i = l.title || this.originalTitle || "&nbsp;", d = b.ui.dialog.getTitleId(this.element), j = (this.uiDialog = b("<div/>")).appendTo(document.body).hide().addClass("ui-dialog ui-widget ui-widget-content ui-corner-all " + l.dialogClass).css({
                position: "absolute",
                overflow: "hidden",
                zIndex: l.zIndex
            }).attr("tabIndex", -1).css("outline", 0).keydown(function (m) {
                (l.closeOnEscape && m.keyCode && m.keyCode == b.ui.keyCode.ESCAPE && k.close(m))
            }).attr({role: "dialog", "aria-labelledby": d}).mousedown(function (m) {
                k.moveToTop(m)
            }), f = this.element.show().removeAttr("title").addClass("ui-dialog-content ui-widget-content").appendTo(j), e = (this.uiDialogTitlebar = b("<div></div>")).addClass("ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix").prependTo(j), h = b('<a href="#"/>').addClass("ui-dialog-titlebar-close ui-corner-all").attr("role", "button").hover(function () {
                h.addClass("ui-state-hover")
            }, function () {
                h.removeClass("ui-state-hover")
            }).focus(function () {
                h.addClass("ui-state-focus")
            }).blur(function () {
                h.removeClass("ui-state-focus")
            }).mousedown(function (m) {
                m.stopPropagation()
            }).click(function (m) {
                k.close(m);
                return false
            }).appendTo(e), g = (this.uiDialogTitlebarCloseText = b("<span/>")).addClass("ui-icon ui-icon-closethick").text(l.closeText).appendTo(h), c = b("<span/>").addClass("ui-dialog-title").attr("id", d).html(i).prependTo(e);
            e.find("*").add(e).disableSelection();
            (l.draggable && b.fn.draggable && this._makeDraggable());
            (l.resizable && b.fn.resizable && this._makeResizable());
            this._createButtons(l.buttons);
            this._isOpen = false;
            (l.bgiframe && b.fn.bgiframe && j.bgiframe());
            (l.autoOpen && this.open())
        }, destroy: function () {
            (this.overlay && this.overlay.destroy());
            (this.shadow && this._destroyShadow());
            this.uiDialog.hide();
            this.element.unbind(".dialog").removeData("dialog").removeClass("ui-dialog-content ui-widget-content").hide().appendTo("body");
            this.uiDialog.remove();
            (this.originalTitle && this.element.attr("title", this.originalTitle))
        }, close: function (c) {
            if (false === this._trigger("beforeclose", c)) {
                return
            }
            (this.overlay && this.overlay.destroy());
            (this.shadow && this._destroyShadow());
            this.uiDialog.hide(this.options.hide).unbind("keypress.ui-dialog");
            this._trigger("close", c);
            b.ui.dialog.overlay.resize();
            this._isOpen = false
        }, isOpen: function () {
            return this._isOpen
        }, moveToTop: function (g, f) {
            if ((this.options.modal && !g) || (!this.options.stack && !this.options.modal)) {
                return this._trigger("focus", f)
            }
            var e = this.options.zIndex, d = this.options;
            b(".ui-dialog:visible").each(function () {
                e = Math.max(e, parseInt(b(this).css("z-index"), 10) || d.zIndex)
            });
            (this.overlay && this.overlay.$el.css("z-index", ++e));
            (this.shadow && this.shadow.css("z-index", ++e));
            var c = {scrollTop: this.element.attr("scrollTop"), scrollLeft: this.element.attr("scrollLeft")};
            this.uiDialog.css("z-index", ++e);
            this.element.attr(c);
            this._trigger("focus", f)
        }, open: function (e) {
            if (this._isOpen) {
                return
            }
            var d = this.options, c = this.uiDialog;
            this.overlay = d.modal ? new b.ui.dialog.overlay(this) : null;
            (c.next().length && c.appendTo("body"));
            this._size();
            this._position(d.position);
            c.show(d.show);
            this.moveToTop(true, e);
            (d.modal && c.bind("keypress.ui-dialog", function (h) {
                if (h.keyCode != b.ui.keyCode.TAB) {
                    return
                }
                var g = b(":tabbable", this), i = g.filter(":first")[0], f = g.filter(":last")[0];
                if (h.target == f && !h.shiftKey) {
                    setTimeout(function () {
                        i.focus()
                    }, 1)
                } else {
                    if (h.target == i && h.shiftKey) {
                        setTimeout(function () {
                            f.focus()
                        }, 1)
                    }
                }
            }));
            b([]).add(c.find(".ui-dialog-content :tabbable:first")).add(c.find(".ui-dialog-buttonpane :tabbable:first")).add(c.find(".ui-dialog-titlebar :tabbable:first")).filter(":first").focus();
            if (d.shadow) {
                this._createShadow()
            }
            this._trigger("open", e);
            this._isOpen = true
        }, _createButtons: function (f) {
            var e = this, c = false, d = b("<div></div>").addClass("ui-dialog-buttonpane ui-widget-content ui-helper-clearfix");
            this.uiDialog.find(".ui-dialog-buttonpane").remove();
            (typeof f == "object" && f !== null && b.each(f, function () {
                return !(c = true)
            }));
            if (c) {
                b.each(f, function (g, h) {
                    b('<button type="button"></button>').addClass("ui-state-default ui-corner-all").text(g).click(function () {
                        h.apply(e.element[0], arguments)
                    }).hover(function () {
                        b(this).addClass("ui-state-hover")
                    }, function () {
                        b(this).removeClass("ui-state-hover")
                    }).focus(function () {
                        b(this).addClass("ui-state-focus")
                    }).blur(function () {
                        b(this).removeClass("ui-state-focus")
                    }).appendTo(d)
                });
                d.appendTo(this.uiDialog)
            }
        }, _makeDraggable: function () {
            var c = this, d = this.options;
            this.uiDialog.draggable({
                cancel: ".ui-dialog-content",
                helper: d.dragHelper,
                handle: ".ui-dialog-titlebar",
                containment: "document",
                start: function () {
                    (d.dragStart && d.dragStart.apply(c.element[0], arguments));
                    if (b.browser.msie && b.browser.version < 7 && c.shadow) {
                        c.shadow.hide()
                    }
                },
                drag: function () {
                    (d.drag && d.drag.apply(c.element[0], arguments));
                    c._refreshShadow(1)
                },
                stop: function () {
                    (d.dragStop && d.dragStop.apply(c.element[0], arguments));
                    b.ui.dialog.overlay.resize();
                    if (b.browser.msie && b.browser.version < 7 && c.shadow) {
                        c.shadow.show()
                    }
                    c._refreshShadow()
                }
            })
        }, _makeResizable: function (f) {
            f = (f === undefined ? this.options.resizable : f);
            var c = this, e = this.options, d = typeof f == "string" ? f : "n,e,s,w,se,sw,ne,nw";
            this.uiDialog.resizable({
                cancel: ".ui-dialog-content",
                alsoResize: this.element,
                helper: e.resizeHelper,
                maxWidth: e.maxWidth,
                maxHeight: e.maxHeight,
                minWidth: e.minWidth,
                minHeight: e.minHeight,
                start: function () {
                    (e.resizeStart && e.resizeStart.apply(c.element[0], arguments));
                    if (b.browser.msie && b.browser.version < 7 && c.shadow) {
                        c.shadow.hide()
                    }
                },
                resize: function () {
                    (e.resize && e.resize.apply(c.element[0], arguments));
                    c._refreshShadow(1)
                },
                handles: d,
                stop: function () {
                    (e.resizeStop && e.resizeStop.apply(c.element[0], arguments));
                    b.ui.dialog.overlay.resize();
                    if (b.browser.msie && b.browser.version < 7 && c.shadow) {
                        c.shadow.show()
                    }
                    c._refreshShadow()
                }
            }).find(".ui-resizable-se").addClass("ui-icon ui-icon-grip-diagonal-se")
        }, _position: function (h) {
            var d = b(window), e = b(document), f = e.scrollTop(), c = e.scrollLeft(), g = f;
            if (b.inArray(h, ["center", "top", "right", "bottom", "left"]) >= 0) {
                h = [h == "right" || h == "left" ? h : "center", h == "top" || h == "bottom" ? h : "middle"]
            }
            if (h.constructor != Array) {
                h = ["center", "middle"]
            }
            if (h[0].constructor == Number) {
                c += h[0]
            } else {
                switch (h[0]) {
                    case"left":
                        c += 0;
                        break;
                    case"right":
                        c += d.width() - this.uiDialog.outerWidth();
                        break;
                    default:
                    case"center":
                        c += (d.width() - this.uiDialog.outerWidth()) / 2
                }
            }
            if (h[1].constructor == Number) {
                f += h[1]
            } else {
                switch (h[1]) {
                    case"top":
                        f += 0;
                        break;
                    case"bottom":
                        f += d.height() - this.uiDialog.outerHeight();
                        break;
                    default:
                    case"middle":
                        f += (d.height() - this.uiDialog.outerHeight()) / 2
                }
            }
            f = Math.max(f, g);
            this.uiDialog.css({top: f, left: c})
        }, _setData: function (d, e) {
            (a[d] && this.uiDialog.data(a[d], e));
            switch (d) {
                case"buttons":
                    this._createButtons(e);
                    break;
                case"closeText":
                    this.uiDialogTitlebarCloseText.text(e);
                    break;
                case"draggable":
                    (e ? this._makeDraggable() : this.uiDialog.draggable("destroy"));
                    break;
                case"height":
                    this.uiDialog.height(e);
                    break;
                case"position":
                    this._position(e);
                    break;
                case"resizable":
                    var c = this.uiDialog, f = this.uiDialog.is(":data(resizable)");
                    (f && !e && c.resizable("destroy"));
                    (f && typeof e == "string" && c.resizable("option", "handles", e));
                    (f || this._makeResizable(e));
                    break;
                case"title":
                    b(".ui-dialog-title", this.uiDialogTitlebar).html(e || "&nbsp;");
                    break;
                case"width":
                    this.uiDialog.width(e);
                    break
            }
            b.widget.prototype._setData.apply(this, arguments)
        }, _size: function () {
            var d = this.options;
            this.element.css({height: 0, minHeight: 0, width: "auto"});
            var c = this.uiDialog.css({height: "auto", width: d.width}).height();
            this.element.css({
                minHeight: Math.max(d.minHeight - c, 0),
                height: d.height == "auto" ? "auto" : d.height - c
            })
        }, _createShadow: function () {
            this.shadow = b('<div class="ui-widget-shadow"></div>').css("position", "absolute").appendTo(document.body);
            this._refreshShadow();
            return this.shadow
        }, _refreshShadow: function (c) {
            if (c && b.browser.msie && b.browser.version < 7) {
                return
            }
            var d = this.uiDialog.offset();
            this.shadow.css({
                left: d.left,
                top: d.top,
                width: this.uiDialog.outerWidth(),
                height: this.uiDialog.outerHeight()
            })
        }, _destroyShadow: function () {
            this.shadow.remove();
            this.shadow = null
        }
    });
    b.extend(b.ui.dialog, {
        version: "1.6rc6",
        defaults: {
            autoOpen: true,
            bgiframe: false,
            buttons: {},
            closeOnEscape: true,
            closeText: "close",
            draggable: true,
            height: "auto",
            minHeight: 150,
            minWidth: 150,
            modal: false,
            position: "center",
            resizable: true,
            shadow: true,
            stack: true,
            title: "",
            width: 300,
            zIndex: 1000
        },
        getter: "isOpen",
        uuid: 0,
        getTitleId: function (c) {
            return "ui-dialog-title-" + (c.attr("id") || ++this.uuid)
        },
        overlay: function (c) {
            this.$el = b.ui.dialog.overlay.create(c)
        }
    });
    b.extend(b.ui.dialog.overlay, {
        instances: [],
        events: b.map("focus,mousedown,mouseup,keydown,keypress,click".split(","), function (c) {
            return c + ".dialog-overlay"
        }).join(" "),
        create: function (d) {
            if (this.instances.length === 0) {
                setTimeout(function () {
                    b("a, :input").bind(b.ui.dialog.overlay.events, function () {
                        var f = false;
                        var h = b(this).parents(".ui-dialog");
                        if (h.length) {
                            var e = b(".ui-dialog-overlay");
                            if (e.length) {
                                var g = parseInt(e.css("z-index"), 10);
                                e.each(function () {
                                    g = Math.max(g, parseInt(b(this).css("z-index"), 10))
                                });
                                f = parseInt(h.css("z-index"), 10) > g
                            } else {
                                f = true
                            }
                        }
                        return f
                    })
                }, 1);
                b(document).bind("keydown.dialog-overlay", function (e) {
                    (d.options.closeOnEscape && e.keyCode && e.keyCode == b.ui.keyCode.ESCAPE && d.close(e))
                });
                b(window).bind("resize.dialog-overlay", b.ui.dialog.overlay.resize)
            }
            var c = b("<div></div>").appendTo(document.body).addClass("ui-widget-overlay").css({
                width: this.width(),
                height: this.height()
            });
            (d.options.bgiframe && b.fn.bgiframe && c.bgiframe());
            this.instances.push(c);
            return c
        },
        destroy: function (c) {
            this.instances.splice(b.inArray(this.instances, c), 1);
            if (this.instances.length === 0) {
                b("a, :input").add([document, window]).unbind(".dialog-overlay")
            }
            c.remove()
        },
        height: function () {
            if (b.browser.msie && b.browser.version < 7) {
                var d = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
                var c = Math.max(document.documentElement.offsetHeight, document.body.offsetHeight);
                if (d < c) {
                    return b(window).height() + "px"
                } else {
                    return d + "px"
                }
            } else {
                return b(document).height() + "px"
            }
        },
        width: function () {
            if (b.browser.msie && b.browser.version < 7) {
                var c = Math.max(document.documentElement.scrollWidth, document.body.scrollWidth);
                var d = Math.max(document.documentElement.offsetWidth, document.body.offsetWidth);
                if (c < d) {
                    return b(window).width() + "px"
                } else {
                    return c + "px"
                }
            } else {
                return b(document).width() + "px"
            }
        },
        resize: function () {
            var c = b([]);
            b.each(b.ui.dialog.overlay.instances, function () {
                c = c.add(this)
            });
            c.css({width: 0, height: 0}).css({width: b.ui.dialog.overlay.width(), height: b.ui.dialog.overlay.height()})
        }
    });
    b.extend(b.ui.dialog.overlay.prototype, {
        destroy: function () {
            b.ui.dialog.overlay.destroy(this.$el)
        }
    })
})(jQuery);
/*
 * jQuery UI Slider 1.6rc6
 *
 * Copyright (c) 2009 AUTHORS.txt (http://ui.jquery.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Slider
 *
 * Depends:
 *	ui.core.js
 */
(function (a) {
    a.widget("ui.slider", a.extend({}, a.ui.mouse, {
        _init: function () {
            var b = this, c = this.options;
            this._keySliding = false;
            this._handleIndex = null;
            this._detectOrientation();
            this._mouseInit();
            this.element.addClass("ui-slider ui-slider-" + this.orientation + " ui-widget ui-widget-content ui-corner-all");
            this.range = a([]);
            if (c.range) {
                if (c.range === true) {
                    this.range = a("<div></div>");
                    if (!c.values) {
                        c.values = [this._valueMin(), this._valueMin()]
                    }
                    if (c.values.length && c.values.length != 2) {
                        c.values = [c.values[0], c.values[0]]
                    }
                } else {
                    this.range = a("<div></div>")
                }
                this.range.appendTo(this.element).addClass("ui-slider-range ui-widget-header");
                (c.range == "min") && (this.orientation == "horizontal") && this.range.css({left: 0});
                (c.range == "max") && (this.orientation == "horizontal") && this.range.css({right: 0});
                (c.range == "min") && (this.orientation == "vertical") && this.range.css({bottom: 0});
                (c.range == "max") && (this.orientation == "vertical") && this.range.css({top: 0})
            }
            if (a(".ui-slider-handle", this.element).length == 0) {
                a('<a href="#"></a>').appendTo(this.element).addClass("ui-slider-handle")
            }
            if (c.values && c.values.length) {
                while (a(".ui-slider-handle", this.element).length < c.values.length) {
                    a('<a href="#"></a>').appendTo(this.element).addClass("ui-slider-handle")
                }
            }
            this.handles = a(".ui-slider-handle", this.element).addClass("ui-state-default ui-corner-all");
            this.handle = this.handles.eq(0);
            this.handles.add(this.range).filter("a").click(function (d) {
                d.preventDefault()
            }).hover(function () {
                a(this).addClass("ui-state-hover")
            }, function () {
                a(this).removeClass("ui-state-hover")
            }).focus(function () {
                b.handles.removeClass("ui-state-focus");
                a(this).addClass("ui-state-focus")
            }).blur(function () {
                a(this).removeClass("ui-state-focus")
            });
            this.handles.each(function (d) {
                a(this).data("index.ui-slider-handle", d)
            });
            this.handles.keydown(function (h) {
                var e = a(this).data("index.ui-slider-handle");
                if (b.options.disabled) {
                    return
                }
                switch (h.keyCode) {
                    case a.ui.keyCode.HOME:
                    case a.ui.keyCode.END:
                    case a.ui.keyCode.UP:
                    case a.ui.keyCode.RIGHT:
                    case a.ui.keyCode.DOWN:
                    case a.ui.keyCode.LEFT:
                        if (!b._keySliding) {
                            b._keySliding = true;
                            a(this).addClass("ui-state-active");
                            b._start(h)
                        }
                        break
                }
                var f, d, g = b._step();
                if (b.options.values && b.options.values.length) {
                    f = d = b.values(e)
                } else {
                    f = d = b.value()
                }
                switch (h.keyCode) {
                    case a.ui.keyCode.HOME:
                        d = b._valueMin();
                        break;
                    case a.ui.keyCode.END:
                        d = b._valueMax();
                        break;
                    case a.ui.keyCode.UP:
                    case a.ui.keyCode.RIGHT:
                        if (f == b._valueMax()) {
                            return
                        }
                        d = f + g;
                        break;
                    case a.ui.keyCode.DOWN:
                    case a.ui.keyCode.LEFT:
                        if (f == b._valueMin()) {
                            return
                        }
                        d = f - g;
                        break
                }
                b._slide(h, e, d)
            }).keyup(function (d) {
                if (b._keySliding) {
                    b._stop(d);
                    b._change(d);
                    b._keySliding = false;
                    a(this).removeClass("ui-state-active")
                }
            });
            this._refreshValue()
        }, destroy: function () {
            this.handles.remove();
            this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-slider-disabled ui-widget ui-widget-content ui-corner-all").removeData("slider").unbind(".slider");
            this._mouseDestroy()
        }, _mouseCapture: function (d) {
            var e = this.options;
            if (e.disabled) {
                return false
            }
            this._start(d);
            this.elementSize = {width: this.element.outerWidth(), height: this.element.outerHeight()};
            this.elementOffset = this.element.offset();
            var h = {x: d.pageX, y: d.pageY};
            var j = this._normValueFromMouse(h);
            var c = this._valueMax() + 1, f;
            var k = this, i;
            this.handles.each(function (l) {
                var m = Math.abs(j - k.values(l));
                if (c > m) {
                    c = m;
                    f = a(this);
                    i = l
                }
            });
            if (e.range && (this.values(0) + this.values(1)) == 0) {
                f = a(this.handles[++i])
            }
            k._handleIndex = i;
            f.addClass("ui-state-active").focus();
            var g = f.offset();
            var b = !a(d.target).parents().andSelf().is(".ui-slider-handle");
            this._clickOffset = b ? {left: 0, top: 0} : {
                left: d.pageX - g.left + (parseInt(f.css("marginLeft"), 10) || 0),
                top: d.pageY - g.top + (parseInt(f.css("marginTop"), 10) || 0)
            };
            j = this._normValueFromMouse(h);
            this._slide(d, i, j);
            return true
        }, _mouseStart: function (b) {
            return true
        }, _mouseDrag: function (d) {
            var b = {x: d.pageX, y: d.pageY};
            var c = this._normValueFromMouse(b);
            this._slide(d, this._handleIndex, c);
            return false
        }, _mouseStop: function (b) {
            this.handles.removeClass("ui-state-active");
            this._stop(b);
            this._change(b);
            this._handleIndex = null;
            this._clickOffset = null;
            return false
        }, _detectOrientation: function () {
            this.orientation = this.options.orientation == "auto" ? (this.element[0].offsetWidth / this.element[0].offsetHeight > 1 ? "horizontal" : "vertical") : this.options.orientation
        }, _normValueFromMouse: function (d) {
            var c, h;
            if ("horizontal" == this.orientation) {
                c = this.elementSize.width;
                h = d.x - this.elementOffset.left - (this._clickOffset ? this._clickOffset.left : 0)
            } else {
                c = this.elementSize.height;
                h = d.y - this.elementOffset.top - (this._clickOffset ? this._clickOffset.top : 0)
            }
            var f = (h / c);
            if (f > 1) {
                f = 1
            }
            if (f < 0) {
                f = 0
            }
            if ("vertical" == this.orientation) {
                f = 1 - f
            }
            var e = this._valueMax() - this._valueMin(), i = f * e, b = i % this.options.step, g = this._valueMin() + i - b;
            if (b > (this.options.step / 2)) {
                g += this.options.step
            }
            return g
        }, _start: function (b) {
            this._trigger("start", b, {value: this.value()})
        }, _slide: function (f, e, d) {
            var g = this.handles[e];
            if (this.options.values && this.options.values.length) {
                var b = this.values(e ? 0 : 1);
                if ((e == 0 && d >= b) || (e == 1 && d <= b)) {
                    d = b
                }
                if (d != this.values(e)) {
                    var c = this.values();
                    c[e] = d;
                    var h = this._trigger("slide", f, {handle: g, value: d, values: c});
                    var b = this.values(e ? 0 : 1);
                    if (h !== false) {
                        this.values(e, d, !(f.type == "mousedown" && this.options.animate))
                    }
                }
            } else {
                if (d != this.value()) {
                    var h = this._trigger("slide", f, {handle: g, value: d});
                    if (h !== false) {
                        this._setData("value", d, (f.type == "mousedown" && this.options.animate))
                    }
                }
            }
        }, _stop: function (b) {
            this._trigger("stop", b, {value: this.value()})
        }, _change: function (b) {
            this._trigger("change", b, {value: this.value()})
        }, value: function (b) {
            if (arguments.length) {
                this._setData("value", b);
                this._change()
            }
            return this._value()
        }, values: function (c, d, b) {
            if (!this.options.animate) {
                b = true
            }
            if (arguments.length > 1) {
                this.options.values[c] = d;
                this._refreshValue(!b);
                this._change()
            }
            if (arguments.length) {
                if (this.options.values && this.options.values.length) {
                    return this._values(c)
                } else {
                    return this.value()
                }
            } else {
                return this._values()
            }
        }, _setData: function (b, c) {
            a.widget.prototype._setData.apply(this, arguments);
            switch (b) {
                case"orientation":
                    this._detectOrientation();
                    this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-" + this.orientation);
                    this._refreshValue();
                    break;
                case"value":
                    this._refreshValue();
                    break
            }
        }, _step: function () {
            var b = this.options.step;
            return b
        }, _value: function () {
            var b = this.options.value;
            if (b < this._valueMin()) {
                b = this._valueMin()
            }
            if (b > this._valueMax()) {
                b = this._valueMax()
            }
            return b
        }, _values: function (b) {
            if (arguments.length) {
                var c = this.options.values[b];
                if (c < this._valueMin()) {
                    c = this._valueMin()
                }
                if (c > this._valueMax()) {
                    c = this._valueMax()
                }
                return c
            } else {
                return this.options.values
            }
        }, _valueMin: function () {
            var b = this.options.min;
            return b
        }, _valueMax: function () {
            var b = this.options.max;
            return b
        }, _refreshValue: function (e) {
            var h = this.options.range, g = this.options, d = this;
            if (this.options.values && this.options.values.length) {
                var c, i;
                this.handles.each(function (n, l) {
                    var m = (d.values(n) - d._valueMin()) / (d._valueMax() - d._valueMin()) * 100;
                    var k = {};
                    k[d.orientation == "horizontal" ? "left" : "bottom"] = m + "%";
                    a(this).stop(1, 1)[e ? "animate" : "css"](k, g.animate);
                    if (d.options.range === true) {
                        if (d.orientation == "horizontal") {
                            (n == 0) && d.range.stop(1, 1)[e ? "animate" : "css"]({left: m + "%"}, g.animate);
                            (n == 1) && d.range[e ? "animate" : "css"]({width: (m - lastValPercent) + "%"}, {
                                queue: false,
                                duration: g.animate
                            })
                        } else {
                            (n == 0) && d.range.stop(1, 1)[e ? "animate" : "css"]({bottom: (m) + "%"}, g.animate);
                            (n == 1) && d.range[e ? "animate" : "css"]({height: (m - lastValPercent) + "%"}, {
                                queue: false,
                                duration: g.animate
                            })
                        }
                    }
                    lastValPercent = m
                })
            } else {
                var f = (this.value() - this._valueMin()) / (this._valueMax() - this._valueMin()) * 100;
                var b = {};
                b[d.orientation == "horizontal" ? "left" : "bottom"] = f + "%";
                this.handle.stop(1, 1)[e ? "animate" : "css"](b, g.animate);
                (h == "min") && (this.orientation == "horizontal") && this.range.stop(1, 1)[e ? "animate" : "css"]({
                    left: 0,
                    width: f + "%"
                }, g.animate);
                (h == "max") && (this.orientation == "horizontal") && this.range[e ? "animate" : "css"]({
                    left: f + "%",
                    width: (100 - f) + "%"
                }, {queue: false, duration: g.animate});
                (h == "min") && (this.orientation == "vertical") && this.range.stop(1, 1)[e ? "animate" : "css"]({
                    top: (100 - f) + "%",
                    height: f + "%"
                }, g.animate);
                (h == "max") && (this.orientation == "vertical") && this.range[e ? "animate" : "css"]({
                    bottom: f + "%",
                    height: (100 - f) + "%"
                }, {queue: false, duration: g.animate})
            }
        }
    }));
    a.extend(a.ui.slider, {
        getter: "value values",
        version: "1.6rc6",
        eventPrefix: "slide",
        defaults: {
            animate: false,
            delay: 0,
            distance: 0,
            max: 100,
            min: 0,
            orientation: "auto",
            range: false,
            step: 1,
            value: 0,
            values: null
        }
    })
})(jQuery);
/*
 * jQuery UI Tabs 1.6rc6
 *
 * Copyright (c) 2009 AUTHORS.txt (http://ui.jquery.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Tabs
 *
 * Depends:
 *	ui.core.js
 */
(function (a) {
    a.widget("ui.tabs", {
        _init: function () {
            this._tabify(true)
        }, _setData: function (b, c) {
            if ((/^selected/).test(b)) {
                this.select(c)
            } else {
                this.options[b] = c;
                this._tabify()
            }
        }, _tabId: function (b) {
            return b.title && b.title.replace(/\s/g, "_").replace(/[^A-Za-z0-9\-_:\.]/g, "") || this.options.idPrefix + a.data(b)
        }, _sanitizeSelector: function (b) {
            return b.replace(/:/g, "\\:")
        }, _cookie: function () {
            var b = this.cookie || (this.cookie = this.options.cookie.name || "ui-tabs-" + a.data(this.list[0]));
            return a.cookie.apply(null, [b].concat(a.makeArray(arguments)))
        }, _ui: function (c, b) {
            return {tab: c, panel: b, index: this.$tabs.index(c)}
        }, _tabify: function (q) {
            this.list = this.element.is("div") ? this.element.children("ul:first, ol:first").eq(0) : this.element;
            this.$lis = a("li:has(a[href])", this.list);
            this.$tabs = this.$lis.map(function () {
                return a("a", this)[0]
            });
            this.$panels = a([]);
            var r = this, d = this.options;
            var c = /^#.+/;
            this.$tabs.each(function (t, o) {
                var s = a(o).attr("href");
                if (c.test(s)) {
                    r.$panels = r.$panels.add(r._sanitizeSelector(s))
                } else {
                    if (s != "#") {
                        a.data(o, "href.tabs", s);
                        a.data(o, "load.tabs", s.replace(/#.*$/, ""));
                        var v = r._tabId(o);
                        o.href = "#" + v;
                        var u = a("#" + v);
                        if (!u.length) {
                            u = a(d.panelTemplate).attr("id", v).addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").insertAfter(r.$panels[t - 1] || r.list);
                            u.data("destroy.tabs", true)
                        }
                        r.$panels = r.$panels.add(u)
                    } else {
                        d.disabled.push(t + 1)
                    }
                }
            });
            if (q) {
                if (this.element.is("div")) {
                    this.element.addClass("ui-tabs ui-widget ui-widget-content ui-corner-all")
                }
                this.list.addClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all");
                this.$lis.addClass("ui-state-default ui-corner-top");
                this.$panels.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom");
                if (d.selected === undefined) {
                    if (location.hash) {
                        this.$tabs.each(function (s, o) {
                            if (o.hash == location.hash) {
                                d.selected = s;
                                return false
                            }
                        })
                    } else {
                        if (d.cookie) {
                            d.selected = parseInt(r._cookie(), 10)
                        } else {
                            if (this.$lis.filter(".ui-tabs-selected").length) {
                                d.selected = this.$lis.index(this.$lis.filter(".ui-tabs-selected"))
                            } else {
                                d.selected = 0
                            }
                        }
                    }
                } else {
                    if (d.selected === null) {
                        d.selected = -1
                    }
                }
                d.selected = ((d.selected >= 0 && this.$tabs[d.selected]) || d.selected < 0) ? d.selected : 0;
                d.disabled = a.unique(d.disabled.concat(a.map(this.$lis.filter(".ui-state-disabled"), function (s, o) {
                    return r.$lis.index(s)
                }))).sort();
                if (a.inArray(d.selected, d.disabled) != -1) {
                    d.disabled.splice(a.inArray(d.selected, d.disabled), 1)
                }
                this.$panels.addClass("ui-tabs-hide");
                this.$lis.removeClass("ui-tabs-selected ui-state-active");
                if (d.selected >= 0 && this.$tabs.length) {
                    this.$panels.eq(d.selected).removeClass("ui-tabs-hide");
                    var f = ["ui-tabs-selected ui-state-active"];
                    if (d.deselectable) {
                        f.push("ui-tabs-deselectable")
                    }
                    this.$lis.eq(d.selected).addClass(f.join(" "));
                    var k = function () {
                        r._trigger("show", null, r._ui(r.$tabs[d.selected], r.$panels[d.selected]))
                    };
                    if (a.data(this.$tabs[d.selected], "load.tabs")) {
                        this.load(d.selected, k)
                    } else {
                        k()
                    }
                }
                if (d.event != "mouseover") {
                    var l = function (o, i) {
                        if (i.is(":not(.ui-state-disabled)")) {
                            i.toggleClass("ui-state-" + o)
                        }
                    };
                    this.$lis.bind("mouseover.tabs mouseout.tabs", function () {
                        l("hover", a(this))
                    });
                    this.$tabs.bind("focus.tabs blur.tabs", function () {
                        l("focus", a(this).parents("li:first"))
                    })
                }
                a(window).bind("unload", function () {
                    r.$lis.add(r.$tabs).unbind(".tabs");
                    r.$lis = r.$tabs = r.$panels = null
                })
            } else {
                d.selected = this.$lis.index(this.$lis.filter(".ui-tabs-selected"))
            }
            if (d.cookie) {
                this._cookie(d.selected, d.cookie)
            }
            for (var h = 0, p; p = this.$lis[h]; h++) {
                a(p)[a.inArray(h, d.disabled) != -1 && !a(p).hasClass("ui-tabs-selected") ? "addClass" : "removeClass"]("ui-state-disabled")
            }
            if (d.cache === false) {
                this.$tabs.removeData("cache.tabs")
            }
            var b, j;
            if (d.fx) {
                if (a.isArray(d.fx)) {
                    b = d.fx[0];
                    j = d.fx[1]
                } else {
                    b = j = d.fx
                }
            }
            function e(i, o) {
                i.css({display: ""});
                if (a.browser.msie && o.opacity) {
                    i[0].style.removeAttribute("filter")
                }
            }

            var m = j ? function (i, o) {
                o.hide().removeClass("ui-tabs-hide").animate(j, 500, function () {
                    e(o, j);
                    r._trigger("show", null, r._ui(i, o[0]))
                })
            } : function (i, o) {
                o.removeClass("ui-tabs-hide");
                r._trigger("show", null, r._ui(i, o[0]))
            };
            var n = b ? function (o, i, s) {
                i.animate(b, b.duration || "normal", function () {
                    i.addClass("ui-tabs-hide");
                    e(i, b);
                    if (s) {
                        m(o, s)
                    }
                })
            } : function (o, i, s) {
                i.addClass("ui-tabs-hide");
                if (s) {
                    m(o, s)
                }
            };

            function g(s, u, i, t) {
                var o = ["ui-tabs-selected ui-state-active"];
                if (d.deselectable) {
                    o.push("ui-tabs-deselectable")
                }
                u.removeClass("ui-state-default").addClass(o.join(" ")).siblings().removeClass(o.join(" ")).addClass("ui-state-default");
                n(s, i, t)
            }

            this.$tabs.unbind(".tabs").bind(d.event + ".tabs", function () {
                var t = a(this).parents("li:eq(0)"), i = r.$panels.filter(":visible"), s = a(r._sanitizeSelector(this.hash));
                if ((t.hasClass("ui-state-active") && !d.deselectable) || t.hasClass("ui-state-disabled") || a(this).hasClass("ui-tabs-loading") || r._trigger("select", null, r._ui(this, s[0])) === false) {
                    this.blur();
                    return false
                }
                d.selected = r.$tabs.index(this);
                if (d.deselectable) {
                    if (t.hasClass("ui-state-active")) {
                        d.selected = -1;
                        if (d.cookie) {
                            r._cookie(d.selected, d.cookie)
                        }
                        t.removeClass("ui-tabs-selected ui-state-active ui-tabs-deselectable").addClass("ui-state-default");
                        r.$panels.stop();
                        n(this, i);
                        this.blur();
                        return false
                    } else {
                        if (!i.length) {
                            if (d.cookie) {
                                r._cookie(d.selected, d.cookie)
                            }
                            r.$panels.stop();
                            var o = this;
                            r.load(r.$tabs.index(this), function () {
                                t.addClass("ui-tabs-selected ui-state-active ui-tabs-deselectable").removeClass("ui-state-default");
                                m(o, s)
                            });
                            this.blur();
                            return false
                        }
                    }
                }
                if (d.cookie) {
                    r._cookie(d.selected, d.cookie)
                }
                r.$panels.stop();
                if (s.length) {
                    var o = this;
                    r.load(r.$tabs.index(this), i.length ? function () {
                        g(o, t, i, s)
                    } : function () {
                        t.addClass("ui-tabs-selected ui-state-active").removeClass("ui-state-default");
                        m(o, s)
                    })
                } else {
                    throw"jQuery UI Tabs: Mismatching fragment identifier."
                }
                if (a.browser.msie) {
                    this.blur()
                }
                return false
            });
            if (d.event != "click") {
                this.$tabs.bind("click.tabs", function () {
                    return false
                })
            }
        }, destroy: function () {
            var b = this.options;
            this.element.removeClass("ui-tabs ui-widget ui-widget-content ui-corner-all");
            this.list.unbind(".tabs").removeClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all").removeData("tabs");
            this.$tabs.each(function () {
                var c = a.data(this, "href.tabs");
                if (c) {
                    this.href = c
                }
                var d = a(this).unbind(".tabs");
                a.each(["href", "load", "cache"], function (e, f) {
                    d.removeData(f + ".tabs")
                })
            });
            this.$lis.unbind(".tabs").add(this.$panels).each(function () {
                if (a.data(this, "destroy.tabs")) {
                    a(this).remove()
                } else {
                    a(this).removeClass("ui-state-default ui-corner-top ui-tabs-selected ui-state-active ui-tabs-deselectable ui-state-disabled ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide")
                }
            });
            if (b.cookie) {
                this._cookie(null, b.cookie)
            }
        }, add: function (c, h, f) {
            if (f == undefined) {
                f = this.$tabs.length
            }
            var i = this, e = this.options;
            var g = a(e.tabTemplate.replace(/#\{href\}/g, c).replace(/#\{label\}/g, h));
            g.addClass("ui-state-default ui-corner-top").data("destroy.tabs", true);
            var d = c.indexOf("#") == 0 ? c.replace("#", "") : this._tabId(a("a:first-child", g)[0]);
            var j = a("#" + d);
            if (!j.length) {
                j = a(e.panelTemplate).attr("id", d).data("destroy.tabs", true)
            }
            j.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide");
            if (f >= this.$lis.length) {
                g.appendTo(this.list);
                j.appendTo(this.list[0].parentNode)
            } else {
                g.insertBefore(this.$lis[f]);
                j.insertBefore(this.$panels[f])
            }
            e.disabled = a.map(e.disabled, function (l, k) {
                return l >= f ? ++l : l
            });
            this._tabify();
            if (this.$tabs.length == 1) {
                g.addClass("ui-tabs-selected ui-state-active");
                j.removeClass("ui-tabs-hide");
                var b = a.data(this.$tabs[0], "load.tabs");
                if (b) {
                    this.load(0, function () {
                        i._trigger("show", null, i._ui(i.$tabs[0], i.$panels[0]))
                    })
                }
            }
            this._trigger("add", null, this._ui(this.$tabs[f], this.$panels[f]))
        }, remove: function (b) {
            var d = this.options, e = this.$lis.eq(b).remove(), c = this.$panels.eq(b).remove();
            if (e.hasClass("ui-tabs-selected") && this.$tabs.length > 1) {
                this.select(b + (b + 1 < this.$tabs.length ? 1 : -1))
            }
            d.disabled = a.map(a.grep(d.disabled, function (g, f) {
                return g != b
            }), function (g, f) {
                return g >= b ? --g : g
            });
            this._tabify();
            this._trigger("remove", null, this._ui(e.find("a")[0], c[0]))
        }, enable: function (b) {
            var c = this.options;
            if (a.inArray(b, c.disabled) == -1) {
                return
            }
            this.$lis.eq(b).removeClass("ui-state-disabled");
            c.disabled = a.grep(c.disabled, function (e, d) {
                return e != b
            });
            this._trigger("enable", null, this._ui(this.$tabs[b], this.$panels[b]))
        }, disable: function (c) {
            var b = this, d = this.options;
            if (c != d.selected) {
                this.$lis.eq(c).addClass("ui-state-disabled");
                d.disabled.push(c);
                d.disabled.sort();
                this._trigger("disable", null, this._ui(this.$tabs[c], this.$panels[c]))
            }
        }, select: function (b) {
            if (typeof b == "string") {
                b = this.$tabs.index(this.$tabs.filter("[href$=" + b + "]"))
            }
            this.$tabs.eq(b).trigger(this.options.event + ".tabs")
        }, load: function (g, k) {
            var l = this, d = this.options, e = this.$tabs.eq(g), j = e[0], h = k == undefined || k === false, b = e.data("load.tabs");
            k = k || function () {
                };
            if (!b || !h && a.data(j, "cache.tabs")) {
                k();
                return
            }
            var m = function (n) {
                var o = a(n), p = o.find("*:last");
                return p.length && p.is(":not(img)") && p || o
            };
            var c = function () {
                l.$tabs.filter(".ui-tabs-loading").removeClass("ui-tabs-loading").each(function () {
                    if (d.spinner) {
                        m(this).parent().html(m(this).data("label.tabs"))
                    }
                });
                l.xhr = null
            };
            if (d.spinner) {
                var i = m(j).html();
                m(j).wrapInner("<em></em>").find("em").data("label.tabs", i).html(d.spinner)
            }
            var f = a.extend({}, d.ajaxOptions, {
                url: b, success: function (o, n) {
                    a(l._sanitizeSelector(j.hash)).html(o);
                    c();
                    if (d.cache) {
                        a.data(j, "cache.tabs", true)
                    }
                    l._trigger("load", null, l._ui(l.$tabs[g], l.$panels[g]));
                    try {
                        d.ajaxOptions.success(o, n)
                    } catch (p) {
                    }
                    k()
                }
            });
            if (this.xhr) {
                this.xhr.abort();
                c()
            }
            e.addClass("ui-tabs-loading");
            l.xhr = a.ajax(f)
        }, url: function (c, b) {
            this.$tabs.eq(c).removeData("cache.tabs").data("load.tabs", b)
        }, length: function () {
            return this.$tabs.length
        }
    });
    a.extend(a.ui.tabs, {
        version: "1.6rc6",
        getter: "length",
        defaults: {
            ajaxOptions: null,
            cache: false,
            cookie: null,
            deselectable: false,
            disabled: [],
            event: "click",
            fx: null,
            idPrefix: "ui-tabs-",
            panelTemplate: "<div></div>",
            spinner: "Loading&#8230;",
            tabTemplate: '<li><a href="#{href}"><span>#{label}</span></a></li>'
        }
    });
    a.extend(a.ui.tabs.prototype, {
        rotation: null, rotate: function (d, f) {
            var b = this, e = this.options.selected;

            function c() {
                clearTimeout(b.rotation);
                b.rotation = setTimeout(function () {
                    e = ++e < b.$tabs.length ? e : 0;
                    b.select(e)
                }, d)
            }

            if (d) {
                this.element.bind("tabsshow", c);
                this.$tabs.bind(this.options.event + ".tabs", !f ? function (g) {
                    if (g.clientX) {
                        clearTimeout(b.rotation);
                        b.element.unbind("tabsshow", c)
                    }
                } : function (g) {
                    e = b.options.selected;
                    c()
                });
                c()
            } else {
                clearTimeout(b.rotation);
                this.element.unbind("tabsshow", c);
                this.$tabs.unbind(this.options.event + ".tabs", stop)
            }
        }
    })
})(jQuery);
/*
 * jQuery UI Datepicker 1.6rc6
 *
 * Copyright (c) 2009 AUTHORS.txt (http://ui.jquery.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Datepicker
 *
 * Depends:
 *	ui.core.js
 */
(function ($) {
    $.extend($.ui, {datepicker: {version: "1.6rc6"}});
    var PROP_NAME = "datepicker";

    function Datepicker() {
        this.debug = false;
        this._curInst = null;
        this._keyEvent = false;
        this._disabledInputs = [];
        this._datepickerShowing = false;
        this._inDialog = false;
        this._mainDivId = "ui-datepicker-div";
        this._inlineClass = "ui-datepicker-inline";
        this._appendClass = "ui-datepicker-append";
        this._triggerClass = "ui-datepicker-trigger";
        this._dialogClass = "ui-datepicker-dialog";
        this._disableClass = "ui-datepicker-disabled";
        this._unselectableClass = "ui-datepicker-unselectable";
        this._currentClass = "ui-datepicker-current-day";
        this._dayOverClass = "ui-datepicker-days-cell-over";
        this.regional = [];
        this.regional[""] = {
            closeText: "Done",
            prevText: "Prev",
            nextText: "Next",
            currentText: "Today",
            monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
            dateFormat: "mm/dd/yy",
            firstDay: 0,
            isRTL: false
        };
        this._defaults = {
            showOn: "focus",
            showAnim: "show",
            showOptions: {},
            defaultDate: null,
            appendText: "",
            buttonText: "...",
            buttonImage: "",
            buttonImageOnly: false,
            hideIfNoPrevNext: false,
            navigationAsDateFormat: false,
            gotoCurrent: false,
            changeMonth: false,
            changeYear: false,
            showMonthAfterYear: false,
            yearRange: "-10:+10",
            showOtherMonths: false,
            calculateWeek: this.iso8601Week,
            shortYearCutoff: "+10",
            minDate: null,
            maxDate: null,
            duration: "normal",
            beforeShowDay: null,
            beforeShow: null,
            onSelect: null,
            onChangeMonthYear: null,
            onClose: null,
            numberOfMonths: 1,
            showCurrentAtPos: 0,
            stepMonths: 1,
            stepBigMonths: 12,
            altField: "",
            altFormat: "",
            constrainInput: true,
            showButtonPanel: false
        };
        $.extend(this._defaults, this.regional[""]);
        this.dpDiv = $('<div id="' + this._mainDivId + '" class="ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all ui-helper-hidden-accessible"></div>')
    }

    $.extend(Datepicker.prototype, {
        markerClassName: "hasDatepicker",
        log: function () {
            if (this.debug) {
                console.log.apply("", arguments)
            }
        },
        setDefaults: function (settings) {
            extendRemove(this._defaults, settings || {});
            return this
        },
        _attachDatepicker: function (target, settings) {
            var inlineSettings = null;
            for (var attrName in this._defaults) {
                var attrValue = target.getAttribute("date:" + attrName);
                if (attrValue) {
                    inlineSettings = inlineSettings || {};
                    try {
                        inlineSettings[attrName] = eval(attrValue)
                    } catch (err) {
                        inlineSettings[attrName] = attrValue
                    }
                }
            }
            var nodeName = target.nodeName.toLowerCase();
            var inline = (nodeName == "div" || nodeName == "span");
            if (!target.id) {
                target.id = "dp" + (++this.uuid)
            }
            var inst = this._newInst($(target), inline);
            inst.settings = $.extend({}, settings || {}, inlineSettings || {});
            if (nodeName == "input") {
                this._connectDatepicker(target, inst)
            } else {
                if (inline) {
                    this._inlineDatepicker(target, inst)
                }
            }
        },
        _newInst: function (target, inline) {
            var id = target[0].id.replace(/([:\[\]\.])/g, "\\\\$1");
            return {
                id: id,
                input: target,
                selectedDay: 0,
                selectedMonth: 0,
                selectedYear: 0,
                drawMonth: 0,
                drawYear: 0,
                inline: inline,
                dpDiv: (!inline ? this.dpDiv : $('<div class="' + this._inlineClass + ' ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>'))
            }
        },
        _connectDatepicker: function (target, inst) {
            var input = $(target);
            if (input.hasClass(this.markerClassName)) {
                return
            }
            var appendText = this._get(inst, "appendText");
            var isRTL = this._get(inst, "isRTL");
            if (appendText) {
                input[isRTL ? "before" : "after"]('<span class="' + this._appendClass + '">' + appendText + "</span>")
            }
            var showOn = this._get(inst, "showOn");
            if (showOn == "focus" || showOn == "both") {
                input.focus(this._showDatepicker)
            }
            if (showOn == "button" || showOn == "both") {
                var buttonText = this._get(inst, "buttonText");
                var buttonImage = this._get(inst, "buttonImage");
                var trigger = $(this._get(inst, "buttonImageOnly") ? $("<img/>").addClass(this._triggerClass).attr({
                    src: buttonImage,
                    alt: buttonText,
                    title: buttonText
                }) : $('<button type="button"></button>').addClass(this._triggerClass).html(buttonImage == "" ? buttonText : $("<img/>").attr({
                    src: buttonImage,
                    alt: buttonText,
                    title: buttonText
                })));
                input[isRTL ? "before" : "after"](trigger);
                trigger.click(function () {
                    if ($.datepicker._datepickerShowing && $.datepicker._lastInput == target) {
                        $.datepicker._hideDatepicker()
                    } else {
                        $.datepicker._showDatepicker(target)
                    }
                    return false
                })
            }
            input.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).bind("setData.datepicker", function (event, key, value) {
                inst.settings[key] = value
            }).bind("getData.datepicker", function (event, key) {
                return this._get(inst, key)
            });
            $.data(target, PROP_NAME, inst)
        },
        _inlineDatepicker: function (target, inst) {
            var divSpan = $(target);
            if (divSpan.hasClass(this.markerClassName)) {
                return
            }
            divSpan.addClass(this.markerClassName).append(inst.dpDiv).bind("setData.datepicker", function (event, key, value) {
                inst.settings[key] = value
            }).bind("getData.datepicker", function (event, key) {
                return this._get(inst, key)
            });
            $.data(target, PROP_NAME, inst);
            this._setDate(inst, this._getDefaultDate(inst));
            this._updateDatepicker(inst);
            this._updateAlternate(inst)
        },
        _dialogDatepicker: function (input, dateText, onSelect, settings, pos) {
            var inst = this._dialogInst;
            if (!inst) {
                var id = "dp" + (++this.uuid);
                this._dialogInput = $('<input type="text" id="' + id + '" size="1" style="position: absolute; top: -100px;"/>');
                this._dialogInput.keydown(this._doKeyDown);
                $("body").append(this._dialogInput);
                inst = this._dialogInst = this._newInst(this._dialogInput, false);
                inst.settings = {};
                $.data(this._dialogInput[0], PROP_NAME, inst)
            }
            extendRemove(inst.settings, settings || {});
            this._dialogInput.val(dateText);
            this._pos = (pos ? (pos.length ? pos : [pos.pageX, pos.pageY]) : null);
            if (!this._pos) {
                var browserWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
                var browserHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
                var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
                var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
                this._pos = [(browserWidth / 2) - 100 + scrollX, (browserHeight / 2) - 150 + scrollY]
            }
            this._dialogInput.css("left", this._pos[0] + "px").css("top", this._pos[1] + "px");
            inst.settings.onSelect = onSelect;
            this._inDialog = true;
            this.dpDiv.addClass(this._dialogClass);
            this._showDatepicker(this._dialogInput[0]);
            if ($.blockUI) {
                $.blockUI(this.dpDiv)
            }
            $.data(this._dialogInput[0], PROP_NAME, inst);
            return this
        },
        _destroyDatepicker: function (target) {
            var $target = $(target);
            if (!$target.hasClass(this.markerClassName)) {
                return
            }
            var nodeName = target.nodeName.toLowerCase();
            $.removeData(target, PROP_NAME);
            if (nodeName == "input") {
                $target.siblings("." + this._appendClass).remove().end().siblings("." + this._triggerClass).remove().end().removeClass(this.markerClassName).unbind("focus", this._showDatepicker).unbind("keydown", this._doKeyDown).unbind("keypress", this._doKeyPress)
            } else {
                if (nodeName == "div" || nodeName == "span") {
                    $target.removeClass(this.markerClassName).empty()
                }
            }
        },
        _enableDatepicker: function (target) {
            var $target = $(target);
            if (!$target.hasClass(this.markerClassName)) {
                return
            }
            var nodeName = target.nodeName.toLowerCase();
            if (nodeName == "input") {
                target.disabled = false;
                $target.siblings("button." + this._triggerClass).each(function () {
                    this.disabled = false
                }).end().siblings("img." + this._triggerClass).css({opacity: "1.0", cursor: ""})
            } else {
                if (nodeName == "div" || nodeName == "span") {
                    var inline = $target.children("." + this._inlineClass);
                    inline.children().removeClass("ui-state-disabled")
                }
            }
            this._disabledInputs = $.map(this._disabledInputs, function (value) {
                return (value == target ? null : value)
            })
        },
        _disableDatepicker: function (target) {
            var $target = $(target);
            if (!$target.hasClass(this.markerClassName)) {
                return
            }
            var nodeName = target.nodeName.toLowerCase();
            if (nodeName == "input") {
                target.disabled = true;
                $target.siblings("button." + this._triggerClass).each(function () {
                    this.disabled = true
                }).end().siblings("img." + this._triggerClass).css({opacity: "0.5", cursor: "default"})
            } else {
                if (nodeName == "div" || nodeName == "span") {
                    var inline = $target.children("." + this._inlineClass);
                    inline.children().addClass("ui-state-disabled")
                }
            }
            this._disabledInputs = $.map(this._disabledInputs, function (value) {
                return (value == target ? null : value)
            });
            this._disabledInputs[this._disabledInputs.length] = target
        },
        _isDisabledDatepicker: function (target) {
            if (!target) {
                return false
            }
            for (var i = 0; i < this._disabledInputs.length; i++) {
                if (this._disabledInputs[i] == target) {
                    return true
                }
            }
            return false
        },
        _getInst: function (target) {
            try {
                return $.data(target, PROP_NAME)
            } catch (err) {
                throw"Missing instance data for this datepicker"
            }
        },
        _optionDatepicker: function (target, name, value) {
            var settings = name || {};
            if (typeof name == "string") {
                settings = {};
                settings[name] = value
            }
            var inst = this._getInst(target);
            if (inst) {
                if (this._curInst == inst) {
                    this._hideDatepicker(null)
                }
                extendRemove(inst.settings, settings);
                var date = new Date();
                extendRemove(inst, {
                    rangeStart: null,
                    endDay: null,
                    endMonth: null,
                    endYear: null,
                    selectedDay: date.getDate(),
                    selectedMonth: date.getMonth(),
                    selectedYear: date.getFullYear(),
                    currentDay: date.getDate(),
                    currentMonth: date.getMonth(),
                    currentYear: date.getFullYear(),
                    drawMonth: date.getMonth(),
                    drawYear: date.getFullYear()
                });
                this._updateDatepicker(inst)
            }
        },
        _changeDatepicker: function (target, name, value) {
            this._optionDatepicker(target, name, value)
        },
        _refreshDatepicker: function (target) {
            var inst = this._getInst(target);
            if (inst) {
                this._updateDatepicker(inst)
            }
        },
        _setDateDatepicker: function (target, date, endDate) {
            var inst = this._getInst(target);
            if (inst) {
                this._setDate(inst, date, endDate);
                this._updateDatepicker(inst);
                this._updateAlternate(inst)
            }
        },
        _getDateDatepicker: function (target) {
            var inst = this._getInst(target);
            if (inst && !inst.inline) {
                this._setDateFromField(inst)
            }
            return (inst ? this._getDate(inst) : null)
        },
        _doKeyDown: function (event) {
            var inst = $.datepicker._getInst(event.target);
            var handled = true;
            var isRTL = inst.dpDiv.is(".ui-datepicker-rtl");
            inst._keyEvent = true;
            if ($.datepicker._datepickerShowing) {
                switch (event.keyCode) {
                    case 9:
                        $.datepicker._hideDatepicker(null, "");
                        break;
                    case 13:
                        var sel = $("td." + $.datepicker._dayOverClass + ", td." + $.datepicker._currentClass, inst.dpDiv);
                        if (sel[0]) {
                            $.datepicker._selectDay(event.target, inst.selectedMonth, inst.selectedYear, sel[0])
                        } else {
                            $.datepicker._hideDatepicker(null, $.datepicker._get(inst, "duration"))
                        }
                        return false;
                        break;
                    case 27:
                        $.datepicker._hideDatepicker(null, $.datepicker._get(inst, "duration"));
                        break;
                    case 33:
                        $.datepicker._adjustDate(event.target, (event.ctrlKey ? -$.datepicker._get(inst, "stepBigMonths") : -$.datepicker._get(inst, "stepMonths")), "M");
                        break;
                    case 34:
                        $.datepicker._adjustDate(event.target, (event.ctrlKey ? +$.datepicker._get(inst, "stepBigMonths") : +$.datepicker._get(inst, "stepMonths")), "M");
                        break;
                    case 35:
                        if (event.ctrlKey || event.metaKey) {
                            $.datepicker._clearDate(event.target)
                        }
                        handled = event.ctrlKey || event.metaKey;
                        break;
                    case 36:
                        if (event.ctrlKey || event.metaKey) {
                            $.datepicker._gotoToday(event.target)
                        }
                        handled = event.ctrlKey || event.metaKey;
                        break;
                    case 37:
                        if (event.ctrlKey || event.metaKey) {
                            $.datepicker._adjustDate(event.target, (isRTL ? +1 : -1), "D")
                        }
                        handled = event.ctrlKey || event.metaKey;
                        if (event.originalEvent.altKey) {
                            $.datepicker._adjustDate(event.target, (event.ctrlKey ? -$.datepicker._get(inst, "stepBigMonths") : -$.datepicker._get(inst, "stepMonths")), "M")
                        }
                        break;
                    case 38:
                        if (event.ctrlKey || event.metaKey) {
                            $.datepicker._adjustDate(event.target, -7, "D")
                        }
                        handled = event.ctrlKey || event.metaKey;
                        break;
                    case 39:
                        if (event.ctrlKey || event.metaKey) {
                            $.datepicker._adjustDate(event.target, (isRTL ? -1 : +1), "D")
                        }
                        handled = event.ctrlKey || event.metaKey;
                        if (event.originalEvent.altKey) {
                            $.datepicker._adjustDate(event.target, (event.ctrlKey ? +$.datepicker._get(inst, "stepBigMonths") : +$.datepicker._get(inst, "stepMonths")), "M")
                        }
                        break;
                    case 40:
                        if (event.ctrlKey || event.metaKey) {
                            $.datepicker._adjustDate(event.target, +7, "D")
                        }
                        handled = event.ctrlKey || event.metaKey;
                        break;
                    default:
                        handled = false
                }
            } else {
                if (event.keyCode == 36 && event.ctrlKey) {
                    $.datepicker._showDatepicker(this)
                } else {
                    handled = false
                }
            }
            if (handled) {
                event.preventDefault();
                event.stopPropagation()
            }
        },
        _doKeyPress: function (event) {
            var inst = $.datepicker._getInst(event.target);
            if ($.datepicker._get(inst, "constrainInput")) {
                var chars = $.datepicker._possibleChars($.datepicker._get(inst, "dateFormat"));
                var chr = String.fromCharCode(event.charCode == undefined ? event.keyCode : event.charCode);
                return event.ctrlKey || (chr < " " || !chars || chars.indexOf(chr) > -1)
            }
        },
        _showDatepicker: function (input) {
            input = input.target || input;
            if (input.nodeName.toLowerCase() != "input") {
                input = $("input", input.parentNode)[0]
            }
            if ($.datepicker._isDisabledDatepicker(input) || $.datepicker._lastInput == input) {
                return
            }
            var inst = $.datepicker._getInst(input);
            var beforeShow = $.datepicker._get(inst, "beforeShow");
            extendRemove(inst.settings, (beforeShow ? beforeShow.apply(input, [input, inst]) : {}));
            $.datepicker._hideDatepicker(null, "");
            $.datepicker._lastInput = input;
            $.datepicker._setDateFromField(inst);
            if ($.datepicker._inDialog) {
                input.value = ""
            }
            if (!$.datepicker._pos) {
                $.datepicker._pos = $.datepicker._findPos(input);
                $.datepicker._pos[1] += input.offsetHeight
            }
            var isFixed = false;
            $(input).parents().each(function () {
                isFixed |= $(this).css("position") == "fixed";
                return !isFixed
            });
            if (isFixed && $.browser.opera) {
                $.datepicker._pos[0] -= document.documentElement.scrollLeft;
                $.datepicker._pos[1] -= document.documentElement.scrollTop
            }
            var offset = {left: $.datepicker._pos[0], top: $.datepicker._pos[1]};
            $.datepicker._pos = null;
            inst.rangeStart = null;
            inst.dpDiv.css({position: "absolute", display: "block", top: "-1000px"});
            $.datepicker._updateDatepicker(inst);
            offset = $.datepicker._checkOffset(inst, offset, isFixed);
            inst.dpDiv.css({
                position: ($.datepicker._inDialog && $.blockUI ? "static" : (isFixed ? "fixed" : "absolute")),
                display: "none",
                left: offset.left + "px",
                top: offset.top + "px"
            });
            if (!inst.inline) {
                var showAnim = $.datepicker._get(inst, "showAnim") || "show";
                var duration = $.datepicker._get(inst, "duration");
                var postProcess = function () {
                    $.datepicker._datepickerShowing = true;
                    if ($.browser.msie && parseInt($.browser.version, 10) < 7) {
                        $("iframe.ui-datepicker-cover").css({
                            width: inst.dpDiv.width() + 4,
                            height: inst.dpDiv.height() + 4
                        })
                    }
                };
                if ($.effects && $.effects[showAnim]) {
                    inst.dpDiv.show(showAnim, $.datepicker._get(inst, "showOptions"), duration, postProcess)
                } else {
                    inst.dpDiv[showAnim](duration, postProcess)
                }
                if (duration == "") {
                    postProcess()
                }
                if (inst.input[0].type != "hidden") {
                    inst.input[0].focus()
                }
                $.datepicker._curInst = inst
            }
        },
        _updateDatepicker: function (inst) {
            var dims = {width: inst.dpDiv.width() + 4, height: inst.dpDiv.height() + 4};
            var self = this;
            inst.dpDiv.empty().append(this._generateHTML(inst)).find("iframe.ui-datepicker-cover").css({
                width: dims.width,
                height: dims.height
            }).end().find("button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a").bind("mouseout", function () {
                $(this).removeClass("ui-state-hover");
                if (this.className.indexOf("ui-datepicker-prev") != -1) {
                    $(this).removeClass("ui-datepicker-prev-hover")
                }
                if (this.className.indexOf("ui-datepicker-next") != -1) {
                    $(this).removeClass("ui-datepicker-next-hover")
                }
            }).bind("mouseover", function () {
                if (!self._isDisabledDatepicker(inst.inline ? inst.dpDiv.parent()[0] : inst.input[0])) {
                    $(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover");
                    $(this).addClass("ui-state-hover");
                    if (this.className.indexOf("ui-datepicker-prev") != -1) {
                        $(this).addClass("ui-datepicker-prev-hover")
                    }
                    if (this.className.indexOf("ui-datepicker-next") != -1) {
                        $(this).addClass("ui-datepicker-next-hover")
                    }
                }
            }).end().find("." + this._dayOverClass + " a").trigger("mouseover").end();
            var numMonths = this._getNumberOfMonths(inst);
            var cols = numMonths[1];
            var width = 17;
            if (cols > 1) {
                inst.dpDiv.addClass("ui-datepicker-multi-" + cols).css("width", (width * cols) + "em")
            } else {
                inst.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width("")
            }
            inst.dpDiv[(numMonths[0] != 1 || numMonths[1] != 1 ? "add" : "remove") + "Class"]("ui-datepicker-multi");
            inst.dpDiv[(this._get(inst, "isRTL") ? "add" : "remove") + "Class"]("ui-datepicker-rtl");
            if (inst.input && inst.input[0].type != "hidden" && inst == $.datepicker._curInst) {
                $(inst.input[0]).focus()
            }
        },
        _checkOffset: function (inst, offset, isFixed) {
            var dpWidth = inst.dpDiv.outerWidth();
            var dpHeight = inst.dpDiv.outerHeight();
            var inputWidth = inst.input ? inst.input.outerWidth() : 0;
            var inputHeight = inst.input ? inst.input.outerHeight() : 0;
            var viewWidth = (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) + $(document).scrollLeft();
            var viewHeight = (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight) + $(document).scrollTop();
            offset.left -= (this._get(inst, "isRTL") ? (dpWidth - inputWidth) : 0);
            offset.left -= (isFixed && offset.left == inst.input.offset().left) ? $(document).scrollLeft() : 0;
            offset.top -= (isFixed && offset.top == (inst.input.offset().top + inputHeight)) ? $(document).scrollTop() : 0;
            offset.left -= (offset.left + dpWidth > viewWidth && viewWidth > dpWidth) ? Math.abs(offset.left + dpWidth - viewWidth) : 0;
            offset.top -= (offset.top + dpHeight > viewHeight && viewHeight > dpHeight) ? Math.abs(offset.top + dpHeight + inputHeight * 2 - viewHeight) : 0;
            return offset
        },
        _findPos: function (obj) {
            while (obj && (obj.type == "hidden" || obj.nodeType != 1)) {
                obj = obj.nextSibling
            }
            var position = $(obj).offset();
            return [position.left, position.top]
        },
        _hideDatepicker: function (input, duration) {
            var inst = this._curInst;
            if (!inst || (input && inst != $.data(input, PROP_NAME))) {
                return
            }
            if (inst.stayOpen) {
                this._selectDate("#" + inst.id, this._formatDate(inst, inst.currentDay, inst.currentMonth, inst.currentYear))
            }
            inst.stayOpen = false;
            if (this._datepickerShowing) {
                duration = (duration != null ? duration : this._get(inst, "duration"));
                var showAnim = this._get(inst, "showAnim");
                var postProcess = function () {
                    $.datepicker._tidyDialog(inst)
                };
                if (duration != "" && $.effects && $.effects[showAnim]) {
                    inst.dpDiv.hide(showAnim, $.datepicker._get(inst, "showOptions"), duration, postProcess)
                } else {
                    inst.dpDiv[(duration == "" ? "hide" : (showAnim == "slideDown" ? "slideUp" : (showAnim == "fadeIn" ? "fadeOut" : "hide")))](duration, postProcess)
                }
                if (duration == "") {
                    this._tidyDialog(inst)
                }
                var onClose = this._get(inst, "onClose");
                if (onClose) {
                    onClose.apply((inst.input ? inst.input[0] : null), [(inst.input ? inst.input.val() : ""), inst])
                }
                this._datepickerShowing = false;
                this._lastInput = null;
                if (this._inDialog) {
                    this._dialogInput.css({position: "absolute", left: "0", top: "-100px"});
                    if ($.blockUI) {
                        $.unblockUI();
                        $("body").append(this.dpDiv)
                    }
                }
                this._inDialog = false
            }
            this._curInst = null
        },
        _tidyDialog: function (inst) {
            inst.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar")
        },
        _checkExternalClick: function (event) {
            if (!$.datepicker._curInst) {
                return
            }
            var $target = $(event.target);
            if (($target.parents("#" + $.datepicker._mainDivId).length == 0) && !$target.hasClass($.datepicker.markerClassName) && !$target.hasClass($.datepicker._triggerClass) && $.datepicker._datepickerShowing && !($.datepicker._inDialog && $.blockUI)) {
                $.datepicker._hideDatepicker(null, "")
            }
        },
        _adjustDate: function (id, offset, period) {
            var target = $(id);
            var inst = this._getInst(target[0]);
            if (this._isDisabledDatepicker(target[0])) {
                return
            }
            this._adjustInstDate(inst, offset + (period == "M" ? this._get(inst, "showCurrentAtPos") : 0), period);
            this._updateDatepicker(inst)
        },
        _gotoToday: function (id) {
            var target = $(id);
            var inst = this._getInst(target[0]);
            if (this._get(inst, "gotoCurrent") && inst.currentDay) {
                inst.selectedDay = inst.currentDay;
                inst.drawMonth = inst.selectedMonth = inst.currentMonth;
                inst.drawYear = inst.selectedYear = inst.currentYear
            } else {
                var date = new Date();
                inst.selectedDay = date.getDate();
                inst.drawMonth = inst.selectedMonth = date.getMonth();
                inst.drawYear = inst.selectedYear = date.getFullYear()
            }
            this._notifyChange(inst);
            this._adjustDate(target)
        },
        _selectMonthYear: function (id, select, period) {
            var target = $(id);
            var inst = this._getInst(target[0]);
            inst._selectingMonthYear = false;
            inst["selected" + (period == "M" ? "Month" : "Year")] = inst["draw" + (period == "M" ? "Month" : "Year")] = parseInt(select.options[select.selectedIndex].value, 10);
            this._notifyChange(inst);
            this._adjustDate(target)
        },
        _clickMonthYear: function (id) {
            var target = $(id);
            var inst = this._getInst(target[0]);
            if (inst.input && inst._selectingMonthYear && !$.browser.msie) {
                inst.input[0].focus()
            }
            inst._selectingMonthYear = !inst._selectingMonthYear
        },
        _selectDay: function (id, month, year, td) {
            var target = $(id);
            if ($(td).hasClass(this._unselectableClass) || this._isDisabledDatepicker(target[0])) {
                return
            }
            var inst = this._getInst(target[0]);
            inst.selectedDay = inst.currentDay = $("a", td).html();
            inst.selectedMonth = inst.currentMonth = month;
            inst.selectedYear = inst.currentYear = year;
            if (inst.stayOpen) {
                inst.endDay = inst.endMonth = inst.endYear = null
            }
            this._selectDate(id, this._formatDate(inst, inst.currentDay, inst.currentMonth, inst.currentYear));
            if (inst.stayOpen) {
                inst.rangeStart = this._daylightSavingAdjust(new Date(inst.currentYear, inst.currentMonth, inst.currentDay));
                this._updateDatepicker(inst)
            }
        },
        _clearDate: function (id) {
            var target = $(id);
            var inst = this._getInst(target[0]);
            inst.stayOpen = false;
            inst.endDay = inst.endMonth = inst.endYear = inst.rangeStart = null;
            this._selectDate(target, "")
        },
        _selectDate: function (id, dateStr) {
            var target = $(id);
            var inst = this._getInst(target[0]);
            dateStr = (dateStr != null ? dateStr : this._formatDate(inst));
            if (inst.input) {
                inst.input.val(dateStr)
            }
            this._updateAlternate(inst);
            var onSelect = this._get(inst, "onSelect");
            if (onSelect) {
                onSelect.apply((inst.input ? inst.input[0] : null), [dateStr, inst])
            } else {
                if (inst.input) {
                    inst.input.trigger("change")
                }
            }
            if (inst.inline) {
                this._updateDatepicker(inst)
            } else {
                if (!inst.stayOpen) {
                    this._hideDatepicker(null, this._get(inst, "duration"));
                    this._lastInput = inst.input[0];
                    if (typeof(inst.input[0]) != "object") {
                        inst.input[0].focus()
                    }
                    this._lastInput = null
                }
            }
        },
        _updateAlternate: function (inst) {
            var altField = this._get(inst, "altField");
            if (altField) {
                var altFormat = this._get(inst, "altFormat") || this._get(inst, "dateFormat");
                var date = this._getDate(inst);
                dateStr = this.formatDate(altFormat, date, this._getFormatConfig(inst));
                $(altField).each(function () {
                    $(this).val(dateStr)
                })
            }
        },
        noWeekends: function (date) {
            var day = date.getDay();
            return [(day > 0 && day < 6), ""]
        },
        iso8601Week: function (date) {
            var checkDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
            var firstMon = new Date(checkDate.getFullYear(), 1 - 1, 4);
            var firstDay = firstMon.getDay() || 7;
            firstMon.setDate(firstMon.getDate() + 1 - firstDay);
            if (firstDay < 4 && checkDate < firstMon) {
                checkDate.setDate(checkDate.getDate() - 3);
                return $.datepicker.iso8601Week(checkDate)
            } else {
                if (checkDate > new Date(checkDate.getFullYear(), 12 - 1, 28)) {
                    firstDay = new Date(checkDate.getFullYear() + 1, 1 - 1, 4).getDay() || 7;
                    if (firstDay > 4 && (checkDate.getDay() || 7) < firstDay - 3) {
                        return 1
                    }
                }
            }
            return Math.floor(((checkDate - firstMon) / 86400000) / 7) + 1
        },
        parseDate: function (format, value, settings) {
            if (format == null || value == null) {
                throw"Invalid arguments"
            }
            value = (typeof value == "object" ? value.toString() : value + "");
            if (value == "") {
                return null
            }
            var shortYearCutoff = (settings ? settings.shortYearCutoff : null) || this._defaults.shortYearCutoff;
            var dayNamesShort = (settings ? settings.dayNamesShort : null) || this._defaults.dayNamesShort;
            var dayNames = (settings ? settings.dayNames : null) || this._defaults.dayNames;
            var monthNamesShort = (settings ? settings.monthNamesShort : null) || this._defaults.monthNamesShort;
            var monthNames = (settings ? settings.monthNames : null) || this._defaults.monthNames;
            var year = -1;
            var month = -1;
            var day = -1;
            var doy = -1;
            var literal = false;
            var lookAhead = function (match) {
                var matches = (iFormat + 1 < format.length && format.charAt(iFormat + 1) == match);
                if (matches) {
                    iFormat++
                }
                return matches
            };
            var getNumber = function (match) {
                lookAhead(match);
                var origSize = (match == "@" ? 14 : (match == "y" ? 4 : (match == "o" ? 3 : 2)));
                var size = origSize;
                var num = 0;
                while (size > 0 && iValue < value.length && value.charAt(iValue) >= "0" && value.charAt(iValue) <= "9") {
                    num = num * 10 + parseInt(value.charAt(iValue++), 10);
                    size--
                }
                if (size == origSize) {
                    throw"Missing number at position " + iValue
                }
                return num
            };
            var getName = function (match, shortNames, longNames) {
                var names = (lookAhead(match) ? longNames : shortNames);
                var size = 0;
                for (var j = 0; j < names.length; j++) {
                    size = Math.max(size, names[j].length)
                }
                var name = "";
                var iInit = iValue;
                while (size > 0 && iValue < value.length) {
                    name += value.charAt(iValue++);
                    for (var i = 0; i < names.length; i++) {
                        if (name == names[i]) {
                            return i + 1
                        }
                    }
                    size--
                }
                throw"Unknown name at position " + iInit
            };
            var checkLiteral = function () {
                if (value.charAt(iValue) != format.charAt(iFormat)) {
                    throw"Unexpected literal at position " + iValue
                }
                iValue++
            };
            var iValue = 0;
            for (var iFormat = 0; iFormat < format.length; iFormat++) {
                if (literal) {
                    if (format.charAt(iFormat) == "'" && !lookAhead("'")) {
                        literal = false
                    } else {
                        checkLiteral()
                    }
                } else {
                    switch (format.charAt(iFormat)) {
                        case"d":
                            day = getNumber("d");
                            break;
                        case"D":
                            getName("D", dayNamesShort, dayNames);
                            break;
                        case"o":
                            doy = getNumber("o");
                            break;
                        case"m":
                            month = getNumber("m");
                            break;
                        case"M":
                            month = getName("M", monthNamesShort, monthNames);
                            break;
                        case"y":
                            year = getNumber("y");
                            break;
                        case"@":
                            var date = new Date(getNumber("@"));
                            year = date.getFullYear();
                            month = date.getMonth() + 1;
                            day = date.getDate();
                            break;
                        case"'":
                            if (lookAhead("'")) {
                                checkLiteral()
                            } else {
                                literal = true
                            }
                            break;
                        default:
                            checkLiteral()
                    }
                }
            }
            if (year == -1) {
                year = new Date().getFullYear()
            } else {
                if (year < 100) {
                    year += new Date().getFullYear() - new Date().getFullYear() % 100 + (year <= shortYearCutoff ? 0 : -100)
                }
            }
            if (doy > -1) {
                month = 1;
                day = doy;
                do {
                    var dim = this._getDaysInMonth(year, month - 1);
                    if (day <= dim) {
                        break
                    }
                    month++;
                    day -= dim
                } while (true)
            }
            var date = this._daylightSavingAdjust(new Date(year, month - 1, day));
            if (date.getFullYear() != year || date.getMonth() + 1 != month || date.getDate() != day) {
                throw"Invalid date"
            }
            return date
        },
        ATOM: "yy-mm-dd",
        COOKIE: "D, dd M yy",
        ISO_8601: "yy-mm-dd",
        RFC_822: "D, d M y",
        RFC_850: "DD, dd-M-y",
        RFC_1036: "D, d M y",
        RFC_1123: "D, d M yy",
        RFC_2822: "D, d M yy",
        RSS: "D, d M y",
        TIMESTAMP: "@",
        W3C: "yy-mm-dd",
        formatDate: function (format, date, settings) {
            if (!date) {
                return ""
            }
            var dayNamesShort = (settings ? settings.dayNamesShort : null) || this._defaults.dayNamesShort;
            var dayNames = (settings ? settings.dayNames : null) || this._defaults.dayNames;
            var monthNamesShort = (settings ? settings.monthNamesShort : null) || this._defaults.monthNamesShort;
            var monthNames = (settings ? settings.monthNames : null) || this._defaults.monthNames;
            var lookAhead = function (match) {
                var matches = (iFormat + 1 < format.length && format.charAt(iFormat + 1) == match);
                if (matches) {
                    iFormat++
                }
                return matches
            };
            var formatNumber = function (match, value, len) {
                var num = "" + value;
                if (lookAhead(match)) {
                    while (num.length < len) {
                        num = "0" + num
                    }
                }
                return num
            };
            var formatName = function (match, value, shortNames, longNames) {
                return (lookAhead(match) ? longNames[value] : shortNames[value])
            };
            var output = "";
            var literal = false;
            if (date) {
                for (var iFormat = 0; iFormat < format.length; iFormat++) {
                    if (literal) {
                        if (format.charAt(iFormat) == "'" && !lookAhead("'")) {
                            literal = false
                        } else {
                            output += format.charAt(iFormat)
                        }
                    } else {
                        switch (format.charAt(iFormat)) {
                            case"d":
                                output += formatNumber("d", date.getDate(), 2);
                                break;
                            case"D":
                                output += formatName("D", date.getDay(), dayNamesShort, dayNames);
                                break;
                            case"o":
                                var doy = date.getDate();
                                for (var m = date.getMonth() - 1; m >= 0; m--) {
                                    doy += this._getDaysInMonth(date.getFullYear(), m)
                                }
                                output += formatNumber("o", doy, 3);
                                break;
                            case"m":
                                output += formatNumber("m", date.getMonth() + 1, 2);
                                break;
                            case"M":
                                output += formatName("M", date.getMonth(), monthNamesShort, monthNames);
                                break;
                            case"y":
                                output += (lookAhead("y") ? date.getFullYear() : (date.getYear() % 100 < 10 ? "0" : "") + date.getYear() % 100);
                                break;
                            case"@":
                                output += date.getTime();
                                break;
                            case"'":
                                if (lookAhead("'")) {
                                    output += "'"
                                } else {
                                    literal = true
                                }
                                break;
                            default:
                                output += format.charAt(iFormat)
                        }
                    }
                }
            }
            return output
        },
        _possibleChars: function (format) {
            var chars = "";
            var literal = false;
            for (var iFormat = 0; iFormat < format.length; iFormat++) {
                if (literal) {
                    if (format.charAt(iFormat) == "'" && !lookAhead("'")) {
                        literal = false
                    } else {
                        chars += format.charAt(iFormat)
                    }
                } else {
                    switch (format.charAt(iFormat)) {
                        case"d":
                        case"m":
                        case"y":
                        case"@":
                            chars += "0123456789";
                            break;
                        case"D":
                        case"M":
                            return null;
                        case"'":
                            if (lookAhead("'")) {
                                chars += "'"
                            } else {
                                literal = true
                            }
                            break;
                        default:
                            chars += format.charAt(iFormat)
                    }
                }
            }
            return chars
        },
        _get: function (inst, name) {
            return inst.settings[name] !== undefined ? inst.settings[name] : this._defaults[name]
        },
        _setDateFromField: function (inst) {
            var dateFormat = this._get(inst, "dateFormat");
            var dates = inst.input ? inst.input.val() : null;
            inst.endDay = inst.endMonth = inst.endYear = null;
            var date = defaultDate = this._getDefaultDate(inst);
            var settings = this._getFormatConfig(inst);
            try {
                date = this.parseDate(dateFormat, dates, settings) || defaultDate
            } catch (event) {
                this.log(event);
                date = defaultDate
            }
            inst.selectedDay = date.getDate();
            inst.drawMonth = inst.selectedMonth = date.getMonth();
            inst.drawYear = inst.selectedYear = date.getFullYear();
            inst.currentDay = (dates ? date.getDate() : 0);
            inst.currentMonth = (dates ? date.getMonth() : 0);
            inst.currentYear = (dates ? date.getFullYear() : 0);
            this._adjustInstDate(inst)
        },
        _getDefaultDate: function (inst) {
            var date = this._determineDate(this._get(inst, "defaultDate"), new Date());
            var minDate = this._getMinMaxDate(inst, "min", true);
            var maxDate = this._getMinMaxDate(inst, "max");
            date = (minDate && date < minDate ? minDate : date);
            date = (maxDate && date > maxDate ? maxDate : date);
            return date
        },
        _determineDate: function (date, defaultDate) {
            var offsetNumeric = function (offset) {
                var date = new Date();
                date.setDate(date.getDate() + offset);
                return date
            };
            var offsetString = function (offset, getDaysInMonth) {
                var date = new Date();
                var year = date.getFullYear();
                var month = date.getMonth();
                var day = date.getDate();
                var pattern = /([+-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g;
                var matches = pattern.exec(offset);
                while (matches) {
                    switch (matches[2] || "d") {
                        case"d":
                        case"D":
                            day += parseInt(matches[1], 10);
                            break;
                        case"w":
                        case"W":
                            day += parseInt(matches[1], 10) * 7;
                            break;
                        case"m":
                        case"M":
                            month += parseInt(matches[1], 10);
                            day = Math.min(day, getDaysInMonth(year, month));
                            break;
                        case"y":
                        case"Y":
                            year += parseInt(matches[1], 10);
                            day = Math.min(day, getDaysInMonth(year, month));
                            break
                    }
                    matches = pattern.exec(offset)
                }
                return new Date(year, month, day)
            };
            date = (date == null ? defaultDate : (typeof date == "string" ? offsetString(date, this._getDaysInMonth) : (typeof date == "number" ? (isNaN(date) ? defaultDate : offsetNumeric(date)) : date)));
            date = (date && date.toString() == "Invalid Date" ? defaultDate : date);
            if (date) {
                date.setHours(0);
                date.setMinutes(0);
                date.setSeconds(0);
                date.setMilliseconds(0)
            }
            return this._daylightSavingAdjust(date)
        },
        _daylightSavingAdjust: function (date) {
            if (!date) {
                return null
            }
            date.setHours(date.getHours() > 12 ? date.getHours() + 2 : 0);
            return date
        },
        _setDate: function (inst, date, endDate) {
            var clear = !(date);
            var origMonth = inst.selectedMonth;
            var origYear = inst.selectedYear;
            date = this._determineDate(date, new Date());
            inst.selectedDay = inst.currentDay = date.getDate();
            inst.drawMonth = inst.selectedMonth = inst.currentMonth = date.getMonth();
            inst.drawYear = inst.selectedYear = inst.currentYear = date.getFullYear();
            if (origMonth != inst.selectedMonth || origYear != inst.selectedYear) {
                this._notifyChange(inst)
            }
            this._adjustInstDate(inst);
            if (inst.input) {
                inst.input.val(clear ? "" : this._formatDate(inst))
            }
        },
        _getDate: function (inst) {
            var startDate = (!inst.currentYear || (inst.input && inst.input.val() == "") ? null : this._daylightSavingAdjust(new Date(inst.currentYear, inst.currentMonth, inst.currentDay)));
            return startDate
        },
        _generateHTML: function (inst) {
            var today = new Date();
            today = this._daylightSavingAdjust(new Date(today.getFullYear(), today.getMonth(), today.getDate()));
            var isRTL = this._get(inst, "isRTL");
            var showButtonPanel = this._get(inst, "showButtonPanel");
            var hideIfNoPrevNext = this._get(inst, "hideIfNoPrevNext");
            var navigationAsDateFormat = this._get(inst, "navigationAsDateFormat");
            var numMonths = this._getNumberOfMonths(inst);
            var showCurrentAtPos = this._get(inst, "showCurrentAtPos");
            var stepMonths = this._get(inst, "stepMonths");
            var stepBigMonths = this._get(inst, "stepBigMonths");
            var isMultiMonth = (numMonths[0] != 1 || numMonths[1] != 1);
            var currentDate = this._daylightSavingAdjust((!inst.currentDay ? new Date(9999, 9, 9) : new Date(inst.currentYear, inst.currentMonth, inst.currentDay)));
            var minDate = this._getMinMaxDate(inst, "min", true);
            var maxDate = this._getMinMaxDate(inst, "max");
            var drawMonth = inst.drawMonth - showCurrentAtPos;
            var drawYear = inst.drawYear;
            if (drawMonth < 0) {
                drawMonth += 12;
                drawYear--
            }
            if (maxDate) {
                var maxDraw = this._daylightSavingAdjust(new Date(maxDate.getFullYear(), maxDate.getMonth() - numMonths[1] + 1, maxDate.getDate()));
                maxDraw = (minDate && maxDraw < minDate ? minDate : maxDraw);
                while (this._daylightSavingAdjust(new Date(drawYear, drawMonth, 1)) > maxDraw) {
                    drawMonth--;
                    if (drawMonth < 0) {
                        drawMonth = 11;
                        drawYear--
                    }
                }
            }
            inst.drawMonth = drawMonth;
            inst.drawYear = drawYear;
            var prevText = this._get(inst, "prevText");
            prevText = (!navigationAsDateFormat ? prevText : this.formatDate(prevText, this._daylightSavingAdjust(new Date(drawYear, drawMonth - stepMonths, 1)), this._getFormatConfig(inst)));
            var prev = (this._canAdjustMonth(inst, -1, drawYear, drawMonth) ? '<a class="ui-datepicker-prev ui-corner-all" onclick="jQuery.datepicker._adjustDate(\'#' + inst.id + "', -" + stepMonths + ", 'M');\" title=\"" + prevText + '"><span class="ui-icon ui-icon-circle-triangle-' + (isRTL ? "e" : "w") + '">' + prevText + "</span></a>" : (hideIfNoPrevNext ? "" : '<a class="ui-datepicker-prev ui-corner-all ui-state-disabled" title="' + prevText + '"><span class="ui-icon ui-icon-circle-triangle-' + (isRTL ? "e" : "w") + '">' + prevText + "</span></a>"));
            var nextText = this._get(inst, "nextText");
            nextText = (!navigationAsDateFormat ? nextText : this.formatDate(nextText, this._daylightSavingAdjust(new Date(drawYear, drawMonth + stepMonths, 1)), this._getFormatConfig(inst)));
            var next = (this._canAdjustMonth(inst, +1, drawYear, drawMonth) ? '<a class="ui-datepicker-next ui-corner-all" onclick="jQuery.datepicker._adjustDate(\'#' + inst.id + "', +" + stepMonths + ", 'M');\" title=\"" + nextText + '"><span class="ui-icon ui-icon-circle-triangle-' + (isRTL ? "w" : "e") + '">' + nextText + "</span></a>" : (hideIfNoPrevNext ? "" : '<a class="ui-datepicker-next ui-corner-all ui-state-disabled" title="' + nextText + '"><span class="ui-icon ui-icon-circle-triangle-' + (isRTL ? "w" : "e") + '">' + nextText + "</span></a>"));
            var currentText = this._get(inst, "currentText");
            var gotoDate = (this._get(inst, "gotoCurrent") && inst.currentDay ? currentDate : today);
            currentText = (!navigationAsDateFormat ? currentText : this.formatDate(currentText, gotoDate, this._getFormatConfig(inst)));
            var controls = '<button type="button" class="ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all" onclick="jQuery.datepicker._hideDatepicker();">' + this._get(inst, "closeText") + "</button>";
            var buttonPanel = (showButtonPanel) ? '<div class="ui-datepicker-buttonpane ui-widget-content">' + (isRTL ? controls : "") + (this._isInRange(inst, gotoDate) ? '<button type="button" class="ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all" onclick="jQuery.datepicker._gotoToday(\'#' + inst.id + "');\">" + currentText + "</button>" : "") + (isRTL ? "" : controls) + "</div>" : "";
            var firstDay = parseInt(this._get(inst, "firstDay"), 10);
            firstDay = (isNaN(firstDay) ? 0 : firstDay);
            var dayNames = this._get(inst, "dayNames");
            var dayNamesShort = this._get(inst, "dayNamesShort");
            var dayNamesMin = this._get(inst, "dayNamesMin");
            var monthNames = this._get(inst, "monthNames");
            var monthNamesShort = this._get(inst, "monthNamesShort");
            var beforeShowDay = this._get(inst, "beforeShowDay");
            var showOtherMonths = this._get(inst, "showOtherMonths");
            var calculateWeek = this._get(inst, "calculateWeek") || this.iso8601Week;
            var endDate = inst.endDay ? this._daylightSavingAdjust(new Date(inst.endYear, inst.endMonth, inst.endDay)) : currentDate;
            var defaultDate = this._getDefaultDate(inst);
            var html = "";
            for (var row = 0; row < numMonths[0]; row++) {
                var group = "";
                for (var col = 0; col < numMonths[1]; col++) {
                    var selectedDate = this._daylightSavingAdjust(new Date(drawYear, drawMonth, inst.selectedDay));
                    var cornerClass = " ui-corner-all";
                    var calender = "";
                    if (isMultiMonth) {
                        calender += '<div class="ui-datepicker-group ui-datepicker-group-';
                        switch (col) {
                            case 0:
                                calender += "first";
                                cornerClass = " ui-corner-" + (isRTL ? "right" : "left");
                                break;
                            case numMonths[1] - 1:
                                calender += "last";
                                cornerClass = " ui-corner-" + (isRTL ? "left" : "right");
                                break;
                            default:
                                calender += "middle";
                                cornerClass = "";
                                break
                        }
                        calender += '">'
                    }
                    calender += '<div class="ui-datepicker-header ui-widget-header ui-helper-clearfix' + cornerClass + '">' + (/all|left/.test(cornerClass) && row == 0 ? (isRTL ? next : prev) : "") + (/all|right/.test(cornerClass) && row == 0 ? (isRTL ? prev : next) : "") + this._generateMonthYearHeader(inst, drawMonth, drawYear, minDate, maxDate, selectedDate, row > 0 || col > 0, monthNames, monthNamesShort) + '</div><table class="ui-datepicker-calendar"><thead><tr>';
                    var thead = "";
                    for (var dow = 0; dow < 7; dow++) {
                        var day = (dow + firstDay) % 7;
                        thead += "<th" + ((dow + firstDay + 6) % 7 >= 5 ? ' class="ui-datepicker-week-end"' : "") + '><span title="' + dayNames[day] + '">' + dayNamesMin[day] + "</span></th>"
                    }
                    calender += thead + "</tr></thead><tbody>";
                    var daysInMonth = this._getDaysInMonth(drawYear, drawMonth);
                    if (drawYear == inst.selectedYear && drawMonth == inst.selectedMonth) {
                        inst.selectedDay = Math.min(inst.selectedDay, daysInMonth)
                    }
                    var leadDays = (this._getFirstDayOfMonth(drawYear, drawMonth) - firstDay + 7) % 7;
                    var numRows = (isMultiMonth ? 6 : Math.ceil((leadDays + daysInMonth) / 7));
                    var printDate = this._daylightSavingAdjust(new Date(drawYear, drawMonth, 1 - leadDays));
                    for (var dRow = 0; dRow < numRows; dRow++) {
                        calender += "<tr>";
                        var tbody = "";
                        for (var dow = 0; dow < 7; dow++) {
                            var daySettings = (beforeShowDay ? beforeShowDay.apply((inst.input ? inst.input[0] : null), [printDate]) : [true, ""]);
                            var otherMonth = (printDate.getMonth() != drawMonth);
                            var unselectable = otherMonth || !daySettings[0] || (minDate && printDate < minDate) || (maxDate && printDate > maxDate);
                            tbody += '<td class="' + ((dow + firstDay + 6) % 7 >= 5 ? " ui-datepicker-week-end" : "") + (otherMonth ? " ui-datepicker-other-month" : "") + ((printDate.getTime() == selectedDate.getTime() && drawMonth == inst.selectedMonth && inst._keyEvent) || (defaultDate.getTime() == printDate.getTime() && defaultDate.getTime() == selectedDate.getTime()) ? " " + this._dayOverClass : "") + (unselectable ? " " + this._unselectableClass + " ui-state-disabled" : "") + (otherMonth && !showOtherMonths ? "" : " " + daySettings[1] + (printDate.getTime() >= currentDate.getTime() && printDate.getTime() <= endDate.getTime() ? " " + this._currentClass : "") + (printDate.getTime() == today.getTime() ? " ui-datepicker-today" : "")) + '"' + ((!otherMonth || showOtherMonths) && daySettings[2] ? ' title="' + daySettings[2] + '"' : "") + (unselectable ? "" : " onclick=\"jQuery.datepicker._selectDay('#" + inst.id + "'," + drawMonth + "," + drawYear + ', this);return false;"') + ">" + (otherMonth ? (showOtherMonths ? printDate.getDate() : "&#xa0;") : (unselectable ? '<span class="ui-state-default">' + printDate.getDate() + "</span>" : '<a class="ui-state-default' + (printDate.getTime() == today.getTime() ? " ui-state-highlight" : "") + (printDate.getTime() >= currentDate.getTime() && printDate.getTime() <= endDate.getTime() ? " ui-state-active" : "") + '" href="#">' + printDate.getDate() + "</a>")) + "</td>";
                            printDate.setDate(printDate.getDate() + 1);
                            printDate = this._daylightSavingAdjust(printDate)
                        }
                        calender += tbody + "</tr>"
                    }
                    drawMonth++;
                    if (drawMonth > 11) {
                        drawMonth = 0;
                        drawYear++
                    }
                    calender += "</tbody></table>" + (isMultiMonth ? "</div>" : "");
                    group += calender
                }
                html += group
            }
            html += (!inst.inline ? buttonPanel : "") + ($.browser.msie && parseInt($.browser.version, 10) < 7 && !inst.inline ? '<iframe src="javascript:false;" class="ui-datepicker-cover" frameborder="0"></iframe>' : "");
            inst._keyEvent = false;
            return html
        },
        _generateMonthYearHeader: function (inst, drawMonth, drawYear, minDate, maxDate, selectedDate, secondary, monthNames, monthNamesShort) {
            minDate = (inst.rangeStart && minDate && selectedDate < minDate ? selectedDate : minDate);
            var changeMonth = this._get(inst, "changeMonth");
            var changeYear = this._get(inst, "changeYear");
            var showMonthAfterYear = this._get(inst, "showMonthAfterYear");
            var html = '<div class="ui-datepicker-title">';
            var monthHtml = "";
            if (secondary || !changeMonth) {
                monthHtml += '<span class="ui-datepicker-month">' + monthNames[drawMonth] + "</span> "
            } else {
                var inMinYear = (minDate && minDate.getFullYear() == drawYear);
                var inMaxYear = (maxDate && maxDate.getFullYear() == drawYear);
                monthHtml += '<select class="ui-datepicker-month" onchange="jQuery.datepicker._selectMonthYear(\'#' + inst.id + "', this, 'M');\" onclick=\"jQuery.datepicker._clickMonthYear('#" + inst.id + "');\">";
                for (var month = 0; month < 12; month++) {
                    if ((!inMinYear || month >= minDate.getMonth()) && (!inMaxYear || month <= maxDate.getMonth())) {
                        monthHtml += '<option value="' + month + '"' + (month == drawMonth ? ' selected="selected"' : "") + ">" + monthNamesShort[month] + "</option>"
                    }
                }
                monthHtml += "</select>"
            }
            if (!showMonthAfterYear) {
                html += monthHtml + ((secondary || changeMonth || changeYear) && (!(changeMonth && changeYear)) ? "&#xa0;" : "")
            }
            if (secondary || !changeYear) {
                html += '<span class="ui-datepicker-year">' + drawYear + "</span>"
            } else {
                var years = this._get(inst, "yearRange").split(":");
                var year = 0;
                var endYear = 0;
                if (years.length != 2) {
                    year = drawYear - 10;
                    endYear = drawYear + 10
                } else {
                    if (years[0].charAt(0) == "+" || years[0].charAt(0) == "-") {
                        year = drawYear + parseInt(years[0], 10);
                        endYear = drawYear + parseInt(years[1], 10)
                    } else {
                        year = parseInt(years[0], 10);
                        endYear = parseInt(years[1], 10)
                    }
                }
                year = (minDate ? Math.max(year, minDate.getFullYear()) : year);
                endYear = (maxDate ? Math.min(endYear, maxDate.getFullYear()) : endYear);
                html += '<select class="ui-datepicker-year" onchange="jQuery.datepicker._selectMonthYear(\'#' + inst.id + "', this, 'Y');\" onclick=\"jQuery.datepicker._clickMonthYear('#" + inst.id + "');\">";
                for (; year <= endYear; year++) {
                    html += '<option value="' + year + '"' + (year == drawYear ? ' selected="selected"' : "") + ">" + year + "</option>"
                }
                html += "</select>"
            }
            if (showMonthAfterYear) {
                html += (secondary || changeMonth || changeYear ? "&#xa0;" : "") + monthHtml
            }
            html += "</div>";
            return html
        },
        _adjustInstDate: function (inst, offset, period) {
            var year = inst.drawYear + (period == "Y" ? offset : 0);
            var month = inst.drawMonth + (period == "M" ? offset : 0);
            var day = Math.min(inst.selectedDay, this._getDaysInMonth(year, month)) + (period == "D" ? offset : 0);
            var date = this._daylightSavingAdjust(new Date(year, month, day));
            var minDate = this._getMinMaxDate(inst, "min", true);
            var maxDate = this._getMinMaxDate(inst, "max");
            date = (minDate && date < minDate ? minDate : date);
            date = (maxDate && date > maxDate ? maxDate : date);
            inst.selectedDay = date.getDate();
            inst.drawMonth = inst.selectedMonth = date.getMonth();
            inst.drawYear = inst.selectedYear = date.getFullYear();
            if (period == "M" || period == "Y") {
                this._notifyChange(inst)
            }
        },
        _notifyChange: function (inst) {
            var onChange = this._get(inst, "onChangeMonthYear");
            if (onChange) {
                onChange.apply((inst.input ? inst.input[0] : null), [inst.selectedYear, inst.selectedMonth + 1, inst])
            }
        },
        _getNumberOfMonths: function (inst) {
            var numMonths = this._get(inst, "numberOfMonths");
            return (numMonths == null ? [1, 1] : (typeof numMonths == "number" ? [1, numMonths] : numMonths))
        },
        _getMinMaxDate: function (inst, minMax, checkRange) {
            var date = this._determineDate(this._get(inst, minMax + "Date"), null);
            return (!checkRange || !inst.rangeStart ? date : (!date || inst.rangeStart > date ? inst.rangeStart : date))
        },
        _getDaysInMonth: function (year, month) {
            return 32 - new Date(year, month, 32).getDate()
        },
        _getFirstDayOfMonth: function (year, month) {
            return new Date(year, month, 1).getDay()
        },
        _canAdjustMonth: function (inst, offset, curYear, curMonth) {
            var numMonths = this._getNumberOfMonths(inst);
            var date = this._daylightSavingAdjust(new Date(curYear, curMonth + (offset < 0 ? offset : numMonths[1]), 1));
            if (offset < 0) {
                date.setDate(this._getDaysInMonth(date.getFullYear(), date.getMonth()))
            }
            return this._isInRange(inst, date)
        },
        _isInRange: function (inst, date) {
            var newMinDate = (!inst.rangeStart ? null : this._daylightSavingAdjust(new Date(inst.selectedYear, inst.selectedMonth, inst.selectedDay)));
            newMinDate = (newMinDate && inst.rangeStart < newMinDate ? inst.rangeStart : newMinDate);
            var minDate = newMinDate || this._getMinMaxDate(inst, "min");
            var maxDate = this._getMinMaxDate(inst, "max");
            return ((!minDate || date >= minDate) && (!maxDate || date <= maxDate))
        },
        _getFormatConfig: function (inst) {
            var shortYearCutoff = this._get(inst, "shortYearCutoff");
            shortYearCutoff = (typeof shortYearCutoff != "string" ? shortYearCutoff : new Date().getFullYear() % 100 + parseInt(shortYearCutoff, 10));
            return {
                shortYearCutoff: shortYearCutoff,
                dayNamesShort: this._get(inst, "dayNamesShort"),
                dayNames: this._get(inst, "dayNames"),
                monthNamesShort: this._get(inst, "monthNamesShort"),
                monthNames: this._get(inst, "monthNames")
            }
        },
        _formatDate: function (inst, day, month, year) {
            if (!day) {
                inst.currentDay = inst.selectedDay;
                inst.currentMonth = inst.selectedMonth;
                inst.currentYear = inst.selectedYear
            }
            var date = (day ? (typeof day == "object" ? day : this._daylightSavingAdjust(new Date(year, month, day))) : this._daylightSavingAdjust(new Date(inst.currentYear, inst.currentMonth, inst.currentDay)));
            return this.formatDate(this._get(inst, "dateFormat"), date, this._getFormatConfig(inst))
        }
    });
    function extendRemove(target, props) {
        $.extend(target, props);
        for (var name in props) {
            if (props[name] == null || props[name] == undefined) {
                target[name] = props[name]
            }
        }
        return target
    }

    function isArray(a) {
        return (a && (($.browser.safari && typeof a == "object" && a.length) || (a.constructor && a.constructor.toString().match(/\Array\(\)/))))
    }

    $.fn.datepicker = function (options) {
        if (!$.datepicker.initialized) {
            $(document).mousedown($.datepicker._checkExternalClick).find("body").append($.datepicker.dpDiv);
            $.datepicker.initialized = true
        }
        var otherArgs = Array.prototype.slice.call(arguments, 1);
        if (typeof options == "string" && (options == "isDisabled" || options == "getDate")) {
            return $.datepicker["_" + options + "Datepicker"].apply($.datepicker, [this[0]].concat(otherArgs))
        }
        return this.each(function () {
            typeof options == "string" ? $.datepicker["_" + options + "Datepicker"].apply($.datepicker, [this].concat(otherArgs)) : $.datepicker._attachDatepicker(this, options)
        })
    };
    $.datepicker = new Datepicker();
    $.datepicker.initialized = false;
    $.datepicker.uuid = new Date().getTime();
    $.datepicker.version = "1.6rc6"
})(jQuery);
/*
 * jQuery UI Progressbar 1.6rc6
 *
 * Copyright (c) 2009 AUTHORS.txt (http://ui.jquery.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Progressbar
 *
 * Depends:
 *   ui.core.js
 */
(function (a) {
    a.widget("ui.progressbar", {
        _init: function () {
            var b = this, c = this.options;
            this.element.addClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").attr({
                role: "progressbar",
                "aria-valuemin": this._valueMin(),
                "aria-valuemax": this._valueMax(),
                "aria-valuenow": this._value()
            });
            this.valueDiv = a('<div class="ui-progressbar-value ui-widget-header ui-corner-left"></div>').appendTo(this.element);
            this._refreshValue()
        }, destroy: function () {
            this.element.removeClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow").removeData("progressbar").unbind(".progressbar");
            this.valueDiv.remove();
            a.widget.prototype.destroy.apply(this, arguments)
        }, value: function (b) {
            arguments.length && this._setData("value", b);
            return this._value()
        }, _setData: function (b, c) {
            switch (b) {
                case"value":
                    this.options.value = c;
                    this._refreshValue();
                    this._trigger("change", null, {});
                    break
            }
            a.widget.prototype._setData.apply(this, arguments)
        }, _value: function () {
            var b = this.options.value;
            if (b < this._valueMin()) {
                b = this._valueMin()
            }
            if (b > this._valueMax()) {
                b = this._valueMax()
            }
            return b
        }, _valueMin: function () {
            var b = 0;
            return b
        }, _valueMax: function () {
            var b = 100;
            return b
        }, _refreshValue: function () {
            var b = this.value();
            this.valueDiv[b == this._valueMax() ? "addClass" : "removeClass"]("ui-corner-right");
            this.valueDiv.width(b + "%");
            this.element.attr("aria-valuenow", b)
        }
    });
    a.extend(a.ui.progressbar, {version: "1.6rc6", defaults: {value: 0}})
})(jQuery);
/*
 * jQuery UI Effects 1.6rc6
 *
 * Copyright (c) 2009 AUTHORS.txt (http://ui.jquery.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Effects/
 */
(function (d) {
    d.effects = d.effects || {};
    d.extend(d.effects, {
        version: "1.6rc6", save: function (g, h) {
            for (var f = 0; f < h.length; f++) {
                if (h[f] !== null) {
                    g.data("ec.storage." + h[f], g[0].style[h[f]])
                }
            }
        }, restore: function (g, h) {
            for (var f = 0; f < h.length; f++) {
                if (h[f] !== null) {
                    g.css(h[f], g.data("ec.storage." + h[f]))
                }
            }
        }, setMode: function (f, g) {
            if (g == "toggle") {
                g = f.is(":hidden") ? "show" : "hide"
            }
            return g
        }, getBaseline: function (g, h) {
            var i, f;
            switch (g[0]) {
                case"top":
                    i = 0;
                    break;
                case"middle":
                    i = 0.5;
                    break;
                case"bottom":
                    i = 1;
                    break;
                default:
                    i = g[0] / h.height
            }
            switch (g[1]) {
                case"left":
                    f = 0;
                    break;
                case"center":
                    f = 0.5;
                    break;
                case"right":
                    f = 1;
                    break;
                default:
                    f = g[1] / h.width
            }
            return {x: f, y: i}
        }, createWrapper: function (f) {
            if (f.parent().is(".ui-effects-wrapper")) {
                return f.parent()
            }
            var g = {width: f.outerWidth(true), height: f.outerHeight(true), "float": f.css("float")};
            f.wrap('<div class="ui-effects-wrapper" style="font-size:100%;background:transparent;border:none;margin:0;padding:0"></div>');
            var j = f.parent();
            if (f.css("position") == "static") {
                j.css({position: "relative"});
                f.css({position: "relative"})
            } else {
                var i = f.css("top");
                if (isNaN(parseInt(i, 10))) {
                    i = "auto"
                }
                var h = f.css("left");
                if (isNaN(parseInt(h, 10))) {
                    h = "auto"
                }
                j.css({position: f.css("position"), top: i, left: h, zIndex: f.css("z-index")}).show();
                f.css({position: "relative", top: 0, left: 0})
            }
            j.css(g);
            return j
        }, removeWrapper: function (f) {
            if (f.parent().is(".ui-effects-wrapper")) {
                return f.parent().replaceWith(f)
            }
            return f
        }, setTransition: function (g, i, f, h) {
            h = h || {};
            d.each(i, function (k, j) {
                unit = g.cssUnit(j);
                if (unit[0] > 0) {
                    h[j] = unit[0] * f + unit[1]
                }
            });
            return h
        }, animateClass: function (h, i, k, j) {
            var f = (typeof k == "function" ? k : (j ? j : null));
            var g = (typeof k == "string" ? k : null);
            return this.each(function () {
                var q = {};
                var o = d(this);
                var p = o.attr("style") || "";
                if (typeof p == "object") {
                    p = p.cssText
                }
                if (h.toggle) {
                    o.hasClass(h.toggle) ? h.remove = h.toggle : h.add = h.toggle
                }
                var l = d.extend({}, (document.defaultView ? document.defaultView.getComputedStyle(this, null) : this.currentStyle));
                if (h.add) {
                    o.addClass(h.add)
                }
                if (h.remove) {
                    o.removeClass(h.remove)
                }
                var m = d.extend({}, (document.defaultView ? document.defaultView.getComputedStyle(this, null) : this.currentStyle));
                if (h.add) {
                    o.removeClass(h.add)
                }
                if (h.remove) {
                    o.addClass(h.remove)
                }
                for (var r in m) {
                    if (typeof m[r] != "function" && m[r] && r.indexOf("Moz") == -1 && r.indexOf("length") == -1 && m[r] != l[r] && (r.match(/color/i) || (!r.match(/color/i) && !isNaN(parseInt(m[r], 10)))) && (l.position != "static" || (l.position == "static" && !r.match(/left|top|bottom|right/)))) {
                        q[r] = m[r]
                    }
                }
                o.animate(q, i, g, function () {
                    if (typeof d(this).attr("style") == "object") {
                        d(this).attr("style")["cssText"] = "";
                        d(this).attr("style")["cssText"] = p
                    } else {
                        d(this).attr("style", p)
                    }
                    if (h.add) {
                        d(this).addClass(h.add)
                    }
                    if (h.remove) {
                        d(this).removeClass(h.remove)
                    }
                    if (f) {
                        f.apply(this, arguments)
                    }
                })
            })
        }
    });
    function c(g, f) {
        var i = g[1] && g[1].constructor == Object ? g[1] : {};
        if (f) {
            i.mode = f
        }
        var h = g[1] && g[1].constructor != Object ? g[1] : i.duration;
        h = d.fx.off ? 0 : typeof h === "number" ? h : d.fx.speeds[h] || d.fx.speeds._default;
        var j = i.callback || (d.isFunction(g[2]) && g[2]) || (d.isFunction(g[3]) && g[3]);
        return [g[0], i, h, j]
    }

    d.fn.extend({
        _show: d.fn.show,
        _hide: d.fn.hide,
        __toggle: d.fn.toggle,
        _addClass: d.fn.addClass,
        _removeClass: d.fn.removeClass,
        _toggleClass: d.fn.toggleClass,
        effect: function (g, f, h, i) {
            return d.effects[g] ? d.effects[g].call(this, {
                method: g,
                options: f || {},
                duration: h,
                callback: i
            }) : null
        },
        show: function () {
            if (!arguments[0] || (arguments[0].constructor == Number || (/(slow|normal|fast)/).test(arguments[0]))) {
                return this._show.apply(this, arguments)
            } else {
                return this.effect.apply(this, c(arguments, "show"))
            }
        },
        hide: function () {
            if (!arguments[0] || (arguments[0].constructor == Number || (/(slow|normal|fast)/).test(arguments[0]))) {
                return this._hide.apply(this, arguments)
            } else {
                return this.effect.apply(this, c(arguments, "hide"))
            }
        },
        toggle: function () {
            if (!arguments[0] || (arguments[0].constructor == Number || (/(slow|normal|fast)/).test(arguments[0])) || (arguments[0].constructor == Function)) {
                return this.__toggle.apply(this, arguments)
            } else {
                return this.effect.apply(this, c(arguments, "toggle"))
            }
        },
        addClass: function (g, f, i, h) {
            return f ? d.effects.animateClass.apply(this, [{add: g}, f, i, h]) : this._addClass(g)
        },
        removeClass: function (g, f, i, h) {
            return f ? d.effects.animateClass.apply(this, [{remove: g}, f, i, h]) : this._removeClass(g)
        },
        toggleClass: function (g, f, i, h) {
            return ((typeof f !== "boolean") && f) ? d.effects.animateClass.apply(this, [{toggle: g}, f, i, h]) : this._toggleClass(g, f)
        },
        morph: function (f, h, g, j, i) {
            return d.effects.animateClass.apply(this, [{add: h, remove: f}, g, j, i])
        },
        switchClass: function () {
            return this.morph.apply(this, arguments)
        },
        cssUnit: function (f) {
            var g = this.css(f), h = [];
            d.each(["em", "px", "%", "pt"], function (j, k) {
                if (g.indexOf(k) > 0) {
                    h = [parseFloat(g), k]
                }
            });
            return h
        }
    });
    d.each(["backgroundColor", "borderBottomColor", "borderLeftColor", "borderRightColor", "borderTopColor", "color", "outlineColor"], function (g, f) {
        d.fx.step[f] = function (h) {
            if (h.state == 0) {
                h.start = e(h.elem, f);
                h.end = b(h.end)
            }
            h.elem.style[f] = "rgb(" + [Math.max(Math.min(parseInt((h.pos * (h.end[0] - h.start[0])) + h.start[0], 10), 255), 0), Math.max(Math.min(parseInt((h.pos * (h.end[1] - h.start[1])) + h.start[1], 10), 255), 0), Math.max(Math.min(parseInt((h.pos * (h.end[2] - h.start[2])) + h.start[2], 10), 255), 0)].join(",") + ")"
        }
    });
    function b(g) {
        var f;
        if (g && g.constructor == Array && g.length == 3) {
            return g
        }
        if (f = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(g)) {
            return [parseInt(f[1], 10), parseInt(f[2], 10), parseInt(f[3], 10)]
        }
        if (f = /rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(g)) {
            return [parseFloat(f[1]) * 2.55, parseFloat(f[2]) * 2.55, parseFloat(f[3]) * 2.55]
        }
        if (f = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(g)) {
            return [parseInt(f[1], 16), parseInt(f[2], 16), parseInt(f[3], 16)]
        }
        if (f = /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(g)) {
            return [parseInt(f[1] + f[1], 16), parseInt(f[2] + f[2], 16), parseInt(f[3] + f[3], 16)]
        }
        if (f = /rgba\(0, 0, 0, 0\)/.exec(g)) {
            return a.transparent
        }
        return a[d.trim(g).toLowerCase()]
    }

    function e(h, f) {
        var g;
        do {
            g = d.curCSS(h, f);
            if (g != "" && g != "transparent" || d.nodeName(h, "body")) {
                break
            }
            f = "backgroundColor"
        } while (h = h.parentNode);
        return b(g)
    }

    var a = {
        aqua: [0, 255, 255],
        azure: [240, 255, 255],
        beige: [245, 245, 220],
        black: [0, 0, 0],
        blue: [0, 0, 255],
        brown: [165, 42, 42],
        cyan: [0, 255, 255],
        darkblue: [0, 0, 139],
        darkcyan: [0, 139, 139],
        darkgrey: [169, 169, 169],
        darkgreen: [0, 100, 0],
        darkkhaki: [189, 183, 107],
        darkmagenta: [139, 0, 139],
        darkolivegreen: [85, 107, 47],
        darkorange: [255, 140, 0],
        darkorchid: [153, 50, 204],
        darkred: [139, 0, 0],
        darksalmon: [233, 150, 122],
        darkviolet: [148, 0, 211],
        fuchsia: [255, 0, 255],
        gold: [255, 215, 0],
        green: [0, 128, 0],
        indigo: [75, 0, 130],
        khaki: [240, 230, 140],
        lightblue: [173, 216, 230],
        lightcyan: [224, 255, 255],
        lightgreen: [144, 238, 144],
        lightgrey: [211, 211, 211],
        lightpink: [255, 182, 193],
        lightyellow: [255, 255, 224],
        lime: [0, 255, 0],
        magenta: [255, 0, 255],
        maroon: [128, 0, 0],
        navy: [0, 0, 128],
        olive: [128, 128, 0],
        orange: [255, 165, 0],
        pink: [255, 192, 203],
        purple: [128, 0, 128],
        violet: [128, 0, 128],
        red: [255, 0, 0],
        silver: [192, 192, 192],
        white: [255, 255, 255],
        yellow: [255, 255, 0],
        transparent: [255, 255, 255]
    };
    d.easing.jswing = d.easing.swing;
    d.extend(d.easing, {
        def: "easeOutQuad", swing: function (g, h, f, j, i) {
            return d.easing[d.easing.def](g, h, f, j, i)
        }, easeInQuad: function (g, h, f, j, i) {
            return j * (h /= i) * h + f
        }, easeOutQuad: function (g, h, f, j, i) {
            return -j * (h /= i) * (h - 2) + f
        }, easeInOutQuad: function (g, h, f, j, i) {
            if ((h /= i / 2) < 1) {
                return j / 2 * h * h + f
            }
            return -j / 2 * ((--h) * (h - 2) - 1) + f
        }, easeInCubic: function (g, h, f, j, i) {
            return j * (h /= i) * h * h + f
        }, easeOutCubic: function (g, h, f, j, i) {
            return j * ((h = h / i - 1) * h * h + 1) + f
        }, easeInOutCubic: function (g, h, f, j, i) {
            if ((h /= i / 2) < 1) {
                return j / 2 * h * h * h + f
            }
            return j / 2 * ((h -= 2) * h * h + 2) + f
        }, easeInQuart: function (g, h, f, j, i) {
            return j * (h /= i) * h * h * h + f
        }, easeOutQuart: function (g, h, f, j, i) {
            return -j * ((h = h / i - 1) * h * h * h - 1) + f
        }, easeInOutQuart: function (g, h, f, j, i) {
            if ((h /= i / 2) < 1) {
                return j / 2 * h * h * h * h + f
            }
            return -j / 2 * ((h -= 2) * h * h * h - 2) + f
        }, easeInQuint: function (g, h, f, j, i) {
            return j * (h /= i) * h * h * h * h + f
        }, easeOutQuint: function (g, h, f, j, i) {
            return j * ((h = h / i - 1) * h * h * h * h + 1) + f
        }, easeInOutQuint: function (g, h, f, j, i) {
            if ((h /= i / 2) < 1) {
                return j / 2 * h * h * h * h * h + f
            }
            return j / 2 * ((h -= 2) * h * h * h * h + 2) + f
        }, easeInSine: function (g, h, f, j, i) {
            return -j * Math.cos(h / i * (Math.PI / 2)) + j + f
        }, easeOutSine: function (g, h, f, j, i) {
            return j * Math.sin(h / i * (Math.PI / 2)) + f
        }, easeInOutSine: function (g, h, f, j, i) {
            return -j / 2 * (Math.cos(Math.PI * h / i) - 1) + f
        }, easeInExpo: function (g, h, f, j, i) {
            return (h == 0) ? f : j * Math.pow(2, 10 * (h / i - 1)) + f
        }, easeOutExpo: function (g, h, f, j, i) {
            return (h == i) ? f + j : j * (-Math.pow(2, -10 * h / i) + 1) + f
        }, easeInOutExpo: function (g, h, f, j, i) {
            if (h == 0) {
                return f
            }
            if (h == i) {
                return f + j
            }
            if ((h /= i / 2) < 1) {
                return j / 2 * Math.pow(2, 10 * (h - 1)) + f
            }
            return j / 2 * (-Math.pow(2, -10 * --h) + 2) + f
        }, easeInCirc: function (g, h, f, j, i) {
            return -j * (Math.sqrt(1 - (h /= i) * h) - 1) + f
        }, easeOutCirc: function (g, h, f, j, i) {
            return j * Math.sqrt(1 - (h = h / i - 1) * h) + f
        }, easeInOutCirc: function (g, h, f, j, i) {
            if ((h /= i / 2) < 1) {
                return -j / 2 * (Math.sqrt(1 - h * h) - 1) + f
            }
            return j / 2 * (Math.sqrt(1 - (h -= 2) * h) + 1) + f
        }, easeInElastic: function (g, i, f, m, l) {
            var j = 1.70158;
            var k = 0;
            var h = m;
            if (i == 0) {
                return f
            }
            if ((i /= l) == 1) {
                return f + m
            }
            if (!k) {
                k = l * 0.3
            }
            if (h < Math.abs(m)) {
                h = m;
                var j = k / 4
            } else {
                var j = k / (2 * Math.PI) * Math.asin(m / h)
            }
            return -(h * Math.pow(2, 10 * (i -= 1)) * Math.sin((i * l - j) * (2 * Math.PI) / k)) + f
        }, easeOutElastic: function (g, i, f, m, l) {
            var j = 1.70158;
            var k = 0;
            var h = m;
            if (i == 0) {
                return f
            }
            if ((i /= l) == 1) {
                return f + m
            }
            if (!k) {
                k = l * 0.3
            }
            if (h < Math.abs(m)) {
                h = m;
                var j = k / 4
            } else {
                var j = k / (2 * Math.PI) * Math.asin(m / h)
            }
            return h * Math.pow(2, -10 * i) * Math.sin((i * l - j) * (2 * Math.PI) / k) + m + f
        }, easeInOutElastic: function (g, i, f, m, l) {
            var j = 1.70158;
            var k = 0;
            var h = m;
            if (i == 0) {
                return f
            }
            if ((i /= l / 2) == 2) {
                return f + m
            }
            if (!k) {
                k = l * (0.3 * 1.5)
            }
            if (h < Math.abs(m)) {
                h = m;
                var j = k / 4
            } else {
                var j = k / (2 * Math.PI) * Math.asin(m / h)
            }
            if (i < 1) {
                return -0.5 * (h * Math.pow(2, 10 * (i -= 1)) * Math.sin((i * l - j) * (2 * Math.PI) / k)) + f
            }
            return h * Math.pow(2, -10 * (i -= 1)) * Math.sin((i * l - j) * (2 * Math.PI) / k) * 0.5 + m + f
        }, easeInBack: function (g, h, f, k, j, i) {
            if (i == undefined) {
                i = 1.70158
            }
            return k * (h /= j) * h * ((i + 1) * h - i) + f
        }, easeOutBack: function (g, h, f, k, j, i) {
            if (i == undefined) {
                i = 1.70158
            }
            return k * ((h = h / j - 1) * h * ((i + 1) * h + i) + 1) + f
        }, easeInOutBack: function (g, h, f, k, j, i) {
            if (i == undefined) {
                i = 1.70158
            }
            if ((h /= j / 2) < 1) {
                return k / 2 * (h * h * (((i *= (1.525)) + 1) * h - i)) + f
            }
            return k / 2 * ((h -= 2) * h * (((i *= (1.525)) + 1) * h + i) + 2) + f
        }, easeInBounce: function (g, h, f, j, i) {
            return j - d.easing.easeOutBounce(g, i - h, 0, j, i) + f
        }, easeOutBounce: function (g, h, f, j, i) {
            if ((h /= i) < (1 / 2.75)) {
                return j * (7.5625 * h * h) + f
            } else {
                if (h < (2 / 2.75)) {
                    return j * (7.5625 * (h -= (1.5 / 2.75)) * h + 0.75) + f
                } else {
                    if (h < (2.5 / 2.75)) {
                        return j * (7.5625 * (h -= (2.25 / 2.75)) * h + 0.9375) + f
                    } else {
                        return j * (7.5625 * (h -= (2.625 / 2.75)) * h + 0.984375) + f
                    }
                }
            }
        }, easeInOutBounce: function (g, h, f, j, i) {
            if (h < i / 2) {
                return d.easing.easeInBounce(g, h * 2, 0, j, i) * 0.5 + f
            }
            return d.easing.easeOutBounce(g, h * 2 - i, 0, j, i) * 0.5 + j * 0.5 + f
        }
    })
})(jQuery);
/*
 * jQuery UI Effects Blind 1.6rc6
 *
 * Copyright (c) 2009 AUTHORS.txt (http://ui.jquery.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Effects/Blind
 *
 * Depends:
 *	effects.core.js
 */
(function (a) {
    a.effects.blind = function (b) {
        return this.queue(function () {
            var d = a(this), c = ["position", "top", "left"];
            var h = a.effects.setMode(d, b.options.mode || "hide");
            var g = b.options.direction || "vertical";
            a.effects.save(d, c);
            d.show();
            var j = a.effects.createWrapper(d).css({overflow: "hidden"});
            var e = (g == "vertical") ? "height" : "width";
            var i = (g == "vertical") ? j.height() : j.width();
            if (h == "show") {
                j.css(e, 0)
            }
            var f = {};
            f[e] = h == "show" ? i : 0;
            j.animate(f, b.duration, b.options.easing, function () {
                if (h == "hide") {
                    d.hide()
                }
                a.effects.restore(d, c);
                a.effects.removeWrapper(d);
                if (b.callback) {
                    b.callback.apply(d[0], arguments)
                }
                d.dequeue()
            })
        })
    }
})(jQuery);
/*
 * jQuery UI Effects Bounce 1.6rc6
 *
 * Copyright (c) 2009 AUTHORS.txt (http://ui.jquery.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Effects/Bounce
 *
 * Depends:
 *	effects.core.js
 */
(function (a) {
    a.effects.bounce = function (b) {
        return this.queue(function () {
            var e = a(this), l = ["position", "top", "left"];
            var k = a.effects.setMode(e, b.options.mode || "effect");
            var n = b.options.direction || "up";
            var c = b.options.distance || 20;
            var d = b.options.times || 5;
            var g = b.duration || 250;
            if (/show|hide/.test(k)) {
                l.push("opacity")
            }
            a.effects.save(e, l);
            e.show();
            a.effects.createWrapper(e);
            var f = (n == "up" || n == "down") ? "top" : "left";
            var p = (n == "up" || n == "left") ? "pos" : "neg";
            var c = b.options.distance || (f == "top" ? e.outerHeight({margin: true}) / 3 : e.outerWidth({margin: true}) / 3);
            if (k == "show") {
                e.css("opacity", 0).css(f, p == "pos" ? -c : c)
            }
            if (k == "hide") {
                c = c / (d * 2)
            }
            if (k != "hide") {
                d--
            }
            if (k == "show") {
                var h = {opacity: 1};
                h[f] = (p == "pos" ? "+=" : "-=") + c;
                e.animate(h, g / 2, b.options.easing);
                c = c / 2;
                d--
            }
            for (var j = 0; j < d; j++) {
                var o = {}, m = {};
                o[f] = (p == "pos" ? "-=" : "+=") + c;
                m[f] = (p == "pos" ? "+=" : "-=") + c;
                e.animate(o, g / 2, b.options.easing).animate(m, g / 2, b.options.easing);
                c = (k == "hide") ? c * 2 : c / 2
            }
            if (k == "hide") {
                var h = {opacity: 0};
                h[f] = (p == "pos" ? "-=" : "+=") + c;
                e.animate(h, g / 2, b.options.easing, function () {
                    e.hide();
                    a.effects.restore(e, l);
                    a.effects.removeWrapper(e);
                    if (b.callback) {
                        b.callback.apply(this, arguments)
                    }
                })
            } else {
                var o = {}, m = {};
                o[f] = (p == "pos" ? "-=" : "+=") + c;
                m[f] = (p == "pos" ? "+=" : "-=") + c;
                e.animate(o, g / 2, b.options.easing).animate(m, g / 2, b.options.easing, function () {
                    a.effects.restore(e, l);
                    a.effects.removeWrapper(e);
                    if (b.callback) {
                        b.callback.apply(this, arguments)
                    }
                })
            }
            e.queue("fx", function () {
                e.dequeue()
            });
            e.dequeue()
        })
    }
})(jQuery);
/*
 * jQuery UI Effects Clip 1.6rc6
 *
 * Copyright (c) 2009 AUTHORS.txt (http://ui.jquery.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Effects/Clip
 *
 * Depends:
 *	effects.core.js
 */
(function (a) {
    a.effects.clip = function (b) {
        return this.queue(function () {
            var f = a(this), j = ["position", "top", "left", "height", "width"];
            var i = a.effects.setMode(f, b.options.mode || "hide");
            var k = b.options.direction || "vertical";
            a.effects.save(f, j);
            f.show();
            var c = a.effects.createWrapper(f).css({overflow: "hidden"});
            var e = f[0].tagName == "IMG" ? c : f;
            var g = {size: (k == "vertical") ? "height" : "width", position: (k == "vertical") ? "top" : "left"};
            var d = (k == "vertical") ? e.height() : e.width();
            if (i == "show") {
                e.css(g.size, 0);
                e.css(g.position, d / 2)
            }
            var h = {};
            h[g.size] = i == "show" ? d : 0;
            h[g.position] = i == "show" ? 0 : d / 2;
            e.animate(h, {
                queue: false, duration: b.duration, easing: b.options.easing, complete: function () {
                    if (i == "hide") {
                        f.hide()
                    }
                    a.effects.restore(f, j);
                    a.effects.removeWrapper(f);
                    if (b.callback) {
                        b.callback.apply(f[0], arguments)
                    }
                    f.dequeue()
                }
            })
        })
    }
})(jQuery);
/*
 * jQuery UI Effects Drop 1.6rc6
 *
 * Copyright (c) 2009 AUTHORS.txt (http://ui.jquery.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Effects/Drop
 *
 * Depends:
 *	effects.core.js
 */
(function (a) {
    a.effects.drop = function (b) {
        return this.queue(function () {
            var e = a(this), d = ["position", "top", "left", "opacity"];
            var i = a.effects.setMode(e, b.options.mode || "hide");
            var h = b.options.direction || "left";
            a.effects.save(e, d);
            e.show();
            a.effects.createWrapper(e);
            var f = (h == "up" || h == "down") ? "top" : "left";
            var c = (h == "up" || h == "left") ? "pos" : "neg";
            var j = b.options.distance || (f == "top" ? e.outerHeight({margin: true}) / 2 : e.outerWidth({margin: true}) / 2);
            if (i == "show") {
                e.css("opacity", 0).css(f, c == "pos" ? -j : j)
            }
            var g = {opacity: i == "show" ? 1 : 0};
            g[f] = (i == "show" ? (c == "pos" ? "+=" : "-=") : (c == "pos" ? "-=" : "+=")) + j;
            e.animate(g, {
                queue: false, duration: b.duration, easing: b.options.easing, complete: function () {
                    if (i == "hide") {
                        e.hide()
                    }
                    a.effects.restore(e, d);
                    a.effects.removeWrapper(e);
                    if (b.callback) {
                        b.callback.apply(this, arguments)
                    }
                    e.dequeue()
                }
            })
        })
    }
})(jQuery);
/*
 * jQuery UI Effects Explode 1.6rc6
 *
 * Copyright (c) 2009 AUTHORS.txt (http://ui.jquery.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Effects/Explode
 *
 * Depends:
 *	effects.core.js
 */
(function (a) {
    a.effects.explode = function (b) {
        return this.queue(function () {
            var k = b.options.pieces ? Math.round(Math.sqrt(b.options.pieces)) : 3;
            var e = b.options.pieces ? Math.round(Math.sqrt(b.options.pieces)) : 3;
            b.options.mode = b.options.mode == "toggle" ? (a(this).is(":visible") ? "hide" : "show") : b.options.mode;
            var h = a(this).show().css("visibility", "hidden");
            var l = h.offset();
            l.top -= parseInt(h.css("marginTop")) || 0;
            l.left -= parseInt(h.css("marginLeft")) || 0;
            var g = h.outerWidth(true);
            var c = h.outerHeight(true);
            for (var f = 0; f < k; f++) {
                for (var d = 0; d < e; d++) {
                    h.clone().appendTo("body").wrap("<div></div>").css({
                        position: "absolute",
                        visibility: "visible",
                        left: -d * (g / e),
                        top: -f * (c / k)
                    }).parent().addClass("ui-effects-explode").css({
                        position: "absolute",
                        overflow: "hidden",
                        width: g / e,
                        height: c / k,
                        left: l.left + d * (g / e) + (b.options.mode == "show" ? (d - Math.floor(e / 2)) * (g / e) : 0),
                        top: l.top + f * (c / k) + (b.options.mode == "show" ? (f - Math.floor(k / 2)) * (c / k) : 0),
                        opacity: b.options.mode == "show" ? 0 : 1
                    }).animate({
                        left: l.left + d * (g / e) + (b.options.mode == "show" ? 0 : (d - Math.floor(e / 2)) * (g / e)),
                        top: l.top + f * (c / k) + (b.options.mode == "show" ? 0 : (f - Math.floor(k / 2)) * (c / k)),
                        opacity: b.options.mode == "show" ? 1 : 0
                    }, b.duration || 500)
                }
            }
            setTimeout(function () {
                b.options.mode == "show" ? h.css({visibility: "visible"}) : h.css({visibility: "visible"}).hide();
                if (b.callback) {
                    b.callback.apply(h[0])
                }
                h.dequeue();
                a("div.ui-effects-explode").remove()
            }, b.duration || 500)
        })
    }
})(jQuery);
/*
 * jQuery UI Effects Fold 1.6rc6
 *
 * Copyright (c) 2009 AUTHORS.txt (http://ui.jquery.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Effects/Fold
 *
 * Depends:
 *	effects.core.js
 */
(function (a) {
    a.effects.fold = function (b) {
        return this.queue(function () {
            var e = a(this), k = ["position", "top", "left"];
            var h = a.effects.setMode(e, b.options.mode || "hide");
            var o = b.options.size || 15;
            var n = !(!b.options.horizFirst);
            var g = b.duration ? b.duration / 2 : a.fx.speeds._default / 2;
            a.effects.save(e, k);
            e.show();
            var d = a.effects.createWrapper(e).css({overflow: "hidden"});
            var i = ((h == "show") != n);
            var f = i ? ["width", "height"] : ["height", "width"];
            var c = i ? [d.width(), d.height()] : [d.height(), d.width()];
            var j = /([0-9]+)%/.exec(o);
            if (j) {
                o = parseInt(j[1]) / 100 * c[h == "hide" ? 0 : 1]
            }
            if (h == "show") {
                d.css(n ? {height: 0, width: o} : {height: o, width: 0})
            }
            var m = {}, l = {};
            m[f[0]] = h == "show" ? c[0] : o;
            l[f[1]] = h == "show" ? c[1] : 0;
            d.animate(m, g, b.options.easing).animate(l, g, b.options.easing, function () {
                if (h == "hide") {
                    e.hide()
                }
                a.effects.restore(e, k);
                a.effects.removeWrapper(e);
                if (b.callback) {
                    b.callback.apply(e[0], arguments)
                }
                e.dequeue()
            })
        })
    }
})(jQuery);
/*
 * jQuery UI Effects Highlight 1.6rc6
 *
 * Copyright (c) 2009 AUTHORS.txt (http://ui.jquery.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Effects/Highlight
 *
 * Depends:
 *	effects.core.js
 */
(function (a) {
    a.effects.highlight = function (b) {
        return this.queue(function () {
            var e = a(this), d = ["backgroundImage", "backgroundColor", "opacity"];
            var h = a.effects.setMode(e, b.options.mode || "show");
            var c = b.options.color || "#ffff99";
            var g = e.css("backgroundColor");
            a.effects.save(e, d);
            e.show();
            e.css({backgroundImage: "none", backgroundColor: c});
            var f = {backgroundColor: g};
            if (h == "hide") {
                f.opacity = 0
            }
            e.animate(f, {
                queue: false, duration: b.duration, easing: b.options.easing, complete: function () {
                    if (h == "hide") {
                        e.hide()
                    }
                    a.effects.restore(e, d);
                    if (h == "show" && a.browser.msie) {
                        this.style.removeAttribute("filter")
                    }
                    if (b.callback) {
                        b.callback.apply(this, arguments)
                    }
                    e.dequeue()
                }
            })
        })
    }
})(jQuery);
/*
 * jQuery UI Effects Pulsate 1.6rc6
 *
 * Copyright (c) 2009 AUTHORS.txt (http://ui.jquery.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Effects/Pulsate
 *
 * Depends:
 *	effects.core.js
 */
(function (a) {
    a.effects.pulsate = function (b) {
        return this.queue(function () {
            var d = a(this);
            var g = a.effects.setMode(d, b.options.mode || "show");
            var f = b.options.times || 5;
            var e = b.duration ? b.duration / 2 : a.fx.speeds._default / 2;
            if (g == "hide") {
                f--
            }
            if (d.is(":hidden")) {
                d.css("opacity", 0);
                d.show();
                d.animate({opacity: 1}, e, b.options.easing);
                f = f - 2
            }
            for (var c = 0; c < f; c++) {
                d.animate({opacity: 0}, e, b.options.easing).animate({opacity: 1}, e, b.options.easing)
            }
            if (g == "hide") {
                d.animate({opacity: 0}, e, b.options.easing, function () {
                    d.hide();
                    if (b.callback) {
                        b.callback.apply(this, arguments)
                    }
                })
            } else {
                d.animate({opacity: 0}, e, b.options.easing).animate({opacity: 1}, e, b.options.easing, function () {
                    if (b.callback) {
                        b.callback.apply(this, arguments)
                    }
                })
            }
            d.queue("fx", function () {
                d.dequeue()
            });
            d.dequeue()
        })
    }
})(jQuery);
/*
 * jQuery UI Effects Scale 1.6rc6
 *
 * Copyright (c) 2009 AUTHORS.txt (http://ui.jquery.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Effects/Scale
 *
 * Depends:
 *	effects.core.js
 */
(function (a) {
    a.effects.puff = function (b) {
        return this.queue(function () {
            var f = a(this);
            var c = a.extend(true, {}, b.options);
            var h = a.effects.setMode(f, b.options.mode || "hide");
            var g = parseInt(b.options.percent) || 150;
            c.fade = true;
            var e = {height: f.height(), width: f.width()};
            var d = g / 100;
            f.from = (h == "hide") ? e : {height: e.height * d, width: e.width * d};
            c.from = f.from;
            c.percent = (h == "hide") ? g : 100;
            c.mode = h;
            f.effect("scale", c, b.duration, b.callback);
            f.dequeue()
        })
    };
    a.effects.scale = function (b) {
        return this.queue(function () {
            var g = a(this);
            var d = a.extend(true, {}, b.options);
            var j = a.effects.setMode(g, b.options.mode || "effect");
            var h = parseInt(b.options.percent) || (parseInt(b.options.percent) == 0 ? 0 : (j == "hide" ? 0 : 100));
            var i = b.options.direction || "both";
            var c = b.options.origin;
            if (j != "effect") {
                d.origin = c || ["middle", "center"];
                d.restore = true
            }
            var f = {height: g.height(), width: g.width()};
            g.from = b.options.from || (j == "show" ? {height: 0, width: 0} : f);
            var e = {y: i != "horizontal" ? (h / 100) : 1, x: i != "vertical" ? (h / 100) : 1};
            g.to = {height: f.height * e.y, width: f.width * e.x};
            if (b.options.fade) {
                if (j == "show") {
                    g.from.opacity = 0;
                    g.to.opacity = 1
                }
                if (j == "hide") {
                    g.from.opacity = 1;
                    g.to.opacity = 0
                }
            }
            d.from = g.from;
            d.to = g.to;
            d.mode = j;
            g.effect("size", d, b.duration, b.callback);
            g.dequeue()
        })
    };
    a.effects.size = function (b) {
        return this.queue(function () {
            var c = a(this), n = ["position", "top", "left", "width", "height", "overflow", "opacity"];
            var m = ["position", "top", "left", "overflow", "opacity"];
            var j = ["width", "height", "overflow"];
            var p = ["fontSize"];
            var k = ["borderTopWidth", "borderBottomWidth", "paddingTop", "paddingBottom"];
            var f = ["borderLeftWidth", "borderRightWidth", "paddingLeft", "paddingRight"];
            var g = a.effects.setMode(c, b.options.mode || "effect");
            var i = b.options.restore || false;
            var e = b.options.scale || "both";
            var o = b.options.origin;
            var d = {height: c.height(), width: c.width()};
            c.from = b.options.from || d;
            c.to = b.options.to || d;
            if (o) {
                var h = a.effects.getBaseline(o, d);
                c.from.top = (d.height - c.from.height) * h.y;
                c.from.left = (d.width - c.from.width) * h.x;
                c.to.top = (d.height - c.to.height) * h.y;
                c.to.left = (d.width - c.to.width) * h.x
            }
            var l = {
                from: {y: c.from.height / d.height, x: c.from.width / d.width},
                to: {y: c.to.height / d.height, x: c.to.width / d.width}
            };
            if (e == "box" || e == "both") {
                if (l.from.y != l.to.y) {
                    n = n.concat(k);
                    c.from = a.effects.setTransition(c, k, l.from.y, c.from);
                    c.to = a.effects.setTransition(c, k, l.to.y, c.to)
                }
                if (l.from.x != l.to.x) {
                    n = n.concat(f);
                    c.from = a.effects.setTransition(c, f, l.from.x, c.from);
                    c.to = a.effects.setTransition(c, f, l.to.x, c.to)
                }
            }
            if (e == "content" || e == "both") {
                if (l.from.y != l.to.y) {
                    n = n.concat(p);
                    c.from = a.effects.setTransition(c, p, l.from.y, c.from);
                    c.to = a.effects.setTransition(c, p, l.to.y, c.to)
                }
            }
            a.effects.save(c, i ? n : m);
            c.show();
            a.effects.createWrapper(c);
            c.css("overflow", "hidden").css(c.from);
            if (e == "content" || e == "both") {
                k = k.concat(["marginTop", "marginBottom"]).concat(p);
                f = f.concat(["marginLeft", "marginRight"]);
                j = n.concat(k).concat(f);
                c.find("*[width]").each(function () {
                    child = a(this);
                    if (i) {
                        a.effects.save(child, j)
                    }
                    var q = {height: child.height(), width: child.width()};
                    child.from = {height: q.height * l.from.y, width: q.width * l.from.x};
                    child.to = {height: q.height * l.to.y, width: q.width * l.to.x};
                    if (l.from.y != l.to.y) {
                        child.from = a.effects.setTransition(child, k, l.from.y, child.from);
                        child.to = a.effects.setTransition(child, k, l.to.y, child.to)
                    }
                    if (l.from.x != l.to.x) {
                        child.from = a.effects.setTransition(child, f, l.from.x, child.from);
                        child.to = a.effects.setTransition(child, f, l.to.x, child.to)
                    }
                    child.css(child.from);
                    child.animate(child.to, b.duration, b.options.easing, function () {
                        if (i) {
                            a.effects.restore(child, j)
                        }
                    })
                })
            }
            c.animate(c.to, {
                queue: false, duration: b.duration, easing: b.options.easing, complete: function () {
                    if (g == "hide") {
                        c.hide()
                    }
                    a.effects.restore(c, i ? n : m);
                    a.effects.removeWrapper(c);
                    if (b.callback) {
                        b.callback.apply(this, arguments)
                    }
                    c.dequeue()
                }
            })
        })
    }
})(jQuery);
/*
 * jQuery UI Effects Shake 1.6rc6
 *
 * Copyright (c) 2009 AUTHORS.txt (http://ui.jquery.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Effects/Shake
 *
 * Depends:
 *	effects.core.js
 */
(function (a) {
    a.effects.shake = function (b) {
        return this.queue(function () {
            var e = a(this), l = ["position", "top", "left"];
            var k = a.effects.setMode(e, b.options.mode || "effect");
            var n = b.options.direction || "left";
            var c = b.options.distance || 20;
            var d = b.options.times || 3;
            var g = b.duration || b.options.duration || 140;
            a.effects.save(e, l);
            e.show();
            a.effects.createWrapper(e);
            var f = (n == "up" || n == "down") ? "top" : "left";
            var p = (n == "up" || n == "left") ? "pos" : "neg";
            var h = {}, o = {}, m = {};
            h[f] = (p == "pos" ? "-=" : "+=") + c;
            o[f] = (p == "pos" ? "+=" : "-=") + c * 2;
            m[f] = (p == "pos" ? "-=" : "+=") + c * 2;
            e.animate(h, g, b.options.easing);
            for (var j = 1; j < d; j++) {
                e.animate(o, g, b.options.easing).animate(m, g, b.options.easing)
            }
            e.animate(o, g, b.options.easing).animate(h, g / 2, b.options.easing, function () {
                a.effects.restore(e, l);
                a.effects.removeWrapper(e);
                if (b.callback) {
                    b.callback.apply(this, arguments)
                }
            });
            e.queue("fx", function () {
                e.dequeue()
            });
            e.dequeue()
        })
    }
})(jQuery);
/*
 * jQuery UI Effects Slide 1.6rc6
 *
 * Copyright (c) 2009 AUTHORS.txt (http://ui.jquery.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Effects/Slide
 *
 * Depends:
 *	effects.core.js
 */
(function (a) {
    a.effects.slide = function (b) {
        return this.queue(function () {
            var e = a(this), d = ["position", "top", "left"];
            var i = a.effects.setMode(e, b.options.mode || "show");
            var h = b.options.direction || "left";
            a.effects.save(e, d);
            e.show();
            a.effects.createWrapper(e).css({overflow: "hidden"});
            var f = (h == "up" || h == "down") ? "top" : "left";
            var c = (h == "up" || h == "left") ? "pos" : "neg";
            var j = b.options.distance || (f == "top" ? e.outerHeight({margin: true}) : e.outerWidth({margin: true}));
            if (i == "show") {
                e.css(f, c == "pos" ? -j : j)
            }
            var g = {};
            g[f] = (i == "show" ? (c == "pos" ? "+=" : "-=") : (c == "pos" ? "-=" : "+=")) + j;
            e.animate(g, {
                queue: false, duration: b.duration, easing: b.options.easing, complete: function () {
                    if (i == "hide") {
                        e.hide()
                    }
                    a.effects.restore(e, d);
                    a.effects.removeWrapper(e);
                    if (b.callback) {
                        b.callback.apply(this, arguments)
                    }
                    e.dequeue()
                }
            })
        })
    }
})(jQuery);
/*
 * jQuery UI Effects Transfer 1.6rc6
 *
 * Copyright (c) 2009 AUTHORS.txt (http://ui.jquery.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Effects/Transfer
 *
 * Depends:
 *	effects.core.js
 */
(function (a) {
    a.effects.transfer = function (b) {
        return this.queue(function () {
            var e = a(this);
            var g = a.effects.setMode(e, b.options.mode || "effect");
            var f = a(b.options.to);
            var c = e.offset();
            var d = a('<div class="ui-effects-transfer"></div>').appendTo(document.body);
            if (b.options.className) {
                d.addClass(b.options.className)
            }
            d.addClass(b.options.className);
            d.css({
                top: c.top,
                left: c.left,
                height: e.outerHeight() - parseInt(d.css("borderTopWidth")) - parseInt(d.css("borderBottomWidth")),
                width: e.outerWidth() - parseInt(d.css("borderLeftWidth")) - parseInt(d.css("borderRightWidth")),
                position: "absolute"
            });
            c = f.offset();
            animation = {
                top: c.top,
                left: c.left,
                height: f.outerHeight() - parseInt(d.css("borderTopWidth")) - parseInt(d.css("borderBottomWidth")),
                width: f.outerWidth() - parseInt(d.css("borderLeftWidth")) - parseInt(d.css("borderRightWidth"))
            };
            d.animate(animation, b.duration, b.options.easing, function () {
                d.remove();
                if (b.callback) {
                    b.callback.apply(e[0], arguments)
                }
                e.dequeue()
            })
        })
    }
})(jQuery);
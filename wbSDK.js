parcelRequire = function(e, r, t, n) {
	var i, o = "function" == typeof parcelRequire && parcelRequire,
		u = "function" == typeof require && require;

	function f(t, n) {
		if (!r[t]) {
			if (!e[t]) {
				var i = "function" == typeof parcelRequire && parcelRequire;
				if (!n && i) return i(t, !0);
				if (o) return o(t, !0);
				if (u && "string" == typeof t) return u(t);
				var c = new Error("Cannot find module '" + t + "'");
				throw c.code = "MODULE_NOT_FOUND", c
			}
			p.resolve = function(r) {
				return e[t][1][r] || r
			}, p.cache = {};
			var l = r[t] = new f.Module(t);
			e[t][0].call(l.exports, p, l, l.exports, this)
		}
		return r[t].exports;

		function p(e) {
			return f(p.resolve(e))
		}
	}
	f.isParcelRequire = !0, f.Module = function(e) {
		this.id = e, this.bundle = f, this.exports = {}
	}, f.modules = e, f.cache = r, f.parent = o, f.register = function(r, t) {
		e[r] = [function(e, r) {
			r.exports = t
		}, {}]
	};
	for (var c = 0; c < t.length; c++) try {
		f(t[c])
	} catch (e) {
		i || (i = e)
	}
	if (t.length) {
		var l = f(t[t.length - 1]);
		"object" == typeof exports && "undefined" != typeof module ? module.exports = l : "function" == typeof define && define.amd ? define(function() {
			return l
		}) : n && (this[n] = l)
	}
	if (parcelRequire = f, i) throw i;
	return f
}({
	"xf34": [function(require, module, exports) {
		var e = function() {
				try {
					return new window.XMLHttpRequest
				} catch (e) {
					return !1
				}
			},
			t = function() {
				try {
					return new window.ActiveXObject("Microsoft.XMLHTTP")
				} catch (e) {
					return !1
				}
			},
			r = function(r) {
				r = r || !0;
				var a = e() || t();
				if ("withCredentials" in a) return a;
				if (!r) return a;
				if (void 0 === window.XDomainRequest) return a;
				var s = new XDomainRequest;
				return s.readyState = 0, s.status = 100, s.onreadystatechange = EMPTYFN, s.onload = function() {
					s.readyState = 4, s.status = 200;
					var e = new ActiveXObject("Microsoft.XMLDOM");
					e.async = "false", e.loadXML(s.responseText), s.responseXML = e, s.response = s.responseText, s.onreadystatechange()
				}, s.ontimeout = s.onerror = function() {
					s.readyState = 4, s.status = 500, s.onreadystatechange()
				}, s
			},
			a = function(e) {
				if (window.JSON && window.JSON.parse) return window.JSON.parse(e + "");
				var t, r = null,
					a = utils.trim(e + "");
				return a && !utils.trim(a.replace(/(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g, function(e, a, s, n) {
					return t && a && (r = 0), 0 === r ? e : (t = s || a, r += !n - !s, "")
				})) ? Function("return " + a)() : Function("Invalid JSON: " + e)()
			},
			s = function(e) {
				var t = e.dataType || "text",
					s = e.success || EMPTYFN,
					n = e.error || EMPTYFN,
					o = r();
				o.onreadystatechange = function() {
					if (4 !== o.readyState) 0 === o.readyState && n({
						data: o.responseText
					});
					else {
						if (200 === (o.status || 0)) {
							try {
								switch (t) {
									case "text":
										return void s(o.responseText);
									case "json":
										var e = a(o.responseText);
										return void s(e, o);
									case "xml":
										return void(o.responseXML && o.responseXML.documentElement ? s(o.responseXML.documentElement, o) : n({
											data: o.responseText
										}))
								}
								s(o.response || o.responseText, o)
							} catch (r) {
								n({
									data: r
								})
							}
							return
						}
						n({
							data: o.responseText
						})
					}
				}, e.responseType && o.responseType && (o.responseType = e.responseType), e.mimeType && utils.hasOverrideMimeType && o.overrideMimeType(e.mimeType);
				var i = e.type || "POST",
					p = e.data || null,
					u = "";
				if ("get" === i.toLowerCase() && p) {
					for (var d in p) p.hasOwnProperty(d) && (u += d + "=" + p[d] + "&");
					u = u ? u.slice(0, -1) : u, e.url += (e.url.indexOf("?") > 0 ? "&" : "?") + (u ? u + "&" : u) + "_v=" + (new Date).getTime(), p = null, u = null
				}
				if (o.open(i, e.url, o.setRequestHeader), o.setRequestHeader) {
					var c = e.headers || {};
					for (var y in c) c.hasOwnProperty(y) && o.setRequestHeader(y, c[y])
				}
				return window.XDomainRequest && (o.readyState = 2), o.send(p), o
			},
			n = function(e) {
				this.restApi = e.restApi, this.appKey = e.appKey, this.orgName = e.appKey.split("#")[0], this.appName = e.appKey.split("#")[1]
			};
		n.prototype.create = function(e) {
			var t = {
				url: this.restApi + "/" + this.orgName + "/" + this.appName + "/whiteboards",
				dataType: "json",
				type: "POST",
				data: JSON.stringify({
					userId: e.userName,
					whiteBoardName: e.roomName
				}),
				headers: {
					Authorization: "Bearer " + e.token,
					"Content-Type": "application/json"
				},
				success: e.suc,
				error: e.error
			};
			s(t)
		}, n.prototype.joinByRoomName = function(e) {
			var t = {
				url: this.restApi + "/" + this.orgName + "/" + this.appName + "/whiteboards/url-by-name",
				dataType: "json",
				type: "POST",
				data: JSON.stringify({
					userId: e.userName,
					whiteBoardName: e.roomName
				}),
				headers: {
					Authorization: "Bearer " + e.token,
					"Content-Type": "application/json"
				},
				success: e.suc,
				error: e.error
			};
			s(t)
		}, n.prototype.joinByRoomId = function(e) {
			var t = {
				url: this.restApi + "/" + this.orgName + "/" + this.appName + "/whiteboards/" + e.roomId + "/url",
				dataType: "json",
				type: "POST",
				data: JSON.stringify({
					userId: e.userName
				}),
				headers: {
					Authorization: "Bearer " + e.token,
					"Content-Type": "application/json"
				},
				success: e.suc,
				error: e.error
			};
			s(t)
		}, n.prototype.destroy = function(e) {
			var t = {
				url: this.restApi + "/" + this.orgName + "/" + this.appName + "/whiteboards/" + e.roomId,
				dataType: "json",
				type: "DELETE",
				data: JSON.stringify({
					userId: e.userName
				}),
				headers: {
					Authorization: "Bearer " + e.token,
					"Content-Type": "application/json"
				},
				success: e.suc,
				error: e.error
			};
			s(t)
		}, module.exports = n;
	}, {}]
}, {}, ["xf34"], "whiteBoards")
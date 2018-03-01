var sf365;
(function (sf365) {
    var libs;
    (function (libs) {
        var Guid = /** @class */ (function () {
            function Guid() {
            }
            Guid.compare = function (id1, id2) {
                return (id1.replace("{", "").replace("}", "").toLowerCase() ==
                    id2.replace("{", "").replace("}", "").toLowerCase());
            };
            return Guid;
        }());
        libs.Guid = Guid;
    })(libs = sf365.libs || (sf365.libs = {}));
})(sf365 || (sf365 = {}));
//# sourceMappingURL=guid.js.map
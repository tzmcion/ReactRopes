import { Point, EndPoint } from "./Point";
var Rope = /** @class */ (function () {
    function Rope(ctx, quantity, options, image) {
        Object.defineProperty(this, "ctx", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ctx
        });
        Object.defineProperty(this, "options", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: options
        });
        Object.defineProperty(this, "points", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "hover", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.hover = 0;
        this.points = [];
        console.log(this.options);
        this.points.push(new EndPoint(options.pos_x, options.pos_y, 0, 0, options, true));
        for (var x = 1; x < quantity; x++) {
            var pos_x = ((options.pos_ex - options.pos_x) / quantity) * x + options.pos_x;
            var pos_y = ((options.pos_ey - options.pos_y) / quantity) * x + options.pos_y;
            this.points.push(new Point(pos_x, pos_y, 0, 0, options));
        }
        this.points.push(new EndPoint(options.pos_ex, options.pos_ey, 0, 0, options, false, image));
    }
    Object.defineProperty(Rope.prototype, "distance", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (p1, p2) {
            var l1 = Math.pow(p1.get_position().x - p2.get_position().x, 2);
            var l2 = Math.pow(p1.get_position().y - p2.get_position().y, 2);
            return Math.sqrt(l1 + l2);
        }
    });
    Object.defineProperty(Rope.prototype, "verlet", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (p1, p2, length) {
            var p1_pos = p1.get_position();
            var p2_pos = p2.get_position();
            var dx = p1_pos.x - p2_pos.x;
            var dy = p1_pos.y - p2_pos.y;
            var ds = this.distance(p1, p2);
            var dif = length - ds;
            var percent = dif / ds / 2;
            var offsetX = dx * percent;
            var offsetY = dy * percent;
            p1.set_position(p1_pos.x + offsetX, p1_pos.y + offsetY);
            p2.set_position(p2_pos.x - offsetX, p2_pos.y - offsetY);
        }
    });
    Object.defineProperty(Rope.prototype, "rotation", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (p1_o, p2_o) {
            var p1 = p1_o.get_position();
            var p2 = p2_o.get_position();
            if (p1.x < p2.x) {
                if (p1.y < p2.y) {
                    p2_o.setRotation(-1 * (Math.asin(Math.abs(p1.x - p2.x) / this.distance(p1_o, p2_o))));
                }
                else {
                    p2_o.setRotation((Math.acos(Math.abs(p1.y - p2.y) / this.distance(p1_o, p2_o))) - Math.PI);
                }
            }
            else {
                if (p1.y < p2.y) {
                    p2_o.setRotation((Math.acos(Math.abs(p1.y - p2.y) / this.distance(p1_o, p2_o))));
                }
                else {
                    p2_o.setRotation(-1 * (Math.asin(Math.abs(p1.x - p2.x) / this.distance(p1_o, p2_o))) + Math.PI);
                }
            }
        }
    });
    Object.defineProperty(Rope.prototype, "mouseIntegration", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (x, y, handler) {
            var _this = this;
            var now = Date.now();
            if (now - this.hover > this.options.mouse_hover_timeout) {
                this.points.forEach(function (point) {
                    var distortion = _this.options.mouse_hover_distortion;
                    if (point.is_on_point(x, y, distortion)) {
                        handler(point);
                        _this.hover = now;
                    }
                });
            }
        }
    });
    Object.defineProperty(Rope.prototype, "handleMovement", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (vx, vy) {
            this.points[this.points.length - 1].set_speed(vx, vy);
        }
    });
    Object.defineProperty(Rope.prototype, "update", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (width, height, vercel_s) {
            if (vercel_s === void 0) { vercel_s = 5; }
            this.points.forEach(function (point) {
                point.update(width, height);
            });
            for (var x = 0; x < vercel_s; x++) {
                for (var y = 0; y < this.points.length - 1; y++) {
                    this.verlet(this.points[y], this.points[y + 1], this.options.verlet_target_distance);
                }
            }
            for (var x = 0; x < this.points.length - 1; x++) {
                this.rotation(this.points[x], this.points[x + 1]);
                if (this.options.verlet_extend_length) {
                    this.points[x].set_y_size(this.distance(this.points[x], this.points[x + 1]));
                }
            }
            this.rotation(this.points[this.options.img_rotate_target_index], this.points[this.points.length - 1]);
        }
    });
    Object.defineProperty(Rope.prototype, "render", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (width, height) {
            var _this = this;
            this.update(width, height, this.options.verlet_calculate_per_frame);
            this.points.forEach(function (point) {
                point.render(_this.ctx);
            });
        }
    });
    return Rope;
}());
export default Rope;

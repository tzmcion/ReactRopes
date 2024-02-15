var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Point = /** @class */ (function () {
    function Point(x, y, vx, vy, options, is_static) {
        if (is_static === void 0) { is_static = false; }
        Object.defineProperty(this, "x", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: x
        });
        Object.defineProperty(this, "y", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: y
        });
        Object.defineProperty(this, "options", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: options
        });
        Object.defineProperty(this, "is_static", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: is_static
        });
        Object.defineProperty(this, "px", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "py", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "rotation", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.px = x - vx;
        this.py = y - vy;
        this.rotation = 0;
        this.render = this.render.bind(this);
    }
    Object.defineProperty(Point.prototype, "setRotation", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (rotation) {
            this.rotation = rotation;
        }
    });
    Object.defineProperty(Point.prototype, "set_y_size", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (size) {
            this.options.obj_height = size;
        }
    });
    Object.defineProperty(Point.prototype, "get_position", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () {
            return {
                x: this.x,
                y: this.y
            };
        }
    });
    Object.defineProperty(Point.prototype, "set_position", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (x, y) {
            if (this.is_static)
                return;
            this.x = x;
            this.y = y;
        }
    });
    Object.defineProperty(Point.prototype, "update", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (width, height) {
            if (this.is_static)
                return;
            var _a = this.options, air_friction = _a.air_friction, gravity = _a.gravity, img_weight = _a.img_weight, bounce_type = _a.bounce_type;
            var vx = ((this.x - this.px) * air_friction);
            var vy = ((this.y - this.py) * air_friction) + gravity * img_weight;
            this.px = this.x;
            this.py = this.y;
            this.x += vx;
            this.y += vy;
            var wb = false;
            switch (bounce_type) {
                case -3:
                    this.celling_bounce(vy);
                    break;
                case -2:
                    wb = this.wall_bounce(width, vx);
                    break;
                case -1:
                    this.ground_bounce(height, vx, vy, wb);
                    break;
                default:
                    break;
            }
        }
    });
    Object.defineProperty(Point.prototype, "is_on_point", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (x, y, distortion) {
            var real_x = this.x;
            var real_y = this.y;
            if (x > real_x - distortion && x < real_x + this.options.obj_width + distortion) {
                if (y > real_y - distortion && y < real_y + this.options.obj_height + distortion) {
                    return true;
                }
            }
            return false;
        }
    });
    Object.defineProperty(Point.prototype, "render", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (ctx) {
            if (!this.options)
                return;
            var _a = this.options, radial_blocks = _a.radial_blocks, color = _a.color, obj_width = _a.obj_width, obj_height = _a.obj_height;
            if (radial_blocks) {
                ctx.fillStyle = color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, obj_width, 0, Math.PI * 2);
                ctx.fill();
                ctx.closePath();
                return;
            }
            ctx.save();
            ctx.fillStyle = color;
            ctx.translate(this.x + obj_width / 2, this.y + obj_height / 2);
            ctx.rotate(this.rotation);
            ctx.fillRect(-obj_width / 2, -obj_height / 2, obj_width, obj_height);
            ctx.restore();
        }
    });
    Object.defineProperty(Point.prototype, "set_speed", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (vx, vy) {
            if (vx === void 0) { vx = 0; }
            if (vy === void 0) { vy = 0; }
            this.px += vx;
            this.py += vy;
        }
    });
    Object.defineProperty(Point.prototype, "wall_bounce", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (width, vx) {
            var of_wall_bounce = false;
            var obj_width = this.options.obj_width;
            if (this.x >= width - obj_width) {
                this.x = width - obj_width;
                this.px = width - obj_width + vx;
                of_wall_bounce = true;
            }
            if (this.x < 0 + obj_width) {
                this.x = 0 + obj_width;
                this.px = vx + obj_width;
                of_wall_bounce = true;
            }
            return of_wall_bounce;
        }
    });
    Object.defineProperty(Point.prototype, "celling_bounce", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (vy) {
            var obj_height = this.options.obj_height;
            if (this.y < 0 + obj_height) {
                this.y = obj_height;
                this.py = obj_height - (vy) * this.options.bounce;
            }
        }
    });
    Object.defineProperty(Point.prototype, "ground_bounce", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (height, vx, vy, wb) {
            var obj_height = this.options.obj_height;
            if (this.y >= height - obj_height) {
                this.y = height - obj_height;
                this.py = height - obj_height + vy * this.options.bounce;
                if (!wb)
                    this.px = this.x - (vx * this.options.friction);
            }
        }
    });
    return Point;
}());
var EndPoint = /** @class */ (function (_super) {
    __extends(EndPoint, _super);
    function EndPoint(x, y, vx, vy, options, is_static, image) {
        if (is_static === void 0) { is_static = false; }
        if (image === void 0) { image = ""; }
        var _this = _super.call(this, x, y, vx, vy, options, is_static) || this;
        Object.defineProperty(_this, "image", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        if (is_static)
            return _this;
        _this.image = new Image(_this.options.img_size_x, _this.options.img_size_y);
        _this.image.src = image;
        return _this;
    }
    Object.defineProperty(EndPoint.prototype, "render", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (ctx) {
            if (this.is_static)
                Point.prototype.render(ctx);
            this.x -= this.options.img_offset_x;
            this.y -= this.options.img_offset_y;
            ctx.save();
            ctx.fillStyle = this.options.color;
            ctx.translate(this.x + this.options.img_size_x / 2, this.y + this.options.img_size_y / 2);
            ctx.rotate(this.rotation);
            if (this.image)
                ctx.drawImage(this.image, -this.options.img_size_x / 2, -this.options.img_size_y / 2, this.options.img_size_x, this.options.img_size_y);
            ctx.restore();
            this.x += this.options.img_offset_x;
            this.y += this.options.img_offset_y;
        }
    });
    Object.defineProperty(EndPoint.prototype, "is_on_point", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (x, y, distortion) {
            var real_x = this.x - this.options.img_offset_x;
            var real_y = this.y - this.options.img_offset_y;
            if (x > real_x - distortion && x < real_x + this.options.img_size_x + distortion) {
                if (y > real_y - distortion && y < real_y + this.options.img_size_y + distortion) {
                    return true;
                }
            }
            return false;
        }
    });
    return EndPoint;
}(Point));
export { Point, EndPoint };

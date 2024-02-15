var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import Rope from './Rope';
var canvas_manager = /** @class */ (function () {
    function canvas_manager(canvas, width, height, image, options) {
        Object.defineProperty(this, "width", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: width
        });
        Object.defineProperty(this, "height", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: height
        });
        Object.defineProperty(this, "options", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: options
        });
        Object.defineProperty(this, "ctx", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "canvas", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "animation_id", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "movement", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "rope", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.movement = { c_x: 0, c_y: 0, v_x: 0, v_y: 0, p_vx: 0, p_vy: 0 };
        this.animation_id = 0;
        this.rope = new Rope(this.ctx, this.options.quantity, this.check_options(options, width), image);
        this.start_animation();
    }
    Object.defineProperty(canvas_manager.prototype, "handleMouseMove", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (p_x, p_y, handler) {
            this.rope.mouseIntegration(p_x, p_y, handler);
        }
    });
    Object.defineProperty(canvas_manager.prototype, "destroy", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () {
            window.cancelAnimationFrame(this.animation_id);
        }
    });
    Object.defineProperty(canvas_manager.prototype, "start_animation", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () {
            var _this = this;
            if (this.animation_id !== 0)
                return;
            var render_animation = function () {
                _this.ctx.clearRect(0, 0, _this.width, _this.height);
                _this.rope.render(_this.width, _this.height);
                _this.detect_movement();
                _this.animation_id = window.requestAnimationFrame(render_animation);
            };
            this.animation_id = window.requestAnimationFrame(render_animation);
        }
    });
    Object.defineProperty(canvas_manager.prototype, "check_options", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (options, width) {
            var options_edited = __assign({}, options);
            if (options_edited.pos_x === 0) {
                options_edited.pos_x = width / 2;
            }
            options_edited.pos_ex = options_edited.pos_x + options_edited.pos_ex;
            options_edited.pos_y = options_edited.pos_y + options_edited.pos_y;
            if (options_edited.img_offset_y === 0) {
                options_edited.img_offset_y = options_edited.img_size_y / 8;
            }
            if (options_edited.img_offset_x === 0) {
                options_edited.img_offset_x = options_edited.img_size_x / 2;
            }
            return options_edited;
        }
    });
    Object.defineProperty(canvas_manager.prototype, "set_last_pos", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () {
            var x = this.canvas.getBoundingClientRect().x;
            var y = this.canvas.getBoundingClientRect().y;
            var _a = this.movement, c_x = _a.c_x, c_y = _a.c_y, p_vx = _a.p_vx, p_vy = _a.p_vy;
            var new_movement = {
                p_x: c_x,
                p_y: c_y,
                c_x: x,
                c_y: y,
                v_x: Math.round((c_x - x)) === p_vx ? 0 : Math.round((c_x - x)),
                v_y: Math.round((c_y - y)) === p_vy ? 0 : Math.round((c_y - y)),
                p_vx: Math.round((c_x - x)),
                p_vy: Math.round((c_y - y))
            };
            this.movement = new_movement;
        }
    });
    Object.defineProperty(canvas_manager.prototype, "set_initial_pos", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (x, y) {
            this.movement.v_x = 0;
            this.movement.v_y = 0;
            this.movement.c_x = x;
            this.movement.c_y = y;
        }
    });
    Object.defineProperty(canvas_manager.prototype, "detect_movement", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () {
            var movement_x = this.movement.v_x * -1;
            var movement_y = this.movement.v_y * -1;
            if (movement_x || movement_y) {
                this.rope.handleMovement(movement_x * this.options.movement_detection_force, movement_y * this.options.movement_detection_force);
            }
        }
    });
    return canvas_manager;
}());
export default canvas_manager;

import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState, useRef } from 'react';
import Canvas_manager from './Utils/CanvasManager/canvas_manager';
import { default_options } from './Options';
import { to_blob } from './Utils/FileReader';
export default function BGCanvas(_a) {
    var src = _a.src, width = _a.width, height = _a.height, id = _a.id, className = _a.className, _b = _a.onHover, onHover = _b === void 0 ? function () { } : _b, _c = _a.options, options = _c === void 0 ? default_options : _c;
    var canvas_ref = useRef(null);
    var _d = useState({ width: width, height: height }), dimensions = _d[0], set_dimensions = _d[1];
    var _e = useState(), file_blob = _e[0], set_file_blob = _e[1];
    var _f = useState(), animator = _f[0], set_animator = _f[1];
    useEffect(function () {
        if (!Object.keys(options).includes('__control_flag')) {
            throw new Error("Options provided is not valid options type, please import options from our package and change them accordingly");
        }
    }, [options]);
    useEffect(function () {
        set_dimensions({ width: width, height: height });
    }, [width, height]);
    useEffect(function () {
        to_blob(src).then(function (blob) {
            set_file_blob(blob);
        });
    }, [src]);
    useEffect(function () {
        if (file_blob && canvas_ref.current && options) {
            set_animator(new Canvas_manager(canvas_ref.current, dimensions.width, dimensions.height, file_blob, options));
        }
    }, [dimensions, file_blob, options]);
    useEffect(function () {
        return function () { animator && animator.destroy(); };
    }, [animator]);
    var handleMouseMove = function (event) {
        if (canvas_ref.current) {
            var x = event.clientX - canvas_ref.current.getBoundingClientRect().left;
            var y = event.clientY - canvas_ref.current.getBoundingClientRect().top;
            animator && animator.handleMouseMove(x, y, function (point) { onHover(point, event); });
        }
    };
    useEffect(function () {
        var interval = 0;
        if (options.auto_movement_detection) {
            if (animator && canvas_ref.current) {
                animator.set_initial_pos(canvas_ref.current.getBoundingClientRect().left, canvas_ref.current.getBoundingClientRect().top);
                interval = setInterval(function () {
                    if (canvas_ref.current)
                        animator.set_last_pos();
                }, options.movement_detection_delay);
            }
        }
        return function () { if (interval)
            clearInterval(interval); };
    }, [animator, options]);
    return (_jsx("canvas", { className: className, id: id, ref: canvas_ref, onMouseMove: handleMouseMove, width: dimensions.width, height: dimensions.height }));
}

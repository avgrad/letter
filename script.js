function switchClass(checkbox) {
    var checkedClass = checkbox.getAttribute("checkedClass");
    var uncheckedClass = checkbox.getAttribute("uncheckedClass");
    var selector = checkbox.getAttribute("selector");
    document.querySelectorAll(selector).forEach(elm => {
        // could split (un)checkedClass at " " to get multiple and .forEach() toggle them
        // checkedClass.split(" ").forEach(cls => elm.classList.toggle(cls, checkbox.checked));
        if (checkedClass && checkedClass.length > 0)
            elm.classList.toggle(checkedClass, checkbox.checked);
        if (uncheckedClass && uncheckedClass.length > 0)
            elm.classList.toggle(uncheckedClass, !checkbox.checked);
    });
}

function handleCssSwitcherClick(checkbox) {
    // for radio-inputs trigger other instances
    if (checkbox.type === "radio") {
        // go up to nodes to get to div.radio
        checkbox.parentNode.parentNode.querySelectorAll('input[type="radio"][selector][checkedClass]').forEach(cb => {
            if (cb !== checkbox)
                switchClass(cb);
        });
    }

    switchClass(checkbox);
}

document.addEventListener("DOMContentLoaded", e => {
    function forEachHandler(elm) {
        if (elm.getAttribute("selector") === "."+elm.getAttribute("checkedClass") || elm.getAttribute("selector") === "."+elm.getAttribute("uncheckedClass"))
            console.warn("selector and checkedClass/uncheckedClass are identical. Probably results in unexpected behaviour.", elm.getAttribute("selector"));
        elm.addEventListener("click", evt => handleCssSwitcherClick(evt.currentTarget));
        switchClass(elm);
    };

    document.querySelectorAll('input[type="checkbox"][selector][checkedClass][uncheckedClass]').forEach(forEachHandler);
    document.querySelectorAll('input[type="radio"][selector][checkedClass]').forEach(forEachHandler);
});

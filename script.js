function handleCssSwitcherClick(checkbox) {
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

document.addEventListener("DOMContentLoaded", e => {
    document.querySelectorAll('input[type="checkbox"][selector][checkedClass][uncheckedClass]').forEach(elm => {
        // warn, if element selector could deactivate itself
        if (elm.getAttribute("selector") === "." + elm.getAttribute("checkedClass") || elm.getAttribute("selector") === "." + elm.getAttribute("uncheckedClass"))
            console.warn("selector and checkedClass/uncheckedClass are identical. Probably results in unexpected behaviour.", elm.getAttribute("selector"));
        elm.addEventListener("click", evt => handleCssSwitcherClick(evt.currentTarget));
        // set from initial value
        handleCssSwitcherClick(elm);
    });
});

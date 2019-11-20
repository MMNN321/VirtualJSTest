(function() {
    const scriptElement = document.querySelector("#popup .close");

    popup.$.li.for(scriptElement).addEventListener("click", function(event) {
        closePopup(popup);
    });
})();
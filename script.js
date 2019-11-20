const popup = new Virtual.Site({predefinedClasses: true});
const main = new Virtual.Site({predefinedClasses: true});

const popupElement = document.getElementById("popup");
const imageOnHover = document.getElementsByClassName("image-on-hover");
const mainElement = document.getElementsByTagName("main")[0];

Array.from(imageOnHover).forEach(function(element) {
    console.log(element);
    main.$.li.for(element).addEventListener("mouseover", function(evt) {
        const element = evt.target;
        if(element.dataset.image) {
            mainElement.style.background = "url(\"" + element.dataset.image + "\")";
            mainElement.style.backgroundSize = "cover";
        }
    });
});

popupElement.appendChild(popup.containerElement);

const PopupPresets = {
    License: {
        basePath: "./site/popup",
        html: "license.html",
        style: "style.css",
        script: "script.js"
    }
};

const mitLicenseElement = document.querySelector("#madeby .license .click__license");

mitLicenseElement.addEventListener("click", function(event) {
    if(!popup.backup) {
        openPopupPreset(popup, PopupPresets.License);
    }
});

function openPopupPreset(site, preset) {
    if(site.backup) {
        closePopup(site);
    }
    return openPopup(site, `${preset.basePath}/${preset.html}`,
            preset.style ? `${preset.basePath}/${preset.style}` : null, preset.script ? `${preset.basePath}/${preset.script}` : null);
}

function openPopup(site, link, style=null, script=null) {
    site.enableEnvironment();
    if(style) {
        site.$.styleLoader.loadItem(style);
    }
    site.loadHTML(link, function(xhr) {
        if(script) {
            site.$.scriptLoader.loadItem(script);
        }
    });
}

function closePopup(site) {
    site.unload();
}
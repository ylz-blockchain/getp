const mobileUrl = "http://localhost:9528/";

function verifyScreenWidth() {
    if (document.body.clientWidth < 650) {
        window.location.replace(mobileUrl);
    }
}

export default {
    verifyScreenWidth
}